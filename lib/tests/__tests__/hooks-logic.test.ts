import { describe, expect, it } from 'vitest';
import { summariseAttempt, tagMistake, type MistakeInput } from '../mistakes';
import { EMPTY_STREAK, completeDay, streakToday } from '../streak';
import { nextReview } from '../spacedRepetition';
import { addDays, daysBetween, istDate, istInstant, istLocalInput, weekStart } from '../istDate';

const base: MistakeInput = { outcome: 'WRONG', timeSpentMs: 60_000, visitCount: 1, answerChanges: 0, lastTouchedFraction: 0.3, cohortMedianMs: null, history: null };
const ctx = { attemptMedianMs: 60_000, autoSubmitted: false, timed: true };

describe('tagMistake', () => {
  it('very fast wrong answers are guesses', () => {
    expect(tagMistake({ ...base, timeSpentMs: 5_000 }, ctx)).toBe('GUESS');
  });
  it('fast wrong in a strong chapter is a silly mistake', () => {
    expect(tagMistake({ ...base, timeSpentMs: 20_000, history: { attempted: 5, correct: 4 } }, ctx)).toBe('SILLY_MISTAKE');
  });
  it('rushed at the end is time pressure', () => {
    expect(tagMistake({ ...base, timeSpentMs: 40_000, lastTouchedFraction: 0.95 }, ctx)).toBe('TIME_PRESSURE');
  });
  it('a normal wrong answer is a concept gap', () => {
    expect(tagMistake(base, ctx)).toBe('CONCEPT_GAP');
  });
  it('skipped in a strong chapter is skipped-but-capable; unvisited at auto-submit is time pressure', () => {
    expect(tagMistake({ ...base, outcome: 'UNATTEMPTED', history: { attempted: 4, correct: 4 } }, ctx)).toBe('SKIPPED_BUT_CAPABLE');
    expect(tagMistake({ ...base, outcome: 'UNATTEMPTED', visitCount: 0 }, { ...ctx, autoSubmitted: true })).toBe('TIME_PRESSURE');
    expect(tagMistake({ ...base, outcome: 'UNATTEMPTED' }, ctx)).toBeNull();
  });
  it('slow correct answers are flagged', () => {
    expect(tagMistake({ ...base, outcome: 'CORRECT', timeSpentMs: 200_000 }, ctx)).toBe('CORRECT_BUT_SLOW');
    expect(tagMistake({ ...base, outcome: 'CORRECT' }, ctx)).toBeNull();
  });
});

describe('summariseAttempt', () => {
  it('counts guesses and recommends a strategy', () => {
    const items = [
      { number: 1, outcome: 'CORRECT' as const, marks: 4, maxMarks: 4, wrongMarks: -1, timeSpentMs: 60_000, tag: null },
      { number: 2, outcome: 'CORRECT' as const, marks: 4, maxMarks: 4, wrongMarks: -1, timeSpentMs: 60_000, tag: null },
      { number: 3, outcome: 'CORRECT' as const, marks: 4, maxMarks: 4, wrongMarks: -1, timeSpentMs: 60_000, tag: null },
      { number: 4, outcome: 'WRONG' as const, marks: -1, maxMarks: 4, wrongMarks: -1, timeSpentMs: 3_000, tag: 'GUESS' as const },
      { number: 5, outcome: 'UNATTEMPTED' as const, marks: 0, maxMarks: 4, wrongMarks: -1, timeSpentMs: 0, tag: null },
    ];
    const a = summariseAttempt(items);
    expect(a.guesses).toEqual({ made: 1, paidOff: 0, marksGained: 0, marksLost: 1 });
    expect(a.attemptStrategy.verdict).toBe('ATTEMPT_MORE');
    expect(a.attemptStrategy.skipped).toBe(1);
    expect(a.taggedQuestions.GUESS).toEqual([4]);
  });
});

describe('streaks', () => {
  it('counts consecutive days, uses one freeze per week, and resets after a long gap', () => {
    let s = completeDay(EMPTY_STREAK, '2026-11-02');
    s = completeDay(s, '2026-11-03');
    expect(s.current).toBe(2);
    s = completeDay(s, '2026-11-03');
    expect(s.current).toBe(2);
    s = completeDay(s, '2026-11-05'); // missed 4th, freeze used
    expect(s.current).toBe(3);
    expect(s.freezesLeft).toBe(0);
    s = completeDay(s, '2026-11-07'); // missed 6th, no freeze left this week
    expect(s.current).toBe(1);
    expect(s.longest).toBe(3);
    expect(s.history).toContain('2026-11-05');
  });
  it('shows a broken streak as 0 on later days', () => {
    const s = completeDay(EMPTY_STREAK, '2026-11-02');
    expect(streakToday(s, '2026-11-03').current).toBe(1);
    expect(streakToday(s, '2026-11-04').current).toBe(1); // freeze can still save it
    expect(streakToday(s, '2026-11-06').current).toBe(0);
  });
});

describe('spaced repetition', () => {
  it('climbs the ladder on correct answers and resets on wrong ones', () => {
    let r = nextReview({ intervalDays: 0, reps: 0, lapses: 0 }, true, '2026-11-01');
    expect(r).toMatchObject({ intervalDays: 1, dueOn: '2026-11-02' });
    r = nextReview(r, true, '2026-11-02');
    expect(r.intervalDays).toBe(3);
    const w = nextReview(r, false, '2026-11-05');
    expect(w).toMatchObject({ intervalDays: 1, lapses: 1, reps: 0 });
  });
});

describe('IST dates', () => {
  it('uses the Indian calendar day', () => {
    expect(istDate(new Date('2026-11-01T19:00:00Z'))).toBe('2026-11-02');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(daysBetween('2026-11-01', '2026-11-08')).toBe(7);
    expect(weekStart('2026-11-01')).toBe('2026-10-26');
    expect(weekStart('2026-11-02')).toBe('2026-11-02');
  });

  it('converts between IST wall-clock inputs and UTC instants', () => {
    expect(istInstant('2026-11-08', '10:00').toISOString()).toBe('2026-11-08T04:30:00.000Z');
    expect(istLocalInput('2026-11-08T04:30:00.000Z')).toBe('2026-11-08T10:00');
    expect(istLocalInput(istInstant('2026-12-31', '23:45'))).toBe('2026-12-31T23:45');
  });
});
