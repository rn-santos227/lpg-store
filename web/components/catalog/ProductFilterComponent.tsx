"use client";

import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";

type ProductFilterComponentProps = {
  availableOnly: boolean;
  categoryOptions: { value: string; label: string }[];
  featuredOnly: boolean;
  filteredCount: number;
  hasFilters: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedSize: string;
  sizeOptions: string[];
  onAvailableChange: (value: boolean) => void;
  onFeaturedChange: (value: boolean) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onReset: () => void;
};

export function ProductFilterComponent({
  availableOnly,
  categoryOptions,
  featuredOnly,
  filteredCount,
  hasFilters,
  searchTerm,
  selectedCategory,
  selectedSize,
  sizeOptions,
  onAvailableChange,
  onFeaturedChange,
  onSearchChange,
  onCategoryChange,
  onSizeChange,
  onReset,
}: ProductFilterComponentProps) {
  return (
    <Accordion title="Filter products" defaultOpen className="shadow-sm">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-emerald-900">
          Search by keyword
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search cylinders, bundles, or accessories"
            className="mt-2 w-full rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-emerald-900">
            Category
            <select
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="mt-2 w-full rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-emerald-900">
            Size (kg)
            <select
              value={selectedSize}
              onChange={(event) => onSizeChange(event.target.value)}
              className="mt-2 w-full rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            >
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All sizes" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(event) => onAvailableChange(event.target.checked)}
              className="h-4 w-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-200"
            />
            In-stock only
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(event) => onFeaturedChange(event.target.checked)}
              className="h-4 w-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-200"
            />
            Featured picks
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            {filteredCount} items match
          </p>
          {hasFilters ? (
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={onReset}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    </Accordion>
  );
}
