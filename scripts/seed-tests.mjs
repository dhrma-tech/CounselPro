/**
 * Seeds exam presets, sample rank-reference curves, the original sample questions and sample tests.
 * Safe to re-run: questions are upserted by external key, tests by slug, and a new test version is
 * published only when the question list changed.
 *
 *   node scripts/seed-tests.mjs
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { createClient } from '@supabase/supabase-js';
import { existsSync } from 'node:fs';
import { presets, rankReferences } from '../data/test-samples/presets.mjs';
import { allSampleQuestions } from '../data/test-samples/questions.mjs';
import { sampleTests } from '../data/test-samples/tests.mjs';

if (existsSync('.env.local')) process.loadEnvFile('.env.local');

const { validateImportQuestion, upsertQuestions } = await import(new URL('../lib/tests/importFormat.ts', import.meta.url).href);
const { publishTestVersion } = await import(new URL('../lib/tests/publish.ts', import.meta.url).href);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

async function must(promise, label) {
  const { data, error } = await promise;
  if (error) throw new Error(`${label}: ${error.message}`);
  return data;
}

// 1. Presets (verified stays false until someone confirms against the official notice)
for (const p of presets) {
  await must(db.from('exam_presets').upsert({ ...p, updated_at: new Date().toISOString() }, { onConflict: 'id' }), `preset ${p.id}`);
}
console.log(`Presets: ${presets.length}`);

// 2. Sample rank references (only when the preset has none yet)
for (const r of rankReferences) {
  const existing = await must(db.from('rank_reference').select('id').eq('preset_id', r.preset_id).limit(1), 'rank_reference');
  if (existing.length === 0) await must(db.from('rank_reference').insert(r), `rank_reference ${r.preset_id}`);
}
console.log('Rank references: ok');

// 3. Questions
const normalized = [];
for (const raw of allSampleQuestions) {
  const result = validateImportQuestion(raw);
  if (!result.ok) {
    console.error(`Invalid sample ${result.externalKey}:`, result.errors);
    process.exit(1);
  }
  normalized.push(result.value);
}
const { inserted, updated } = await upsertQuestions(db, normalized);
console.log(`Questions: ${inserted} inserted, ${updated} updated`);

const keyRows = await must(db.from('questions').select('id, external_key').like('external_key', 'SAMPLE-%'), 'question ids');
const idByKey = new Map(keyRows.map((r) => [r.external_key, r.id]));

// 4. Tests
for (const t of sampleTests) {
  const { sections, ...fields } = t;
  const existing = await must(db.from('tests').select('id, current_version_id').eq('slug', t.slug).maybeSingle(), `test ${t.slug}`);
  let testId = existing?.id;
  if (testId) {
    await must(db.from('tests').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', testId), `update ${t.slug}`);
  } else {
    testId = (await must(db.from('tests').insert(fields).select('id').single(), `insert ${t.slug}`)).id;
  }

  const questionsBySection = Object.fromEntries(
    Object.entries(sections).map(([sectionId, keys]) => [sectionId, keys.map((k) => {
      const id = idByKey.get(k);
      if (!id) throw new Error(`Unknown question ${k} in ${t.slug}`);
      return id;
    })]),
  );

  if (existing?.current_version_id) {
    const current = await must(db.from('test_versions').select('sections').eq('id', existing.current_version_id).single(), 'version');
    const same = JSON.stringify(current.sections.map((s) => [s.id, s.questionIds])) ===
      JSON.stringify(Object.entries(questionsBySection));
    if (same) {
      console.log(`Test ${t.slug}: unchanged`);
      continue;
    }
  }

  const result = await publishTestVersion(db, { testId, questionsBySection, allowSampleContent: true });
  if (!result.ok) {
    console.error(`Test ${t.slug} failed:`, result.errors);
    process.exit(1);
  }
  console.log(`Test ${t.slug}: published`);
}

console.log('Done.');
