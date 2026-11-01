// Question import format shared by the admin importer and scripts/seed-tests.mjs.
// Keep this file free of path aliases and relative runtime imports so Node can run it directly.
import sanitizeHtml from 'sanitize-html';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Language, QuestionType } from './types';

const QUESTION_TYPES: QuestionType[] = ['SINGLE_MCQ', 'MULTI_MCQ', 'NUMERICAL', 'PARAGRAPH', 'MATRIX_MATCH'];
const LANGUAGES: Language[] = ['en', 'hi', 'mr', 'ur', 'gu'];
const LICENSES = ['OWNED_OR_LICENSED', 'ORIGINAL_SAMPLE', 'UNKNOWN'] as const;
export const EXAMS = ['MHT_CET', 'JEE_MAIN', 'JEE_ADV', 'NEET_UG'] as const;

export interface ImportTranslation {
  passage?: string | null;
  stem: string;
  options?: Record<string, string> | { id: string; html: string }[];
  solution?: string | null;
}

export interface ImportQuestion {
  externalKey: string;
  exam: string;
  subject: string;
  chapter: string;
  topic?: string | null;
  type: QuestionType;
  difficulty?: number;
  groupId?: string | null;
  shuffleOptions?: boolean;
  pyqYear?: number | null;
  pyqShift?: string | null;
  questionNumber?: number | null;
  licenseStatus?: (typeof LICENSES)[number];
  keyVerified?: boolean;
  status?: 'DRAFT' | 'APPROVED';
  translations: Partial<Record<Language, ImportTranslation>>;
  answer: { correct?: string[]; exact?: number | null; min?: number | null; max?: number | null };
}

export interface NormalizedQuestion {
  row: {
    external_key: string;
    exam: string;
    subject: string;
    chapter: string;
    topic: string | null;
    type: QuestionType;
    difficulty: number;
    group_id: string | null;
    shuffle_options: boolean;
    pyq_year: number | null;
    pyq_shift: string | null;
    question_number: number | null;
    status: 'DRAFT' | 'APPROVED';
    license_status: (typeof LICENSES)[number];
    key_verified: boolean;
  };
  translations: { language: Language; passage_html: string | null; stem_html: string; options: { id: string; html: string }[]; solution_html: string | null }[];
  key: { correct_option_ids: string[]; numerical_exact: number | null; numerical_min: number | null; numerical_max: number | null };
}

export type ValidationResult =
  | { ok: true; value: NormalizedQuestion }
  | { ok: false; externalKey: string; errors: string[] };

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'sub', 'sup', 'span', 'div', 'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'code', 'pre', 'hr',
  ],
  allowedAttributes: { img: ['src', 'alt', 'width', 'height'], span: ['class'], div: ['class'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'] },
  allowedSchemes: ['https', 'data'],
};

export function cleanHtml(html: string | null | undefined): string | null {
  if (html == null) return null;
  const trimmed = String(html).trim();
  return trimmed ? sanitizeHtml(trimmed, SANITIZE) : null;
}

function toNumberOrNull(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function normalizeOptions(options: ImportTranslation['options']): { id: string; html: string }[] {
  if (!options) return [];
  const list = Array.isArray(options)
    ? options.map((o) => ({ id: String(o.id), html: o.html }))
    : Object.entries(options).map(([id, html]) => ({ id, html }));
  return list
    .map((o) => ({ id: o.id.trim().toLowerCase(), html: cleanHtml(o.html) ?? '' }))
    .filter((o) => o.id && o.html);
}

export function validateImportQuestion(raw: unknown): ValidationResult {
  const q = (raw ?? {}) as Partial<ImportQuestion>;
  const externalKey = String(q.externalKey ?? '').trim();
  const errors: string[] = [];

  if (!externalKey) errors.push('externalKey is required');
  if (!q.exam || !(EXAMS as readonly string[]).includes(q.exam)) errors.push(`exam must be one of ${EXAMS.join(', ')}`);
  if (!q.subject?.trim()) errors.push('subject is required');
  if (!q.chapter?.trim()) errors.push('chapter is required');
  if (!q.type || !QUESTION_TYPES.includes(q.type)) errors.push(`type must be one of ${QUESTION_TYPES.join(', ')}`);
  const difficulty = q.difficulty == null ? 3 : Number(q.difficulty);
  if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) errors.push('difficulty must be 1 to 5');
  const license = q.licenseStatus ?? 'UNKNOWN';
  if (!LICENSES.includes(license)) errors.push(`licenseStatus must be one of ${LICENSES.join(', ')}`);

  const translations: NormalizedQuestion['translations'] = [];
  for (const [lang, t] of Object.entries(q.translations ?? {})) {
    if (!LANGUAGES.includes(lang as Language)) {
      errors.push(`unknown language "${lang}"`);
      continue;
    }
    if (!t) continue;
    const stem = cleanHtml(t.stem);
    if (!stem) errors.push(`${lang}: stem is required`);
    translations.push({
      language: lang as Language,
      passage_html: cleanHtml(t.passage),
      stem_html: stem ?? '',
      options: normalizeOptions(t.options),
      solution_html: cleanHtml(t.solution),
    });
  }
  const en = translations.find((t) => t.language === 'en');
  if (!en) errors.push('an English (en) translation is required');

  const answer = q.answer ?? {};
  const correct = (answer.correct ?? []).map((id) => String(id).trim().toLowerCase()).filter(Boolean);
  const exact = toNumberOrNull(answer.exact);
  const min = toNumberOrNull(answer.min);
  const max = toNumberOrNull(answer.max);

  if (q.type === 'NUMERICAL') {
    if ([exact, min, max].some((n) => Number.isNaN(n))) errors.push('numerical answer must be a number');
    if (exact == null && (min == null || max == null)) errors.push('numerical questions need answer.exact or answer.min + answer.max');
    if (min != null && max != null && min > max) errors.push('answer.min is greater than answer.max');
  } else if (q.type) {
    if (en && en.options.length < 2) errors.push('at least 2 options are required');
    const optionIds = new Set(en?.options.map((o) => o.id));
    for (const t of translations) {
      const ids = t.options.map((o) => o.id).sort().join(',');
      if (en && ids !== en.options.map((o) => o.id).sort().join(',')) errors.push(`${t.language}: option ids must match English`);
    }
    if (correct.length === 0) errors.push('answer.correct needs at least one option id');
    if (correct.some((id) => !optionIds.has(id))) errors.push('answer.correct refers to an unknown option id');
    if (q.type !== 'MULTI_MCQ' && correct.length > 1) errors.push('only MULTI_MCQ can have more than one correct option');
  }

  if (errors.length > 0) return { ok: false, externalKey: externalKey || '(missing)', errors };

  return {
    ok: true,
    value: {
      row: {
        external_key: externalKey,
        exam: q.exam!,
        subject: q.subject!.trim(),
        chapter: q.chapter!.trim(),
        topic: q.topic?.trim() || null,
        type: q.type!,
        difficulty,
        group_id: q.groupId?.trim() || null,
        shuffle_options: q.shuffleOptions ?? true,
        pyq_year: q.pyqYear ?? null,
        pyq_shift: q.pyqShift ?? null,
        question_number: q.questionNumber ?? null,
        status: q.status ?? 'DRAFT',
        license_status: license,
        key_verified: q.keyVerified ?? false,
      },
      translations,
      key: {
        correct_option_ids: q.type === 'NUMERICAL' ? [] : correct,
        numerical_exact: q.type === 'NUMERICAL' ? exact : null,
        numerical_min: q.type === 'NUMERICAL' ? min : null,
        numerical_max: q.type === 'NUMERICAL' ? max : null,
      },
    },
  };
}

/** CSV: one row per (question, language). Rows sharing external_key are merged. */
export function csvRowsToImportQuestions(rows: Record<string, string>[]): unknown[] {
  const byKey = new Map<string, ImportQuestion>();
  for (const r of rows) {
    const key = (r.external_key || '').trim();
    const lang = ((r.language || 'en').trim().toLowerCase()) as Language;
    const options: Record<string, string> = {};
    for (const letter of ['a', 'b', 'c', 'd', 'e']) {
      const v = r[`option_${letter}`];
      if (v && v.trim()) options[letter] = v;
    }
    const existing = byKey.get(key);
    const translation: ImportTranslation = { passage: r.passage || null, stem: r.stem || '', options, solution: r.solution || null };
    if (existing) {
      existing.translations[lang] = translation;
      continue;
    }
    byKey.set(key, {
      externalKey: key,
      exam: (r.exam || '').trim(),
      subject: r.subject || '',
      chapter: r.chapter || '',
      topic: r.topic || null,
      type: (r.type || '').trim().toUpperCase() as QuestionType,
      difficulty: r.difficulty ? Number(r.difficulty) : undefined,
      groupId: r.group_id || null,
      shuffleOptions: r.shuffle_options ? !/^(false|no|0)$/i.test(r.shuffle_options.trim()) : undefined,
      pyqYear: r.pyq_year ? Number(r.pyq_year) : null,
      pyqShift: r.pyq_shift || null,
      questionNumber: r.question_number ? Number(r.question_number) : null,
      licenseStatus: (r.license_status || 'UNKNOWN').trim() as ImportQuestion['licenseStatus'],
      keyVerified: /^(true|yes|1)$/i.test((r.key_verified || '').trim()),
      translations: { [lang]: translation },
      answer: {
        correct: (r.correct || '').split(/[,;\s]+/).filter(Boolean),
        exact: r.numerical_exact === '' || r.numerical_exact == null ? null : Number(r.numerical_exact),
        min: r.numerical_min === '' || r.numerical_min == null ? null : Number(r.numerical_min),
        max: r.numerical_max === '' || r.numerical_max == null ? null : Number(r.numerical_max),
      },
    });
  }
  return Array.from(byKey.values());
}

const UPSERT_BATCH = 200;

/** Idempotent by external_key: re-importing updates the question, its translations and key. */
export async function upsertQuestions(db: SupabaseClient, questions: NormalizedQuestion[]): Promise<{ inserted: number; updated: number }> {
  let inserted = 0;
  let updated = 0;
  for (let i = 0; i < questions.length; i += UPSERT_BATCH) {
    const batch = questions.slice(i, i + UPSERT_BATCH);
    const keys = batch.map((q) => q.row.external_key);

    const { data: existing, error: findErr } = await db.from('questions').select('external_key').in('external_key', keys);
    if (findErr) throw findErr;
    updated += existing?.length ?? 0;
    inserted += batch.length - (existing?.length ?? 0);

    const now = new Date().toISOString();
    const { data: rows, error: upErr } = await db
      .from('questions')
      .upsert(batch.map((q) => ({ ...q.row, updated_at: now })), { onConflict: 'external_key' })
      .select('id, external_key');
    if (upErr) throw upErr;
    const idByKey = new Map((rows ?? []).map((r) => [r.external_key as string, r.id as string]));
    const ids = Array.from(idByKey.values());

    const { error: delErr } = await db.from('question_translations').delete().in('question_id', ids);
    if (delErr) throw delErr;
    const translations = batch.flatMap((q) => q.translations.map((t) => ({ ...t, question_id: idByKey.get(q.row.external_key)! })));
    const { error: trErr } = await db.from('question_translations').insert(translations);
    if (trErr) throw trErr;
    const { error: keyErr } = await db
      .from('question_keys')
      .upsert(batch.map((q) => ({ ...q.key, question_id: idByKey.get(q.row.external_key)! })), { onConflict: 'question_id' });
    if (keyErr) throw keyErr;
  }
  return { inserted, updated };
}
