# Payoff Day — Debt Payoff Date Calculator

This is a minimal Next.js (App Router) + TypeScript + Tailwind project that runs entirely in the browser. It computes an amortization schedule and payoff date given payments and extra principal.

Installation

1. Install dependencies

```bash
npm install
```

2. Run dev

```bash
npm run dev
```

Build

```bash
npm run build
npm run start
```

Deploy

Deploy to Vercel as a standard Next.js app. Add your Vercel Analytics token if desired.

Production Setup

- Set your production base URL in environment variables for Next (recommended) as `BASE_URL` — e.g. `https://example.com`.
- In `app/robots.ts` replace the `PROD_DOMAIN` TODO with your production domain (without protocol), e.g. `example.com`.
- The sitemap is generated from `app/sitemap.ts` and will include `/`, `/privacy`, `/terms`, `/contact`.
- Place an Open Graph image at `public/opengraph-image.png` (1200x630 recommended) for social previews.

Example Vercel environment variables:

```
BASE_URL=https://example.com
```

Where to paste real ad code

Replace the placeholder in `components/AdSlot.tsx` with your ad provider snippet. Keep the container and dimensions to avoid layout shift.

Amortization math

Monthly rate: $r = \mathrm{APR}/12/100$. For each period k:

- Period interest: $I_k = B_{k-1} \cdot r$
- Principal paid: $PP_k = \min\big((\text{payment} - I_k) + \text{extra},\ B_{k-1}\big)$
- Balance: $B_k = B_{k-1} - PP_k$

Final payment is prorated so $B_k$ reaches 0 exactly.

Accessibility notes

- All inputs have associated labels.
- Results summary is placed in an aria-live region so screen readers announce updates.

Known limits

- The app caps schedule generation at 3600 months to avoid runaway lists. If exceeded, increase payment.
- No external analytics or ad scripts included by default — placeholders only.
