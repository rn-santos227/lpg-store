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
  const [selectedSize, setSelectedSize] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
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

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalize(searchTerm.trim());
    const parsedSize =
      selectedSize.trim() !== "" ? Number(selectedSize) : Number.NaN;
    const parsedMin =
      priceMin.trim() !== "" ? Number(priceMin) : Number.NaN;
    const parsedMax =
      priceMax.trim() !== "" ? Number(priceMax) : Number.NaN;

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        normalize(product.name).includes(normalizedSearch) ||
        normalize(product.description ?? "").includes(normalizedSearch);

      const categoryValue = product.categoryId ?? "Uncategorized";
      const matchesCategory =
        selectedCategory === "all" || categoryValue === selectedCategory;

      const matchesSize =
        Number.isNaN(parsedSize) || product.sizeKg === parsedSize;
      const matchesPriceMin =
        Number.isNaN(parsedMin) || product.price >= parsedMin;
      const matchesPriceMax =
        Number.isNaN(parsedMax) || product.price <= parsedMax;

      const matchesAvailability = !availableOnly || product.available;
      const matchesFeatured = !featuredOnly || product.featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesAvailability &&
        matchesFeatured &&
        matchesPriceMin &&
        matchesPriceMax
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedSize,
    priceMin,
    priceMax,
    availableOnly,
    featuredOnly,
  ]);

  const hasFilters =
    Boolean(searchTerm.trim()) ||
    selectedCategory !== "all" ||
    Boolean(selectedSize.trim()) ||
    Boolean(priceMin.trim()) ||
    Boolean(priceMax.trim()) ||
    availableOnly ||
    featuredOnly;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSize("");
    setPriceMin("");
    setPriceMax("");
    setAvailableOnly(false);
    setFeaturedOnly(false);
  };

  return {
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
  };
}
