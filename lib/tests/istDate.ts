// Calendar dates in India Standard Time (UTC+5:30, no daylight saving), as YYYY-MM-DD strings.
const IST_OFFSET_MS = 330 * 60 * 1000;

export function istDate(at: Date | number = Date.now()): string {
  return new Date(new Date(at).getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((new Date(`${to}T00:00:00Z`).getTime() - new Date(`${from}T00:00:00Z`).getTime()) / 86_400_000);
}

/** Monday of the IST week containing the date. */
export function weekStart(date: string): string {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  return addDays(date, day === 0 ? -6 : 1 - day);
}

/** IST wall-clock time as a datetime-local input value (YYYY-MM-DDTHH:mm). */
export function istLocalInput(at: Date | string | number): string {
  return new Date(new Date(at).getTime() + IST_OFFSET_MS).toISOString().slice(0, 16);
}

/** UTC instant for an IST wall-clock time, e.g. istInstant('2026-11-07', '10:00'). */
export function istInstant(date: string, time = '00:00'): Date {
  return new Date(new Date(`${date}T${time}:00Z`).getTime() - IST_OFFSET_MS);
}
