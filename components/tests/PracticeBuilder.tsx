"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import type { ChapterGroup } from '@/lib/tests/server/practice';

interface PracticeBuilderProps {
  presets: { id: string; name: string }[];
  chaptersByPreset: Record<string, ChapterGroup[]>;
  initial: { presetId?: string; sectionId?: string; chapter?: string };
}

const COUNTS = [5, 10, 15, 20];

export default function PracticeBuilder({ presets, chaptersByPreset, initial }: PracticeBuilderProps) {
  const router = useRouter();
  const startPreset = presets.some((p) => p.id === initial.presetId) ? initial.presetId! : presets[0]?.id;
  const [presetId, setPresetId] = useState(startPreset);
  const groups = useMemo(() => chaptersByPreset[presetId ?? ''] ?? [], [chaptersByPreset, presetId]);
  const [sectionIds, setSectionIds] = useState<string[]>(() => {
    const gs = chaptersByPreset[startPreset ?? ''] ?? [];
    return initial.sectionId && gs.some((g) => g.sectionId === initial.sectionId) ? [initial.sectionId] : gs.map((g) => g.sectionId);
  });
  const [chapters, setChapters] = useState<string[]>(initial.chapter ? [initial.chapter] : []);
  const [count, setCount] = useState(10);
  const [timed, setTimed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const visibleGroups = groups.filter((g) => sectionIds.includes(g.sectionId));
  const available = visibleGroups.reduce((n, g) => n + g.chapters.filter((c) => chapters.length === 0 || chapters.includes(c.name)).reduce((m, c) => m + c.count, 0), 0);

  const pickPreset = (id: string) => {
    setPresetId(id);
    setSectionIds((chaptersByPreset[id] ?? []).map((g) => g.sectionId));
    setChapters([]);
  };
  const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  const start = async () => {
    setBusy(true);
    setError('');
    const res = await fetch('/api/practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ presetId, sectionIds, chapters, count, timed }),
    }).catch(() => null);
    const body = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setError(body?.error ?? 'Could not build the quiz. Please try again.');
      setBusy(false);
      return;
    }
    router.push(`/tests/attempt/${body.attemptId}`);
  };

  if (presets.length === 0) {
    return <p className="max-w-4xl mx-auto px-6 py-16 body-md text-center">Practice questions are being added. Please check back soon.</p>;
  }

  const chip = (active: boolean) =>
    `px-3.5 py-2 rounded-xl text-[13px] font-semibold border transition-all flex items-center gap-1.5 ${active ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-secondary border-border hover:border-brand-blue/40'}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <section>
        <h2 className="heading-sm mb-3">1. Exam</h2>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => <button key={p.id} onClick={() => pickPreset(p.id)} className={chip(p.id === presetId)}>{p.name}</button>)}
        </div>
      </section>

      <section>
        <h2 className="heading-sm mb-3">2. Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button key={g.sectionId} onClick={() => setSectionIds((s) => toggle(s, g.sectionId))} className={chip(sectionIds.includes(g.sectionId))}>
              {sectionIds.includes(g.sectionId) && <Check className="w-3.5 h-3.5" />}{g.subject}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="heading-sm mb-1">3. Chapters <span className="text-[13px] font-normal text-text-muted">(optional: leave empty for all)</span></h2>
        <div className="space-y-4 mt-3">
          {visibleGroups.map((g) => (
            <div key={g.sectionId}>
              <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-2">{g.subject}</p>
              <div className="flex flex-wrap gap-2">
                {g.chapters.map((c) => (
                  <button key={c.name} onClick={() => setChapters((s) => toggle(s, c.name))} className={chip(chapters.includes(c.name))}>
                    {chapters.includes(c.name) && <Check className="w-3.5 h-3.5" />}{c.name} <span className="opacity-60">({c.count})</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="heading-sm mb-3">4. Number of questions</h2>
          <div className="flex gap-2">
            {COUNTS.map((n) => <button key={n} onClick={() => setCount(n)} className={chip(count === n)}>{n}</button>)}
          </div>
          {available < count && available > 0 && <p className="text-[12px] text-text-muted mt-2">Only {available} questions are available for this selection right now.</p>}
        </div>
        <div>
          <h2 className="heading-sm mb-3">5. Timer</h2>
          <div className="flex gap-2">
            <button onClick={() => setTimed(false)} className={chip(!timed)}>Untimed</button>
            <button onClick={() => setTimed(true)} className={chip(timed)}>Exam pace</button>
          </div>
        </div>
      </section>

      {error && <p className="p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">{error}</p>}

      <button
        onClick={start}
        disabled={busy || sectionIds.length === 0 || available === 0}
        className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-ui font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20 disabled:opacity-50"
      >
        {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start practice <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  );
}
