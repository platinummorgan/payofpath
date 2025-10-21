// quick runner to validate date math and sample amortization values
const { addMonthsClampedUTC } = require('../lib/date');
const am = require('../lib/amortization');

function iso(d) { return d.toISOString().slice(0,10); }

// test addMonthsClampedUTC
const d = new Date(Date.UTC(2025,0,31));
console.log('add1', iso(addMonthsClampedUTC(d,1)));
console.log('add2', iso(addMonthsClampedUTC(d,2)));

// run sample
const start = new Date(Date.UTC(2025,9,5));
const input = { principal:15000, apr:18.99, payment:400, extra:100, startDate: start.toISOString().slice(0,10) };
const r = am.buildSchedule(input);
console.log('monthsToPayoff', r.monthsToPayoff);
console.log('first row date', r.rows[0].dateISO);
console.log('payoffDate', iso(r.payoffDate));
console.log('totalInterest', r.totalInterest);

// baseline
const baseline = am.buildSchedule({ ...input, extra:0 });
console.log('baseline months', baseline.monthsToPayoff, 'baseline interest', baseline.totalInterest);

// interest saved
console.log('interest saved', (baseline.totalInterest - r.totalInterest).toFixed(2));
