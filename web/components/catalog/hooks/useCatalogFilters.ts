"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "../../../@types/category";
import type { Product } from "../../../@types/product";


const normalize = (value: string) => value.toLowerCase();

type UseCatalogFiltersProps = {
  products: Product[];
  categories?: Category[];
  initialSearch?: string;
  initialCategory?: string;
};

export function useCatalogFilters({
  products,
  categories = [],
  initialSearch = "",
  initialCategory,
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

    const options: { value: string; label: string }[] = [
      { value: "all", label: "All categories" },
    ];
    const seen = new Set<string>(["all"]);

    categories.forEach((category) => {
      if (seen.has(category.id)) {
        return;
      }
      options.push({ value: category.id, label: category.title });
      seen.add(category.id);
    });

    const hasUncategorized = products.some((product) => !product.categoryId);
    if (hasUncategorized && !seen.has("Uncategorized")) {
      options.push({ value: "Uncategorized", label: "Uncategorized" });
      seen.add("Uncategorized");
    }

    products.forEach((product) => {
      const categoryId = product.categoryId;
      if (!categoryId || seen.has(categoryId)) {
        return;
      }
      options.push({ value: categoryId, label: categoryId });
      seen.add(categoryId);
    });

    return options;
  }, [categories, products]);

  useEffect(() => {
    if (!initialCategory) {
      setSelectedCategory("all");
      return;
    }

    const hasCategory = categoryOptions.some(
      (option) => option.value === initialCategory,
    );
    setSelectedCategory(hasCategory ? initialCategory : "all");
  }, [categoryOptions, initialCategory]);

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
