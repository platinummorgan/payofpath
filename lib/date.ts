// lib/date.ts
// Add months in UTC, clamping the day to the target month's last day.
export function addMonthsClampedUTC(d: Date, n: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth(); // 0-based
  const day = d.getUTCDate();
  const total = m + n;
  const y2 = y + Math.floor(total / 12);
  const m2 = ((total % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(y2, m2 + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y2, m2, Math.min(day, lastDay)));
}
