"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../../@types/product";

const normalize = (value: string) => value.toLowerCase();

type UseCatalogFiltersProps = {
  products: Product[];
  initialSearch?: string;
};

export function useCatalogFilters({
  products,
  initialSearch = "",
}: UseCatalogFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const categoryOptions = useMemo(() => {
    const categories = new Set(
      products.map((product) => product.categoryId ?? "Uncategorized"),
    );
    return ["all", ...Array.from(categories)];
  }, [products]);

  const sizeOptions = useMemo(() => {
    const sizes = new Set(
      products
        .map((product) => product.sizeKg)
        .filter((value): value is number => value !== null && value !== undefined),
    );
    return ["all", ...Array.from(sizes).sort((a, b) => a - b).map(String)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalize(searchTerm.trim());

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        normalize(product.name).includes(normalizedSearch) ||
        normalize(product.description ?? "").includes(normalizedSearch);

      const categoryValue = product.categoryId ?? "Uncategorized";
      const matchesCategory =
        selectedCategory === "all" || categoryValue === selectedCategory;

      const sizeValue =
        product.sizeKg !== null && product.sizeKg !== undefined
          ? String(product.sizeKg)
          : null;
      const matchesSize =
        selectedSize === "all" || (sizeValue !== null && sizeValue === selectedSize);

      const matchesAvailability = !availableOnly || product.available;
      const matchesFeatured = !featuredOnly || product.featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesAvailability &&
        matchesFeatured
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedSize,
    availableOnly,
    featuredOnly,
  ]);

  const hasFilters =
    Boolean(searchTerm.trim()) ||
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    availableOnly ||
    featuredOnly;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSize("all");
    setAvailableOnly(false);
    setFeaturedOnly(false);
  };

  return {
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
  };
}
