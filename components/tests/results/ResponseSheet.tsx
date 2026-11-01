"use client";

import { useMemo, useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import MathHtml from '../MathHtml';
import PaletteBadge from '../PaletteBadge';
import AskAi from '../ai/AskAi';
import { MISTAKE_LABELS } from '@/lib/tests/mistakes';
import type { ResultItem } from '@/lib/tests/server/attempts';
import type { AiLanguage } from '@/lib/tests/aiTypes';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'WRONG', label: 'Wrong' },
  { id: 'CORRECT', label: 'Correct' },
  { id: 'PARTIAL', label: 'Partly correct' },
  { id: 'UNATTEMPTED', label: 'Not attempted' },
];

const OUTCOME_STYLE: Record<string, string> = {
  CORRECT: 'bg-green-50 text-green-700',
  PARTIAL: 'bg-amber-50 text-amber-700',
  WRONG: 'bg-red-50 text-red-600',
  UNATTEMPTED: 'bg-surface-light text-text-muted',
};
const OUTCOME_LABEL: Record<string, string> = { CORRECT: 'Correct', PARTIAL: 'Partial', WRONG: 'Wrong', UNATTEMPTED: 'Not attempted' };

function seconds(ms: number) {
  const s = Math.round(ms / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
}

interface ResponseSheetProps {
  items: ResultItem[];
  attemptId: string;
  signedIn: boolean;
  solutionsLocked: boolean;
  aiOn: boolean;
  aiLanguage: AiLanguage;
}

export default function ResponseSheet({ items, attemptId, signedIn, solutionsLocked, aiOn, aiLanguage }: ResponseSheetProps) {
  const [filter, setFilter] = useState('all');
  const [section, setSection] = useState('all');
  const [open, setOpen] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(() => new Set(items.filter((i) => i.bookmarked).map((i) => i.questionId)));

  const toggleSave = async (questionId: string) => {
    const on = !saved.has(questionId);
    setSaved((s) => {
      const next = new Set(s);
      if (on) next.add(questionId); else next.delete(questionId);
      return next;
    });
    await fetch('/api/revision/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId, questionId, on }),
    }).catch(() => null);
  };
  const sections = useMemo(() => Array.from(new Map(items.map((i) => [i.sectionId, i.sectionName])).entries()), [items]);

  const shown = items.filter((i) => (filter === 'all' || i.outcome === filter) && (section === 'all' || i.sectionId === section));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 print:hidden">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border ${filter === f.id ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-text-secondary border-border'}`}
          >
            {f.label} ({f.id === 'all' ? items.length : items.filter((i) => i.outcome === f.id).length})
          </button>
        ))}
        {sections.length > 1 && (
          <select value={section} onChange={(e) => setSection(e.target.value)} className="h-8 rounded-lg border border-border bg-white px-2 text-[12px] font-semibold" aria-label="Filter by subject">
            <option value="all">All subjects</option>
            {sections.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
          </select>
        )}
      </div>

      <div className="bg-white border border-border rounded-2xl divide-y divide-border overflow-hidden">
        {shown.length === 0 && <p className="p-6 text-[14px] text-text-muted text-center">No questions match this filter.</p>}
        {shown.map((item) => {
          const isOpen = open === item.questionId;
          return (
            <div key={item.questionId}>
              <button
                onClick={() => setOpen(isOpen ? null : item.questionId)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-light/60"
                aria-expanded={isOpen}
              >
                <PaletteBadge status={item.status} label={item.number} size={32} />
                <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr_0.6fr] gap-x-3 gap-y-0.5 text-[12px] items-center">
                  <span className="col-span-2 sm:col-span-1 truncate font-semibold text-text-primary text-[13px]">{item.subject} · {item.chapter}</span>
                  <span className="text-text-secondary">You: <b className="text-text-primary">{item.yourAnswer}</b></span>
                  <span className="text-text-secondary">Answer: <b className="text-green-700">{item.correctAnswer}</b></span>
                  <span className="text-text-muted">{seconds(item.timeSpentMs)}</span>
                  <span className={`justify-self-start px-2 py-0.5 rounded-full font-semibold ${OUTCOME_STYLE[item.outcome] ?? OUTCOME_STYLE.UNATTEMPTED}`}>
                    {item.marks > 0 ? `+${item.marks}` : item.marks} · {OUTCOME_LABEL[item.outcome] ?? item.outcome}
                  </span>
                  {item.mistakeTag && (
                    <span className="col-span-2 sm:col-span-5 text-[11px] font-semibold text-brand-violet" title={MISTAKE_LABELS[item.mistakeTag].help}>
                      {MISTAKE_LABELS[item.mistakeTag].label}
                    </span>
                  )}
                </div>
                {saved.has(item.questionId) && <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" aria-label="Saved for revision" />}
                <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-6 pb-6 pt-2 space-y-4 text-[15px] bg-surface-light/40">
                  {item.passageHtml && <MathHtml html={item.passageHtml} className="p-3 bg-white border border-border rounded-xl text-text-secondary" />}
                  <MathHtml html={item.stemHtml} className="text-text-primary leading-relaxed" />
                  {item.options.length > 0 && (
                    <ul className="space-y-2">
                      {item.options.map((o) => (
                        <li
                          key={o.letter}
                          className={`flex gap-3 p-3 rounded-xl border text-[14px] ${o.isCorrect ? 'border-green-500 bg-green-50' : o.isSelected ? 'border-red-300 bg-red-50' : 'border-border bg-white'}`}
                        >
                          <span className="font-bold shrink-0">{o.letter}.</span>
                          <MathHtml html={o.html} className="flex-1" />
                          {o.isSelected && <span className="text-[11px] font-semibold text-text-muted shrink-0">Your choice</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.solutionHtml && (
                    <div className="p-4 bg-white border border-border rounded-xl">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">Solution</p>
                      <MathHtml html={item.solutionHtml} className="text-text-secondary leading-relaxed" />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[12px] text-text-muted flex-1">
                      Visited {item.visitCount} time{item.visitCount === 1 ? '' : 's'} · answer changed {item.answerChanges} time{item.answerChanges === 1 ? '' : 's'} · {seconds(item.timeSpentMs)} spent
                    </p>
                    {signedIn && (
                      <button
                        onClick={() => toggleSave(item.questionId)}
                        className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[12px] font-semibold print:hidden ${saved.has(item.questionId) ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-border bg-white text-text-secondary hover:bg-surface-light'}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${saved.has(item.questionId) ? 'fill-amber-400 text-amber-500' : ''}`} />
                        {saved.has(item.questionId) ? 'Saved for revision' : 'Save for revision'}
                      </button>
                    )}
                  </div>
                  {!solutionsLocked && aiOn && (
                    <div className="print:hidden">
                      <AskAi
                        attemptId={attemptId}
                        questionId={item.questionId}
                        modes={item.outcome === 'WRONG' || item.outcome === 'PARTIAL' ? ['EXPLAIN', 'WHY_WRONG', 'STUCK'] : ['EXPLAIN', 'STUCK']}
                        signedIn={signedIn}
                        loginNext={`/tests/results/${attemptId}`}
                        defaultLanguage={aiLanguage}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
