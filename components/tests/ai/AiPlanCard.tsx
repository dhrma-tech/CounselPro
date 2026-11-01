"use client";

import { useCallback, useEffect, useState } from 'react';
import { CalendarCheck, Loader2, RefreshCcw, Sparkles } from 'lucide-react';
import MathHtml from '../MathHtml';
import { aiTextToHtml } from '@/lib/tests/client/aiText';
import { AI_LANGUAGE_LABELS, type AiLanguage, type AiPlan } from '@/lib/tests/aiTypes';

export default function AiPlanCard({ attemptId, initialPlan, defaultLanguage = 'en' }: { attemptId: string; initialPlan: AiPlan | null; defaultLanguage?: AiLanguage }) {
  const [language, setLanguage] = useState<AiLanguage>(initialPlan?.language ?? defaultLanguage);
  const [plan, setPlan] = useState<AiPlan | null>(initialPlan && initialPlan.language === language ? initialPlan : null);
  const [loading, setLoading] = useState(!plan);
  const [error, setError] = useState('');

  const load = useCallback(async (lang: AiLanguage) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/attempts/${attemptId}/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setPlan(body.plan);
    } catch (e) {
      setError((e as Error).message || 'Could not load your plan.');
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    if (!plan || plan.language !== language) void load(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="bg-white border border-border rounded-[24px] p-6 print:break-inside-avoid">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="heading-sm flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-violet" /> Your AI study plan</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as AiLanguage)}
          className="ml-auto h-8 rounded-lg border border-border bg-white px-2 text-[12px] font-semibold print:hidden"
          aria-label="Plan language"
        >
          {(Object.keys(AI_LANGUAGE_LABELS) as AiLanguage[]).map((l) => <option key={l} value={l}>{AI_LANGUAGE_LABELS[l]}</option>)}
        </select>
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse" aria-label="Loading your plan">
          <div className="h-4 bg-surface-light rounded w-3/4" />
          <div className="h-4 bg-surface-light rounded w-2/3" />
          <div className="h-4 bg-surface-light rounded w-1/2" />
          <p className="flex items-center gap-2 text-[12px] text-text-muted pt-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Writing your plan from this result…</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-text-secondary">
          <span>{error}</span>
          <button onClick={() => load(language)} className="inline-flex items-center gap-1 text-brand-blue font-semibold hover:underline print:hidden">
            <RefreshCcw className="w-3.5 h-3.5" /> Try again
          </button>
        </div>
      )}

      {!loading && plan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-3">Top 3 things to fix</p>
            <ol className="space-y-3">
              {plan.fixes.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-violet/10 text-brand-violet font-bold text-[12px] flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <MathHtml html={aiTextToHtml(f.title)} className="font-semibold text-[14px] text-text-primary" />
                    <MathHtml html={aiTextToHtml(f.detail)} className="text-[13px] text-text-secondary leading-relaxed" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-1.5"><CalendarCheck className="w-4 h-4" /> Next 7 days</p>
            <ol className="space-y-2">
              {plan.week.map((d) => (
                <li key={d.day} className="flex gap-3 text-[13px]">
                  <span className="shrink-0 w-12 font-bold text-brand-navy">Day {d.day}</span>
                  <MathHtml html={aiTextToHtml(d.task)} className="text-text-secondary leading-relaxed" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      <p className="text-[11px] text-text-muted mt-4">Written by AI from your scores. Use it as a guide; your counsellor can adjust it.</p>
    </div>
  );
}
