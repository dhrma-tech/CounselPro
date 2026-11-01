import { describe, expect, it } from 'vitest';
import {
  INITIAL_QUESTION_STATE,
  countStatuses,
  isConsistentWrite,
  transitionQuestionState as t,
  type QuestionState,
} from '../palette';

const A = { selectedOptionIds: ['a'], numericalInput: null };
const NONE = { selectedOptionIds: [], numericalInput: null };

describe('transitionQuestionState', () => {
  it('opening a not-visited question makes it not answered', () => {
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'OPEN' }).status).toBe('NOT_ANSWERED');
  });

  it('opening an answered question keeps it', () => {
    const s: QuestionState = { status: 'ANSWERED', committed: A };
    expect(t('SINGLE_MCQ', s, { type: 'OPEN' })).toEqual(s);
  });

  it('save & next with and without a value', () => {
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'SAVE_AND_NEXT', value: A })).toEqual({ status: 'ANSWERED', committed: A });
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'SAVE_AND_NEXT', value: NONE })).toEqual({ status: 'NOT_ANSWERED', committed: null });
  });

  it('clear resets to not answered', () => {
    const s: QuestionState = { status: 'ANSWERED_AND_MARKED', committed: A };
    expect(t('SINGLE_MCQ', s, { type: 'CLEAR' })).toEqual({ status: 'NOT_ANSWERED', committed: null });
  });

  it('mark for review with and without a value', () => {
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'MARK_AND_NEXT', value: NONE }).status).toBe('MARKED_FOR_REVIEW');
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'MARK_AND_NEXT', value: A }).status).toBe('ANSWERED_AND_MARKED');
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'SAVE_AND_MARK', value: A }).status).toBe('ANSWERED_AND_MARKED');
  });

  it('navigating away discards the unsaved buffer and keeps the committed answer', () => {
    const answered: QuestionState = { status: 'ANSWERED', committed: A };
    expect(t('SINGLE_MCQ', answered, { type: 'NAVIGATE_AWAY' })).toEqual(answered);
    expect(t('SINGLE_MCQ', INITIAL_QUESTION_STATE, { type: 'NAVIGATE_AWAY' })).toEqual({ status: 'NOT_ANSWERED', committed: null });
  });

  it('numerical values need a real number', () => {
    expect(t('NUMERICAL', INITIAL_QUESTION_STATE, { type: 'SAVE_AND_NEXT', value: { selectedOptionIds: [], numericalInput: ' -2.5 ' } }))
      .toEqual({ status: 'ANSWERED', committed: { selectedOptionIds: [], numericalInput: '-2.5' } });
    expect(t('NUMERICAL', INITIAL_QUESTION_STATE, { type: 'SAVE_AND_NEXT', value: { selectedOptionIds: [], numericalInput: '-' } }).status)
      .toBe('NOT_ANSWERED');
  });
});

describe('isConsistentWrite', () => {
  it('rejects answered statuses without a value and unanswered statuses with one', () => {
    expect(isConsistentWrite('SINGLE_MCQ', 'ANSWERED', NONE)).toBe(false);
    expect(isConsistentWrite('SINGLE_MCQ', 'NOT_ANSWERED', A)).toBe(false);
    expect(isConsistentWrite('SINGLE_MCQ', 'ANSWERED_AND_MARKED', A)).toBe(true);
    expect(isConsistentWrite('SINGLE_MCQ', 'MARKED_FOR_REVIEW', NONE)).toBe(true);
  });
});

describe('countStatuses', () => {
  it('counts each state', () => {
    expect(countStatuses(['ANSWERED', 'ANSWERED', 'NOT_VISITED', 'MARKED_FOR_REVIEW', 'ANSWERED_AND_MARKED', 'NOT_ANSWERED']))
      .toEqual({ answered: 2, notAnswered: 1, markedForReview: 1, answeredAndMarked: 1, notVisited: 1 });
  });
});
