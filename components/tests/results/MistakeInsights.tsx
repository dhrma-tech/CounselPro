import { Brain, Clock, Dice5, Target } from 'lucide-react';
import { MISTAKE_LABELS, type AttemptAnalysis, type MistakeTag } from '@/lib/tests/mistakes';
import type { ResultItem } from '@/lib/tests/server/attempts';

const TAG_STYLE: Record<MistakeTag, string> = {
  CONCEPT_GAP: 'bg-red-50 text-red-700 border-red-100',
  SILLY_MISTAKE: 'bg-amber-50 text-amber-700 border-amber-100',
  TIME_PRESSURE: 'bg-orange-50 text-orange-700 border-orange-100',
  GUESS: 'bg-violet-50 text-violet-700 border-violet-100',
  CORRECT_BUT_SLOW: 'bg-blue-50 text-blue-700 border-blue-100',
  SKIPPED_BUT_CAPABLE: 'bg-teal-50 text-teal-700 border-teal-100',
};

const OUTCOME_CELL: Record<string, string> = {
  CORRECT: 'bg-green-500',
  PARTIAL: 'bg-amber-400',
  WRONG: 'bg-red-500',
  UNATTEMPTED: 'bg-slate-300',
};

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export default function MistakeInsights({ analysis, items }: { analysis: AttemptAnalysis | null; items: ResultItem[] }) {
  if (!analysis) return null;
  const tags = (Object.entries(analysis.tags) as [MistakeTag, number][]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  const s = analysis.attemptStrategy;
  const maxTime = Math.max(1, ...items.map((i) => i.timeSpentMs));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-white border border-border rounded-[24px] p-6">
        <h2 className="heading-sm mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-brand-violet" /> Mistake analysis</h2>
        {tags.length === 0 ? (
          <p className="body-sm text-text-secondary">No clear mistake patterns in this attempt.</p>
        ) : (
          <ul className="space-y-2.5">
            {tags.map(([tag, n]) => (
              <li key={tag} className={`flex items-start gap-3 p-3 rounded-xl border ${TAG_STYLE[tag]}`}>
                <span className="font-bold text-[15px] w-6 text-center shrink-0">{n}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-[13px]">{MISTAKE_LABELS[tag].label}</p>
                  <p className="text-[12px] opacity-80">
                    {MISTAKE_LABELS[tag].help} Q{(analysis.taggedQuestions[tag] ?? []).join(', Q')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {analysis.guesses.made > 0 && (
          <p className="mt-4 flex gap-2 text-[13px] text-text-secondary">
            <Dice5 className="w-4 h-4 shrink-0 mt-0.5 text-brand-violet" />
            <span>
              You guessed on {analysis.guesses.made} question{analysis.guesses.made === 1 ? '' : 's'}: {analysis.guesses.paidOff} paid off
              {analysis.guesses.marksGained > 0 ? ` (+${fmt(analysis.guesses.marksGained)})` : ''}
              {analysis.guesses.marksLost > 0 ? `, and they cost you ${fmt(analysis.guesses.marksLost)} mark${analysis.guesses.marksLost === 1 ? '' : 's'}` : ''}.
              {analysis.guesses.marksLost > analysis.guesses.marksGained ? ` Skipping those guesses would have scored +${fmt(analysis.guesses.marksLost - analysis.guesses.marksGained)} more.` : ''}
            </span>
          </p>
        )}
      </div>

      <div className="bg-white border border-border rounded-[24px] p-6">
        <h2 className="heading-sm mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-brand-blue" /> Attempt strategy</h2>
        <p className="text-[14px] text-text-secondary mb-5">
          {s.verdict === 'ATTEMPT_ALL' && 'There is no negative marking in this test, so never leave a question blank. Always mark your best guess.'}
          {s.verdict === 'ATTEMPT_MORE' && `On the questions you attempted you were right ${Math.round((s.accuracy ?? 0) * 100)}% of the time. Each extra attempt is worth about +${fmt(s.expectedPerAttempt ?? 0)} marks on average, so you can afford to attempt more of the ${s.skipped} you skipped when you can narrow down the options.`}
          {s.verdict === 'BE_SELECTIVE' && `On the questions you attempted you were right only ${Math.round((s.accuracy ?? 0) * 100)}% of the time, so with negative marking each attempt is losing marks on average. Answer only when you can rule out most options.`}
          {s.verdict === 'NEUTRAL' && `Your accuracy on attempted questions was ${Math.round((s.accuracy ?? 0) * 100)}%. Extra guesses would roughly break even. Attempt only when you can eliminate at least one option.`}
          {s.verdict === 'NOT_ENOUGH_DATA' && 'Attempt a few more questions in your next test so we can suggest an attempt strategy.'}
        </p>
        <p className="text-[12px] font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time per question</p>
        <div className="flex flex-wrap gap-1" role="img" aria-label="Time spent per question, coloured by result">
          {items.map((i) => (
            <div
              key={i.questionId}
              title={`Q${i.number}: ${Math.round(i.timeSpentMs / 1000)}s, ${i.outcome.toLowerCase()}`}
              className="w-6 flex flex-col justify-end h-12 bg-surface-light rounded"
            >
              <div className={`${OUTCOME_CELL[i.outcome] ?? OUTCOME_CELL.UNATTEMPTED} rounded`} style={{ height: `${Math.max(8, (i.timeSpentMs / maxTime) * 100)}%` }} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-text-muted">
          Taller bar = more time. Green correct · red wrong · amber partly correct · grey not attempted.
          {analysis.timeSinks.length > 0 && ` Time sinks: Q${analysis.timeSinks.join(', Q')}.`}
        </p>
      </div>
    </section>
  );
}
