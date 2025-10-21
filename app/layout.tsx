import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
// Note: AdSense <Script> remains in head. Do not render ads in layout per policy.
import { CONTACT_EMAIL } from '../lib/contact';
import Script from 'next/script';

const BASE_URL = process.env.BASE_URL || 'https://payofpath.com';
const OG_IMAGE = '/opengraph-image.png';

export const metadata: Metadata = {
  metadataBase: new URL("https://payofpath.com"),
  title: {
    default: "Debt Payoff Date Calculator – Free Amortization & Payoff Date Tool",
    template: "%s – PayoffPath",
  },
  description:
    "Enter balance, APR, and payments to see your payoff date, total interest, and a full amortization schedule. Includes extra payments and CSV export. Mobile friendly.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    // use hyphenated names to match expected metadata keys
    ["max-snippet"]: -1,
    ["max-image-preview"]: "large",
    ["max-video-preview"]: -1,
  },
  openGraph: {
    type: "website",
    siteName: "PayoffPath",
    url: "https://payofpath.com/",
    title: "Debt Payoff Date Calculator – Free Amortization & Payoff Date Tool",
    description:
      "Calculate your payoff date and total interest with a full amortization schedule. Extra payments supported. CSV export.",
    images: [
      {
        url: "https://payofpath.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Debt payoff date calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Payoff Date Calculator – Free Amortization & Payoff Date Tool",
    description:
      "See when your balance hits zero and how much interest you’ll save. Extra payments + CSV export.",
    images: ["https://payofpath.com/opengraph-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  verification: { google: "fAaFnOJ6QsoJUwZEn8lE_rgsuwfcY7o4YuAv5YyIYPQ" },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Payoff Day',
      description: 'Debt payoff date calculator',
      applicationCategory: 'FinanceApplication',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B2M8YWD16J"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B2M8YWD16J');
            `,
          }}
        />
        {/* Google site verification for Search Console ownership */}
        <meta name="google-site-verification" content="fAaFnOJ6QsoJUwZEn8lE_rgsuwfcY7o4YuAv5YyIYPQ" />
        <link rel="canonical" href={BASE_URL + '/'} />
        <meta property="og:title" content={metadata.title as string} />
        <meta property="og:description" content={metadata.description as string} />
        <meta property="og:image" content={BASE_URL + OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title as string} />
        <meta name="twitter:description" content={metadata.description as string} />
        <meta name="twitter:image" content={BASE_URL + OG_IMAGE} />
        {/* Google CMP (Funding Choices) */}
        <Script
          id="fc-cmp"
          strategy="afterInteractive"
          src="https://fundingchoicesmessages.google.com/i/pub-1190913191003622?ers=1"
        />
        <Script id="fc-cmp-setup" strategy="afterInteractive">
          {`
            (function() {
              function signalGooglefcPresent() {
                if (!window.frames['__fc_loaded']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.name = '__fc_loaded';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 50);
                  }
                }
              }
              signalGooglefcPresent();
            })();
          `}
        </Script>

        {/* AdSense loader */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1190913191003622"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": 'https://schema.org',
            "@type": 'FAQPage',
            mainEntity: [
              { "@type": 'Question', name: 'How is the payoff date calculated?', acceptedAnswer: { "@type": 'Answer', text: 'Monthly interest accrues and payments reduce principal. The schedule simulates months until the balance hits zero.' } },
              { "@type": 'Question', name: 'Will extra payments shorten the loan?', acceptedAnswer: { "@type": 'Answer', text: 'Yes — extra monthly principal reduces balance faster, lowering months and interest paid.' } },
              { "@type": 'Question', name: 'What if APR is 0?', acceptedAnswer: { "@type": 'Answer', text: 'If APR is 0 the calculator treats interest as zero and payments reduce principal directly.' } },
              { "@type": 'Question', name: 'Is my data uploaded?', acceptedAnswer: { "@type": 'Answer', text: 'No — all calculations run in your browser and no files or inputs are uploaded.' } }
            ]
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PayofPath",
              "url": "https://payofpath.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://payofpath.com/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body>
        <div className="min-h-screen">
          <header className="container py-8">
            <h1 className="text-2xl font-semibold">Debt Payoff Date Calculator</h1>
          </header>
          <main className="container pb-12">{children}</main>
          <footer className="container py-8 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Payoff Day</p>
            <p className="mt-2 text-xs text-gray-500">No file uploads — calculations run in your browser.</p>
            <div className="text-sm text-gray-500 mt-2">
              Links: <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/contact">Contact</a> · <a href={`mailto:${CONTACT_EMAIL}`} className="underline">Email</a>
            </div>
          </footer>
        </div>
        <Analytics />
        {/* No site-wide ads in layout. Per policy, ads appear only on the calculator page. */}
      </body>
    </html>
  );
}
