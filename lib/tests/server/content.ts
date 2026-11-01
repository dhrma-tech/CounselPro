import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { ExamPreset, Language, MarkingRule, PaperQuestion, QuestionType, VersionSection } from '../types';
import {
  presetFromRow,
  type KeyRow,
  type PresetRow,
  type QuestionRow,
  type TestRow,
  type TranslationRow,
  type VersionRow,
} from './rows';

export interface TestListItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  kind: TestRow['kind'];
  presetId: string;
  presetName: string;
  examFamily: ExamPreset['examFamily'];
  durationSeconds: number;
  questionCount: number;
  totalMarks: number;
  guestAllowed: boolean;
  isSample: boolean;
}

export async function listPresets(): Promise<ExamPreset[]> {
  const { data, error } = await supabaseAdmin().from('exam_presets').select('*').order('id');
  if (error) throw error;
  return (data as PresetRow[]).map(presetFromRow);
}

export async function getPreset(id: string): Promise<ExamPreset | null> {
  const { data, error } = await supabaseAdmin().from('exam_presets').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? presetFromRow(data as PresetRow) : null;
}

export async function listPublishedTests(): Promise<TestListItem[]> {
  const db = supabaseAdmin();
  const { data: tests, error } = await db
    .from('tests')
    .select('*')
    .eq('status', 'PUBLISHED')
    .eq('is_practice', false)
    .eq('is_daily', false)
    .not('current_version_id', 'is', null)
    .order('sort_order')
    .order('created_at', { ascending: false });
  if (error) throw error;
  const rows = tests as TestRow[];
  if (rows.length === 0) return [];

  const [{ data: versions, error: vErr }, presets] = await Promise.all([
    db.from('test_versions').select('id, sections, total_marks').in('id', rows.map((t) => t.current_version_id!)),
    listPresets(),
  ]);
  if (vErr) throw vErr;
  const versionById = new Map((versions as Pick<VersionRow, 'id' | 'sections' | 'total_marks'>[]).map((v) => [v.id, v]));
  const presetById = new Map(presets.map((p) => [p.id, p]));

  return rows.flatMap((t) => {
    const v = versionById.get(t.current_version_id!);
    const p = presetById.get(t.preset_id);
    if (!v || !p) return [];
    return [{
      id: t.id,
      slug: t.slug,
      title: t.title,
      description: t.description,
      kind: t.kind,
      presetId: p.id,
      presetName: p.name,
      examFamily: p.examFamily,
      durationSeconds: t.duration_seconds,
      questionCount: v.sections.reduce((n, s) => n + s.questionIds.length, 0),
      totalMarks: Number(v.total_marks),
      guestAllowed: t.guest_allowed,
      isSample: t.is_sample,
    }];
  });
}

export interface TestBundle {
  test: TestRow;
  version: VersionRow;
  preset: ExamPreset;
}

export async function getTestBundleById(testId: string, versionId?: string): Promise<TestBundle | null> {
  const db = supabaseAdmin();
  const { data: test, error } = await db.from('tests').select('*').eq('id', testId).maybeSingle();
  if (error) throw error;
  if (!test) return null;
  const t = test as TestRow;
  const vid = versionId ?? t.current_version_id;
  if (!vid) return null;
  const [{ data: version, error: vErr }, preset] = await Promise.all([
    db.from('test_versions').select('*').eq('id', vid).maybeSingle(),
    getPreset(t.preset_id),
  ]);
  if (vErr) throw vErr;
  if (!version || !preset) return null;
  return { test: t, version: version as VersionRow, preset };
}

export async function getPublishedTestBySlug(slug: string): Promise<TestBundle | null> {
  const { data, error } = await supabaseAdmin()
    .from('tests')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .maybeSingle();
  if (error) throw error;
  return data ? getTestBundleById(data.id) : null;
}

export function ruleFor(type: QuestionType, section: VersionSection | undefined, defaults: VersionRow['marking']): MarkingRule {
  const rule = section?.marking?.[type] ?? defaults[type]
    ?? (type === 'PARAGRAPH' || type === 'MATRIX_MATCH' ? section?.marking?.SINGLE_MCQ ?? defaults.SINGLE_MCQ : undefined);
  return rule ?? { correct: 1, wrong: 0, unattempted: 0 };
}

export async function loadQuestions(ids: string[]): Promise<{ questions: QuestionRow[]; translations: TranslationRow[] }> {
  if (ids.length === 0) return { questions: [], translations: [] };
  const db = supabaseAdmin();
  const [{ data: questions, error: qErr }, { data: translations, error: tErr }] = await Promise.all([
    db.from('questions').select('*').in('id', ids),
    db.from('question_translations').select('*').in('question_id', ids),
  ]);
  if (qErr) throw qErr;
  if (tErr) throw tErr;
  return { questions: questions as QuestionRow[], translations: translations as TranslationRow[] };
}

export async function loadKeys(ids: string[]): Promise<Map<string, KeyRow>> {
  if (ids.length === 0) return new Map();
  const { data, error } = await supabaseAdmin().from('question_keys').select('*').in('question_id', ids);
  if (error) throw error;
  return new Map((data as KeyRow[]).map((k) => [k.question_id, k]));
}

/** Builds the browser-safe paper. Contains no keys and no solutions. */
export function buildPaperQuestions(
  version: VersionRow,
  questions: QuestionRow[],
  translations: TranslationRow[],
  optionOrder: Record<string, string[]>,
): PaperQuestion[] {
  const sectionByQuestion = new Map<string, VersionSection>();
  for (const s of version.sections) for (const qid of s.questionIds) sectionByQuestion.set(qid, s);

  const translationsByQuestion = new Map<string, TranslationRow[]>();
  for (const t of translations) {
    const list = translationsByQuestion.get(t.question_id) ?? [];
    list.push(t);
    translationsByQuestion.set(t.question_id, list);
  }

  return questions.map((q) => {
    const section = sectionByQuestion.get(q.id);
    const content: PaperQuestion['content'] = {};
    const languages: Language[] = [];
    for (const t of translationsByQuestion.get(q.id) ?? []) {
      if (section?.languages && !section.languages.includes(t.language)) continue;
      const order = optionOrder[q.id];
      const options = order
        ? order.map((id) => t.options.find((o) => o.id === id)).filter((o): o is NonNullable<typeof o> => !!o)
        : t.options;
      content[t.language] = { passageHtml: t.passage_html, stemHtml: t.stem_html, options };
      languages.push(t.language);
    }
    return {
      id: q.id,
      sectionId: section?.id ?? '',
      type: q.type,
      subject: q.subject,
      chapter: q.chapter,
      marking: ruleFor(q.type, section, version.marking),
      languages,
      content,
    };
  });
}
