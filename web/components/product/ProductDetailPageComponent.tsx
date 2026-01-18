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
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/catalog" className="flex items-center gap-2 text-emerald-600">
            <span aria-hidden>←</span>
            Back to Catalog
          </Link>
          <Badge tone={getAvailabilityTone(product.available)}>
            {getAvailabilityLabel(product.available)}
          </Badge>
        </div>
      </main>
      <GeneralFooterLayout />

      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title="Product image"
        description="Tap outside the image to close."
        size="lg"
      >
        {selectedImage ? (
          <ImageViewer
            src={selectedImage}
            alt={product.name}
            className="h-96 w-full"
            imgClassName="object-contain"
          />
        ) : null}
      </Modal>
    </div>
  );
}
