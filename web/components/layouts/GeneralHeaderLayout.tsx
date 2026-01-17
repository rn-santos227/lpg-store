const navigation = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "Categories", href: "#categories" },
  { label: "Featured", href: "#featured" },
  { label: "Support", href: "#support" },
];

export default function GeneralHeaderLayout() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg font-semibold text-white">
            A4R
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900">A4R LPG Trading</p>
            <p className="text-sm text-slate-500">Marketplace for clean energy essentials</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-1 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}