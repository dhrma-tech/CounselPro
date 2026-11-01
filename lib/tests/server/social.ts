import 'server-only';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Viewer } from '@/lib/auth';
import { AttemptError } from './errors';
import type { AttemptRow, TestRow } from './rows';

export const REF_COOKIE = 'cp_ref';
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function randomCode(length: number): string {
  const bytes = randomBytes(length);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}

// ---------------------------------------------------------------- display names

export interface PublicProfile {
  userId: string;
  name: string;
  homeState: string | null;
}

/** "Rahul S." (or "Student #A1B2" when the student chose to stay hidden or has no name yet). */
export function displayName(userId: string, fullName: string | null, mode: string | null): string {
  const anon = `Student #${userId.replace(/-/g, '').slice(0, 4).toUpperCase()}`;
  if (mode === 'HIDDEN' || !fullName?.trim()) return anon;
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  return parts.length > 1 ? `${first} ${parts[parts.length - 1].charAt(0).toUpperCase()}.` : first;
}

export async function publicProfiles(userIds: string[]): Promise<Map<string, PublicProfile>> {
  const map = new Map<string, PublicProfile>();
  if (userIds.length === 0) return map;
  for (let i = 0; i < userIds.length; i += 500) {
    const { data } = await supabaseAdmin().from('profiles').select('user_id, full_name, leaderboard_name, home_state').in('user_id', userIds.slice(i, i + 500));
    for (const p of data ?? []) {
      map.set(p.user_id as string, {
        userId: p.user_id as string,
        name: displayName(p.user_id as string, p.full_name as string | null, p.leaderboard_name as string | null),
        homeState: (p.home_state as string | null) ?? null,
      });
    }
  }
  for (const id of userIds) if (!map.has(id)) map.set(id, { userId: id, name: displayName(id, null, null), homeState: null });
  return map;
}

// ---------------------------------------------------------------- referrals

export async function ensureRefCode(userId: string): Promise<string> {
  const db = supabaseAdmin();
  const { data } = await db.from('profiles').select('ref_code').eq('user_id', userId).maybeSingle();
  if (data?.ref_code) return data.ref_code as string;
  for (let i = 0; i < 5; i++) {
    const code = randomCode(6);
    const { error } = await db.from('profiles').upsert({ user_id: userId, ref_code: code }, { onConflict: 'user_id' });
    if (!error) return code;
  }
  throw new Error('Could not create a referral code');
}

/** Called once after sign-in: credits the student whose link brought this user here. */
export async function applyReferral(userId: string) {
  const cookieStore = await cookies();
  const code = cookieStore.get(REF_COOKIE)?.value?.toUpperCase();
  if (!code || !/^[A-Z0-9]{6}$/.test(code)) return;
  const db = supabaseAdmin();
  const { data: me } = await db.from('profiles').select('referred_by, ref_code, created_at').eq('user_id', userId).maybeSingle();
  if (!me || me.referred_by || me.ref_code === code) return;
  // Only new accounts (first hour) can be attributed
  if (Date.now() - new Date(me.created_at as string).getTime() > 3600_000) return;
  const { data: owner } = await db.from('profiles').select('user_id').eq('ref_code', code).maybeSingle();
  if (!owner || owner.user_id === userId) return;
  await db.from('profiles').update({ referred_by: code }).eq('user_id', userId);
}

// ---------------------------------------------------------------- share cards

export async function createShareCard(attemptId: string, viewer: Viewer, opts: { hideName: boolean; hideRank: boolean }) {
  if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to share your result.');
  const db = supabaseAdmin();
  const { data: attempt } = await db.from('attempts').select('id, user_id, status').eq('id', attemptId).maybeSingle();
  if (!attempt || attempt.user_id !== viewer.user.id) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  if (attempt.status === 'IN_PROGRESS') throw new AttemptError(409, 'IN_PROGRESS', 'Finish the test first');

  const { data: existing } = await db.from('share_cards').select('id').eq('attempt_id', attemptId)
    .eq('hide_name', opts.hideName).eq('hide_rank', opts.hideRank).maybeSingle();
  const refCode = await ensureRefCode(viewer.user.id);
  if (existing) return { id: existing.id as string, refCode };
  const id = randomCode(8);
  await db.from('share_cards').insert({ id, attempt_id: attemptId, user_id: viewer.user.id, hide_name: opts.hideName, hide_rank: opts.hideRank });
  return { id, refCode };
}

export interface ShareCardView {
  id: string;
  name: string | null;
  score: number;
  maxScore: number;
  percentile: number | null;
  strongestSubject: string | null;
  testTitle: string;
  testSlug: string | null;
  examName: string;
  refCode: string | null;
}

export async function getShareCard(id: string): Promise<ShareCardView | null> {
  if (!/^[A-Z0-9]{8}$/.test(id)) return null;
  const db = supabaseAdmin();
  const { data: card } = await db.from('share_cards').select('*').eq('id', id).maybeSingle();
  if (!card) return null;
  const { data: attempt } = await db.from('attempts').select('id, user_id, test_id, score_raw, max_score, percentile_est, score_breakdown').eq('id', card.attempt_id).maybeSingle();
  if (!attempt) return null;
  const [{ data: test }, { data: profile }] = await Promise.all([
    db.from('tests').select('title, slug, is_practice, is_daily, status, preset_id').eq('id', attempt.test_id).maybeSingle(),
    db.from('profiles').select('full_name, ref_code').eq('user_id', card.user_id).maybeSingle(),
  ]);
  const { data: preset } = await db.from('exam_presets').select('name').eq('id', test?.preset_id ?? '').maybeSingle();
  const sections = ((attempt.score_breakdown as AttemptRow['score_breakdown'])?.sections ?? []).filter((s) => s.maxScore > 0);
  const strongest = sections.length > 1 ? [...sections].sort((a, b) => b.score / b.maxScore - a.score / a.maxScore)[0] : null;
  const first = (profile?.full_name as string | null)?.trim().split(/\s+/)[0] ?? null;
  return {
    id,
    name: card.hide_name ? null : first,
    score: Number(attempt.score_raw ?? 0),
    maxScore: Number(attempt.max_score ?? 0),
    percentile: card.hide_rank || attempt.percentile_est == null ? null : Number(attempt.percentile_est),
    strongestSubject: strongest && strongest.score > 0 ? strongest.name : null,
    testTitle: (test?.title as string) ?? 'Mock test',
    testSlug: test && !test.is_practice && test.status === 'PUBLISHED' ? (test.slug as string) : null,
    examName: (preset?.name as string) ?? '',
    refCode: (profile?.ref_code as string | null) ?? null,
  };
}

// ---------------------------------------------------------------- challenges

export async function createChallenge(attemptId: string, viewer: Viewer): Promise<string> {
  if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to challenge a friend.');
  const db = supabaseAdmin();
  const { data: attempt } = await db.from('attempts').select('id, user_id, status, test_id').eq('id', attemptId).maybeSingle();
  if (!attempt || attempt.user_id !== viewer.user.id) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  if (attempt.status === 'IN_PROGRESS') throw new AttemptError(409, 'IN_PROGRESS', 'Finish the test first');
  const { data: test } = await db.from('tests').select('is_practice, status').eq('id', attempt.test_id).single();
  if (!test || test.is_practice || test.status !== 'PUBLISHED') throw new AttemptError(400, 'INVALID', 'Challenges work on published tests only.');
  const { data: existing } = await db.from('challenges').select('token').eq('attempt_id', attemptId).maybeSingle();
  if (existing) return existing.token as string;
  await ensureRefCode(viewer.user.id);
  const token = randomCode(10);
  await db.from('challenges').insert({ token, attempt_id: attemptId, test_id: attempt.test_id, created_by: viewer.user.id });
  return token;
}

export interface ChallengeView {
  token: string;
  test: Pick<TestRow, 'id' | 'slug' | 'title' | 'guest_allowed' | 'kind' | 'duration_seconds'>;
  challenger: { name: string; score: number; maxScore: number; timeUsedSeconds: number; isYou: boolean };
  takers: { name: string; score: number; maxScore: number; timeUsedSeconds: number; isYou: boolean; attemptId: string | null }[];
  yourAttemptId: string | null;
  refCode: string | null;
}

export async function getChallenge(token: string, viewer: Viewer): Promise<ChallengeView | null> {
  if (!/^[A-Z0-9]{10}$/.test(token)) return null;
  const db = supabaseAdmin();
  const { data: ch } = await db.from('challenges').select('*').eq('token', token).maybeSingle();
  if (!ch) return null;
  const [{ data: test }, { data: origin }, { data: takers }] = await Promise.all([
    db.from('tests').select('id, slug, title, guest_allowed, kind, duration_seconds').eq('id', ch.test_id).single(),
    db.from('attempts').select('id, user_id, score_raw, max_score, score_breakdown').eq('id', ch.attempt_id).single(),
    db.from('attempts').select('id, user_id, guest_token, score_raw, max_score, score_breakdown, status').eq('challenge_token', token)
      .in('status', ['SUBMITTED', 'AUTO_SUBMITTED']).order('score_raw', { ascending: false }).limit(50),
  ]);
  if (!test || !origin) return null;
  const ids = [origin.user_id as string, ...(takers ?? []).map((t) => t.user_id as string | null).filter(Boolean) as string[]];
  const profiles = await publicProfiles(Array.from(new Set(ids)));
  const { data: creator } = await db.from('profiles').select('ref_code').eq('user_id', origin.user_id).maybeSingle();
  const mine = (t: { user_id: string | null; guest_token?: string | null }) =>
    (!!viewer.user && t.user_id === viewer.user.id) || (!t.user_id && !!viewer.guestToken && t.guest_token === viewer.guestToken);
  const time = (b: unknown) => ((b as AttemptRow['score_breakdown'])?.timeUsedSeconds ?? 0);
  const takerRows = (takers ?? []).map((t) => ({
    name: t.user_id ? profiles.get(t.user_id as string)!.name : 'Guest',
    score: Number(t.score_raw ?? 0),
    maxScore: Number(t.max_score ?? 0),
    timeUsedSeconds: time(t.score_breakdown),
    isYou: mine(t as { user_id: string | null; guest_token: string | null }),
    attemptId: mine(t as { user_id: string | null; guest_token: string | null }) ? (t.id as string) : null,
  }));
  return {
    token,
    test: test as ChallengeView['test'],
    challenger: {
      name: profiles.get(origin.user_id as string)!.name,
      score: Number(origin.score_raw ?? 0),
      maxScore: Number(origin.max_score ?? 0),
      timeUsedSeconds: time(origin.score_breakdown),
      isYou: !!viewer.user && viewer.user.id === origin.user_id,
    },
    takers: takerRows,
    yourAttemptId: takerRows.find((t) => t.isYou)?.attemptId ?? null,
    refCode: (creator?.ref_code as string | null) ?? null,
  };
}
