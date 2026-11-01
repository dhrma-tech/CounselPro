"use server";

import Papa from 'papaparse';
import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { csvRowsToImportQuestions, upsertQuestions, validateImportQuestion, type NormalizedQuestion } from '@/lib/tests/importFormat';
import { publishTestVersion } from '@/lib/tests/publish';
import { logAdmin } from '@/lib/tests/server/admin';
import { istInstant } from '@/lib/tests/istDate';
import type { TestKind } from '@/lib/tests/types';

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user?.email) throw new Error('Not allowed');
  return user.email;
}

const MAX_IMPORT_CHARS = 5_000_000;

function parseImport(format: 'json' | 'csv', text: string): unknown[] {
  if (text.length > MAX_IMPORT_CHARS) throw new Error('File is too large (max 5 MB). Split it into smaller files.');
  if (format === 'csv') {
    const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true, transformHeader: (h) => h.trim().toLowerCase() });
    if (parsed.errors.length > 0) throw new Error(`CSV error on row ${(parsed.errors[0].row ?? 0) + 2}: ${parsed.errors[0].message}`);
    return csvRowsToImportQuestions(parsed.data);
  }
  const json = JSON.parse(text);
  return Array.isArray(json) ? json : Array.isArray(json?.questions) ? json.questions : [json];
}

export interface ImportReport {
  ok: boolean;
  total: number;
  valid: number;
  newCount: number;
  updateCount: number;
  errors: { externalKey: string; errors: string[] }[];
  message?: string;
}

async function analyse(format: 'json' | 'csv', text: string): Promise<{ report: ImportReport; valid: NormalizedQuestion[] }> {
  let raw: unknown[];
  try {
    raw = parseImport(format, text);
  } catch (e) {
    return { report: { ok: false, total: 0, valid: 0, newCount: 0, updateCount: 0, errors: [], message: e instanceof Error ? e.message : 'Could not read the file' }, valid: [] };
  }
  const valid: NormalizedQuestion[] = [];
  const errors: ImportReport['errors'] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    const r = validateImportQuestion(item);
    if (!r.ok) { errors.push({ externalKey: r.externalKey, errors: r.errors }); continue; }
    if (seen.has(r.value.row.external_key)) { errors.push({ externalKey: r.value.row.external_key, errors: ['duplicate externalKey in this file'] }); continue; }
    seen.add(r.value.row.external_key);
    valid.push(r.value);
  }
  let existing = 0;
  const keys = valid.map((v) => v.row.external_key);
  for (let i = 0; i < keys.length; i += 500) {
    const { count } = await supabaseAdmin().from('questions').select('id', { count: 'exact', head: true }).in('external_key', keys.slice(i, i + 500));
    existing += count ?? 0;
  }
  return {
    report: { ok: errors.length === 0 && valid.length > 0, total: raw.length, valid: valid.length, newCount: valid.length - existing, updateCount: existing, errors },
    valid,
  };
}

export async function previewImport(format: 'json' | 'csv', text: string): Promise<ImportReport> {
  await requireAdmin();
  return (await analyse(format, text)).report;
}

export async function commitImport(format: 'json' | 'csv', text: string, approve: boolean): Promise<ImportReport> {
  const actor = await requireAdmin();
  const { report, valid } = await analyse(format, text);
  if (!report.ok) return { ...report, message: report.message ?? 'Fix the errors first. Nothing was imported.' };
  const rows = approve ? valid.map((v) => ({ ...v, row: { ...v.row, status: 'APPROVED' as const } })) : valid;
  const result = await upsertQuestions(supabaseAdmin(), rows);
  await logAdmin(actor, 'questions.import', null, null, { ...result, approve, keys: valid.slice(0, 50).map((v) => v.row.external_key) });
  revalidatePath('/admin/questions');
  return { ...report, message: `Imported: ${result.inserted} new, ${result.updated} updated.` };
}

export async function setQuestionStatus(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));
  if (!['DRAFT', 'APPROVED', 'RETIRED'].includes(status)) throw new Error('Invalid status');
  const db = supabaseAdmin();
  const { data: before } = await db.from('questions').select('status').eq('id', id).single();
  await db.from('questions').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  await logAdmin(actor, 'question.status', id, before, { status });
  revalidatePath('/admin/questions');
}

export async function setKeyVerified(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get('id'));
  const verified = formData.get('verified') === 'true';
  await supabaseAdmin().from('questions').update({ key_verified: verified, updated_at: new Date().toISOString() }).eq('id', id);
  await logAdmin(actor, 'question.key_verified', id, null, { verified });
  revalidatePath('/admin/questions');
}

export interface SaveTestInput {
  id?: string;
  slug: string;
  title: string;
  description: string;
  kind: TestKind;
  presetId: string;
  durationMinutes: number;
  guestAllowed: boolean;
  sortOrder: number;
  questionsBySection: Record<string, string[]>;
  isWeekly?: boolean;
  /** IST wall-clock times from datetime-local inputs, e.g. "2026-11-08T10:00" */
  windowStart?: string;
  windowEnd?: string;
}

function istInputToIso(value: string | undefined): string | null {
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/.exec(value ?? '');
  return m ? istInstant(m[1], m[2]).toISOString() : null;
}

export async function saveTest(input: SaveTestInput): Promise<{ ok: boolean; errors: string[]; id?: string }> {
  const actor = await requireAdmin();
  const errors: string[] = [];
  const slug = input.slug.trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.startsWith('practice-')) errors.push('Slug: use lowercase letters, numbers and dashes (and not starting with "practice-")');
  if (!input.title.trim()) errors.push('Title is required');
  const duration = Math.round(Number(input.durationMinutes) * 60);
  if (!Number.isFinite(duration) || duration < 0) errors.push('Duration must be 0 or more minutes');
  if (input.kind !== 'QUIZ' && duration <= 0) errors.push('Mock and chapter tests need a duration');
  const windowStart = input.isWeekly ? istInputToIso(input.windowStart) : null;
  const windowEnd = input.isWeekly ? istInputToIso(input.windowEnd) : null;
  if (input.isWeekly) {
    if (input.kind !== 'FULL_MOCK') errors.push('Weekly open mocks must be a full mock');
    if (!windowStart || !windowEnd) errors.push('Weekly open mocks need an opening and a closing time');
    else if (windowEnd <= windowStart) errors.push('The closing time must be after the opening time');
    else if (new Date(windowEnd).getTime() - new Date(windowStart).getTime() < duration * 1000) errors.push('The window must be at least as long as the test');
  }
  if (errors.length > 0) return { ok: false, errors };

  const db = supabaseAdmin();
  const fields = {
    slug,
    title: input.title.trim(),
    description: input.description.trim() || null,
    kind: input.kind,
    preset_id: input.presetId,
    duration_seconds: duration,
    guest_allowed: input.guestAllowed,
    sort_order: Number(input.sortOrder) || 0,
    is_weekly: !!input.isWeekly,
    window_start_at: windowStart,
    window_end_at: windowEnd,
    updated_at: new Date().toISOString(),
  };

  let testId = input.id;
  if (testId) {
    const { data: before } = await db.from('tests').select('*').eq('id', testId).single();
    const { error } = await db.from('tests').update(fields).eq('id', testId);
    if (error) return { ok: false, errors: [error.code === '23505' ? 'That slug is already used' : error.message] };
    await logAdmin(actor, 'test.update', testId, before, fields);
  } else {
    const { data, error } = await db.from('tests').insert({ ...fields, status: 'DRAFT' }).select('id').single();
    if (error) return { ok: false, errors: [error.code === '23505' ? 'That slug is already used' : error.message] };
    testId = data.id as string;
    await logAdmin(actor, 'test.create', testId, null, fields);
  }

  const result = await publishTestVersion(db, {
    testId: testId!,
    questionsBySection: input.questionsBySection,
    allowSampleContent: process.env.ALLOW_SAMPLE_CONTENT === 'true',
  });
  if (!result.ok) return { ok: false, errors: result.errors, id: testId };
  await logAdmin(actor, 'test.publish', testId!, null, { versionId: result.versionId });
  revalidatePath('/admin/tests');
  revalidatePath('/tests');
  return { ok: true, errors: [], id: testId };
}

export async function setTestStatus(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));
  if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) throw new Error('Invalid status');
  const db = supabaseAdmin();
  const { data: before } = await db.from('tests').select('status, current_version_id').eq('id', id).single();
  if (status === 'PUBLISHED' && !before?.current_version_id) throw new Error('Save the test with questions first');
  await db.from('tests').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  await logAdmin(actor, 'test.status', id, before, { status });
  revalidatePath('/admin/tests');
  revalidatePath('/tests');
}

export async function updatePreset(formData: FormData) {
  const actor = await requireAdmin();
  const id = String(formData.get('id'));
  const registrations = Number(formData.get('registrations_count'));
  const verified = formData.get('verified') === 'on';
  const sources = String(formData.get('verified_sources') ?? '').split(/[\s,]+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s));
  const db = supabaseAdmin();
  const { data: before } = await db.from('exam_presets').select('registrations_count, verified, verified_sources').eq('id', id).single();
  const after = {
    registrations_count: Number.isFinite(registrations) && registrations > 0 ? Math.round(registrations) : null,
    verified,
    verified_sources: sources,
    last_verified_at: verified ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  await db.from('exam_presets').update(after).eq('id', id);
  await logAdmin(actor, 'preset.update', id, before, after);
  revalidatePath('/admin/presets');
}

export async function addRankReference(formData: FormData): Promise<void> {
  const actor = await requireAdmin();
  const presetId = String(formData.get('preset_id'));
  const year = Number(formData.get('year'));
  const source = String(formData.get('source') ?? '').trim();
  const isSample = formData.get('is_sample') === 'on';
  const csv = String(formData.get('rows') ?? '');
  const parsed = Papa.parse<string[]>(csv.trim(), { skipEmptyLines: true });
  const rows = parsed.data
    .map((r) => ({ marks: Number(r[0]), percentile: Number(r[1]) }))
    .filter((r) => Number.isFinite(r.marks) && Number.isFinite(r.percentile) && r.percentile >= 0 && r.percentile <= 100);
  if (rows.length < 2 || !source || !Number.isInteger(year)) throw new Error('Need a year, a source and at least 2 valid "marks,percentile" rows');
  await supabaseAdmin().from('rank_reference').insert({ preset_id: presetId, year, rows, source, is_sample: isSample });
  await logAdmin(actor, 'rank_reference.add', presetId, null, { year, source, isSample, rows: rows.length });
  revalidatePath('/admin/presets');
}
