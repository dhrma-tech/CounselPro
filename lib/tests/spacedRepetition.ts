import { addDays } from './istDate';

// Fixed ladder (days). Simple and predictable: right answers move a question up, a wrong one resets it.
export const REVIEW_LADDER = [1, 3, 7, 14, 30, 60];

export interface ReviewState {
  intervalDays: number;
  reps: number;
  lapses: number;
}

export function nextReview(state: ReviewState, correct: boolean, today: string) {
  if (!correct) {
    return { intervalDays: 1, reps: 0, lapses: state.lapses + 1, dueOn: addDays(today, 1), lastResult: 'WRONG' as const };
  }
  const step = REVIEW_LADDER.findIndex((d) => d > state.intervalDays);
  const intervalDays = step === -1 ? REVIEW_LADDER[REVIEW_LADDER.length - 1] : REVIEW_LADDER[step];
  return { intervalDays, reps: state.reps + 1, lapses: state.lapses, dueOn: addDays(today, intervalDays), lastResult: 'CORRECT' as const };
}
