import { Row } from './amortization';

export function rowsToCsv(rows: Row[]) {
  const header = ['Month', 'Date', 'Payment', 'Principal', 'Interest', 'Extra', 'Remaining'];
  const lines = [header.join(',')];
  for (const r of rows) {
    const date = r.dateISO; // already YYYY-MM-DD
    lines.push([
      r.month,
      date,
      r.payment.toFixed(2),
      r.principalPaid.toFixed(2),
      r.interest.toFixed(2),
      r.extra.toFixed(2),
      r.remaining.toFixed(2),
    ].join(','));
  }
  return lines.join('\n');
}

export function downloadCsv(rows: Row[], filename = 'amortization.csv') {
  const csv = rowsToCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
