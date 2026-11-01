import 'server-only';
import { createHash, randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Viewer } from '@/lib/auth';
import { generateShuffledPaper, type PaperOrder } from '../shuffle';
import { hasValue, isConsistentWrite, isScoredStatus } from '../palette';
import { scoreResponse } from '../scoring';
import { sectionAccess } from '../sectionLock';
import { estimateRank, type ReferenceRow } from '../rank';
import { median, summariseAttempt, tagMistake, type ChapterHistory, type MistakeInput, type MistakeTag } from '../mistakes';
import { istDate } from '../istDate';
import { recordDailyCompletion } from './daily';
import { bookmarkedIds, recordReview } from './revision';
import type {
  AttemptMode,
  ChapterBreakdown,
  Language,
  PaletteStatus,
  ScoreBreakdown,
  SectionBreakdown,
  VersionSection,
} from '../types';
import {
  buildPaperQuestions,
  getTestBundleById,
  loadKeys,
  loadQuestions,
  ruleFor,
  type TestBundle,
} from './content';
import { keyFromRow, type AttemptRow, type QuestionRow, type ResponseRow } from './rows';

import { AttemptError } from './errors';

export { AttemptError };

const WRITE_GRACE_MS = 30_000;
const COHORT_THRESHOLD = Number(process.env.RANK_COHORT_THRESHOLD || 30);

export function guestDailyLimit(): number {
  return Number(process.env.GUEST_DAILY_LIMIT || 5);
}

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash('sha256').update(ip + (process.env.IP_HASH_SALT || 'counselpro')).digest('hex').slice(0, 32);
}

export function ownsAttempt(attempt: Pick<AttemptRow, 'user_id' | 'guest_token'>, viewer: Viewer): boolean {
  if (attempt.user_id) return viewer.user?.id === attempt.user_id;
  return !!viewer.guestToken && attempt.guest_token === viewer.guestToken;
}

function remainingSeconds(attempt: Pick<AttemptRow, 'ends_at'>, now = Date.now()): number | null {
  if (!attempt.ends_at) return null;
  return Math.max(0, Math.floor((new Date(attempt.ends_at).getTime() - now) / 1000));
}

function isExpired(attempt: Pick<AttemptRow, 'ends_at'>, graceMs = 0): boolean {
  return !!attempt.ends_at && Date.now() > new Date(attempt.ends_at).getTime() + graceMs;
}

async function getAttemptRow(attemptId: string): Promise<AttemptRow | null> {
  const { data, error } = await supabaseAdmin().from('attempts').select('*').eq('id', attemptId).maybeSingle();
  if (error) throw error;
  return (data as AttemptRow) ?? null;
}

async function getOwnedAttempt(attemptId: string, viewer: Viewer): Promise<AttemptRow> {
  const attempt = await getAttemptRow(attemptId);
  if (!attempt || !ownsAttempt(attempt, viewer)) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  return attempt;
}

function sectionsOf(bundle: TestBundle): VersionSection[] {
  return bundle.version.sections;
}

// ---------------------------------------------------------------- start

export interface StartAttemptInput {
  testId: string;
  viewer: Viewer;
  ip: string | null;
  language?: Language;
  challengeToken?: string | null;
}

/** Scheduled (weekly) tests: solutions stay hidden until the window closes. */
export function solutionsLockedUntil(test: Pick<TestBundle['test'], 'window_end_at'>, now = Date.now()): string | null {
  return test.window_end_at && new Date(test.window_end_at).getTime() > now ? test.window_end_at : null;
}

export function modeForKind(kind: TestBundle['test']['kind']): AttemptMode {
  return kind === 'QUIZ' ? 'PRACTICE' : 'EXAM';
}

export async function startAttempt(input: StartAttemptInput): Promise<string> {
  const db = supabaseAdmin();
  const bundle = await getTestBundleById(input.testId);
  if (!bundle || (bundle.test.status !== 'PUBLISHED' && !bundle.test.is_practice)) {
    throw new AttemptError(404, 'NOT_FOUND', 'Test not found');
  }
  const { test, version, preset } = bundle;
  const { user, guestToken } = input.viewer;
  const mode = modeForKind(test.kind);

  if (!user) {
    if (!test.guest_allowed) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Please sign in to take this test');
    if (!guestToken) throw new AttemptError(400, 'NO_GUEST', 'Guest session missing');
  }
  if (test.window_start_at && Date.now() < new Date(test.window_start_at).getTime()) {
    throw new AttemptError(403, 'NOT_OPEN', 'This test has not opened yet');
  }
  const insideWindow = !test.window_end_at || Date.now() <= new Date(test.window_end_at).getTime();

  let challengeToken: string | null = null;
  if (input.challengeToken) {
    const { data: ch } = await db.from('challenges').select('token, test_id').eq('token', input.challengeToken).maybeSingle();
    if (ch && ch.test_id === test.id) challengeToken = ch.token as string;
  }

  // Resume an unfinished attempt instead of starting a second one
  let existingQuery = db.from('attempts').select('*').eq('test_id', test.id).eq('status', 'IN_PROGRESS');
  existingQuery = user ? existingQuery.eq('user_id', user.id) : existingQuery.eq('guest_token', guestToken!).is('user_id', null);
  const { data: existing, error: exErr } = await existingQuery.order('created_at', { ascending: false }).limit(1);
  if (exErr) throw exErr;
  if (existing && existing.length > 0) {
    const open = existing[0] as AttemptRow;
    if (!isExpired(open)) return open.id;
    await finalizeAttempt(open.id, true);
  }

  const ipHash = hashIp(input.ip);
  if (!user) {
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const limit = guestDailyLimit();
    const [{ count: byToken }, { count: byIp }] = await Promise.all([
      db.from('attempts').select('id', { count: 'exact', head: true }).eq('guest_token', guestToken!).gte('created_at', since),
      ipHash
        ? db.from('attempts').select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).is('user_id', null).gte('created_at', since)
        : Promise.resolve({ count: 0 }),
    ]);
    if ((byToken ?? 0) >= limit || (byIp ?? 0) >= limit * 3) {
      throw new AttemptError(429, 'GUEST_LIMIT', 'Free guest limit reached for today. Sign in to keep practising.');
    }
  }

  let priorQuery = db.from('attempts').select('id', { count: 'exact', head: true }).eq('test_id', test.id);
  priorQuery = user ? priorQuery.eq('user_id', user.id) : priorQuery.eq('guest_token', guestToken!);
  const { count: prior } = await priorQuery;
  const attemptNumber = (prior ?? 0) + 1;

  const questionIds = sectionsOf(bundle).flatMap((s) => s.questionIds);
  const { questions, translations } = await loadQuestions(questionIds);
  const questionById = new Map(questions.map((q) => [q.id, q]));
  const optionIdsByQuestion = new Map<string, string[]>();
  for (const t of translations) {
    if (!optionIdsByQuestion.has(t.question_id) || t.language === 'en') {
      optionIdsByQuestion.set(t.question_id, t.options.map((o) => o.id));
    }
  }

  const seed = randomUUID();
  const paper = generateShuffledPaper(
    seed,
    sectionsOf(bundle).map((s) => ({
      id: s.id,
      keepOrder: test.kind === 'QUIZ' && test.is_practice ? false : undefined,
      questions: s.questionIds.filter((id) => questionById.has(id)).map((id) => {
        const q = questionById.get(id)!;
        return {
          id,
          groupId: q.group_id,
          optionIds: q.type === 'NUMERICAL' ? [] : optionIdsByQuestion.get(id) ?? [],
          shuffleOptions: q.shuffle_options,
        };
      }),
    })),
  );

  const language: Language = input.language && preset.languages.includes(input.language) ? input.language : 'en';
  const now = new Date();
  // duration 0 = untimed practice
  const timed = version.duration_seconds > 0;
  const { data: created, error } = await db
    .from('attempts')
    .insert({
      user_id: user?.id ?? null,
      guest_token: user ? null : guestToken,
      test_id: test.id,
      test_version_id: version.id,
      attempt_number: attemptNumber,
      mode,
      status: 'IN_PROGRESS',
      language,
      seed,
      paper_order: paper,
      started_at: now.toISOString(),
      ends_at: timed ? new Date(now.getTime() + version.duration_seconds * 1000).toISOString() : null,
      counts_as_rank: attemptNumber === 1 && mode === 'EXAM' && test.kind === 'FULL_MOCK' && insideWindow,
      ip_hash: ipHash,
      challenge_token: challengeToken,
    })
    .select('id')
    .single();
  if (error) throw error;

  const responseRows = paper.sections.flatMap((s) => s.questionIds).map((qid) => ({
    attempt_id: created.id,
    question_id: qid,
  }));
  if (responseRows.length > 0) {
    const { error: rErr } = await db.from('attempt_responses').insert(responseRows);
    if (rErr) throw rErr;
  }
  return created.id as string;
}

// ---------------------------------------------------------------- terminal view

export async function getAttemptForTaking(attemptId: string, viewer: Viewer) {
  let attempt = await getOwnedAttempt(attemptId, viewer);
  if (attempt.status === 'IN_PROGRESS' && isExpired(attempt)) {
    await finalizeAttempt(attempt.id, true);
    attempt = (await getAttemptRow(attempt.id))!;
  }
  const bundle = await getTestBundleById(attempt.test_id, attempt.test_version_id);
  if (!bundle) throw new AttemptError(404, 'NOT_FOUND', 'Test not found');
  if (attempt.status !== 'IN_PROGRESS') return { attempt, bundle, paper: null };

  const order = attempt.paper_order;
  const questionIds = order.sections.flatMap((s) => s.questionIds);
  const [{ questions, translations }, { data: responses, error }] = await Promise.all([
    loadQuestions(questionIds),
    supabaseAdmin()
      .from('attempt_responses')
      .select('question_id, status, selected_option_ids, numerical_input, seq, time_spent_ms')
      .eq('attempt_id', attempt.id),
  ]);
  if (error) throw error;

  const paperQuestions = buildPaperQuestions(bundle.version, questions, translations, order.optionOrder);
  const sectionMeta = new Map(bundle.version.sections.map((s) => [s.id, s]));
  return {
    attempt,
    bundle,
    paper: {
      sections: order.sections.map((s) => ({
        id: s.id,
        name: sectionMeta.get(s.id)?.name ?? s.id,
        subject: sectionMeta.get(s.id)?.subject ?? s.id,
        questionIds: s.questionIds,
        attemptLimit: sectionMeta.get(s.id)?.attemptLimit ?? null,
      })),
      questions: paperQuestions,
      responses: (responses as Pick<ResponseRow, 'question_id' | 'status' | 'selected_option_ids' | 'numerical_input' | 'seq' | 'time_spent_ms'>[]),
    },
  };
}

// ---------------------------------------------------------------- writes

export interface ResponseWrite {
  seq: number;
  status: PaletteStatus;
  selectedOptionIds: string[];
  numericalInput: string | null;
  timeSpentDeltaMs: number;
  visited?: boolean;
}

export interface PracticeReveal {
  outcome: string;
  marks: number;
  correctOptionIds: string[];
  numericalAnswer: string | null;
  solutionHtml: string | null;
}

function numericalAnswerText(key: ReturnType<typeof keyFromRow>): string | null {
  if (key.numericalMin != null && key.numericalMax != null) return `${key.numericalMin} to ${key.numericalMax}`;
  return key.numericalExact != null ? String(key.numericalExact) : null;
}

export async function saveResponse(attemptId: string, questionId: string, viewer: Viewer, write: ResponseWrite) {
  const db = supabaseAdmin();
  const attempt = await getOwnedAttempt(attemptId, viewer);
  if (attempt.status !== 'IN_PROGRESS') throw new AttemptError(409, 'SUBMITTED', 'This test has already been submitted');
  if (isExpired(attempt, WRITE_GRACE_MS)) {
    await finalizeAttempt(attempt.id, true);
    throw new AttemptError(409, 'EXPIRED', 'Time is up. Your test was submitted.');
  }

  const sectionId = attempt.paper_order.sections.find((s) => s.questionIds.includes(questionId))?.id;
  if (!sectionId) throw new AttemptError(400, 'INVALID', 'Question is not part of this test');

  const [{ data: question, error: qErr }, { data: existing, error: eErr }, bundle] = await Promise.all([
    db.from('questions').select('id, type').eq('id', questionId).single(),
    db.from('attempt_responses').select('*').eq('attempt_id', attemptId).eq('question_id', questionId).single(),
    getTestBundleById(attempt.test_id, attempt.test_version_id),
  ]);
  if (qErr || eErr || !bundle) throw new AttemptError(400, 'INVALID', 'Question is not part of this test');
  const q = question as Pick<QuestionRow, 'id' | 'type'>;
  const prev = existing as ResponseRow;

  const value = {
    selectedOptionIds: Array.from(new Set(write.selectedOptionIds ?? [])).map(String),
    numericalInput: write.numericalInput == null ? null : String(write.numericalInput).trim().slice(0, 32),
  };
  if (q.type === 'NUMERICAL') value.selectedOptionIds = [];
  else value.numericalInput = null;

  const allowedOptions = attempt.paper_order.optionOrder[questionId] ?? [];
  if (value.selectedOptionIds.some((id) => !allowedOptions.includes(id))) {
    throw new AttemptError(400, 'INVALID', 'Unknown option');
  }
  if (q.type !== 'MULTI_MCQ' && value.selectedOptionIds.length > 1) {
    throw new AttemptError(400, 'INVALID', 'Only one option can be selected');
  }
  if (!isConsistentWrite(q.type, write.status, value) || (write.status === 'NOT_VISITED')) {
    throw new AttemptError(400, 'INVALID', 'Response status does not match the answer');
  }

  if (attempt.mode === 'EXAM' && attempt.ends_at) {
    const access = sectionAccess(bundle.version.sectional_lock, sectionId, remainingSeconds(attempt) ?? 0);
    if (access !== 'OPEN') throw new AttemptError(409, 'SECTION_LOCKED', 'This section is locked');
  }

  if (attempt.mode === 'PRACTICE' && isScoredStatus(prev.status)) {
    throw new AttemptError(409, 'ALREADY_ANSWERED', 'This question has already been answered');
  }

  const section = bundle.version.sections.find((s) => s.id === sectionId);
  if (section?.attemptLimit && isScoredStatus(write.status) && !isScoredStatus(prev.status)) {
    const { count } = await db
      .from('attempt_responses')
      .select('question_id', { count: 'exact', head: true })
      .eq('attempt_id', attemptId)
      .in('question_id', section.questionIds)
      .in('status', ['ANSWERED', 'ANSWERED_AND_MARKED']);
    if ((count ?? 0) >= section.attemptLimit) {
      throw new AttemptError(409, 'ATTEMPT_LIMIT', `You can answer only ${section.attemptLimit} questions in ${section.name}. Clear another answer first.`);
    }
  }

  const prevHadValue = hasValue(q.type, { selectedOptionIds: prev.selected_option_ids, numericalInput: prev.numerical_input });
  const changed = prevHadValue && (
    prev.numerical_input !== value.numericalInput
    || prev.selected_option_ids.length !== value.selectedOptionIds.length
    || prev.selected_option_ids.some((id) => !value.selectedOptionIds.includes(id))
  );

  const delta = Math.max(0, Math.min(Number(write.timeSpentDeltaMs) || 0, 15 * 60 * 1000));
  const { data: updated, error: uErr } = await db
    .from('attempt_responses')
    .update({
      status: write.status,
      selected_option_ids: value.selectedOptionIds,
      numerical_input: value.numericalInput,
      time_spent_ms: prev.time_spent_ms + delta,
      visit_count: prev.visit_count + (write.visited ? 1 : 0),
      answer_changes: prev.answer_changes + (changed ? 1 : 0),
      seq: write.seq,
      updated_at: new Date().toISOString(),
    })
    .eq('attempt_id', attemptId)
    .eq('question_id', questionId)
    .lt('seq', write.seq)
    .select('question_id');
  if (uErr) throw uErr;
  const stale = !updated || updated.length === 0;

  let reveal: PracticeReveal | null = null;
  if (attempt.mode === 'PRACTICE' && isScoredStatus(write.status) && !stale) {
    const [keys, { data: tr }] = await Promise.all([
      loadKeys([questionId]),
      db.from('question_translations').select('language, solution_html').eq('question_id', questionId),
    ]);
    const keyRow = keys.get(questionId);
    if (keyRow) {
      const key = keyFromRow(keyRow);
      const result = scoreResponse(q.type, key, write.status, value, ruleFor(q.type, section, bundle.version.marking));
      const translations = (tr ?? []) as { language: string; solution_html: string | null }[];
      const solution = translations.find((t) => t.language === attempt.language) ?? translations.find((t) => t.language === 'en');
      reveal = {
        outcome: result.outcome,
        marks: result.marks,
        correctOptionIds: key.correctOptionIds,
        numericalAnswer: numericalAnswerText(key),
        solutionHtml: solution?.solution_html ?? null,
      };
      // Practising a question that is on the student's revision list moves it along the review ladder
      if (attempt.user_id) await recordReview(attempt.user_id, questionId, result.outcome === 'CORRECT');
    }
  }

  return { ok: true, stale, remainingSeconds: remainingSeconds(attempt), reveal };
}

export async function heartbeat(attemptId: string, viewer: Viewer, integrityDelta: Record<string, number>) {
  const attempt = await getOwnedAttempt(attemptId, viewer);
  if (attempt.status !== 'IN_PROGRESS') return { status: attempt.status, remainingSeconds: 0 };
  if (isExpired(attempt)) {
    await finalizeAttempt(attempt.id, true);
    return { status: 'AUTO_SUBMITTED', remainingSeconds: 0 };
  }

  const allowed = ['tabBlur', 'fullscreenExit', 'copyAttempt', 'shortcutBlocked'];
  const entries = Object.entries(integrityDelta || {}).filter(([k, v]) => allowed.includes(k) && Number(v) > 0);
  if (entries.length > 0) {
    const integrity = { ...attempt.integrity };
    for (const [k, v] of entries) integrity[k] = (integrity[k] ?? 0) + Math.min(Number(v), 1000);
    await supabaseAdmin().from('attempts').update({ integrity }).eq('id', attempt.id);
  }
  return { status: 'IN_PROGRESS', remainingSeconds: remainingSeconds(attempt), serverNow: Date.now(), endsAt: attempt.ends_at };
}

export async function submitAttempt(attemptId: string, viewer: Viewer) {
  const attempt = await getOwnedAttempt(attemptId, viewer);
  if (attempt.status === 'IN_PROGRESS') await finalizeAttempt(attempt.id, false);
  return { ok: true };
}

// ---------------------------------------------------------------- scoring

async function latestReference(presetId: string): Promise<{ rows: ReferenceRow[]; isSample: boolean } | null> {
  const { data } = await supabaseAdmin()
    .from('rank_reference')
    .select('rows, is_sample')
    .eq('preset_id', presetId)
    .order('created_at', { ascending: false })
    .limit(1);
  if (!data || data.length === 0) return null;
  return { rows: data[0].rows as ReferenceRow[], isSample: data[0].is_sample as boolean };
}

/** Scores and closes an attempt. Safe to call repeatedly; only the first call writes. */
export async function finalizeAttempt(attemptId: string, auto: boolean): Promise<void> {
  const db = supabaseAdmin();
  const attempt = await getAttemptRow(attemptId);
  if (!attempt || attempt.status !== 'IN_PROGRESS') return;

  const bundle = await getTestBundleById(attempt.test_id, attempt.test_version_id);
  if (!bundle) return;
  const order: PaperOrder = attempt.paper_order;
  const questionIds = order.sections.flatMap((s) => s.questionIds);

  const [{ data: responses, error: rErr }, { data: questions, error: qErr }, keys] = await Promise.all([
    db.from('attempt_responses').select('*').eq('attempt_id', attemptId),
    db.from('questions').select('id, type, subject, chapter').in('id', questionIds),
    loadKeys(questionIds),
  ]);
  if (rErr) throw rErr;
  if (qErr) throw qErr;

  const responseById = new Map((responses as ResponseRow[]).map((r) => [r.question_id, r]));
  const questionById = new Map((questions as Pick<QuestionRow, 'id' | 'type' | 'subject' | 'chapter'>[]).map((q) => [q.id, q]));
  const versionSections = new Map(bundle.version.sections.map((s) => [s.id, s]));

  const breakdown: ScoreBreakdown = {
    score: 0, maxScore: 0, attempted: 0, correct: 0, partial: 0, wrong: 0, unattempted: 0,
    negativeMarksLost: 0, timeUsedSeconds: 0, sections: [], chapters: [],
  };
  const chapters = new Map<string, ChapterBreakdown>();
  const scoredRows: { question_id: string; marks: number; outcome: string; mistake_tag?: MistakeTag | null }[] = [];
  const analysisInputs: { qid: string; number: number; chapterKey: string; wrongMarks: number; maxMarks: number; r: ResponseRow; outcome: MistakeInput['outcome']; marks: number }[] = [];
  let questionNumber = 0;

  for (const s of order.sections) {
    const meta = versionSections.get(s.id);
    const sec: SectionBreakdown = {
      id: s.id, name: meta?.name ?? s.id, subject: meta?.subject ?? s.id, score: 0, maxScore: 0,
      correct: 0, partial: 0, wrong: 0, unattempted: 0,
      answered: 0, notAnswered: 0, markedForReview: 0, answeredAndMarked: 0, notVisited: 0, timeSpentMs: 0,
    };
    for (const qid of s.questionIds) {
      questionNumber++;
      const q = questionById.get(qid);
      const r = responseById.get(qid);
      const keyRow = keys.get(qid);
      if (!q || !r) continue;
      const rule = ruleFor(q.type, meta, bundle.version.marking);
      const result = keyRow
        ? scoreResponse(q.type, keyFromRow(keyRow), r.status, { selectedOptionIds: r.selected_option_ids, numericalInput: r.numerical_input }, rule)
        : { marks: 0, outcome: 'UNATTEMPTED' as const };
      scoredRows.push({ question_id: qid, marks: result.marks, outcome: result.outcome });
      analysisInputs.push({
        qid, number: questionNumber, chapterKey: `${q.subject}::${q.chapter}`, wrongMarks: rule.wrong, maxMarks: rule.correct,
        r, outcome: result.outcome, marks: result.marks,
      });

      sec.score += result.marks;
      sec.maxScore += rule.correct;
      sec.timeSpentMs += r.time_spent_ms;
      if (result.outcome === 'CORRECT') sec.correct++;
      else if (result.outcome === 'PARTIAL') sec.partial++;
      else if (result.outcome === 'WRONG') sec.wrong++;
      else sec.unattempted++;
      if (result.marks < 0) breakdown.negativeMarksLost += -result.marks;

      if (r.status === 'ANSWERED') sec.answered++;
      else if (r.status === 'NOT_ANSWERED') sec.notAnswered++;
      else if (r.status === 'MARKED_FOR_REVIEW') sec.markedForReview++;
      else if (r.status === 'ANSWERED_AND_MARKED') sec.answeredAndMarked++;
      else sec.notVisited++;

      const chapterKey = `${q.subject}::${q.chapter}`;
      const ch = chapters.get(chapterKey) ?? { subject: q.subject, chapter: q.chapter, total: 0, attempted: 0, correct: 0, marks: 0, maxMarks: 0 };
      ch.total++;
      if (result.outcome !== 'UNATTEMPTED') ch.attempted++;
      if (result.outcome === 'CORRECT') ch.correct++;
      ch.marks += result.marks;
      ch.maxMarks += rule.correct;
      chapters.set(chapterKey, ch);
    }
    breakdown.sections.push(sec);
    breakdown.score += sec.score;
    breakdown.maxScore += sec.maxScore;
    breakdown.correct += sec.correct;
    breakdown.partial += sec.partial;
    breakdown.wrong += sec.wrong;
    breakdown.unattempted += sec.unattempted;
  }
  breakdown.attempted = breakdown.correct + breakdown.partial + breakdown.wrong;
  breakdown.chapters = Array.from(chapters.values());

  const submittedAt = auto && attempt.ends_at ? new Date(Math.min(Date.now(), new Date(attempt.ends_at).getTime())) : new Date();
  breakdown.timeUsedSeconds = Math.max(0, Math.round((submittedAt.getTime() - new Date(attempt.started_at).getTime()) / 1000));

  // Mistake analysis: compare with the student's own history and with other students' timing
  const [history, cohortMedians] = await Promise.all([
    loadChapterHistory(attempt),
    loadCohortMedians(questionIds, attempt.id),
  ]);
  const startMs = new Date(attempt.started_at).getTime();
  const spanMs = attempt.ends_at ? new Date(attempt.ends_at).getTime() - startMs : 0;
  const attemptMedianMs = median(analysisInputs.filter((a) => a.outcome !== 'UNATTEMPTED').map((a) => a.r.time_spent_ms));
  const mistakeCtx = { attemptMedianMs, autoSubmitted: auto, timed: spanMs > 0 };
  const analysisItems = analysisInputs.map((a) => {
    const tag = tagMistake({
      outcome: a.outcome,
      timeSpentMs: a.r.time_spent_ms,
      visitCount: a.r.visit_count,
      answerChanges: a.r.answer_changes,
      lastTouchedFraction: spanMs > 0 && a.r.seq > 0 ? Math.min(1, (new Date(a.r.updated_at).getTime() - startMs) / spanMs) : null,
      cohortMedianMs: cohortMedians.get(a.qid) ?? null,
      history: history.get(a.chapterKey) ?? null,
    }, mistakeCtx);
    const row = scoredRows.find((s) => s.question_id === a.qid);
    if (row) row.mistake_tag = tag;
    return { number: a.number, outcome: a.outcome, marks: a.marks, maxMarks: a.maxMarks, wrongMarks: a.wrongMarks, timeSpentMs: a.r.time_spent_ms, tag };
  });
  const analysis = summariseAttempt(analysisItems);

  let rank: ReturnType<typeof estimateRank> = null;
  if (attempt.mode === 'EXAM' && bundle.test.kind === 'FULL_MOCK' && breakdown.maxScore > 0) {
    const scale = bundle.preset.totalMarks / breakdown.maxScore;
    const [{ data: cohort }, reference] = await Promise.all([
      db.from('attempts').select('score_raw, max_score').eq('test_id', attempt.test_id).eq('counts_as_rank', true)
        .in('status', ['SUBMITTED', 'AUTO_SUBMITTED']).limit(20000),
      latestReference(bundle.preset.id),
    ]);
    const cohortScores = ((cohort ?? []) as { score_raw: number; max_score: number }[])
      .filter((c) => Number(c.max_score) > 0)
      .map((c) => (Number(c.score_raw) * bundle.preset.totalMarks) / Number(c.max_score));
    if (attempt.counts_as_rank) cohortScores.push(breakdown.score * scale);
    rank = estimateRank({
      score: breakdown.score * scale,
      cohortScores,
      cohortThreshold: COHORT_THRESHOLD,
      referenceRows: reference?.rows ?? null,
      referenceIsSample: reference?.isSample ?? true,
      registrations: bundle.preset.registrationsCount,
    });
  }

  const { data: closed, error: closeErr } = await db
    .from('attempts')
    .update({
      status: auto ? 'AUTO_SUBMITTED' : 'SUBMITTED',
      submitted_at: submittedAt.toISOString(),
      score_raw: breakdown.score,
      max_score: breakdown.maxScore,
      score_breakdown: breakdown,
      analysis,
      percentile_est: rank?.percentile ?? null,
      rank_low: rank?.rankLow ?? null,
      rank_high: rank?.rankHigh ?? null,
      rank_confidence: rank?.confidence ?? null,
      rank_method: rank?.method ?? null,
      rank_is_sample: rank?.isSampleReference ?? null,
    })
    .eq('id', attemptId)
    .eq('status', 'IN_PROGRESS')
    .select('id');
  if (closeErr) throw closeErr;
  if (!closed || closed.length === 0) return;

  if (scoredRows.length > 0) {
    // Rows already exist, so this only updates marks/outcome
    const { error: markErr } = await db
      .from('attempt_responses')
      .upsert(scoredRows.map((r) => ({ attempt_id: attemptId, ...r })), { onConflict: 'attempt_id,question_id' });
    if (markErr) console.error('Saving per-question marks failed:', markErr.message);
  }

  // Daily quiz finished on its own day keeps the streak going
  if (bundle.test.is_daily && attempt.user_id && bundle.test.daily_date === istDate(submittedAt)) {
    await recordDailyCompletion(attempt.user_id, bundle.test.daily_date);
  }
}

/** Per-chapter accuracy from the student's earlier attempts (last 30). */
async function loadChapterHistory(attempt: AttemptRow): Promise<Map<string, ChapterHistory>> {
  const db = supabaseAdmin();
  let q = db.from('attempts').select('id').neq('id', attempt.id).in('status', ['SUBMITTED', 'AUTO_SUBMITTED']);
  q = attempt.user_id ? q.eq('user_id', attempt.user_id) : q.eq('guest_token', attempt.guest_token!);
  const { data: prior } = await q.order('created_at', { ascending: false }).limit(30);
  const map = new Map<string, ChapterHistory>();
  if (!prior || prior.length === 0) return map;
  const { data: rows } = await db
    .from('attempt_responses')
    .select('question_id, outcome')
    .in('attempt_id', prior.map((p) => p.id as string))
    .in('outcome', ['CORRECT', 'PARTIAL', 'WRONG'])
    .limit(5000);
  if (!rows || rows.length === 0) return map;
  const ids = Array.from(new Set(rows.map((r) => r.question_id as string)));
  const { data: qs } = await db.from('questions').select('id, subject, chapter').in('id', ids);
  const chapterOf = new Map((qs ?? []).map((x) => [x.id as string, `${x.subject}::${x.chapter}`]));
  for (const r of rows) {
    const key = chapterOf.get(r.question_id as string);
    if (!key) continue;
    const h = map.get(key) ?? { attempted: 0, correct: 0 };
    h.attempted++;
    if (r.outcome === 'CORRECT') h.correct++;
    map.set(key, h);
  }
  return map;
}

/** Median time other students spent on each question (only when there is enough data). */
async function loadCohortMedians(questionIds: string[], excludeAttemptId: string): Promise<Map<string, number>> {
  const { data } = await supabaseAdmin()
    .from('attempt_responses')
    .select('question_id, time_spent_ms')
    .in('question_id', questionIds)
    .neq('attempt_id', excludeAttemptId)
    .in('outcome', ['CORRECT', 'PARTIAL', 'WRONG'])
    .limit(20000);
  const byQuestion = new Map<string, number[]>();
  for (const r of data ?? []) {
    const list = byQuestion.get(r.question_id as string) ?? [];
    list.push(Number(r.time_spent_ms));
    byQuestion.set(r.question_id as string, list);
  }
  const out = new Map<string, number>();
  byQuestion.forEach((times, qid) => { if (times.length >= 8) out.set(qid, median(times)); });
  return out;
}

// ---------------------------------------------------------------- results

export interface ResultItem {
  number: number;
  questionId: string;
  sectionId: string;
  sectionName: string;
  subject: string;
  chapter: string;
  type: QuestionRow['type'];
  status: PaletteStatus;
  outcome: string;
  marks: number;
  maxMarks: number;
  timeSpentMs: number;
  visitCount: number;
  answerChanges: number;
  yourAnswer: string;
  correctAnswer: string;
  passageHtml: string | null;
  stemHtml: string;
  options: { letter: string; html: string; isCorrect: boolean; isSelected: boolean }[];
  solutionHtml: string | null;
  mistakeTag: MistakeTag | null;
  bookmarked: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export async function getAttemptResult(attemptId: string, viewer: Viewer) {
  let attempt = await getOwnedAttempt(attemptId, viewer);
  if (attempt.status === 'IN_PROGRESS') {
    if (!isExpired(attempt)) return { inProgress: true as const, attempt };
    await finalizeAttempt(attempt.id, true);
    attempt = (await getAttemptRow(attempt.id))!;
  }
  const bundle = await getTestBundleById(attempt.test_id, attempt.test_version_id);
  if (!bundle) throw new AttemptError(404, 'NOT_FOUND', 'Test not found');

  const order = attempt.paper_order;
  const questionIds = order.sections.flatMap((s) => s.questionIds);
  const db = supabaseAdmin();
  const [{ questions, translations }, keys, { data: responses, error }] = await Promise.all([
    loadQuestions(questionIds),
    loadKeys(questionIds),
    db.from('attempt_responses').select('*').eq('attempt_id', attempt.id),
  ]);
  if (error) throw error;

  const questionById = new Map(questions.map((q) => [q.id, q]));
  const responseById = new Map((responses as ResponseRow[]).map((r) => [r.question_id, r]));
  const versionSections = new Map(bundle.version.sections.map((s) => [s.id, s]));
  // Weekly mocks: answers and solutions stay hidden until the window closes
  const lockedUntil = solutionsLockedUntil(bundle.test);
  const saved = attempt.user_id ? await bookmarkedIds(attempt.user_id, questionIds) : new Set<string>();
  const pickTranslation = (qid: string) => {
    const list = translations.filter((t) => t.question_id === qid);
    return list.find((t) => t.language === attempt.language) ?? list.find((t) => t.language === 'en') ?? list[0];
  };

  const items: ResultItem[] = [];
  let n = 0;
  for (const s of order.sections) {
    const meta = versionSections.get(s.id);
    for (const qid of s.questionIds) {
      n++;
      const q = questionById.get(qid);
      const r = responseById.get(qid);
      const t = pickTranslation(qid);
      const keyRow = keys.get(qid);
      if (!q || !r || !t) continue;
      const key = keyRow && !lockedUntil ? keyFromRow(keyRow) : null;
      const optionIds = order.optionOrder[qid] ?? t.options.map((o) => o.id);
      const options = optionIds.map((id, i) => {
        const opt = t.options.find((o) => o.id === id);
        return {
          letter: LETTERS[i],
          html: opt?.html ?? '',
          isCorrect: !!key?.correctOptionIds.includes(id),
          isSelected: isScoredStatus(r.status) && r.selected_option_ids.includes(id),
        };
      });
      const rule = ruleFor(q.type, meta, bundle.version.marking);
      items.push({
        number: n,
        questionId: qid,
        sectionId: s.id,
        sectionName: meta?.name ?? s.id,
        subject: q.subject,
        chapter: q.chapter,
        type: q.type,
        status: r.status,
        outcome: r.outcome ?? 'UNATTEMPTED',
        marks: Number(r.marks ?? 0),
        maxMarks: rule.correct,
        timeSpentMs: r.time_spent_ms,
        visitCount: r.visit_count,
        answerChanges: r.answer_changes,
        yourAnswer: q.type === 'NUMERICAL'
          ? (isScoredStatus(r.status) ? r.numerical_input ?? '—' : '—')
          : options.filter((o) => o.isSelected).map((o) => o.letter).join(', ') || '—',
        correctAnswer: q.type === 'NUMERICAL'
          ? (key ? numericalAnswerText(key) ?? '—' : '—')
          : options.filter((o) => o.isCorrect).map((o) => o.letter).join(', ') || '—',
        passageHtml: t.passage_html,
        stemHtml: t.stem_html,
        options: q.type === 'NUMERICAL' ? [] : options,
        solutionHtml: lockedUntil ? null : t.solution_html,
        mistakeTag: lockedUntil ? null : r.mistake_tag ?? null,
        bookmarked: saved.has(qid),
      });
    }
  }

  let previousScore: number | null = null;
  if (attempt.attempt_number > 1) {
    let prevQuery = db.from('attempts').select('score_raw').eq('test_id', attempt.test_id)
      .in('status', ['SUBMITTED', 'AUTO_SUBMITTED']).lt('created_at', attempt.created_at);
    prevQuery = attempt.user_id ? prevQuery.eq('user_id', attempt.user_id) : prevQuery.eq('guest_token', attempt.guest_token!);
    const { data: prev } = await prevQuery.order('created_at', { ascending: false }).limit(1);
    if (prev && prev.length > 0) previousScore = Number(prev[0].score_raw);
  }

  return { inProgress: false as const, attempt, bundle, items, previousScore, lockedUntil };
}

export function serverNow(): number {
  return Date.now();
}

/** The viewer's unfinished, still-running attempt for a test, if any. */
export async function findOpenAttempt(testId: string, viewer: Viewer): Promise<string | null> {
  if (!viewer.user && !viewer.guestToken) return null;
  let q = supabaseAdmin().from('attempts').select('id, ends_at').eq('test_id', testId).eq('status', 'IN_PROGRESS');
  q = viewer.user ? q.eq('user_id', viewer.user.id) : q.eq('guest_token', viewer.guestToken!).is('user_id', null);
  const { data } = await q.order('created_at', { ascending: false }).limit(1);
  const open = data?.[0];
  return open && !isExpired(open) ? (open.id as string) : null;
}

// ---------------------------------------------------------------- my tests

export async function listMyAttempts(viewer: Viewer) {
  const db = supabaseAdmin();
  let query = db
    .from('attempts')
    .select('id, test_id, status, mode, attempt_number, started_at, ends_at, submitted_at, score_raw, max_score, percentile_est, created_at')
    .order('created_at', { ascending: false })
    .limit(100);
  if (viewer.user) query = query.eq('user_id', viewer.user.id);
  else if (viewer.guestToken) query = query.eq('guest_token', viewer.guestToken).is('user_id', null);
  else return [];
  const { data, error } = await query;
  if (error) throw error;
  const attempts = (data ?? []) as Pick<AttemptRow, 'id' | 'test_id' | 'status' | 'mode' | 'attempt_number' | 'started_at' | 'ends_at' | 'submitted_at' | 'score_raw' | 'max_score' | 'percentile_est' | 'created_at'>[];
  if (attempts.length === 0) return [];

  const testIds = Array.from(new Set(attempts.map((a) => a.test_id)));
  const { data: tests } = await db.from('tests').select('id, slug, title, kind, preset_id, is_practice').in('id', testIds);
  const testById = new Map((tests ?? []).map((t) => [t.id as string, t]));

  return attempts.map((a) => {
    const expired = a.status === 'IN_PROGRESS' && isExpired(a);
    return {
      ...a,
      expired,
      remainingSeconds: a.status === 'IN_PROGRESS' ? remainingSeconds(a) : null,
      test: testById.get(a.test_id) as { id: string; slug: string; title: string; kind: string; preset_id: string; is_practice: boolean } | undefined,
    };
  });
}

// ---------------------------------------------------------------- after login

export async function claimGuestAttempts(userId: string, guestToken: string): Promise<number> {
  const db = supabaseAdmin();
  const { data: claimed, error } = await db
    .from('attempts')
    .update({ user_id: userId })
    .eq('guest_token', guestToken)
    .is('user_id', null)
    .select('id, test_id, counts_as_rank, created_at');
  if (error) throw error;
  const rows = (claimed ?? []) as Pick<AttemptRow, 'id' | 'test_id' | 'counts_as_rank' | 'created_at'>[];

  // Keep only the user's first attempt per test in the rank cohort
  for (const testId of new Set(rows.filter((r) => r.counts_as_rank).map((r) => r.test_id))) {
    const { data: ranked } = await db
      .from('attempts')
      .select('id, created_at')
      .eq('user_id', userId)
      .eq('test_id', testId)
      .eq('counts_as_rank', true)
      .order('created_at');
    const extra = (ranked ?? []).slice(1).map((r) => r.id as string);
    if (extra.length > 0) await db.from('attempts').update({ counts_as_rank: false }).in('id', extra);
  }
  return rows.length;
}
