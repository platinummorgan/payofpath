import { CONTACT_EMAIL } from '../../lib/contact';

export default function Privacy() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
      
      <div className="space-y-4 text-sm">
        <section>
          <h3 className="font-semibold text-base mb-2">Information Collection and Use</h3>
          <p>
            Payoff Path is a client-side web application that runs entirely in your browser. We do not collect, store, or transmit any personal information you enter into the calculator. All calculations are performed locally on your device using JavaScript, and no data is sent to our servers or any third-party services.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Calculator Data</h3>
          <p>
            When you use the debt payoff calculator, any financial information you enter (balance, APR, payment amounts, dates, etc.) remains solely on your device. This data is not uploaded, logged, or stored by us in any form. When you close or refresh your browser, this information may be cleared unless you have explicitly saved it using your browser's local storage features.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Cookies and Tracking</h3>
          <p>
            Our website may use cookies and similar technologies for analytics purposes to understand how visitors interact with our site (such as Google Analytics). These tools may collect anonymous information such as your IP address, browser type, referring site, and pages visited. We use this information solely to improve our service and user experience. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Third-Party Services</h3>
          <p>
            We may display advertisements through Google AdSense or similar services. These third-party ad networks may use cookies and tracking technologies to serve relevant ads based on your browsing activity across the web. We do not control these third-party technologies, and their use is subject to their own privacy policies. You can opt out of personalized advertising by visiting your ad settings or using browser extensions that block tracking.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Data Security</h3>
          <p>
            Since we do not collect or store your personal financial data, there is no risk of us exposing or mishandling such information. However, we recommend that you do not share screenshots or exported CSV files containing sensitive financial details publicly, as these are generated locally on your device and are your responsibility to protect.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Changes to This Policy</h3>
          <p>
            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">Contact Us</h3>
          <p>
            If you have questions or concerns about this privacy policy or our data practices, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
