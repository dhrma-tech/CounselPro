import { describe, expect, it } from 'vitest';
import { scoreResponse } from '../scoring';
import type { AnswerKey, MarkingRule } from '../types';

const key = (correctOptionIds: string[], extra: Partial<AnswerKey> = {}): AnswerKey => ({
  correctOptionIds, numericalExact: null, numericalMin: null, numericalMax: null, ...extra,
});
const sel = (...ids: string[]) => ({ selectedOptionIds: ids, numericalInput: null });
const num = (n: string) => ({ selectedOptionIds: [], numericalInput: n });

const JEE_MAIN: MarkingRule = { correct: 4, wrong: -1, unattempted: 0 };
const MHT_MATHS: MarkingRule = { correct: 2, wrong: 0, unattempted: 0 };
const ADV_MULTI: MarkingRule = { correct: 4, wrong: -2, unattempted: 0, partialPerOption: 1 };
const ADV_NUM: MarkingRule = { correct: 3, wrong: 0, unattempted: 0 };

describe('single MCQ', () => {
  it('scores correct, wrong and unattempted', () => {
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'ANSWERED', sel('b'), JEE_MAIN)).toEqual({ marks: 4, outcome: 'CORRECT' });
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'ANSWERED', sel('a'), JEE_MAIN)).toEqual({ marks: -1, outcome: 'WRONG' });
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'NOT_ANSWERED', sel(), JEE_MAIN)).toEqual({ marks: 0, outcome: 'UNATTEMPTED' });
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'ANSWERED', sel('a'), MHT_MATHS).marks).toBe(0);
  });

  it('evaluates answered-and-marked like answered, and ignores marked-only', () => {
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'ANSWERED_AND_MARKED', sel('b'), JEE_MAIN).marks).toBe(4);
    expect(scoreResponse('SINGLE_MCQ', key(['b']), 'MARKED_FOR_REVIEW', sel('b'), JEE_MAIN).outcome).toBe('UNATTEMPTED');
  });
});

describe('JEE Advanced multi-correct partial marking', () => {
  const four = key(['a', 'b', 'c', 'd']);
  const three = key(['a', 'b', 'c']);
  const two = key(['a', 'b']);

  it('full marks only when exactly the correct set is chosen', () => {
    expect(scoreResponse('MULTI_MCQ', three, 'ANSWERED', sel('c', 'a', 'b'), ADV_MULTI)).toEqual({ marks: 4, outcome: 'CORRECT' });
  });
  it('+3 when 3 of 4 correct are chosen', () => {
    expect(scoreResponse('MULTI_MCQ', four, 'ANSWERED', sel('a', 'b', 'c'), ADV_MULTI)).toEqual({ marks: 3, outcome: 'PARTIAL' });
  });
  it('+2 when 2 of 3 or more are chosen', () => {
    expect(scoreResponse('MULTI_MCQ', three, 'ANSWERED', sel('a', 'c'), ADV_MULTI).marks).toBe(2);
  });
  it('+1 when 1 of 2 or more is chosen', () => {
    expect(scoreResponse('MULTI_MCQ', two, 'ANSWERED', sel('b'), ADV_MULTI).marks).toBe(1);
  });
  it('-2 when any wrong option is ticked', () => {
    expect(scoreResponse('MULTI_MCQ', four, 'ANSWERED', sel('a', 'x'), ADV_MULTI)).toEqual({ marks: -2, outcome: 'WRONG' });
  });
  it('without partial marking, an incomplete set is wrong', () => {
    expect(scoreResponse('MULTI_MCQ', three, 'ANSWERED', sel('a'), JEE_MAIN)).toEqual({ marks: -1, outcome: 'WRONG' });
  });
});

describe('numerical', () => {
  it('matches exact values numerically', () => {
    expect(scoreResponse('NUMERICAL', key([], { numericalExact: 2.5 }), 'ANSWERED', num(' 2.50 '), ADV_NUM).marks).toBe(3);
    expect(scoreResponse('NUMERICAL', key([], { numericalExact: -4 }), 'ANSWERED', num('-4'), ADV_NUM).marks).toBe(3);
    expect(scoreResponse('NUMERICAL', key([], { numericalExact: 2.5 }), 'ANSWERED', num('2.6'), ADV_NUM).outcome).toBe('WRONG');
  });
  it('accepts inclusive ranges', () => {
    const k = key([], { numericalMin: 0.29, numericalMax: 0.31 });
    expect(scoreResponse('NUMERICAL', k, 'ANSWERED', num('0.29'), ADV_NUM).outcome).toBe('CORRECT');
    expect(scoreResponse('NUMERICAL', k, 'ANSWERED', num('0.31'), ADV_NUM).outcome).toBe('CORRECT');
    expect(scoreResponse('NUMERICAL', k, 'ANSWERED', num('0.32'), ADV_NUM).outcome).toBe('WRONG');
  });
  it('treats non-numbers as unattempted', () => {
    expect(scoreResponse('NUMERICAL', key([], { numericalExact: 1 }), 'ANSWERED', num('abc'), JEE_MAIN)).toEqual({ marks: 0, outcome: 'UNATTEMPTED' });
  });
});
