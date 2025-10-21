"use client";
import { useState } from 'react';
import NumberInput from './NumberInput';
import Results from './Results';
import AdSlot from './AdSlot';
import { computeComparison, InputValues } from '../lib/amortization';
import { downloadCsv } from '../lib/csv';

type Props = {
  defaultVals: InputValues;
  initialResult: any;
};

export default function CalculatorClient({ defaultVals, initialResult }: Props) {
  const [loanName, setLoanName] = useState('');
  const [principal, setPrincipal] = useState(String(defaultVals.principal));
  const [apr, setApr] = useState(String(defaultVals.apr));
  const [payment, setPayment] = useState(String(defaultVals.payment));
  const [extra, setExtra] = useState(String(defaultVals.extra));
  const [startDate, setStartDate] = useState(defaultVals.startDate);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(initialResult);

  function parseInputs() {
    const vals: InputValues = {
      principal: Number(principal),
      apr: Number(apr),
      payment: Number(payment),
      extra: Number(extra),
      startDate,
    };
    const verrs = {} as Record<string, string>;
    try {
      // validate via import if needed; keep simple check here
      if (!isFinite(vals.principal) || vals.principal <= 0) verrs.principal = 'Invalid principal';
    } catch (e) {}
    return { vals, verrs };
  }

  function onCalculate() {
    const { vals, verrs } = parseInputs();
    setErrors(verrs);
    try {
      const comp = computeComparison(vals);
      setResult(comp);
    } catch (e: any) {
      setErrors({ general: e.message || 'Calculation error' });
    }
  }

  function onDownload() {
    if (!result) return;
    downloadCsv(result.withExtra.rows, 'amortization.csv');
  }

  return (
    <div>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Loan name (optional)</label>
            <input value={loanName} onChange={(e) => setLoanName(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
          </div>
          <NumberInput label="Principal" value={principal} onChange={setPrincipal} error={errors.principal} prefix="$" />
          <NumberInput label="APR %" value={apr} onChange={setApr} error={errors.apr} suffix="%" />
          <NumberInput label="Min monthly payment" value={payment} onChange={setPayment} error={errors.payment} prefix="$" />
          <NumberInput label="Extra monthly payment" value={extra} onChange={setExtra} error={errors.extra} prefix="$" />
          <div>
            <label className="block text-sm font-medium">Start date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={onCalculate}>Calculate Payoff</button>
          <button className="px-4 py-2 border rounded" onClick={onDownload} disabled={!result}>Download Amortization CSV</button>
          <button className="px-4 py-2 border rounded" onClick={() => { setLoanName(''); setPrincipal(''); setApr(''); setPayment(''); setExtra('0'); setStartDate(defaultVals.startDate); setResult(initialResult); setErrors({}); }}>Reset</button>
        </div>
      </div>

      {/* Client-side results (hydrates server results) */}
      {result && (
        <div>
          <Results
            rows={result.withExtra.rows}
            baselineRows={result.baseline.rows}
            payoffDate={result.withExtra.payoffDate}
            months={result.withExtra.monthsToPayoff}
            totalInterest={result.withExtra.totalInterest}
            interestSaved={result.interestSaved}
          />

          {/* Single responsive ad below the summary/results card */}
          <div className="mt-6" style={{ minHeight: 120 }}>
            <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} style={{ display: 'block', minHeight: 120 }} />
          </div>
        </div>
      )}
    </div>
  );
}
