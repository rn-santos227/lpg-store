export default function PartnerSection() {
  return (
    <section
      id="partners"
      className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Partner with us
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dedicated support for growing businesses
          </h2>
          <p className="text-sm text-slate-600">
            We provide bulk ordering, recurring delivery routes, and safety
            compliance documentation for commercial accounts.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            href="mailto:partners@lpgstore.com"
          >
            Email partnerships
          </a>
          <a
            className="rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300"
            href="tel:+639001234567"
          >
            Call business desk
          </a>
        </div>
      </div>
    </section>
  );
}
