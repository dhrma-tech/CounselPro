import type { PaletteStatus, QuestionType, ResponseValue } from './types';

export interface QuestionState {
  status: PaletteStatus;
  committed: ResponseValue | null;
}

export type PaletteAction =
  | { type: 'OPEN' }
  | { type: 'NAVIGATE_AWAY' }
  | { type: 'SAVE_AND_NEXT'; value: ResponseValue }
  | { type: 'CLEAR' }
  | { type: 'MARK_AND_NEXT'; value: ResponseValue }
  | { type: 'SAVE_AND_MARK'; value: ResponseValue };

export const EMPTY_RESPONSE: ResponseValue = { selectedOptionIds: [], numericalInput: null };

export const INITIAL_QUESTION_STATE: QuestionState = { status: 'NOT_VISITED', committed: null };

export function isNumericInput(input: string | null | undefined): boolean {
  if (input == null) return false;
  const trimmed = input.trim();
  return trimmed !== '' && trimmed !== '-' && trimmed !== '.' && Number.isFinite(Number(trimmed));
}

export function hasValue(questionType: QuestionType, value: ResponseValue | null): boolean {
  if (!value) return false;
  if (questionType === 'NUMERICAL') return isNumericInput(value.numericalInput);
  return value.selectedOptionIds.length > 0;
}

function normalize(questionType: QuestionType, value: ResponseValue): ResponseValue {
  if (questionType === 'NUMERICAL') {
    return { selectedOptionIds: [], numericalInput: value.numericalInput?.trim() ?? null };
  }
  return { selectedOptionIds: [...value.selectedOptionIds], numericalInput: null };
}

/**
 * Five-state CBT palette reducer, shared by the exam UI and the server write validator.
 * The on-screen (temp) buffer only becomes the committed response through a save/mark action;
 * navigating away discards it and keeps whatever was committed before.
 */
export function transitionQuestionState(
  questionType: QuestionType,
  current: QuestionState,
  action: PaletteAction,
): QuestionState {
  switch (action.type) {
    case 'OPEN':
    case 'NAVIGATE_AWAY':
      return current.status === 'NOT_VISITED' ? { status: 'NOT_ANSWERED', committed: null } : current;

    case 'SAVE_AND_NEXT':
      return hasValue(questionType, action.value)
        ? { status: 'ANSWERED', committed: normalize(questionType, action.value) }
        : { status: 'NOT_ANSWERED', committed: null };

    case 'CLEAR':
      return { status: 'NOT_ANSWERED', committed: null };

    case 'MARK_AND_NEXT':
    case 'SAVE_AND_MARK':
      return hasValue(questionType, action.value)
        ? { status: 'ANSWERED_AND_MARKED', committed: normalize(questionType, action.value) }
        : { status: 'MARKED_FOR_REVIEW', committed: null };
  }
}

/** Server-side guard: a status must be consistent with the value that comes with it. */
export function isConsistentWrite(questionType: QuestionType, status: PaletteStatus, value: ResponseValue): boolean {
  const answered = hasValue(questionType, value);
  if (status === 'ANSWERED' || status === 'ANSWERED_AND_MARKED') return answered;
  return !answered;
}

export function isScoredStatus(status: PaletteStatus): boolean {
  return status === 'ANSWERED' || status === 'ANSWERED_AND_MARKED';
}

export interface StatusCounts {
  answered: number;
  notAnswered: number;
  markedForReview: number;
  answeredAndMarked: number;
  notVisited: number;
}

export function countStatuses(statuses: PaletteStatus[]): StatusCounts {
  const counts: StatusCounts = { answered: 0, notAnswered: 0, markedForReview: 0, answeredAndMarked: 0, notVisited: 0 };
  for (const s of statuses) {
    if (s === 'ANSWERED') counts.answered++;
    else if (s === 'NOT_ANSWERED') counts.notAnswered++;
    else if (s === 'MARKED_FOR_REVIEW') counts.markedForReview++;
    else if (s === 'ANSWERED_AND_MARKED') counts.answeredAndMarked++;
    else counts.notVisited++;
  }
  return counts;
}
