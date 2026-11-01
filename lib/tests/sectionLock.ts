import type { SectionalLock } from './types';

export type SectionAccess = 'OPEN' | 'LOCKED_UNTIL_SWITCH' | 'LOCKED_AFTER_SWITCH';

/** Rescales a preset lock (e.g. MHT-CET 90:00 of 180:00) for a test of a different duration. */
export function scaleSectionalLock(
  lock: SectionalLock | null,
  presetDurationSeconds: number,
  testDurationSeconds: number,
): SectionalLock | null {
  if (!lock) return null;
  if (presetDurationSeconds === testDurationSeconds) return lock;
  const ratio = lock.switchAtRemainingSeconds / presetDurationSeconds;
  return { ...lock, switchAtRemainingSeconds: Math.round(testDurationSeconds * ratio) };
}

export function sectionAccess(lock: SectionalLock | null, sectionId: string, remainingSeconds: number): SectionAccess {
  if (!lock) return 'OPEN';
  const switched = remainingSeconds <= lock.switchAtRemainingSeconds;
  if (lock.firstPhaseSections.includes(sectionId)) return switched ? 'LOCKED_AFTER_SWITCH' : 'OPEN';
  if (lock.secondPhaseSections.includes(sectionId)) return switched ? 'OPEN' : 'LOCKED_UNTIL_SWITCH';
  return 'OPEN';
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(' : ');
}

export function formatMinutes(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
