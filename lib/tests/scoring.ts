import type { AnswerKey, MarkingRule, Outcome, PaletteStatus, QuestionType, ResponseValue } from './types';
import { isNumericInput, isScoredStatus } from './palette';

export interface ScoreResult {
  marks: number;
  outcome: Outcome;
}

const NUMERIC_TOLERANCE = 1e-9;

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((x) => set.has(x));
}

function scoreNumerical(input: string, key: AnswerKey, rule: MarkingRule): ScoreResult {
  const value = Number(input.trim());
  let correct = false;
  if (key.numericalMin != null && key.numericalMax != null) {
    correct = value >= key.numericalMin - NUMERIC_TOLERANCE && value <= key.numericalMax + NUMERIC_TOLERANCE;
  } else if (key.numericalExact != null) {
    correct = Math.abs(value - key.numericalExact) <= NUMERIC_TOLERANCE;
  }
  return correct ? { marks: rule.correct, outcome: 'CORRECT' } : { marks: rule.wrong, outcome: 'WRONG' };
}

function scoreMulti(selected: string[], key: AnswerKey, rule: MarkingRule): ScoreResult {
  const correctSet = new Set(key.correctOptionIds);
  if (selected.some((id) => !correctSet.has(id))) return { marks: rule.wrong, outcome: 'WRONG' };
  if (selected.length === correctSet.size) return { marks: rule.correct, outcome: 'CORRECT' };
  if (rule.partialPerOption) return { marks: selected.length * rule.partialPerOption, outcome: 'PARTIAL' };
  return { marks: rule.wrong, outcome: 'WRONG' };
}

/**
 * Scores one response. Compares backend option ids only (never display positions).
 * Only ANSWERED and ANSWERED_AND_MARKED are evaluated; everything else is unattempted.
 */
export function scoreResponse(
  questionType: QuestionType,
  key: AnswerKey,
  status: PaletteStatus,
  value: ResponseValue,
  rule: MarkingRule,
): ScoreResult {
  const unattempted: ScoreResult = { marks: rule.unattempted, outcome: 'UNATTEMPTED' };
  if (!isScoredStatus(status)) return unattempted;

  if (questionType === 'NUMERICAL') {
    if (!isNumericInput(value.numericalInput)) return unattempted;
    return scoreNumerical(value.numericalInput!, key, rule);
  }

  const selected = Array.from(new Set(value.selectedOptionIds));
  if (selected.length === 0) return unattempted;

  if (questionType === 'MULTI_MCQ') return scoreMulti(selected, key, rule);

  return sameSet(selected, key.correctOptionIds)
    ? { marks: rule.correct, outcome: 'CORRECT' }
    : { marks: rule.wrong, outcome: 'WRONG' };
}

export function maxMarks(rule: MarkingRule): number {
  return rule.correct;
}
