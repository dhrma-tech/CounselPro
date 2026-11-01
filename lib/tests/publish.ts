// Test publishing shared by the admin area and scripts/seed-tests.mjs.
// No path aliases / relative runtime imports so Node can run it directly.
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarkingRules, PresetSection, QuestionType, SectionalLock, VersionSection } from './types';

export interface PublishInput {
  testId: string;
  // Question ids per preset section id
  questionsBySection: Record<string, string[]>;
  allowSampleContent: boolean;
  allowUnverifiedKeys?: boolean;
}

export interface PublishResult {
  ok: boolean;
  errors: string[];
  versionId?: string;
}

interface PresetLike {
  id: string;
  duration_seconds: number;
  sections: PresetSection[];
  sectional_lock: SectionalLock | null;
  marking: MarkingRules;
}

function ruleCorrect(type: QuestionType, section: PresetSection, defaults: MarkingRules): number {
  const rule = section.marking?.[type] ?? defaults[type]
    ?? (type === 'PARAGRAPH' || type === 'MATRIX_MATCH' ? section.marking?.SINGLE_MCQ ?? defaults.SINGLE_MCQ : undefined);
  return rule?.correct ?? 1;
}

export async function publishTestVersion(db: SupabaseClient, input: PublishInput): Promise<PublishResult> {
  const { data: test, error: tErr } = await db.from('tests').select('*').eq('id', input.testId).single();
  if (tErr || !test) return { ok: false, errors: ['Test not found'] };
  const { data: preset, error: pErr } = await db.from('exam_presets').select('*').eq('id', test.preset_id).single();
  if (pErr || !preset) return { ok: false, errors: ['Preset not found'] };
  const p = preset as PresetLike;

  const allIds = Object.values(input.questionsBySection).flat();
  if (allIds.length === 0) return { ok: false, errors: ['Add at least one question'] };
  if (new Set(allIds).size !== allIds.length) return { ok: false, errors: ['A question is used more than once'] };

  const { data: questions, error: qErr } = await db
    .from('questions')
    .select('id, external_key, type, status, license_status, key_verified')
    .in('id', allIds);
  if (qErr) return { ok: false, errors: [qErr.message] };
  const byId = new Map((questions ?? []).map((q) => [q.id as string, q]));

  const errors: string[] = [];
  for (const id of allIds) {
    const q = byId.get(id);
    const label = q?.external_key ?? id;
    if (!q) { errors.push(`${label}: question not found`); continue; }
    if (q.status !== 'APPROVED') errors.push(`${label}: only APPROVED questions can be published`);
    if (q.license_status === 'UNKNOWN') errors.push(`${label}: licence is UNKNOWN`);
    if (q.license_status === 'ORIGINAL_SAMPLE' && !input.allowSampleContent) errors.push(`${label}: sample content is blocked (ALLOW_SAMPLE_CONTENT is off)`);
    if (!q.key_verified && !input.allowUnverifiedKeys) errors.push(`${label}: answer key not verified`);
  }
  for (const sectionId of Object.keys(input.questionsBySection)) {
    if (!p.sections.some((s) => s.id === sectionId)) errors.push(`Unknown section "${sectionId}" for preset ${p.id}`);
  }
  if (errors.length > 0) return { ok: false, errors };

  let totalMarks = 0;
  const sections: VersionSection[] = [...p.sections]
    .sort((a, b) => a.order - b.order)
    .filter((s) => (input.questionsBySection[s.id] ?? []).length > 0)
    .map((s) => {
      const questionIds = input.questionsBySection[s.id];
      for (const id of questionIds) totalMarks += ruleCorrect(byId.get(id)!.type as QuestionType, s, p.marking);
      return {
        id: s.id,
        name: s.name,
        subject: s.subject,
        questionIds,
        attemptLimit: s.attemptLimit ?? null,
        marking: s.marking,
        languages: s.languages,
      };
    });

  let sectionalLock = p.sectional_lock;
  if (sectionalLock && test.duration_seconds > 0 && test.duration_seconds !== p.duration_seconds) {
    sectionalLock = {
      ...sectionalLock,
      switchAtRemainingSeconds: Math.round(test.duration_seconds * (sectionalLock.switchAtRemainingSeconds / p.duration_seconds)),
    };
  }
  if (sectionalLock && test.duration_seconds === 0) sectionalLock = null;

  const { data: last } = await db.from('test_versions').select('version').eq('test_id', test.id).order('version', { ascending: false }).limit(1);
  const version = (last?.[0]?.version ?? 0) + 1;

  const { data: created, error: vErr } = await db
    .from('test_versions')
    .insert({
      test_id: test.id,
      version,
      sections,
      marking: p.marking,
      sectional_lock: sectionalLock,
      duration_seconds: test.duration_seconds,
      total_marks: totalMarks,
    })
    .select('id')
    .single();
  if (vErr) return { ok: false, errors: [vErr.message] };

  const isSample = allIds.some((id) => byId.get(id)!.license_status === 'ORIGINAL_SAMPLE');
  const { error: uErr } = await db
    .from('tests')
    .update({
      current_version_id: created.id,
      status: test.is_practice ? test.status : 'PUBLISHED',
      is_sample: isSample,
      updated_at: new Date().toISOString(),
    })
    .eq('id', test.id);
  if (uErr) return { ok: false, errors: [uErr.message] };

  return { ok: true, errors: [], versionId: created.id };
}
