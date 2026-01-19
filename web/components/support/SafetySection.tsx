export default function SafetySection() {
  return (
    <section id="safety" className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Safety tips while waiting for support
      </h2>
      <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <li>Keep cylinders upright in a ventilated area.</li>
        <li>Turn off the regulator after use and check for leaks monthly.</li>
        <li>Store spare cylinders away from heat sources and open flames.</li>
        <li>Schedule inspections annually to keep regulators in top condition.</li>
      </ul>
    </section>
  );
}
