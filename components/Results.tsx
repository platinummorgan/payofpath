"use client";
import { useEffect, useRef, useState } from 'react';
import { Row } from '../lib/amortization';

type Props = {
  rows: Row[];
  baselineRows?: Row[];
  payoffDate?: string;
  months?: number;
  totalInterest?: number;
  interestSaved?: number;
};

function Summary({ payoffDate, months, totalInterest, interestSaved }: Props) {
  return (
    <section aria-live="polite" className="card mb-4">
      <h2 className="text-lg font-medium">Summary</h2>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500">Payoff date</div>
          <div className="font-semibold">{payoffDate || '—'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Months to payoff</div>
          <div className="font-semibold">{months ?? '—'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Total interest</div>
          <div className="font-semibold">${totalInterest?.toFixed(2) ?? '—'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Interest saved</div>
          <div className="font-semibold">${interestSaved?.toFixed(2) ?? '—'}</div>
        </div>
      </div>
    </section>
  );
}

export default function Results(props: Props) {
  const { rows } = props;
  const [startIdx, setStartIdx] = useState(0);
  // this ref targets the <tbody> element (HTMLTableSectionElement)
  const containerRef = useRef<HTMLTableSectionElement | null>(null);

  useEffect(() => setStartIdx(0), [rows.length]);

  const windowed = rows.length > 200;
  const pageSize = 200;
  const endIdx = windowed ? Math.min(startIdx + pageSize, rows.length) : rows.length;

  return (
    <div>
      <Summary {...props} />

      <div className="mb-4">
        <div className="card">
          <h3 className="font-medium mb-2">Amortization</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th className="px-2 py-1">#</th>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Payment</th>
                  <th className="px-2 py-1">Principal</th>
                  <th className="px-2 py-1">Interest</th>
                  <th className="px-2 py-1">Extra</th>
                  <th className="px-2 py-1">Remaining</th>
                </tr>
              </thead>
              <tbody ref={containerRef}>
                {rows.slice(windowed ? startIdx : 0, endIdx).map((r) => (
                  <tr key={r.month} className="border-t">
                    <td className="px-2 py-1">{r.month}</td>
                    <td className="px-2 py-1">{r.dateISO}</td>
                    <td className="px-2 py-1">${r.payment.toFixed(2)}</td>
                    <td className="px-2 py-1">${r.principalPaid.toFixed(2)}</td>
                    <td className="px-2 py-1">${r.interest.toFixed(2)}</td>
                    <td className="px-2 py-1">${r.extra.toFixed(2)}</td>
                    <td className="px-2 py-1">${r.remaining.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {windowed && (
            <div className="mt-3 flex items-center justify-between">
              <div>
                <button
                  className="px-3 py-1 border rounded mr-2"
                  onClick={() => setStartIdx((s) => Math.max(0, s - pageSize))}
                  disabled={startIdx === 0}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => setStartIdx((s) => Math.min(rows.length - pageSize, s + pageSize))}
                  disabled={endIdx >= rows.length}
                >
                  Next
                </button>
              </div>
              <div className="text-sm text-gray-500">Showing {windowed ? `${startIdx + 1}-${endIdx}` : rows.length} of {rows.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
