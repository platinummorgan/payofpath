import { computeComparison, InputValues } from '../lib/amortization';
import { isoUTC } from '../lib/format';
import PromoBox from '../components/PromoBox';
import ResultsSSR from '../components/ResultsSSR';
import CalculatorClient from '../components/CalculatorClient';
import AdSlot from '../components/AdSlot';

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
        <h2 className="text-2xl font-bold mb-4">Debt Payoff Calculator – See Your Freedom Date</h2>
        <p className="mb-4">
          Breaking free from debt starts with knowing when you'll be done. This calculator shows your projected payoff date based on your current balance, APR, monthly payment, and any extra principal you can add. Understanding your timeline helps you stay motivated and make informed decisions about accelerating your debt freedom.
        </p>

        <h3 className="text-xl font-semibold mb-3">How It Works</h3>
        <p className="mb-4">
          Our calculator uses standard amortization formulas to simulate each month of your repayment journey. Here's what happens behind the scenes:
        </p>
        <ol className="list-decimal ml-6 mb-4 space-y-2">
          <li><strong>Calculate monthly interest:</strong> Each month, interest accrues on your remaining balance (balance × APR ÷ 12).</li>
          <li><strong>Apply your payment:</strong> Your monthly payment first covers the interest, then reduces principal.</li>
          <li><strong>Add extra payments:</strong> Any additional amount goes directly to principal, reducing future interest charges.</li>
          <li><strong>Repeat until zero:</strong> The simulation continues month by month until your balance reaches $0.</li>
          <li><strong>Show your results:</strong> You'll see your payoff date, total months, total interest paid, and a detailed amortization schedule.</li>
        </ol>

        <h3 className="text-xl font-semibold mb-3">Debt Payoff Strategies</h3>
        <p className="mb-4">
          There are several proven strategies for tackling debt. Each has advantages depending on your situation:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li><strong>Avalanche Method:</strong> Pay minimums on all debts, then put extra money toward the highest APR debt first. This saves the most interest overall.</li>
          <li><strong>Snowball Method:</strong> Pay off smallest balances first for quick wins and psychological momentum, then roll those payments into larger debts.</li>
          <li><strong>Extra Principal Payments:</strong> Even small additional payments can dramatically reduce your payoff time and total interest—use our calculator to see the impact.</li>
          <li><strong>Debt Consolidation:</strong> Combining multiple high-interest debts into one lower-rate loan can simplify payments and reduce interest costs.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Why Extra Payments Matter</h3>
        <p className="mb-4">
          Adding even $25 or $50 extra per month can save you hundreds or thousands in interest and shave months off your payoff date. Why? Because extra payments go straight to principal, reducing the balance that accrues interest next month. The earlier you start making extra payments, the more compounding works in your favor.
        </p>
        <p className="mb-4">
          <strong>Example:</strong> A $7,500 credit card balance at 19.99% APR with $200 minimum payments would take about 53 months and cost $3,095 in interest. Add just $50 extra per month, and you'll be debt-free in 30 months, paying only $1,575 in interest—a savings of $1,520 and nearly two years of payments.
        </p>

        <h3 className="text-xl font-semibold mb-3">Understanding APR & Interest</h3>
        <p className="mb-4">
          APR (Annual Percentage Rate) is the yearly interest rate on your debt. Your monthly interest charge is calculated by dividing APR by 12. For example, 18% APR = 1.5% per month. Higher APRs mean more of your payment goes to interest instead of reducing your balance—making extra payments even more valuable.
        </p>

        <h3 className="text-xl font-semibold mb-3">Tips for Faster Payoff</h3>
        <ul className="list-disc ml-6 mb-4 space-y-2">
          <li><strong>Automate extra payments:</strong> Set up recurring transfers to make extra principal payments automatic.</li>
          <li><strong>Use windfalls wisely:</strong> Tax refunds, bonuses, or gifts can make a big dent in your balance.</li>
          <li><strong>Cut discretionary spending:</strong> Redirect savings from reduced expenses (dining out, subscriptions) to debt.</li>
          <li><strong>Negotiate lower rates:</strong> Call your lender to request a lower APR—many will agree if you have good payment history.</li>
          <li><strong>Avoid new charges:</strong> Stop using the card or line of credit while paying it down to prevent balance increases.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Debt Payoff Glossary</h3>
        <dl className="mb-4 space-y-2">
          <dt className="font-semibold">Principal:</dt>
          <dd className="ml-4 mb-2">The original amount borrowed or the current outstanding balance on your debt.</dd>
          
          <dt className="font-semibold">APR (Annual Percentage Rate):</dt>
          <dd className="ml-4 mb-2">The yearly interest rate charged on your balance. Divided by 12 to get monthly interest.</dd>
          
          <dt className="font-semibold">Minimum Payment:</dt>
          <dd className="ml-4 mb-2">The smallest amount you must pay each month to keep the account in good standing.</dd>
          
          <dt className="font-semibold">Extra Payment:</dt>
          <dd className="ml-4 mb-2">Any amount above the minimum that goes directly to reducing principal and lowering future interest charges.</dd>
          
          <dt className="font-semibold">Amortization:</dt>
          <dd className="ml-4 mb-2">The process of gradually paying off debt through scheduled payments that cover interest and principal.</dd>
          
          <dt className="font-semibold">Payoff Date:</dt>
          <dd className="ml-4 mb-2">The month and year when your balance will reach zero based on your payment schedule.</dd>
        </dl>

        <h3 className="text-xl font-semibold mb-3">Limitations & Disclaimers</h3>
        <p className="mb-4">
          This calculator provides educational estimates only. It assumes fixed APR, consistent monthly payments, and no additional charges or fees. Real-world results may differ due to:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>Variable interest rates or promotional APR periods ending</li>
          <li>Late fees, annual fees, or balance transfer fees</li>
          <li>Minimum payment changes (some lenders adjust minimums as balance decreases)</li>
          <li>New purchases or cash advances added to your balance</li>
          <li>Payment processing delays or billing cycle timing</li>
        </ul>
        <p className="mb-4">
          Always verify your actual payoff amount and date with your lender before making final payoff arrangements. This tool is for planning purposes and does not constitute financial advice.
        </p>
      </section>

      {/* Ad placement after substantial content, before interactive calculator */}
      <div className="my-8" style={{ minHeight: 120 }}>
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE!} style={{ display: 'block', minHeight: 120 }} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Calculate Your Debt Payoff Date</h2>
      <p className="mb-4 text-gray-700">
        Enter your loan details below to see your personalized payoff timeline, total interest, and full amortization schedule.
      </p>

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
