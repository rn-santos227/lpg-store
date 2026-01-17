"use client";

import { useProductSearch } from "../../hooks/useProductSearch";

const navigation = [
  { label: "Marketplace", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Catalog", href: "/catalog" },
  { label: "Support", href: "/support" },
];

export default function GeneralHeaderLayout() {
  const { query, setQuery, results, isLoading, hasMatch, message } =
    useProductSearch();
  const trimmedQuery = query.trim();
  const showResults = Boolean(trimmedQuery);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg font-semibold text-white shadow-sm">
            A4R
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900">A4R LPG Trading</p>
            <p className="text-sm text-slate-500">Marketplace for Clean Energy Essentials</p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
          <div className="relative w-full max-w-sm">
            <form
              action="/catalog"
              method="get"
              className="flex w-full items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-emerald-600"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 3.516 9.737l2.623 2.624a.75.75 0 0 0 1.061-1.06l-2.624-2.624A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </form>
            {showResults ? (
              <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-2xl border border-emerald-100 bg-white shadow-lg">
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Search results
                </div>
                <div className="max-h-60 overflow-auto px-4 pb-4 text-sm text-slate-700">
                  {isLoading ? (
                    <p className="text-slate-500">Searching...</p>
                  ) : hasMatch ? (
                    <ul className="space-y-3">
                      {results.map((result) => (
                        <li key={result.id} className="rounded-lg bg-emerald-50/60 p-3">
                          <a
                            href={`/catalog?q=${encodeURIComponent(result.name)}`}
                            className="block text-sm font-semibold text-emerald-700"
                          >
                            {result.name}
                          </a>
                          {result.description ? (
                            <p className="mt-1 text-xs text-slate-500">
                              {result.description}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">{message}</p>
                  )}
                </div>
              </div>
            ) : null}
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
      </div>
    </header>
  );
}
