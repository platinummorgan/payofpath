/** @jest-environment jsdom */
import { addMonthsClampedUTC } from '../lib/date';
import { buildSchedule } from '../lib/amortization';

function iso(d: Date) { return d.toISOString().slice(0,10); }

test('addMonthsClampedUTC clamps month-end', () => {
  const d = new Date(Date.UTC(2025, 0, 31)); // 2025-01-31
  expect(iso(addMonthsClampedUTC(d, 1))).toBe('2025-02-28');
  expect(iso(addMonthsClampedUTC(d, 2))).toBe('2025-03-31');
});

test('first payment is one month after start; payoff = start + months', () => {
  const start = new Date(Date.UTC(2025, 9, 5)); // 2025-10-05
  const input: any = { principal: 15000, apr: 18.99, payment: 400, extra: 100, startDate: start.toISOString().slice(0,10) };
  const r = buildSchedule(input as any);

  expect(r.monthsToPayoff).toBe(42);
  // Row 1 date = 2025-11-05 in UTC
  expect(r.rows[0].dateISO).toBe('2025-11-05');
  // Payoff date = 2029-04-05 (start + 42 months)
  expect(iso(r.payoffDate as Date)).toBe('2029-04-05');
});
