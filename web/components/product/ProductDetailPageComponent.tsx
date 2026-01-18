"use client";

import { useState } from "react";
import Link from "next/link";

import type { Product } from "../../@types/product";
import type { Review } from "../../@types/review";
import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { useProductGallery } from "./hooks/useProductGallery";
import { useProductReviews } from "./hooks/useProductReviews";
import ReviewCardComponent from "./ReviewCardComponent";
import ReviewFormComponent from "./ReviewFormComponent";
import {
  Badge,
  Button,
  ImageViewer,
  Modal,
  RatingDisplay,
  SlideShow,
} from "../ui";

type ProductDetailPageComponentProps = {
  product: Product;
  reviews: Review[];
};

const formatPrice = (price?: number | null) => {
  if (!price) return "Contact for price";
  return `₱${price.toLocaleString("en-PH")}`;
};

const formatSize = (sizeKg?: number | null) => {
  if (!sizeKg) return "Size varies";
  return `${sizeKg}kg`;
};

const getAvailabilityTone = (available?: boolean | null) =>
  available ? "success" : "warning";

const getAvailabilityLabel = (available?: boolean | null) =>
  available ? "Available for order" : "Limited availability";

export default function ProductDetailPageComponent({
  product,
  reviews,
}: ProductDetailPageComponentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = useProductGallery({ product });
  const { localReviews, approvedReviews, averageRating, submitReview } =
    useProductReviews({
      reviews,
      productSlug: product.slug ?? null,
      productKey: product.slug ?? product.name,
    });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <GeneralHeaderLayout />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-32 pt-12">
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
