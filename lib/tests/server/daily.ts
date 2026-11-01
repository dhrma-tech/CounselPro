import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { addDays, istDate } from '../istDate';
import { completeDay, EMPTY_STREAK, streakToday, type StreakState } from '../streak';
import { hashString, mulberry32, shuffleInPlace } from '../shuffle';
import { PRESET_QUESTION_EXAM } from '../presetExams';
import { createQuizFromQuestions } from './practice';
import { getPreset } from './content';
import type { TestRow } from './rows';

export const DAILY_PRESETS = ['JEE_MAIN', 'NEET_UG', 'MHT_CET_PCM', 'MHT_CET_PCB'] as const;
export const DAILY_QUESTION_COUNT = 10;
export const DAILY_DURATION_SECONDS = 600;

/** Today's daily quiz for an exam. Created by the first visitor of the day; same set for everyone. */
export async function getOrCreateDailyQuiz(presetId: string, date = istDate()): Promise<TestRow | null> {
  if (!(DAILY_PRESETS as readonly string[]).includes(presetId)) return null;
  const db = supabaseAdmin();
  const find = async () => {
    const { data } = await db.from('tests').select('*').eq('is_daily', true).eq('preset_id', presetId).eq('daily_date', date).maybeSingle();
    return (data as TestRow | null) ?? null;
  };
  const existing = await find();
  if (existing?.current_version_id) return existing;

  const preset = await getPreset(presetId);
  if (!preset) return null;
  const subjects = new Map(preset.sections.map((s) => [s.subject, s.id]));
  let pool = supabaseAdmin().from('questions').select('id, subject').eq('exam', PRESET_QUESTION_EXAM[presetId])
    .eq('status', 'APPROVED').eq('key_verified', true).neq('license_status', 'UNKNOWN');
  if (process.env.ALLOW_SAMPLE_CONTENT !== 'true') pool = pool.neq('license_status', 'ORIGINAL_SAMPLE');
  const { data: all } = await pool.limit(5000);
  const candidates = (all ?? []).filter((q) => subjects.has(q.subject as string)) as { id: string; subject: string }[];
  if (candidates.length === 0) return null;

  // Avoid repeating the last week's daily questions when the bank is big enough
  const { data: recent } = await db.from('tests').select('current_version_id').eq('is_daily', true).eq('preset_id', presetId)
    .gte('daily_date', addDays(date, -7)).lt('daily_date', date);
  const recentIds = new Set<string>();
  const versionIds = (recent ?? []).map((r) => r.current_version_id).filter(Boolean) as string[];
  if (versionIds.length > 0) {
    const { data: versions } = await db.from('test_versions').select('sections').in('id', versionIds);
    for (const v of versions ?? []) for (const s of v.sections as { questionIds: string[] }[]) s.questionIds.forEach((id) => recentIds.add(id));
  }
  const fresh = candidates.filter((c) => !recentIds.has(c.id));
  const usable = fresh.length >= DAILY_QUESTION_COUNT ? fresh : candidates;

  // Deterministic for the date; rotate evenly across subjects
  const random = mulberry32(hashString(`${presetId}:${date}`));
  const bySubject = new Map<string, { id: string; subject: string }[]>();
  for (const q of shuffleInPlace([...usable], random)) bySubject.set(q.subject, [...(bySubject.get(q.subject) ?? []), q]);
  const lists = shuffleInPlace(Array.from(bySubject.values()), random);
  const questionsBySection: Record<string, string[]> = {};
  let picked = 0;
  while (picked < DAILY_QUESTION_COUNT && lists.some((l) => l.length > 0)) {
    for (const l of lists) {
      const q = l.shift();
      if (!q || picked >= DAILY_QUESTION_COUNT) continue;
      (questionsBySection[subjects.get(q.subject)!] ??= []).push(q.id);
      picked++;
    }
  }

  try {
    await createQuizFromQuestions({
      presetId,
      questionsBySection,
      title: `Daily Quiz · ${preset.name} · ${new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })}`,
      durationSeconds: DAILY_DURATION_SECONDS,
      extra: { is_daily: true, daily_date: date, is_practice: false, status: 'PUBLISHED', slug: `daily-${presetId.toLowerCase().replace(/_/g, '-')}-${date}` },
    });
  } catch {
    // Another visitor created it at the same moment (unique index); fall through and read theirs
  }
  return find();
}

function fromRow(row: Record<string, unknown> | null): StreakState {
  if (!row) return EMPTY_STREAK;
  return {
    current: row.current_streak as number,
    longest: row.longest_streak as number,
    lastDate: row.last_date as string | null,
    freezesLeft: row.freezes_left as number,
    freezeWeek: row.freeze_week as string | null,
    history: (row.history as string[]) ?? [],
  };
}

export async function getStreak(userId: string): Promise<StreakState> {
  const { data } = await supabaseAdmin().from('streaks').select('*').eq('user_id', userId).maybeSingle();
  return streakToday(fromRow(data), istDate());
}

export async function recordDailyCompletion(userId: string, date: string): Promise<StreakState> {
  const db = supabaseAdmin();
  const { data } = await db.from('streaks').select('*').eq('user_id', userId).maybeSingle();
  const next = completeDay(fromRow(data), date);
  await db.from('streaks').upsert({
    user_id: userId,
    current_streak: next.current,
    longest_streak: next.longest,
    last_date: next.lastDate,
    freezes_left: next.freezesLeft,
    freeze_week: next.freezeWeek,
    history: next.history,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  return next;
}

export interface DailyStatus {
  presetId: string;
  attemptId: string | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE';
  score: number | null;
  maxScore: number | null;
}

/** Today's daily quiz status per exam for the viewer. Read-only: quizzes are created on start. */
export async function listTodayDaily(viewer: { user: { id: string } | null; guestToken: string | null }, date = istDate()): Promise<DailyStatus[]> {
  const { data: tests } = await supabaseAdmin().from('tests').select('id, preset_id').eq('is_daily', true).eq('daily_date', date)
    .in('preset_id', [...DAILY_PRESETS]);
  const testByPreset = new Map((tests ?? []).map((t) => [t.preset_id as string, t.id as string]));
  return Promise.all(DAILY_PRESETS.map(async (presetId) => {
    const testId = testByPreset.get(presetId);
    const attempt = testId ? await dailyAttemptFor(testId, viewer) : null;
    if (!attempt) return { presetId, attemptId: null, status: 'NOT_STARTED' as const, score: null, maxScore: null };
    const done = attempt.status !== 'IN_PROGRESS';
    return {
      presetId,
      attemptId: attempt.id as string,
      status: done ? 'DONE' as const : 'IN_PROGRESS' as const,
      score: done && attempt.score_raw != null ? Number(attempt.score_raw) : null,
      maxScore: done && attempt.max_score != null ? Number(attempt.max_score) : null,
    };
  }));
}

/** The viewer's attempt at a given daily quiz, if any (latest first). */
export async function dailyAttemptFor(testId: string, viewer: { user: { id: string } | null; guestToken: string | null }) {
  if (!viewer.user && !viewer.guestToken) return null;
  let q = supabaseAdmin().from('attempts').select('id, status, score_raw, max_score').eq('test_id', testId);
  q = viewer.user ? q.eq('user_id', viewer.user.id) : q.eq('guest_token', viewer.guestToken!).is('user_id', null);
  const { data } = await q.order('created_at', { ascending: false }).limit(1);
  return data?.[0] ?? null;
}
