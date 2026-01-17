"use client";

import { useMemo } from "react";

import type { Product } from "../../../@types/product";

type UseProductGalleryProps = {
  product: Product;
};

export const useProductGallery = ({ product }: UseProductGalleryProps) =>
  useMemo(() => {
    return [product.imageUrl, ...(product.gallery ?? [])].filter(
      (image): image is string => Boolean(image),
    );
  }, [product.gallery, product.imageUrl]);
