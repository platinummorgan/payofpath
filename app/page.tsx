import { computeComparison, InputValues } from '../lib/amortization';
import { isoUTC } from '../lib/format';
import PromoBox from '../components/PromoBox';
import ResultsSSR from '../components/ResultsSSR';
import CalculatorClient from '../components/CalculatorClient';

export default function Page() {
  // Default sample values used for SSR so crawlers see a real result without JS
  const today = new Date().toISOString().slice(0, 10);
  const defaultVals: InputValues = {
    principal: 7500,
    apr: 19.99,
    payment: 200,
    extra: 50,
    startDate: today,
  };

  // compute on the server so HTML includes the summary
  const sample = computeComparison(defaultVals);
  // normalize payoff dates to ISO strings for safe serialization
  const sampleWithIso = {
    ...sample,
    withExtra: {
      ...sample.withExtra,
      payoffDate: sample.withExtra.payoffDate ? isoUTC(sample.withExtra.payoffDate) : undefined,
    },
    baseline: {
      ...sample.baseline,
      payoffDate: sample.baseline.payoffDate ? isoUTC(sample.baseline.payoffDate) : undefined,
    },
  };

  return (
    <div className="space-y-6">
      {/* Intro content - above the fold (server-rendered) */}
      <section className="prose max-w-none mb-6">
        <h2 className="text-2xl font-bold mb-4">What this calculator does</h2>
        <p className="mb-4">
          Payoff Path helps you estimate the month and year you could finish paying a debt based on your balance, APR, minimum payment, and any extra principal you add each month. It simulates month-by-month interest and principal reduction until the balance reaches zero, then shows your projected payoff date.
        </p>

        <h3 className="text-xl font-semibold mb-3">How to use it</h3>
        <ol className="list-decimal ml-6 mb-4 space-y-2">
          <li>Enter your current balance and APR.</li>
          <li>Add your minimum monthly payment.</li>
          <li>Optionally enter an extra monthly amount to see how much faster you could finish.</li>
          <li>Click <strong>Calculate</strong> to see your projected payoff month, total months, and interest saved versus paying the minimum only.</li>
        </ol>

        <h3 className="text-xl font-semibold mb-3">Example</h3>
        <p className="mb-4">
          For a $7,500 balance at 19.99% APR, paying $200/month plus $50 extra, the model shows an estimated payoff in about 30 months—saving several hundred dollars of interest compared with minimum payments only.
        </p>

        <h3 className="text-xl font-semibold mb-3">Notes & disclaimer</h3>
        <p className="mb-4">
          This is an educational estimate that doesn't include late fees, promotional APR changes, or other lender-specific rules. Always verify against your statement. Paying down principal earlier generally reduces total interest, but your results vary based on actual payments and rate changes.
        </p>
      </section>

      {/* Client form lives in a client component; server renders a sample result for crawlers */}
      <div className="card">
        <CalculatorClient defaultVals={defaultVals} initialResult={sampleWithIso} />
      </div>

      {/* Server-rendered static results visible to crawlers */}
      <div style={{ minHeight: 220 }}>
        <ResultsSSR
          rows={sampleWithIso.withExtra.rows}
          baselineRows={sampleWithIso.baseline.rows}
          payoffDate={sampleWithIso.withExtra.payoffDate}
          months={sampleWithIso.withExtra.monthsToPayoff}
          totalInterest={sampleWithIso.withExtra.totalInterest}
          interestSaved={sampleWithIso.interestSaved}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-medium">FAQ</h3>
        <p className="mt-2 text-sm text-gray-600">Below are some common questions about how this calculator works.</p>
        <div className="mt-3 space-y-2">
          <div><strong>Q:</strong> Does this include fees?<br/><strong>A:</strong> No, it only models principal and interest.</div>
          <div><strong>Q:</strong> Can I include extra payments?<br/><strong>A:</strong> Yes, add an extra monthly payment to see the impact.</div>
          <div><strong>Q:</strong> What if APR is 0?<br/><strong>A:</strong> Interest will be 0 and balance reduces by payments.</div>
        </div>
      </div>

      <div className="mt-6">
        <PromoBox />
      </div>

      <div className="text-sm text-gray-500">Links: <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/contact">Contact</a></div>
    </div>
  );
}
