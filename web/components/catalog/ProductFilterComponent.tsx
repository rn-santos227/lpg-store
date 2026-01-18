"use client";

import { Accordion, Button, TextField } from "../ui";

type ProductFilterComponentProps = {
  availableOnly: boolean;
  categoryOptions: { value: string; label: string }[];
  featuredOnly: boolean;
  filteredCount: number;
  hasFilters: boolean;
  priceMax: string;
  priceMin: string;
  searchTerm: string;
  selectedCategory: string;
  selectedSize: string;
  onAvailableChange: (value: boolean) => void;
  onFeaturedChange: (value: boolean) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onPriceMinChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onReset: () => void;
};

export function ProductFilterComponent({
  availableOnly,
  categoryOptions,
  featuredOnly,
  filteredCount,
  hasFilters,
  priceMax,
  priceMin,
  searchTerm,
  selectedCategory,
  selectedSize,
  onAvailableChange,
  onFeaturedChange,
  onSearchChange,
  onCategoryChange,
  onPriceMaxChange,
  onPriceMinChange,
  onSizeChange,
  onReset,
}: ProductFilterComponentProps) {
  return (
    <Accordion title="Filter products" defaultOpen className="shadow-sm">
      <div className="space-y-4">
        <TextField
          label="Search by keyword"
          labelClassName="text-emerald-900"
          variant="emerald"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search cylinders, bundles, or accessories"
        />

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

          <TextField
            label="Size (kg)"
            labelClassName="text-emerald-900"
            variant="emerald"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={selectedSize}
            onChange={(event) =>
              onSizeChange(event.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="Enter size in kg"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Min price"
            labelClassName="text-emerald-900"
            variant="emerald"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={priceMin}
            onChange={(event) =>
              onPriceMinChange(event.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="₱ 0"
          />

          <TextField
            label="Max price"
            labelClassName="text-emerald-900"
            variant="emerald"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={priceMax}
            onChange={(event) =>
              onPriceMaxChange(event.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="₱ 0"
          />
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
