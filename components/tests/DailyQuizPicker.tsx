"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Loader2, PlayCircle } from 'lucide-react';
import { DAILY_PRESET_COOKIE } from '@/lib/tests/presetExams';
import type { DailyStatus } from '@/lib/tests/server/daily';

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

function rememberPreset(id: string) {
  document.cookie = `${DAILY_PRESET_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
}

export default function DailyQuizPicker({ presets, statuses, initialPresetId }: {
  presets: { id: string; name: string }[];
  statuses: DailyStatus[];
  initialPresetId?: string;
}) {
  const router = useRouter();
  const [presetId, setPresetId] = useState(presets.some((p) => p.id === initialPresetId) ? initialPresetId : presets[0]?.id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = (id: string) => {
    setPresetId(id);
    setError('');
    rememberPreset(id);
  };

  const status = statuses.find((s) => s.presetId === presetId);

  const start = async () => {
    setBusy(true);
    setError('');
    const res = await fetch('/api/daily/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ presetId }),
    }).catch(() => null);
    const body = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setError(body?.error ?? 'Could not start the quiz. Please try again.');
      setBusy(false);
      return;
    }
    router.push(body.done ? `/tests/results/${body.attemptId}` : `/tests/attempt/${body.attemptId}`);
  };

  if (presets.length === 0) {
    return <p className="bg-white border border-border rounded-[24px] p-6 body-md">The daily quiz is being set up. Please check back soon.</p>;
  }

  const chip = (active: boolean) =>
    `px-3.5 py-2 rounded-xl text-[13px] font-semibold border transition-all flex items-center gap-1.5 ${active ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-secondary border-border hover:border-brand-blue/40'}`;

  return (
    <div className="bg-white border border-border rounded-[24px] p-6">
      <h2 className="heading-sm mb-3">Pick your exam</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {presets.map((p) => {
          const done = statuses.find((s) => s.presetId === p.id)?.status === 'DONE';
          return (
            <button key={p.id} onClick={() => pick(p.id)} className={chip(p.id === presetId)}>
              {done && <CheckCircle2 className="w-3.5 h-3.5" />}{p.name}
            </button>
          );
        })}
      </div>

      {status?.status === 'DONE' ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100">
          <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-[15px] text-text-primary">Done for today</p>
            {status.score != null && <p className="text-[13px] text-text-secondary">You scored {fmt(status.score)} / {fmt(status.maxScore ?? 0)}. A new quiz opens at midnight.</p>}
          </div>
          <Link href={`/tests/results/${status.attemptId}`} className="shrink-0 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-blue hover:underline">
            See solutions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <button
          onClick={start}
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-blue text-white font-ui font-bold text-[15px] hover:bg-[#1648c0] disabled:opacity-60 shadow-md shadow-brand-blue/20"
        >
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
          {status?.status === 'IN_PROGRESS' ? 'Continue today’s quiz' : 'Start today’s quiz'}
        </button>
      )}
      {error && <p className="mt-3 text-[13px] text-red-600" role="alert">{error}</p>}
    </div>
  );
}
