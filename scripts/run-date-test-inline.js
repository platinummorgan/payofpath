// Inline validator (JS) to test date math and amortization sample numbers
function addMonthsClampedUTC(d, n) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();
  const total = m + n;
  const y2 = y + Math.floor(total / 12);
  const m2 = ((total % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(y2, m2 + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y2, m2, Math.min(day, lastDay)));
}

function buildSchedule(vals, capMonths = 3600) {
  const r = vals.apr / 100 / 12;
  let remaining = vals.principal;
  const rows = [];
  if (vals.payment <= 0) throw new Error('payment must be > 0');
  if (r > 0 && vals.payment <= remaining * r) throw new Error('Payment must exceed monthly interest to amortize the loan.');
  let month = 0;
  let totalInterest = 0;
  while (remaining > 0 && month < capMonths) {
    const i = month;
    month += 1;
    const interest = r === 0 ? 0 : +(remaining * r);
    totalInterest += interest;
    let principalContrib = vals.payment - interest;
    let principalPaid = Math.min(Math.max(principalContrib, 0) + vals.extra, remaining);
    let payment = +(interest + principalPaid - vals.extra);
    payment = +(interest + principalPaid - vals.extra + vals.extra);
    payment = Math.round((payment + Number.EPSILON) * 100) / 100;
    principalPaid = Math.round((principalPaid + Number.EPSILON) * 100) / 100;
    const remainingNext = Math.round((remaining - principalPaid + Number.EPSILON) * 100) / 100;

    const start = new Date(vals.startDate + 'T00:00:00Z');
    const rowDate = addMonthsClampedUTC(start, i + 1);
    const dateISO = rowDate.toISOString().slice(0,10);

    rows.push({ month: month, dateISO, payment, principalPaid, interest: Math.round((interest + Number.EPSILON) * 100) / 100, extra: vals.extra, remaining: remainingNext });
    remaining = remainingNext;
  }
  const monthsToPayoff = rows.length;
  const payoffDate = addMonthsClampedUTC(new Date(vals.startDate + 'T00:00:00Z'), monthsToPayoff);
  return { rows, totalInterest: Math.round((totalInterest + Number.EPSILON) * 100) / 100, monthsToPayoff, payoffDate };
}

function iso(d){return d.toISOString().slice(0,10)}

// test
const d = new Date(Date.UTC(2025,0,31));
console.log('add1', iso(addMonthsClampedUTC(d,1)));
console.log('add2', iso(addMonthsClampedUTC(d,2)));

const start = new Date(Date.UTC(2025,9,5));
const input = { principal:15000, apr:18.99, payment:400, extra:100, startDate: start.toISOString().slice(0,10) };
const r = buildSchedule(input);
console.log('monthsToPayoff', r.monthsToPayoff);
console.log('first row date', r.rows[0].dateISO);
console.log('payoffDate', iso(r.payoffDate));
console.log('totalInterest', r.totalInterest);

const baseline = buildSchedule({ ...input, extra:0 });
console.log('baseline months', baseline.monthsToPayoff, 'baseline interest', baseline.totalInterest);
console.log('interest saved', (baseline.totalInterest - r.totalInterest).toFixed(2));
