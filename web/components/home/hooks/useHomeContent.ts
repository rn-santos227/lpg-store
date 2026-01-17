import { useEffect, useMemo, useState } from "react";

import type { Category } from "../../../@types/category";
import type { Product } from "../../../@types/product";
import type { Promotion } from "../../../@types/promotion";
import type { Service } from "../../../@types/service";

type HomeContentResponse = {
  promotion: Promotion | null;
  categories: Category[];
  services: Service[];
  featuredProducts: Product[];
};

type PromotionResponse = {
  promotion: Promotion | null;
};

type CategoryResponse = {
  categories: Category[];
};

type ServiceResponse = {
  services: Service[];
};

type ProductResponse = {
  products: Product[];
};

const fetchJson = async <T,>(url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
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
      const [promotionResponse, categoryResponse, serviceResponse, productResponse] =
        await Promise.all([
          fetchJson<PromotionResponse>("/api/promotions"),
          fetchJson<CategoryResponse>("/api/categories"),
          fetchJson<ServiceResponse>("/api/featured-services"),
          fetchJson<ProductResponse>("/api/featured-products"),
        ]);

        
      const payload: HomeContentResponse = {
        promotion: promotionResponse?.promotion ?? null,
        categories: categoryResponse?.categories ?? [],
        services: serviceResponse?.services ?? [],
        featuredProducts: productResponse?.products ?? [],
      };

      if (!isMounted) {
        return;
      }

      setPromotion(payload.promotion);
      setCategories(payload.categories);
      setServices(payload.services);
      setFeaturedProducts(payload.featuredProducts);
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
}
