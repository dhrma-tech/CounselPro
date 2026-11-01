import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { addDays, istDate } from '../istDate';
import { nextReview } from '../spacedRepetition';
import { AttemptError } from './errors';
import { createQuizFromQuestions, fitQuestionsToPreset } from './practice';
import type { AttemptRow, ResponseRow } from './rows';

const MAX_SET = 25;

/** Wrong, skipped and marked questions of an attempt go on the student's revision list (due today). */
export async function addAttemptToRevision(userId: string, attemptId: string): Promise<string[]> {
  const db = supabaseAdmin();
  const { data: attempt } = await db.from('attempts').select('id, user_id, status').eq('id', attemptId).maybeSingle();
  if (!attempt || attempt.user_id !== userId) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  if (attempt.status === 'IN_PROGRESS') throw new AttemptError(409, 'IN_PROGRESS', 'Finish the test first');

  const { data: rows } = await db.from('attempt_responses').select('question_id, status, outcome').eq('attempt_id', attemptId);
  const picked = ((rows ?? []) as Pick<ResponseRow, 'question_id' | 'status' | 'outcome'>[])
    .filter((r) => r.outcome === 'WRONG' || r.outcome === 'PARTIAL' || r.outcome === 'UNATTEMPTED'
      || r.status === 'MARKED_FOR_REVIEW' || r.status === 'ANSWERED_AND_MARKED')
    .map((r) => r.question_id);
  if (picked.length === 0) return [];

  const today = istDate();
  const { data: existing } = await db.from('revision_items').select('question_id').eq('user_id', userId).in('question_id', picked);
  const have = new Set((existing ?? []).map((e) => e.question_id as string));
  const fresh = picked.filter((id) => !have.has(id)).map((question_id) => ({ user_id: userId, question_id, due_on: today, source: 'ATTEMPT' }));
  if (fresh.length > 0) await db.from('revision_items').insert(fresh);
  // Already-listed questions become due again today
  if (have.size > 0) {
    await db.from('revision_items').update({ due_on: today, updated_at: new Date().toISOString() })
      .eq('user_id', userId).in('question_id', Array.from(have));
  }
  return picked;
}

/** Saving needs proof the student has seen the question; removing your own item does not. */
export async function setBookmark(userId: string, questionId: string, on: boolean, viewerAttemptCheck: () => Promise<boolean>) {
  if (on && !(await viewerAttemptCheck())) throw new AttemptError(404, 'NOT_FOUND', 'Question not found');
  const db = supabaseAdmin();
  if (on) {
    const { data: existing } = await db.from('revision_items').select('question_id').eq('user_id', userId).eq('question_id', questionId).maybeSingle();
    if (existing) {
      await db.from('revision_items').update({ bookmarked: true, updated_at: new Date().toISOString() }).eq('user_id', userId).eq('question_id', questionId);
    } else {
      await db.from('revision_items').insert({ user_id: userId, question_id: questionId, due_on: addDays(istDate(), 1), source: 'BOOKMARK', bookmarked: true });
    }
  } else {
    await db.from('revision_items').delete().eq('user_id', userId).eq('question_id', questionId);
  }
}

/** Moves a revision item along the review ladder after it is practised. No-op for other questions. */
export async function recordReview(userId: string, questionId: string, correct: boolean) {
  const db = supabaseAdmin();
  const { data: item } = await db
    .from('revision_items')
    .select('interval_days, reps, lapses, due_on')
    .eq('user_id', userId)
    .eq('question_id', questionId)
    .maybeSingle();
  if (!item) return;
  const today = istDate();
  if (item.due_on > today) return; // practised early; keep the schedule
  const next = nextReview({ intervalDays: item.interval_days, reps: item.reps, lapses: item.lapses }, correct, today);
  await db.from('revision_items').update({
    interval_days: next.intervalDays,
    reps: next.reps,
    lapses: next.lapses,
    due_on: next.dueOn,
    last_result: next.lastResult,
    updated_at: new Date().toISOString(),
  }).eq('user_id', userId).eq('question_id', questionId);
}

export interface RevisionSummary {
  exam: string;
  dueToday: number;
  dueThisWeek: number;
  total: number;
  bookmarked: number;
}

export async function revisionSummary(userId: string): Promise<RevisionSummary[]> {
  const db = supabaseAdmin();
  const { data: items } = await db.from('revision_items').select('question_id, due_on, bookmarked').eq('user_id', userId).limit(5000);
  if (!items || items.length === 0) return [];
  const { data: qs } = await db.from('questions').select('id, exam').in('id', items.map((i) => i.question_id as string));
  const examOf = new Map((qs ?? []).map((q) => [q.id as string, q.exam as string]));
  const today = istDate();
  const weekEnd = addDays(today, 7);
  const byExam = new Map<string, RevisionSummary>();
  for (const i of items) {
    const exam = examOf.get(i.question_id as string);
    if (!exam) continue;
    const s = byExam.get(exam) ?? { exam, dueToday: 0, dueThisWeek: 0, total: 0, bookmarked: 0 };
    s.total++;
    if (i.due_on <= today) s.dueToday++;
    else if (i.due_on <= weekEnd) s.dueThisWeek++;
    if (i.bookmarked) s.bookmarked++;
    byExam.set(exam, s);
  }
  return Array.from(byExam.values()).sort((a, b) => b.dueToday - a.dueToday);
}

export interface SavedQuestion {
  questionId: string;
  exam: string;
  subject: string;
  chapter: string;
  stemHtml: string;
  dueOn: string;
}

/** Questions the student starred, newest first (English text where available). */
export async function listSavedQuestions(userId: string, limit = 50): Promise<SavedQuestion[]> {
  const db = supabaseAdmin();
  const { data: items } = await db.from('revision_items').select('question_id, due_on').eq('user_id', userId)
    .eq('bookmarked', true).order('created_at', { ascending: false }).limit(limit);
  const ids = (items ?? []).map((i) => i.question_id as string);
  if (ids.length === 0) return [];
  const [{ data: qs }, { data: ts }] = await Promise.all([
    db.from('questions').select('id, exam, subject, chapter').in('id', ids),
    db.from('question_translations').select('question_id, language, stem_html').in('question_id', ids),
  ]);
  const qById = new Map((qs ?? []).map((q) => [q.id as string, q]));
  const stem = (id: string) => {
    const list = (ts ?? []).filter((t) => t.question_id === id);
    return ((list.find((t) => t.language === 'en') ?? list[0])?.stem_html as string | undefined) ?? '';
  };
  return (items ?? []).flatMap((i) => {
    const q = qById.get(i.question_id as string);
    return q ? [{
      questionId: q.id as string,
      exam: q.exam as string,
      subject: q.subject as string,
      chapter: q.chapter as string,
      stemHtml: stem(q.id as string),
      dueOn: i.due_on as string,
    }] : [];
  });
}

export async function savedQuestionIds(userId: string, exam?: string): Promise<string[]> {
  const db = supabaseAdmin();
  const { data } = await db.from('revision_items').select('question_id').eq('user_id', userId).eq('bookmarked', true).limit(500);
  const ids = (data ?? []).map((d) => d.question_id as string);
  if (!exam || ids.length === 0) return ids;
  const { data: qs } = await db.from('questions').select('id').in('id', ids).eq('exam', exam);
  return (qs ?? []).map((q) => q.id as string);
}

/** Quiz from due items (or the given questions). Returns the new test id. */
export async function buildRevisionQuiz(userId: string, opts: { exam?: string; questionIds?: string[]; title?: string }): Promise<string> {
  const db = supabaseAdmin();
  let ids = opts.questionIds;
  if (!ids) {
    const { data: due } = await db.from('revision_items').select('question_id').eq('user_id', userId)
      .lte('due_on', istDate()).order('due_on').limit(200);
    ids = (due ?? []).map((d) => d.question_id as string);
  }
  if (ids.length === 0) throw new AttemptError(404, 'NOTHING_DUE', 'Nothing to revise right now');

  const { data: qs } = await db.from('questions').select('id, exam, subject, status').in('id', ids);
  const usable = (qs ?? []).filter((q) => q.status === 'APPROVED' && (!opts.exam || q.exam === opts.exam))
    .map((q) => ({ id: q.id as string, exam: q.exam as string, subject: q.subject as string }))
    .slice(0, MAX_SET);
  const fit = await fitQuestionsToPreset(usable);
  if (!fit) throw new AttemptError(404, 'NOTHING_DUE', 'Nothing to revise right now');
  return createQuizFromQuestions({
    presetId: fit.presetId,
    questionsBySection: fit.bySection,
    title: opts.title ?? `Revision: ${fit.count} question${fit.count === 1 ? '' : 's'}`,
    durationSeconds: 0,
  });
}

export async function bookmarkedIds(userId: string, questionIds: string[]): Promise<Set<string>> {
  if (questionIds.length === 0) return new Set();
  const { data } = await supabaseAdmin().from('revision_items').select('question_id').eq('user_id', userId)
    .eq('bookmarked', true).in('question_id', questionIds);
  return new Set((data ?? []).map((d) => d.question_id as string));
}

export function attemptHasQuestion(attempt: Pick<AttemptRow, 'paper_order' | 'status'>, questionId: string): boolean {
  return attempt.status !== 'IN_PROGRESS' && attempt.paper_order.sections.some((s) => s.questionIds.includes(questionId));
}
