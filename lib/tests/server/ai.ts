import 'server-only';
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Viewer } from '@/lib/auth';
import { AiUnavailableError, aiEnabled, geminiGenerate, geminiModel, htmlToText } from '@/lib/ai/gemini';
import { istInstant, istDate } from '../istDate';
import { isScoredStatus } from '../palette';
import { MISTAKE_LABELS, type MistakeTag } from '../mistakes';
import { AI_LANGUAGE_LABELS, type AiLanguage, type AiPlan, type AskMode } from '../aiTypes';
import { AttemptError } from './errors';
import { getTestBundleById } from './content';
import { keyFromRow, type AttemptRow, type KeyRow, type QuestionRow, type ResponseRow, type TranslationRow } from './rows';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function askDailyLimit(): number {
  return Number(process.env.AI_DAILY_LIMIT || 15);
}
const PLAN_DAILY_LIMIT = 5;

function isLanguage(v: unknown): v is AiLanguage {
  return v === 'en' || v === 'hi' || v === 'mr';
}

async function usedToday(userId: string, kind: 'ASK' | 'PLAN'): Promise<number> {
  const { count } = await supabaseAdmin()
    .from('ai_messages')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('kind', kind)
    .eq('cached', false)
    .gte('created_at', istInstant(istDate()).toISOString());
  return count ?? 0;
}

function systemPrompt(language: AiLanguage): string {
  const lang = language === 'en' ? 'simple English' : `${AI_LANGUAGE_LABELS[language]} (${language === 'hi' ? 'Hindi' : 'Marathi'}, Devanagari script; keep scientific terms and formulas in standard notation)`;
  return [
    'You are CounselPro\'s friendly tutor for Indian entrance exams (JEE, NEET, MHT-CET). The student is in Class 11-12.',
    `Reply in ${lang}.`,
    'Use short paragraphs or numbered steps. No markdown headings, no tables. Bold with **like this** only for key ideas.',
    'Write maths in LaTeX: \\( ... \\) inline and \\[ ... \\] for display. Keep the whole reply under 220 words.',
    'Use only the question, answer key and solution given. If the given answer key looks wrong, say so politely and suggest the student reports it.',
    'Never talk about anything other than this question.',
  ].join('\n');
}

const MODE_INSTRUCTIONS: Record<AskMode, string> = {
  EXPLAIN: 'Explain step by step why the correct answer is right, and why the most tempting wrong option is wrong.',
  WHY_WRONG: 'The student\'s answer is wrong. Kindly explain the most likely mistake behind their choice, then show the correct way.',
  STUCK: 'The student is completely stuck. Start from the basic idea in one or two lines with a simple everyday example, then solve slowly.',
  HINT: 'Give ONE short hint (at most 2 sentences) that points to the right idea or first step. Do NOT reveal the answer, the correct option or any final value.',
};

interface AskContext {
  attempt: AttemptRow;
  question: QuestionRow;
  translation: TranslationRow;
  key: ReturnType<typeof keyFromRow> | null;
  response: ResponseRow;
  optionOrder: string[];
}

async function loadAskContext(attemptId: string, questionId: string, viewer: Viewer): Promise<AskContext> {
  const db = supabaseAdmin();
  const { data: attempt } = await db.from('attempts').select('*').eq('id', attemptId).maybeSingle();
  const a = attempt as AttemptRow | null;
  if (!a || !viewer.user || a.user_id !== viewer.user.id) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  if (!a.paper_order.sections.some((s) => s.questionIds.includes(questionId))) throw new AttemptError(404, 'NOT_FOUND', 'Question not found');

  const [{ data: q }, { data: trs }, { data: k }, { data: r }] = await Promise.all([
    db.from('questions').select('*').eq('id', questionId).single(),
    db.from('question_translations').select('*').eq('question_id', questionId),
    db.from('question_keys').select('*').eq('question_id', questionId).maybeSingle(),
    db.from('attempt_responses').select('*').eq('attempt_id', attemptId).eq('question_id', questionId).single(),
  ]);
  const translations = (trs ?? []) as TranslationRow[];
  const translation = translations.find((t) => t.language === a.language) ?? translations.find((t) => t.language === 'en') ?? translations[0];
  if (!q || !translation || !r) throw new AttemptError(404, 'NOT_FOUND', 'Question not found');
  return {
    attempt: a,
    question: q as QuestionRow,
    translation,
    key: k ? keyFromRow(k as KeyRow) : null,
    response: r as ResponseRow,
    optionOrder: a.paper_order.optionOrder[questionId] ?? translation.options.map((o) => o.id),
  };
}

/** Enforces when AI help is allowed. Never during a timed exam; hints only before answering in practice. */
async function checkPermission(ctx: AskContext, mode: AskMode) {
  const { attempt, response } = ctx;
  if (attempt.status === 'IN_PROGRESS') {
    if (attempt.mode === 'EXAM') throw new AttemptError(403, 'NOT_DURING_EXAM', 'AI help is available after you submit the test.');
    if (!isScoredStatus(response.status) && mode !== 'HINT') throw new AttemptError(403, 'ANSWER_FIRST', 'Answer the question first, or ask for a hint.');
    return;
  }
  const bundle = await getTestBundleById(attempt.test_id, attempt.test_version_id);
  if (bundle?.test.window_end_at && new Date(bundle.test.window_end_at).getTime() > Date.now()) {
    throw new AttemptError(403, 'SOLUTIONS_LOCKED', 'AI help opens when the weekly mock window closes.');
  }
}

function buildPrompt(ctx: AskContext, mode: AskMode): string {
  const { question, translation, key, response, optionOrder } = ctx;
  const lines: string[] = [`Exam: ${question.exam}. Subject: ${question.subject}. Chapter: ${question.chapter}.`];
  if (translation.passage_html) lines.push(`Passage:\n${htmlToText(translation.passage_html)}`);
  lines.push(`Question:\n${htmlToText(translation.stem_html)}`);
  if (question.type === 'MULTI_MCQ') lines.push('(One or more options can be correct.)');
  const letterOf = new Map(optionOrder.map((id, i) => [id, LETTERS[i]]));
  if (question.type !== 'NUMERICAL') {
    lines.push('Options:\n' + optionOrder.map((id, i) => `(${LETTERS[i]}) ${htmlToText(translation.options.find((o) => o.id === id)?.html)}`).join('\n'));
  }
  if (mode !== 'HINT' && key) {
    const correct = question.type === 'NUMERICAL'
      ? (key.numericalMin != null && key.numericalMax != null ? `${key.numericalMin} to ${key.numericalMax}` : String(key.numericalExact))
      : key.correctOptionIds.map((id) => letterOf.get(id)).filter(Boolean).join(', ');
    lines.push(`Correct answer: ${correct}`);
    if (translation.solution_html) lines.push(`Official solution:\n${htmlToText(translation.solution_html)}`);
  }
  if (mode === 'WHY_WRONG') {
    const theirs = question.type === 'NUMERICAL'
      ? response.numerical_input ?? '(no answer)'
      : response.selected_option_ids.map((id) => letterOf.get(id)).filter(Boolean).join(', ') || '(no answer)';
    lines.push(`Student's answer: ${theirs}`);
  }
  lines.push(`Task: ${MODE_INSTRUCTIONS[mode]}`);
  return lines.join('\n\n');
}

export interface PreparedAsk {
  messageId: number;
  cached: string | null;
  system: string;
  prompt: string;
  cacheKey: string | null;
}

export async function prepareAsk(input: { attemptId: string; questionId: string; mode: unknown; language: unknown; viewer: Viewer }): Promise<PreparedAsk> {
  if (!input.viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to use Ask AI.');
  const mode = (['EXPLAIN', 'WHY_WRONG', 'HINT', 'STUCK'] as const).find((m) => m === input.mode) ?? 'EXPLAIN';
  const language = isLanguage(input.language) ? input.language : 'en';
  const ctx = await loadAskContext(input.attemptId, input.questionId, input.viewer);
  await checkPermission(ctx, mode);
  if (!aiEnabled()) throw new AttemptError(503, 'AI_OFF', 'Ask AI is not switched on yet.');

  const userId = input.viewer.user.id;
  const cacheKey = mode === 'WHY_WRONG' ? null
    : createHash('sha256').update([ctx.question.id, ctx.translation.language, mode, language, geminiModel(), ctx.optionOrder.join(',')].join('|')).digest('hex');
  let cached: string | null = null;
  if (cacheKey) {
    const { data } = await supabaseAdmin().from('ai_cache').select('response').eq('key', cacheKey).maybeSingle();
    cached = (data?.response as string | undefined) ?? null;
  }
  if (!cached && (await usedToday(userId, 'ASK')) >= askDailyLimit()) {
    throw new AttemptError(429, 'AI_LIMIT', `You've used today's ${askDailyLimit()} free AI explanations. They reset at midnight.`);
  }

  const { data: msg, error } = await supabaseAdmin().from('ai_messages').insert({
    user_id: userId,
    attempt_id: ctx.attempt.id,
    question_id: ctx.question.id,
    kind: 'ASK',
    mode,
    language,
    cached: !!cached,
    response: cached,
  }).select('id').single();
  if (error) throw error;
  return { messageId: msg.id as number, cached, system: systemPrompt(language), prompt: buildPrompt(ctx, mode), cacheKey };
}

export async function finishAsk(prepared: PreparedAsk, text: string) {
  const db = supabaseAdmin();
  await db.from('ai_messages').update({ response: text }).eq('id', prepared.messageId);
  if (prepared.cacheKey && text.trim().length > 20) {
    await db.from('ai_cache').upsert({ key: prepared.cacheKey, response: text }, { onConflict: 'key' });
  }
}

export async function recordFeedback(userId: string, messageId: number, feedback: 1 | -1 | null, report: boolean, note: string | null) {
  const db = supabaseAdmin();
  const { data } = await db.from('ai_messages').select('user_id').eq('id', messageId).maybeSingle();
  if (!data || data.user_id !== userId) throw new AttemptError(404, 'NOT_FOUND', 'Message not found');
  const patch: Record<string, unknown> = {};
  if (feedback !== null) patch.feedback = feedback;
  if (report) { patch.reported = true; patch.report_note = note?.slice(0, 500) ?? null; }
  if (Object.keys(patch).length > 0) await db.from('ai_messages').update(patch).eq('id', messageId);
}

// ---------------------------------------------------------------- study plan

function parsePlan(text: string, language: AiLanguage): AiPlan | null {
  try {
    const json = JSON.parse(text.replace(/^```(?:json)?|```$/g, '').trim());
    const fixes = (Array.isArray(json.fixes) ? json.fixes : [])
      .map((f: { title?: unknown; detail?: unknown }) => ({ title: String(f.title ?? '').slice(0, 120), detail: String(f.detail ?? '').slice(0, 500) }))
      .filter((f: { title: string }) => f.title)
      .slice(0, 3);
    const week = (Array.isArray(json.week) ? json.week : [])
      .map((d: { day?: unknown; task?: unknown }, i: number) => ({ day: Number(d.day) || i + 1, task: String(d.task ?? '').slice(0, 300) }))
      .filter((d: { task: string }) => d.task)
      .slice(0, 7);
    if (fixes.length === 0 || week.length === 0) return null;
    return { language, fixes, week, model: geminiModel() };
  } catch {
    return null;
  }
}

/** Top 3 things to fix + a 7-day plan, from aggregates only (one AI call per attempt and language). */
export async function getOrCreatePlan(attemptId: string, viewer: Viewer, languageInput: unknown): Promise<AiPlan> {
  if (!viewer.user) throw new AttemptError(401, 'LOGIN_REQUIRED', 'Sign in to get your study plan.');
  const language = isLanguage(languageInput) ? languageInput : 'en';
  const db = supabaseAdmin();
  const { data } = await db.from('attempts').select('*').eq('id', attemptId).maybeSingle();
  const attempt = data as AttemptRow | null;
  if (!attempt || attempt.user_id !== viewer.user.id) throw new AttemptError(404, 'NOT_FOUND', 'Attempt not found');
  if (attempt.status === 'IN_PROGRESS' || !attempt.score_breakdown) throw new AttemptError(409, 'IN_PROGRESS', 'Finish the test first');
  if (attempt.ai_plan && attempt.ai_plan.language === language) return attempt.ai_plan;
  if (!aiEnabled()) throw new AttemptError(503, 'AI_OFF', 'AI study plans are not switched on yet.');
  if ((await usedToday(viewer.user.id, 'PLAN')) >= PLAN_DAILY_LIMIT) {
    throw new AttemptError(429, 'AI_LIMIT', 'You have reached today\'s limit for new study plans.');
  }

  const bundle = await getTestBundleById(attempt.test_id, attempt.test_version_id);
  const b = attempt.score_breakdown;
  const weak = [...b.chapters].filter((c) => c.maxMarks > 0)
    .sort((x, y) => (x.marks / x.maxMarks) - (y.marks / y.maxMarks)).slice(0, 6)
    .map((c) => `${c.subject} / ${c.chapter}: ${c.correct}/${c.total} correct, ${c.marks}/${c.maxMarks} marks`);
  const tags = Object.entries(attempt.analysis?.tags ?? {})
    .map(([t, n]) => `${MISTAKE_LABELS[t as MistakeTag]?.label ?? t}: ${n}`);
  const strategy = attempt.analysis?.attemptStrategy;

  const prompt = [
    `Exam: ${bundle?.preset.name ?? ''}. Test: ${bundle?.test.title ?? ''}.`,
    `Score ${b.score}/${b.maxScore}. Attempted ${b.attempted}, correct ${b.correct}, partly correct ${b.partial}, wrong ${b.wrong}, left ${b.unattempted}. Negative marks lost: ${b.negativeMarksLost}. Time used: ${Math.round(b.timeUsedSeconds / 60)} min.`,
    `Sections: ${b.sections.map((s) => `${s.name} ${s.score}/${s.maxScore}`).join('; ')}.`,
    `Weakest chapters: ${weak.join('; ') || 'none'}.`,
    `Mistake types: ${tags.join('; ') || 'none tagged'}.`,
    strategy ? `Attempt strategy verdict: ${strategy.verdict}${strategy.accuracy != null ? `, accuracy on attempted ${Math.round(strategy.accuracy * 100)}%` : ''}.` : '',
    `Return JSON only: {"fixes":[{"title":"...","detail":"..."}] (exactly 3, most important first, each detail 1-2 sentences, practical and specific to the chapters above), "week":[{"day":1,"task":"..."}, ... day 7] (one short, concrete task per day, about 1-2 hours, mix revision of weak chapters, practice questions and one timed mock)}.`,
    'Write every string in the reply language. Be encouraging but honest. Do not invent scores or facts not given.',
  ].filter(Boolean).join('\n');

  let plan: AiPlan | null = null;
  try {
    const text = await geminiGenerate({ system: systemPrompt(language).replace('Keep the whole reply under 220 words.', ''), prompt, json: true, temperature: 0.5 });
    plan = parsePlan(text, language);
  } catch (e) {
    if (e instanceof AiUnavailableError) console.error(e.message);
    throw new AttemptError(503, 'AI_ERROR', 'The AI is busy right now. Please try again in a minute.');
  }
  if (!plan) throw new AttemptError(503, 'AI_ERROR', 'Could not build a plan this time. Please try again.');

  await Promise.all([
    db.from('attempts').update({ ai_plan: plan, ai_plan_at: new Date().toISOString() }).eq('id', attempt.id),
    db.from('ai_messages').insert({ user_id: viewer.user.id, attempt_id: attempt.id, kind: 'PLAN', language, response: JSON.stringify(plan) }),
  ]);
  return plan;
}
