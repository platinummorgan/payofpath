export default function PromoBox() {
  return (
    <a
      href="https://ripstuff.net/?utm_source=payofpath&utm_medium=site_promo&utm_campaign=footer_card"
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
      aria-label="Visit ripstuff.net (opens in a new tab)"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center font-semibold">
          RS
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">ripstuff.net</p>
          <p className="text-xs text-gray-600 truncate">
            Tools, experiments, and weird internet goodies. Come play.
          </p>
        </div>
      </div>
    </a>
  );
}
