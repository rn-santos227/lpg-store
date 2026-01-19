const supportHighlights = [
  {
    title: "Safety-first guidance",
    description:
      "Get help with safety checks, leak detection, and proper storage reminders for your LPG supply.",
  },
  {
    title: "Delivery coordination",
    description:
      "Confirm coverage, schedule refills, or update delivery details with our dispatch team.",
  },
  {
    title: "Business partnerships",
    description:
      "Ask about bulk pricing, recurring refills, and dedicated account management for enterprises.",
  },
];

export default function CoverageSection() {
  return (
    <section id="coverage" className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          How we help
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Support tailored to your LPG needs
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {supportHighlights.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
