import { addDays, daysBetween, weekStart } from './istDate';

export interface StreakState {
  current: number;
  longest: number;
  lastDate: string | null;
  freezesLeft: number;
  freezeWeek: string | null;
  history: string[];
}

export const EMPTY_STREAK: StreakState = { current: 0, longest: 0, lastDate: null, freezesLeft: 1, freezeWeek: null, history: [] };
const HISTORY_DAYS = 60;

/** One free "streak freeze" per IST week (Monday to Sunday). */
export function refillFreeze(s: StreakState, today: string): StreakState {
  const week = weekStart(today);
  return s.freezeWeek === week ? s : { ...s, freezesLeft: 1, freezeWeek: week };
}

/** Streak as the student should see it today (a missed day without a freeze resets it). */
export function streakToday(s: StreakState, today: string): StreakState {
  const r = refillFreeze(s, today);
  if (!r.lastDate) return r;
  const gap = daysBetween(r.lastDate, today);
  if (gap <= 1) return r;
  if (gap === 2 && r.freezesLeft > 0) return r; // still saveable today
  return { ...r, current: 0 };
}

/** Record a completed daily quiz for `date`. Idempotent for the same date. */
export function completeDay(s: StreakState, date: string): StreakState {
  const r = refillFreeze(s, date);
  if (r.lastDate === date) return r;
  let current = 1;
  let freezesLeft = r.freezesLeft;
  if (r.lastDate) {
    const gap = daysBetween(r.lastDate, date);
    if (gap === 1) current = r.current + 1;
    else if (gap === 2 && freezesLeft > 0) {
      current = r.current + 1;
      freezesLeft -= 1;
    } else if (gap < 1) {
      return r; // older date than the last one; ignore
    }
  }
  const cutoff = addDays(date, -HISTORY_DAYS);
  return {
    ...r,
    current,
    longest: Math.max(r.longest, current),
    lastDate: date,
    freezesLeft,
    history: [...r.history.filter((d) => d > cutoff && d !== date), date].sort(),
  };
}
