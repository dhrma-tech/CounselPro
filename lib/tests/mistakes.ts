// Deterministic, explainable mistake tagging. Thresholds are deliberately simple so a student
// (or counsellor) can be told exactly why a question got its tag.

export type MistakeTag =
  | 'SILLY_MISTAKE'
  | 'CONCEPT_GAP'
  | 'TIME_PRESSURE'
  | 'GUESS'
  | 'CORRECT_BUT_SLOW'
  | 'SKIPPED_BUT_CAPABLE';

export const MISTAKE_LABELS: Record<MistakeTag, { label: string; help: string }> = {
  SILLY_MISTAKE: { label: 'Silly mistake', help: 'Wrong in a chapter you usually get right, answered quickly.' },
  CONCEPT_GAP: { label: 'Concept gap', help: 'Wrong after a real attempt. Revise this topic.' },
  TIME_PRESSURE: { label: 'Time pressure', help: 'Rushed or left in the last part of the test.' },
  GUESS: { label: 'Guess', help: 'Answered very fast or after switching answers several times.' },
  CORRECT_BUT_SLOW: { label: 'Correct but slow', help: 'Right, but took more than twice the usual time.' },
  SKIPPED_BUT_CAPABLE: { label: 'Skipped but capable', help: 'Left out, though you usually do well in this chapter.' },
};

export const MISTAKE_THRESHOLDS = {
  fastRatio: 0.4,
  fastMaxMs: 30_000,
  veryFastRatio: 0.25,
  veryFastMaxMs: 20_000,
  slowRatio: 2,
  lateFraction: 0.9,
  strongAccuracy: 0.6,
  capableAccuracy: 0.7,
  minHistory: 3,
};

export interface ChapterHistory {
  attempted: number;
  correct: number;
}

export interface MistakeInput {
  outcome: 'CORRECT' | 'PARTIAL' | 'WRONG' | 'UNATTEMPTED';
  timeSpentMs: number;
  visitCount: number;
  answerChanges: number;
  // When the question was last touched, as a fraction of the test time (0..1); null if untimed
  lastTouchedFraction: number | null;
  cohortMedianMs: number | null;
  history: ChapterHistory | null;
}

export interface MistakeContext {
  attemptMedianMs: number;
  autoSubmitted: boolean;
  timed: boolean;
}

function accuracy(h: ChapterHistory | null): number | null {
  if (!h || h.attempted < MISTAKE_THRESHOLDS.minHistory) return null;
  return h.correct / h.attempted;
}

export function tagMistake(q: MistakeInput, ctx: MistakeContext): MistakeTag | null {
  const t = MISTAKE_THRESHOLDS;
  const ref = q.cohortMedianMs ?? ctx.attemptMedianMs;
  const fast = ref > 0 && q.timeSpentMs < Math.min(ref * t.fastRatio, t.fastMaxMs);
  const veryFast = ref > 0 && q.timeSpentMs < Math.min(ref * t.veryFastRatio, t.veryFastMaxMs);
  const late = ctx.timed && q.lastTouchedFraction != null && q.lastTouchedFraction >= t.lateFraction;
  const acc = accuracy(q.history);

  switch (q.outcome) {
    case 'WRONG':
      if (fast && (veryFast || q.answerChanges >= 2)) return 'GUESS';
      if (late && q.timeSpentMs < ref) return 'TIME_PRESSURE';
      if (fast && acc != null && acc >= t.strongAccuracy) return 'SILLY_MISTAKE';
      return 'CONCEPT_GAP';
    case 'UNATTEMPTED':
      if ((q.visitCount > 0 && late) || (ctx.autoSubmitted && ctx.timed && q.visitCount === 0)) return 'TIME_PRESSURE';
      if (acc != null && acc >= t.capableAccuracy) return 'SKIPPED_BUT_CAPABLE';
      return null;
    case 'CORRECT':
    case 'PARTIAL':
      if (fast && q.answerChanges >= 2) return 'GUESS';
      if (ref > 0 && q.timeSpentMs > ref * t.slowRatio) return 'CORRECT_BUT_SLOW';
      return null;
  }
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export interface AnalysisItem {
  number: number;
  outcome: MistakeInput['outcome'];
  marks: number;
  maxMarks: number;
  wrongMarks: number;
  timeSpentMs: number;
  tag: MistakeTag | null;
}

export interface AttemptAnalysis {
  tags: Partial<Record<MistakeTag, number>>;
  taggedQuestions: Partial<Record<MistakeTag, number[]>>;
  guesses: { made: number; paidOff: number; marksGained: number; marksLost: number };
  timeSinks: number[];
  attemptStrategy: {
    accuracy: number | null;
    expectedPerAttempt: number | null;
    skipped: number;
    negativeMarking: boolean;
    verdict: 'ATTEMPT_ALL' | 'ATTEMPT_MORE' | 'BE_SELECTIVE' | 'NEUTRAL' | 'NOT_ENOUGH_DATA';
  };
  medianTimeMs: number;
}

export function summariseAttempt(items: AnalysisItem[]): AttemptAnalysis {
  const tags: AttemptAnalysis['tags'] = {};
  const taggedQuestions: AttemptAnalysis['taggedQuestions'] = {};
  const guesses = { made: 0, paidOff: 0, marksGained: 0, marksLost: 0 };
  for (const i of items) {
    if (!i.tag) continue;
    tags[i.tag] = (tags[i.tag] ?? 0) + 1;
    (taggedQuestions[i.tag] ??= []).push(i.number);
    if (i.tag === 'GUESS') {
      guesses.made++;
      if (i.marks > 0) { guesses.paidOff++; guesses.marksGained += i.marks; } else guesses.marksLost += -i.marks;
    }
  }

  const attemptedTimes = items.filter((i) => i.outcome !== 'UNATTEMPTED').map((i) => i.timeSpentMs);
  const medianTimeMs = median(attemptedTimes);
  const timeSinks = items.filter((i) => i.outcome === 'WRONG' && medianTimeMs > 0 && i.timeSpentMs > 2 * medianTimeMs).map((i) => i.number);

  const correct = items.filter((i) => i.outcome === 'CORRECT').length;
  const wrong = items.filter((i) => i.outcome === 'WRONG').length;
  const skipped = items.filter((i) => i.outcome === 'UNATTEMPTED').length;
  const negativeMarking = items.some((i) => i.wrongMarks < 0);
  const decided = correct + wrong;
  let strategy: AttemptAnalysis['attemptStrategy'];
  if (!negativeMarking) {
    strategy = { accuracy: decided ? correct / decided : null, expectedPerAttempt: null, skipped, negativeMarking, verdict: 'ATTEMPT_ALL' };
  } else if (decided < 4) {
    strategy = { accuracy: decided ? correct / decided : null, expectedPerAttempt: null, skipped, negativeMarking, verdict: 'NOT_ENOUGH_DATA' };
  } else {
    const acc = correct / decided;
    const avgCorrect = items.reduce((s, i) => s + i.maxMarks, 0) / items.length;
    const avgWrong = items.reduce((s, i) => s + i.wrongMarks, 0) / items.length;
    const expected = acc * avgCorrect + (1 - acc) * avgWrong;
    strategy = {
      accuracy: acc,
      expectedPerAttempt: Math.round(expected * 100) / 100,
      skipped,
      negativeMarking,
      verdict: expected > 0.5 ? 'ATTEMPT_MORE' : expected < 0 ? 'BE_SELECTIVE' : 'NEUTRAL',
    };
  }

  return { tags, taggedQuestions, guesses, timeSinks, attemptStrategy: strategy, medianTimeMs };
}
