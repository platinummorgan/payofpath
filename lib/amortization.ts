import { addMonthsClampedUTC } from './date';
import { isoUTC } from './format';

export type InputValues = {
  principal: number;
  apr: number; // percent
  payment: number; // base payment
  extra: number; // extra per month
  startDate: string; // ISO YYYY-MM-DD
};

export type Row = {
  month: number;
  // date is kept as ISO string (YYYY-MM-DD) from UTC
  dateISO: string;
  payment: number;
  principalPaid: number;
  interest: number;
  extra: number;
  remaining: number;
};

export function validateInputs(vals: InputValues) {
  const errors: Partial<Record<keyof InputValues, string>> = {};
  if (!isFinite(vals.principal) || vals.principal < 1 || vals.principal > 1e8) {
    errors.principal = 'Principal must be between 1 and 100,000,000';
  }
  if (!isFinite(vals.apr) || vals.apr < 0 || vals.apr > 60) {
    errors.apr = 'APR must be between 0 and 60';
  }
  if (!isFinite(vals.payment) || vals.payment < 1 || vals.payment > 1e7) {
    errors.payment = 'Payment must be between 1 and 10,000,000';
  }
  if (!isFinite(vals.extra) || vals.extra < 0 || vals.extra > 1e7) {
    errors.extra = 'Extra must be between 0 and 10,000,000';
  }
  // basic date check
  if (!vals.startDate || isNaN(Date.parse(vals.startDate))) {
    errors.startDate = 'Start date is invalid';
  }
  return errors;
}

// replaced by addMonthsClampedUTC in ./date


export function buildSchedule(vals: InputValues, capMonths = 3600): { rows: Row[]; totalInterest: number; monthsToPayoff: number; payoffDate?: Date; warning?: string } {
  const r = vals.apr / 100 / 12; // monthly rate
  let remaining = vals.principal;
  const rows: Row[] = [];

  if (vals.payment <= 0) throw new Error('payment must be > 0');

  // payment must exceed interest to amortize
  if (r > 0 && vals.payment <= remaining * r) {
    throw new Error('Payment must exceed monthly interest to amortize the loan.');
  }

  let month = 0;
  let totalInterest = 0;
  while (remaining > 0 && month < capMonths) {
    // month index i (0-based)
    const i = month;
    month += 1; // months count
    const interest = r === 0 ? 0 : +(remaining * r);
    totalInterest += interest;
    let principalContrib = vals.payment - interest;
    // principalContrib could be negative but we checked earlier
    let principalPaid = Math.min(Math.max(principalContrib, 0) + vals.extra, remaining);
    // final payment proration
    let payment = +(interest + principalPaid - vals.extra);
    // Payment should be at least interest+principalPaid? We'll compute actual payment as interest + principalPaid
    payment = +(interest + principalPaid - vals.extra + vals.extra);
    // rounding
    payment = Math.round((payment + Number.EPSILON) * 100) / 100;
    principalPaid = Math.round((principalPaid + Number.EPSILON) * 100) / 100;
    const remainingNext = Math.round((remaining - principalPaid + Number.EPSILON) * 100) / 100;

    // compute row date: startDate + (i+1) months
    const start = new Date(vals.startDate + 'T00:00:00Z');
    const rowDate = addMonthsClampedUTC(start, i + 1);
  const dateISO = isoUTC(rowDate);

    rows.push({
      month: month,
      dateISO,
      payment: payment,
      principalPaid: principalPaid,
      interest: Math.round((interest + Number.EPSILON) * 100) / 100,
      extra: vals.extra,
      remaining: remainingNext,
    });

    remaining = remainingNext;
    if (month > 1200) {
      // long running warning handled by caller
    }
  }

  const monthsToPayoff = rows.length;
  const payoffDate = addMonthsClampedUTC(new Date(vals.startDate + 'T00:00:00Z'), monthsToPayoff);
  return { rows, totalInterest: Math.round((totalInterest + Number.EPSILON) * 100) / 100, monthsToPayoff, payoffDate };
}

export function computeComparison(vals: InputValues) {
  const baseline = buildSchedule({ ...vals, extra: 0 });
  const withExtra = buildSchedule(vals);
  return {
    baseline,
    withExtra,
    interestSaved: Math.round((baseline.totalInterest - withExtra.totalInterest) * 100) / 100,
  };
}
