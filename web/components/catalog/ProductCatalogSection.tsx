"use client";

import type { Product } from "../../@types/product";
import { ProductCard } from "../product/ProductCard";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { ProductFilterComponent } from "./ProductFilterComponent";

type ProductCatalogSectionProps = {
  products: Product[];
  initialSearch?: string;
  formatPrice: (price?: number | null) => string;
};

export function ProductCatalogSection({
  products,
  initialSearch,
  formatPrice,
}: ProductCatalogSectionProps) {
  const {
    availableOnly,
    categoryOptions,
    featuredOnly,
    filteredProducts,
    hasFilters,
    searchTerm,
    selectedCategory,
    selectedSize,
    setAvailableOnly,
    setFeaturedOnly,
    setSearchTerm,
    setSelectedCategory,
    setSelectedSize,
    sizeOptions,
    resetFilters,
  } = useCatalogFilters({ products, initialSearch });

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Latest catalog items
          </p>
          <p className="text-sm text-slate-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      <ProductFilterComponent
        availableOnly={availableOnly}
        categoryOptions={categoryOptions}
        featuredOnly={featuredOnly}
        filteredCount={filteredProducts.length}
        hasFilters={hasFilters}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedSize={selectedSize}
        sizeOptions={sizeOptions}
        onAvailableChange={setAvailableOnly}
        onCategoryChange={setSelectedCategory}
        onFeaturedChange={setFeaturedOnly}
        onReset={resetFilters}
        onSearchChange={setSearchTerm}
        onSizeChange={setSelectedSize}
      />

      {filteredProducts.length ? (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug ?? product.name}
              name={product.name}
              description={product.description ?? undefined}
              price={formatPrice(product.price)}
              image={product.imageUrl}
              badge={product.featured ? "Featured" : undefined}
              actionLabel="Add to cart"
              actionHref={product.slug ? `/catalog/${product.slug}` : "/#support"}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          No products match your filters. Try adjusting your selections.
        </p>
      )}
    </section>
  );
}
