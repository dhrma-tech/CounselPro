import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Viewer } from '@/lib/auth';
import { publicProfiles } from './social';
import type { TestRow } from './rows';

export type LeaderboardScope = { type: 'all' } | { type: 'state' };

export interface LeaderboardRow {
  rank: number;
  name: string;
  score: number;
  maxScore: number;
  timeUsedSeconds: number;
  isYou: boolean;
}

export interface LeaderboardView {
  rows: LeaderboardRow[];
  total: number;
  you: { rank: number; virtual: boolean; score: number } | null;
  scopeLabel: string;
  needsState: boolean;
}

interface Entry { userId: string; score: number; maxScore: number; time: number }

const byScore = (a: Entry, b: Entry) => b.score - a.score || a.time - b.time;

/** Rank = 1 + number of counted attempts that beat this score (ties share a rank, faster time first in the list). */
function rankOf(entries: Entry[], score: number, time: number) {
  return 1 + entries.filter((e) => e.score > score || (e.score === score && e.time < time)).length;
}

export async function getLeaderboard(test: Pick<TestRow, 'id'>, scope: LeaderboardScope, viewer: Viewer, limit = 100): Promise<LeaderboardView> {
  const db = supabaseAdmin();
  const { data } = await db
    .from('attempts')
    .select('user_id, score_raw, max_score, time_used:score_breakdown->timeUsedSeconds')
    .eq('test_id', test.id)
    .eq('counts_as_rank', true)
    .in('status', ['SUBMITTED', 'AUTO_SUBMITTED'])
    .not('user_id', 'is', null)
    .limit(20000);
  let entries: Entry[] = (data ?? []).map((a) => ({
    userId: a.user_id as string,
    score: Number(a.score_raw ?? 0),
    maxScore: Number(a.max_score ?? 0),
    time: Number(a.time_used ?? 0),
  }));

  let scopeLabel = 'All students';
  let needsState = false;
  if (scope.type === 'state') {
    const { data: me } = viewer.user
      ? await db.from('profiles').select('home_state').eq('user_id', viewer.user.id).maybeSingle()
      : { data: null };
    const state = me?.home_state as string | null | undefined;
    if (!state) {
      needsState = true;
      entries = [];
    } else {
      scopeLabel = state;
      const { data: sameState } = await db.from('profiles').select('user_id').eq('home_state', state).limit(50000);
      const ids = new Set((sameState ?? []).map((p) => p.user_id as string));
      entries = entries.filter((e) => ids.has(e.userId));
    }
  }

  entries.sort(byScore);
  const top = entries.slice(0, limit);
  const names = await publicProfiles(top.map((e) => e.userId));
  const rows = top.map((e) => ({
    rank: rankOf(entries, e.score, e.time),
    name: names.get(e.userId)!.name,
    score: e.score,
    maxScore: e.maxScore,
    timeUsedSeconds: e.time,
    isYou: !!viewer.user && e.userId === viewer.user.id,
  }));

  let you: LeaderboardView['you'] = null;
  if (viewer.user) {
    const counted = entries.find((e) => e.userId === viewer.user!.id);
    if (counted) {
      you = { rank: rankOf(entries, counted.score, counted.time), virtual: false, score: counted.score };
    } else {
      // Late or repeat attempt: show where it would have placed
      const { data: best } = await db.from('attempts').select('score_raw, time_used:score_breakdown->timeUsedSeconds')
        .eq('test_id', test.id).eq('user_id', viewer.user.id).in('status', ['SUBMITTED', 'AUTO_SUBMITTED'])
        .order('score_raw', { ascending: false }).limit(1);
      if (best && best.length > 0) {
        const score = Number(best[0].score_raw ?? 0);
        you = { rank: rankOf(entries, score, Number(best[0].time_used ?? 0)), virtual: true, score };
      }
    }
  }
  return { rows, total: entries.length, you, scopeLabel, needsState };
}

// ---------------------------------------------------------------- weekly mock

export interface WeeklyMockInfo {
  slug: string;
  title: string;
  presetName: string;
  startsAt: string | null;
  endsAt: string | null;
  isOpen: boolean;
}

/** The weekly open mock that is running now, or the next one coming up. */
export async function currentWeeklyMock(): Promise<WeeklyMockInfo | null> {
  const db = supabaseAdmin();
  const nowIso = new Date().toISOString();
  const { data } = await db.from('tests').select('slug, title, preset_id, window_start_at, window_end_at')
    .eq('is_weekly', true).eq('status', 'PUBLISHED').gt('window_end_at', nowIso)
    .order('window_start_at', { ascending: true }).limit(1);
  const t = data?.[0];
  if (!t) return null;
  const { data: preset } = await db.from('exam_presets').select('name').eq('id', t.preset_id).maybeSingle();
  return {
    slug: t.slug as string,
    title: t.title as string,
    presetName: (preset?.name as string) ?? '',
    startsAt: t.window_start_at as string | null,
    endsAt: t.window_end_at as string | null,
    isOpen: !t.window_start_at || new Date(t.window_start_at as string).getTime() <= Date.now(),
  };
}
