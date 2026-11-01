"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CalendarClock, Loader2, PlayCircle, Star, Trash2 } from 'lucide-react';
import MathHtml from './MathHtml';
import { QUESTION_EXAM_LABEL } from '@/lib/tests/presetExams';
import type { RevisionSummary, SavedQuestion } from '@/lib/tests/server/revision';

const dueLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export default function RevisionBoard({ summary, saved: initialSaved }: { summary: RevisionSummary[]; saved: SavedQuestion[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(initialSaved);

  const start = async (key: string, body: { exam: string; saved?: boolean }) => {
    setBusy(key);
    setError('');
    const res = await fetch('/api/revision/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => null);
    const json = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setError(json?.error ?? 'Could not build the revision quiz. Please try again.');
      setBusy(null);
      return;
    }
    router.push(`/tests/attempt/${json.attemptId}`);
  };

  const remove = async (questionId: string) => {
    setSaved((s) => s.filter((q) => q.questionId !== questionId));
    await fetch('/api/revision/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, on: false }),
    }).catch(() => null);
    router.refresh();
  };

  if (summary.length === 0) {
    return (
      <div className="text-center py-14 px-6 bg-white border border-border rounded-[24px]">
        <p className="heading-sm mb-2">Your revision list is empty</p>
        <p className="body-sm text-text-secondary max-w-md mx-auto mb-6">
          After a test, press <b>Revise mistakes</b> on the result page, or tap <b>Save for revision</b> on any question. They will show up here.
        </p>
        <Link href="/tests" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-blue text-white font-ui font-semibold text-[14px] hover:bg-[#1648c0]">
          Take a test <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const btn = 'inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl font-ui font-semibold text-[14px] disabled:opacity-50';

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {summary.map((s) => (
          <div key={s.exam} className="bg-white border border-border rounded-[24px] p-6 flex flex-col">
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-2">{QUESTION_EXAM_LABEL[s.exam] ?? s.exam}</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-display text-[44px] leading-none text-brand-navy">{s.dueToday}</span>
              <span className="text-[14px] text-text-muted font-ui mb-1">due today</span>
            </div>
            <p className="text-[13px] text-text-secondary mb-5 flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5" /> {s.dueThisWeek} more this week · {s.total} on your list · {s.bookmarked} saved
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              <button
                onClick={() => start(`due-${s.exam}`, { exam: s.exam })}
                disabled={!!busy || s.dueToday === 0}
                className={`${btn} bg-brand-blue text-white hover:bg-[#1648c0]`}
              >
                {busy === `due-${s.exam}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
                {s.dueToday === 0 ? 'All done for today' : `Revise ${Math.min(s.dueToday, 25)} now`}
              </button>
              {s.bookmarked > 0 && (
                <button
                  onClick={() => start(`saved-${s.exam}`, { exam: s.exam, saved: true })}
                  disabled={!!busy}
                  className={`${btn} bg-white border border-border text-text-primary hover:bg-surface-light`}
                >
                  {busy === `saved-${s.exam}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                  Practise saved
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
      {error && <p className="text-[13px] text-red-600" role="alert">{error}</p>}

      <section>
        <h2 className="heading-md mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-500" /> Saved questions</h2>
        {saved.length === 0 ? (
          <p className="body-sm text-text-secondary bg-white border border-border rounded-2xl p-6">
            Tap <b>Save for revision</b> on a question in your results to keep it here.
          </p>
        ) : (
          <ul className="space-y-3">
            {saved.map((q) => (
              <li key={q.questionId} className="bg-white border border-border rounded-2xl p-4 flex gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-text-muted mb-1.5">
                    {QUESTION_EXAM_LABEL[q.exam] ?? q.exam} · {q.subject} · {q.chapter} · next due {dueLabel(q.dueOn)}
                  </p>
                  <MathHtml html={q.stemHtml} className="text-[14px] text-text-primary line-clamp-3" />
                </div>
                <button
                  onClick={() => remove(q.questionId)}
                  className="shrink-0 self-start w-9 h-9 rounded-lg border border-border text-text-muted hover:text-red-600 hover:border-red-200 flex items-center justify-center"
                  aria-label="Remove from saved questions"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
