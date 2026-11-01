export interface ReferenceRow {
  marks: number;
  percentile: number;
}

export type RankConfidence = 'Low' | 'Medium' | 'High';
export type RankMethod = 'COHORT' | 'REFERENCE' | 'BLENDED';

export interface RankEstimateInput {
  // Score already scaled to the full exam's total marks
  score: number;
  cohortScores: number[];
  cohortThreshold: number;
  referenceRows: ReferenceRow[] | null;
  referenceIsSample: boolean;
  registrations: number | null;
}

export interface RankEstimate {
  percentile: number;
  rankLow: number | null;
  rankHigh: number | null;
  confidence: RankConfidence;
  method: RankMethod;
  isSampleReference: boolean;
}

export function percentileFromCohort(score: number, cohortScores: number[]): number {
  if (cohortScores.length === 0) return 0;
  const atOrBelow = cohortScores.filter((s) => s <= score).length;
  return (100 * atOrBelow) / cohortScores.length;
}

export function percentileFromReference(score: number, rows: ReferenceRow[]): number {
  const sorted = [...rows].sort((a, b) => a.marks - b.marks);
  if (sorted.length === 0) return 0;
  if (score <= sorted[0].marks) return sorted[0].percentile;
  const last = sorted[sorted.length - 1];
  if (score >= last.marks) return last.percentile;
  for (let i = 1; i < sorted.length; i++) {
    const lo = sorted[i - 1];
    const hi = sorted[i];
    if (score <= hi.marks) {
      const t = hi.marks === lo.marks ? 1 : (score - lo.marks) / (hi.marks - lo.marks);
      return lo.percentile + t * (hi.percentile - lo.percentile);
    }
  }
  return last.percentile;
}

const SPREAD: Record<RankConfidence, number> = { High: 0.05, Medium: 0.12, Low: 0.25 };

function clampPercentile(p: number): number {
  return Math.min(100, Math.max(0, p));
}

/** See docs/mock-tests/RANK_METHOD.md. Always presented to students as an estimate. */
export function estimateRank(input: RankEstimateInput): RankEstimate | null {
  const hasCohort = input.cohortScores.length >= input.cohortThreshold;
  const hasReference = !!input.referenceRows && input.referenceRows.length >= 2;
  if (!hasCohort && !hasReference) return null;

  let percentile: number;
  let method: RankMethod;
  if (hasCohort && hasReference) {
    percentile = 0.5 * percentileFromCohort(input.score, input.cohortScores)
      + 0.5 * percentileFromReference(input.score, input.referenceRows!);
    method = 'BLENDED';
  } else if (hasCohort) {
    percentile = percentileFromCohort(input.score, input.cohortScores);
    method = 'COHORT';
  } else {
    percentile = percentileFromReference(input.score, input.referenceRows!);
    method = 'REFERENCE';
  }
  percentile = clampPercentile(percentile);

  let confidence: RankConfidence = 'Low';
  if (hasReference && !input.referenceIsSample) {
    confidence = hasCohort && input.cohortScores.length >= input.cohortThreshold * 10 ? 'High' : 'Medium';
  } else if (hasCohort && input.cohortScores.length >= input.cohortThreshold * 10) {
    confidence = 'Medium';
  }

  let rankLow: number | null = null;
  let rankHigh: number | null = null;
  if (input.registrations && input.registrations > 0) {
    const base = Math.max(1, ((100 - percentile) / 100) * input.registrations);
    const spread = SPREAD[confidence];
    rankLow = Math.max(1, Math.floor(base * (1 - spread)));
    rankHigh = Math.min(input.registrations, Math.max(rankLow, Math.ceil(base * (1 + spread))));
    rankLow = Math.min(rankLow, rankHigh);
  }

  return {
    percentile: Math.round(percentile * 1e7) / 1e7,
    rankLow,
    rankHigh,
    confidence,
    method,
    isSampleReference: hasReference && input.referenceIsSample,
  };
}
