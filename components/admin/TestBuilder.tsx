"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Shuffle } from 'lucide-react';
import { saveTest, type SaveTestInput } from '@/app/admin/actions';
import { PRESET_QUESTION_EXAM } from '@/lib/tests/presetExams';
import type { ExamPreset, TestKind } from '@/lib/tests/types';

interface PoolQuestion {
  id: string;
  external_key: string | null;
  subject: string;
  chapter: string;
  type: string;
  difficulty: number;
  license_status: string;
  key_verified: boolean;
}

const KINDS: { id: TestKind; label: string }[] = [
  { id: 'FULL_MOCK', label: 'Full mock (exam mode, rank estimate)' },
  { id: 'SECTIONAL', label: 'Sectional test (exam mode)' },
  { id: 'CHAPTER_TEST', label: 'Chapter test (exam mode)' },
  { id: 'QUIZ', label: 'Quiz (instant answers)' },
];

/** Round-robin across chapters so auto-picked papers cover the syllabus evenly. */
function spreadPick(candidates: PoolQuestion[], n: number): string[] {
  const byChapter = new Map<string, PoolQuestion[]>();
  for (const q of [...candidates].sort(() => Math.random() - 0.5)) {
    byChapter.set(q.chapter, [...(byChapter.get(q.chapter) ?? []), q]);
  }
  const lists = Array.from(byChapter.values());
  const out: string[] = [];
  while (out.length < n && lists.some((l) => l.length > 0)) {
    for (const l of lists) {
      const q = l.shift();
      if (q && out.length < n) out.push(q.id);
    }
  }
  return out;
}

export default function TestBuilder({ presets, pools, initial }: {
  presets: ExamPreset[];
  pools: Record<string, PoolQuestion[]>;
  initial?: SaveTestInput;
}) {
  const router = useRouter();
  const [form, setForm] = useState<SaveTestInput>(initial ?? {
    slug: '',
    title: '',
    description: '',
    kind: 'FULL_MOCK',
    presetId: presets[0]?.id ?? '',
    durationMinutes: (presets[0]?.durationSeconds ?? 10800) / 60,
    guestAllowed: true,
    sortOrder: 0,
    questionsBySection: {},
  });
  const [chapterFilter, setChapterFilter] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const preset = presets.find((p) => p.id === form.presetId);
  const pool = useMemo(() => pools[PRESET_QUESTION_EXAM[form.presetId] ?? ''] ?? [], [pools, form.presetId]);
  const set = <K extends keyof SaveTestInput>(key: K, value: SaveTestInput[K]) => { setForm((f) => ({ ...f, [key]: value })); setSaved(false); };

  const setSection = (sectionId: string, ids: string[]) => set('questionsBySection', { ...form.questionsBySection, [sectionId]: ids });

  const submit = async () => {
    setSaving(true);
    setErrors([]);
    const result = await saveTest(form).catch((e) => ({ ok: false, errors: [String(e?.message ?? e)], id: undefined }));
    setSaving(false);
    if (!result.ok) {
      setErrors(result.errors);
      if (result.id && !form.id) set('id', result.id);
      return;
    }
    setSaved(true);
    if (!form.id && result.id) router.replace(`/admin/tests/${result.id}`);
    router.refresh();
  };

  const totalSelected = Object.values(form.questionsBySection).reduce((n, l) => n + l.length, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="heading-sm">{form.id ? 'Edit test' : 'New test'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-border rounded-2xl p-5">
        <label className="block text-[13px]">Title<input value={form.title} onChange={(e) => set('title', e.target.value)} className="input-field mt-1 h-11" /></label>
        <label className="block text-[13px]">URL slug (/tests/…)<input value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} className="input-field mt-1 h-11" /></label>
        <label className="block text-[13px] md:col-span-2">Description<textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className="w-full mt-1 rounded-xl border border-border bg-surface-light p-3 text-[14px]" /></label>
        <label className="block text-[13px]">Exam preset
          <select
            value={form.presetId}
            onChange={(e) => {
              const p = presets.find((x) => x.id === e.target.value);
              setForm((f) => ({ ...f, presetId: e.target.value, questionsBySection: {}, durationMinutes: f.kind === 'QUIZ' ? 0 : (p?.durationSeconds ?? 10800) / 60 }));
            }}
            className="input-field mt-1 h-11"
          >
            {presets.map((p) => <option key={p.id} value={p.id}>{p.name}{p.verified ? '' : ' (pattern not verified)'}</option>)}
          </select>
        </label>
        <label className="block text-[13px]">Kind
          <select value={form.kind} onChange={(e) => set('kind', e.target.value as TestKind)} className="input-field mt-1 h-11">
            {KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
          </select>
        </label>
        <label className="block text-[13px]">Duration (minutes, 0 = untimed quiz)<input type="number" min={0} value={form.durationMinutes} onChange={(e) => set('durationMinutes', Number(e.target.value))} className="input-field mt-1 h-11" /></label>
        <label className="block text-[13px]">Sort order<input type="number" value={form.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} className="input-field mt-1 h-11" /></label>
        <label className="flex items-center gap-2 text-[13px] md:col-span-2">
          <input type="checkbox" checked={form.guestAllowed} onChange={(e) => set('guestAllowed', e.target.checked)} className="accent-[#1A56DB]" />
          Guests can take this test without signing in
        </label>
        <label className="flex items-center gap-2 text-[13px] md:col-span-2">
          <input type="checkbox" checked={!!form.isWeekly} onChange={(e) => set('isWeekly', e.target.checked)} className="accent-[#1A56DB]" />
          Weekly open mock (everyone takes it in a set window; answers unlock when it closes)
        </label>
        {form.isWeekly && (
          <>
            <label className="block text-[13px]">Opens (India time)<input type="datetime-local" value={form.windowStart ?? ''} onChange={(e) => set('windowStart', e.target.value)} className="input-field mt-1 h-11" /></label>
            <label className="block text-[13px]">Closes (India time)<input type="datetime-local" value={form.windowEnd ?? ''} onChange={(e) => set('windowEnd', e.target.value)} className="input-field mt-1 h-11" /></label>
          </>
        )}
      </div>

      {preset && preset.sections.map((section) => {
        const selected = form.questionsBySection[section.id] ?? [];
        const candidates = pool.filter((q) => q.subject === section.subject);
        const chapters = Array.from(new Set(candidates.map((q) => q.chapter))).sort();
        const filter = chapterFilter[section.id] ?? '';
        const visible = candidates.filter((q) => !filter || q.chapter === filter);
        return (
          <div key={section.id} className="bg-white border border-border rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-ui font-bold text-[15px]">{section.name}</h3>
              <span className="text-[12px] text-text-muted">{selected.length} selected · real exam has {section.questionCount} · {candidates.length} approved in bank</span>
              <div className="ml-auto flex gap-2">
                <select value={filter} onChange={(e) => setChapterFilter((c) => ({ ...c, [section.id]: e.target.value }))} className="h-9 rounded-lg border border-border px-2 text-[12px]">
                  <option value="">All chapters</option>
                  {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button
                  onClick={() => {
                    const n = Number(prompt(`How many ${section.name} questions?`, String(Math.min(section.questionCount, candidates.length))) || 0);
                    if (n > 0) setSection(section.id, spreadPick(visible, n));
                  }}
                  className="h-9 px-3 rounded-lg border border-border text-[12px] font-semibold flex items-center gap-1.5 hover:bg-surface-light"
                >
                  <Shuffle className="w-3.5 h-3.5" /> Auto-pick
                </button>
                {selected.length > 0 && <button onClick={() => setSection(section.id, [])} className="h-9 px-3 rounded-lg border border-border text-[12px] font-semibold hover:bg-surface-light">Clear</button>}
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto border border-border rounded-xl divide-y divide-border/60">
              {visible.length === 0 && <p className="p-3 text-[13px] text-text-muted">No approved questions for this subject yet.</p>}
              {visible.map((q) => (
                <label key={q.id} className="flex items-center gap-3 px-3 py-2 text-[12px] hover:bg-surface-light cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(q.id)}
                    onChange={() => setSection(section.id, selected.includes(q.id) ? selected.filter((x) => x !== q.id) : [...selected, q.id])}
                    className="accent-[#1A56DB]"
                  />
                  <span className="font-mono w-44 truncate">{q.external_key}</span>
                  <span className="flex-1 truncate">{q.chapter}</span>
                  <span className="text-text-muted w-28">{q.type}</span>
                  {q.license_status === 'ORIGINAL_SAMPLE' && <span className="text-amber-700">sample</span>}
                  {!q.key_verified && <span className="text-red-600">key unchecked</span>}
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {errors.length > 0 && (
        <ul className="p-4 rounded-2xl border border-red-200 bg-red-50 text-[13px] text-red-700 space-y-1">
          {errors.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}
      {saved && <p className="p-3 rounded-xl bg-green-50 border border-green-200 text-[13px] text-green-700">Saved and published a new version.</p>}

      <button onClick={submit} disabled={saving || totalSelected === 0} className="h-12 px-6 rounded-xl bg-brand-blue text-white font-bold text-[14px] disabled:opacity-50 flex items-center gap-2">
        {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save &amp; publish ({totalSelected} questions)
      </button>
      <p className="text-[12px] text-text-muted">Saving creates a new version. Students already taking the test keep the version they started.</p>
    </div>
  );
}
