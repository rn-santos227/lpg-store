import { useEffect, useMemo, useState } from "react";

import type { Category } from "../../../@types/category";
import type { Product } from "../../../@types/product";
import type { Promotion } from "../../../@types/promotion";
import type { Service } from "../../../@types/service";
import {
  categoryQuery,
  featuredProductsQuery,
  promotionQuery,
  servicesQuery,
} from "../../../constants/queries";

type SanityResponse<T> = {
  result: T;
};

const fetchSanityData = async <T,>(query: string) => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(
    query,
  )}`;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SanityResponse<T>;
  return data.result ?? null;
};

export const useHomeContent = () => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setIsLoading(true);
      const [promotionResult, categoryResults, serviceResults, productResults] =
        await Promise.all([
          fetchSanityData<Promotion>(promotionQuery),
          fetchSanityData<Category[]>(categoryQuery),
          fetchSanityData<Service[]>(servicesQuery),
          fetchSanityData<Product[]>(featuredProductsQuery),
        ]);

      if (!isMounted) {
        return;
      }

      setPromotion(promotionResult ?? null);
      setCategories(categoryResults ?? []);
      setServices(serviceResults ?? []);
      setFeaturedProducts(productResults ?? []);
      setIsLoading(false);
    };

    loadContent().catch(() => {
      if (!isMounted) {
        return;
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const heroCategories = useMemo(() => categories.slice(0, 2), [categories]);

  return {
    promotion,
    categories,
    services,
    featuredProducts,
    heroCategories,
    isLoading,
  };
};
