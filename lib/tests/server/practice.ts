import 'server-only';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { publishTestVersion } from '../publish';
import { PRESET_QUESTION_EXAM } from '../presetExams';
import { shuffleInPlace } from '../shuffle';
import { AttemptError } from './errors';
import { getPreset, listPresets } from './content';

export interface ChapterGroup {
  sectionId: string;
  subject: string;
  chapters: { name: string; count: number }[];
}

function sampleContentAllowed(): boolean {
  return process.env.ALLOW_SAMPLE_CONTENT === 'true';
}

async function candidateQuestions(presetId: string) {
  const exam = PRESET_QUESTION_EXAM[presetId];
  if (!exam) return [];
  let query = supabaseAdmin()
    .from('questions')
    .select('id, subject, chapter')
    .eq('exam', exam)
    .eq('status', 'APPROVED')
    .eq('key_verified', true)
    .neq('license_status', 'UNKNOWN');
  if (!sampleContentAllowed()) query = query.neq('license_status', 'ORIGINAL_SAMPLE');
  const { data, error } = await query.limit(5000);
  if (error) throw error;
  return (data ?? []) as { id: string; subject: string; chapter: string }[];
}

export async function listPracticeChapters(presetId: string): Promise<ChapterGroup[]> {
  const preset = await getPreset(presetId);
  if (!preset) return [];
  const questions = await candidateQuestions(presetId);
  return [...preset.sections].sort((a, b) => a.order - b.order).map((s) => {
    const counts = new Map<string, number>();
    for (const q of questions) if (q.subject === s.subject) counts.set(q.chapter, (counts.get(q.chapter) ?? 0) + 1);
    return {
      sectionId: s.id,
      subject: s.subject,
      chapters: Array.from(counts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
    };
  }).filter((g) => g.chapters.length > 0);
}

export interface PracticeRequest {
  presetId: string;
  sectionIds: string[];
  chapters: string[];
  count: number;
  timed: boolean;
}

/**
 * Picks the preset that can hold the most of these questions (e.g. MHT-CET maths → PCM, biology → PCB)
 * and returns its id with the questions grouped by section. Questions that don't fit are dropped.
 */
export async function fitQuestionsToPreset(questions: { id: string; exam: string; subject: string }[]) {
  const presets = await listPresets();
  let best: { presetId: string; bySection: Record<string, string[]>; count: number } | null = null;
  for (const p of presets) {
    const exam = PRESET_QUESTION_EXAM[p.id];
    const bySection: Record<string, string[]> = {};
    let count = 0;
    for (const q of questions) {
      if (q.exam !== exam) continue;
      const section = p.sections.find((s) => s.subject === q.subject);
      if (!section) continue;
      (bySection[section.id] ??= []).push(q.id);
      count++;
    }
    if (count > 0 && (!best || count > best.count)) best = { presetId: p.id, bySection, count };
  }
  return best;
}

/** One-off quiz from an explicit list of questions (revision sets, daily quiz). */
export async function createQuizFromQuestions(input: {
  presetId: string;
  questionsBySection: Record<string, string[]>;
  title: string;
  durationSeconds: number;
  extra?: Record<string, unknown>;
}): Promise<string> {
  const db = supabaseAdmin();
  const { data: test, error } = await db
    .from('tests')
    .insert({
      slug: `practice-${randomUUID().slice(0, 8)}`,
      title: input.title,
      kind: 'QUIZ',
      preset_id: input.presetId,
      duration_seconds: input.durationSeconds,
      guest_allowed: true,
      is_practice: true,
      status: 'DRAFT',
      ...input.extra,
    })
    .select('id')
    .single();
  if (error) throw error;
  const result = await publishTestVersion(db, { testId: test.id, questionsBySection: input.questionsBySection, allowSampleContent: sampleContentAllowed() });
  if (!result.ok) {
    await db.from('tests').delete().eq('id', test.id);
    throw new AttemptError(400, 'INVALID', result.errors[0] ?? 'Could not build the quiz');
  }
  return test.id as string;
}

/** Builds a one-off practice quiz from the question bank and returns its test id. */
export async function createPracticeTest(req: PracticeRequest): Promise<string> {
  const preset = await getPreset(req.presetId);
  if (!preset) throw new AttemptError(404, 'NOT_FOUND', 'Exam not found');
  const sections = preset.sections.filter((s) => req.sectionIds.includes(s.id));
  if (sections.length === 0) throw new AttemptError(400, 'INVALID', 'Pick at least one subject');

  const subjectToSection = new Map(sections.map((s) => [s.subject, s.id]));
  const chapterFilter = new Set(req.chapters);
  const pool = (await candidateQuestions(req.presetId)).filter((q) =>
    subjectToSection.has(q.subject) && (chapterFilter.size === 0 || chapterFilter.has(q.chapter)));
  if (pool.length === 0) throw new AttemptError(404, 'NO_QUESTIONS', 'No questions are available for this selection yet');

  const count = Math.max(1, Math.min(Number(req.count) || 10, 50, pool.length));
  const picked = shuffleInPlace([...pool], Math.random).slice(0, count);
  const questionsBySection: Record<string, string[]> = {};
  for (const q of picked) {
    const sectionId = subjectToSection.get(q.subject)!;
    (questionsBySection[sectionId] ??= []).push(q.id);
  }

  const totalQuestions = preset.sections.reduce((n, s) => n + s.questionCount, 0) || 1;
  const perQuestion = Math.round(preset.durationSeconds / totalQuestions);
  const chapterLabel = req.chapters.length === 1 ? req.chapters[0] : sections.map((s) => s.name).join(', ');

  const db = supabaseAdmin();
  const { data: test, error } = await db
    .from('tests')
    .insert({
      slug: `practice-${randomUUID().slice(0, 8)}`,
      title: `Practice: ${chapterLabel}`,
      kind: 'QUIZ',
      preset_id: preset.id,
      duration_seconds: req.timed ? Math.max(60, perQuestion * count) : 0,
      guest_allowed: true,
      is_practice: true,
      status: 'DRAFT',
    })
    .select('id')
    .single();
  if (error) throw error;

  const result = await publishTestVersion(db, { testId: test.id, questionsBySection, allowSampleContent: sampleContentAllowed() });
  if (!result.ok) throw new AttemptError(400, 'INVALID', result.errors[0] ?? 'Could not build the quiz');
  return test.id as string;
}
