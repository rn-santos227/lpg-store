"use client";

import type { Category } from "../../@types/category";
import type { Product } from "../../@types/product";
import { ProductCard } from "../product/ProductCardComponent";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { ProductFilterComponent } from "./ProductFilterComponent";

type ProductCatalogSectionProps = {
  products: Product[];
  categories?: Category[];
  initialCategory?: string;
  initialSearch?: string;
};

const formatPrice = (price?: number | null) => {
  if (!price) {
    return "Contact for price";
  }

  return `₱${price.toLocaleString("en-PH")}`;
};

export function ProductCatalogSection({
  products,
  categories,
  initialCategory,
  initialSearch,
}: ProductCatalogSectionProps) {
  const {
    availableOnly,
    categoryOptions,
    featuredOnly,
    filteredProducts,
    hasFilters,
    priceMax,
    priceMin,
    searchTerm,
    selectedCategory,
    selectedSize,
    setAvailableOnly,
    setFeaturedOnly,
    setPriceMax,
    setPriceMin,
    setSearchTerm,
    setSelectedCategory,
    setSelectedSize,
    resetFilters,
  } = useCatalogFilters({ products, categories, initialCategory, initialSearch });

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
        priceMax={priceMax}
        priceMin={priceMin}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedSize={selectedSize}
        onAvailableChange={setAvailableOnly}
        onCategoryChange={setSelectedCategory}
        onFeaturedChange={setFeaturedOnly}
        onPriceMaxChange={setPriceMax}
        onPriceMinChange={setPriceMin}
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
              href={product.slug ? `/catalog/${product.slug}` : undefined}
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
