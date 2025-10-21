export const metadata = { title: 'Contact | PayofPath' };

export default function ContactPage() {
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm mb-4">
          We're here to help! Whether you have questions about how to use the calculator, encountered a bug, have suggestions for improvements, or are reaching out for press inquiries, feel free to get in touch.
        </p>
        
        <p className="text-sm mb-2 font-semibold">Email us at:</p>
        <p className="text-lg mb-4">
          <a
            href="mailto:admin@ripstuff.net?subject=PayofPath%20support"
            className="text-indigo-600 underline break-all"
          >
            admin@ripstuff.net
          </a>
        </p>
        
        <p className="text-xs text-gray-600 mt-2">
          We typically respond within 24–48 hours during business days. Please include as much detail as possible if you're reporting an issue, such as the inputs you used and what result you expected versus what you received.
        </p>
        
        <p className="text-xs text-gray-500 mt-4">
          For information about data handling and your privacy, see our <a href="/privacy" className="underline">Privacy Policy</a>. For terms of use, visit our <a href="/terms" className="underline">Terms of Service</a>.
        </p>
      </div>
    </main>
  );
}
