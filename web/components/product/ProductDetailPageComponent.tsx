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
import ProductOrderModal from "./ProductOrderModal";
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const galleryImages = useProductGallery({ product });
  const { localReviews, approvedReviews, averageRating, submitReview } =
    useProductReviews({
      reviews,
      productSlug: product.slug ?? null,
      productKey: product.slug ?? product.name,
    });

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
      <GeneralHeaderLayout />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-32 pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/catalog" className="flex items-center gap-2 text-amber-600">
            <span aria-hidden>←</span>
            Back to Catalog
          </Link>
          <Badge tone={getAvailabilityTone(product.available)}>
            {getAvailabilityLabel(product.available)}
          </Badge>
        </div>


        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            {galleryImages.length ? (
              <SlideShow ariaLabel={`${product.name} gallery`} className="rounded-3xl">
                {galleryImages.map((image) => (
                  <ImageViewer
                    key={image}
                    src={image}
                    alt={product.name}
                    className="h-80 w-full sm:h-104"
                    imgClassName="object-cover"
                    onClick={() => setSelectedImage(image)}
                    actionLabel="Inspect image"
                  />
                ))}
              </SlideShow>
            ) : (
              <ImageViewer
                src={product.imageUrl}
                alt={product.name}
                className="h-80 w-full sm:h-104"
                imgClassName="object-cover"
                onClick={() => setSelectedImage(product.imageUrl ?? null)}
                actionLabel="Inspect image"
              />
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Price
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Tank size
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatSize(product.sizeKg)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Rating
                </p>
                <RatingDisplay
                  rating={averageRating ?? undefined}
                  emptyLabel="No reviews yet"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {product.featured ? (
                <Badge tone="info">Featured Product</Badge>
              ) : null}
              <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
              <p className="text-base text-slate-600">
                {product.description ??
                  "Contact our team to learn more about this LPG product and delivery options."}
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Delivery Highlights
              </p>
              <ul className="mt-3 space-y-2 text-sm text-amber-900">
                <li>✔ Same-day delivery within service areas</li>
                <li>✔ Safety-checked cylinder and regulator inspection</li>
              </ul>
              <div className="mt-4 flex flex-col gap-2">
                <Button className="w-full" onClick={() => setIsOrderModalOpen(true)}>
                  Place an Order
                </Button>
                <Button className="w-full" variant="secondary" href="/#support">
                  Request a Refill Quote
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product details
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-700">Category:</span>{" "}
                  {product.categoryName ?? "LPG essentials"}
                </li>
                <li>
                  <span className="font-semibold text-slate-700">Availability:</span>{" "}
                  {getAvailabilityLabel(product.available)}
                </li>
                <li>
                  <span className="font-semibold text-slate-700">Refill Size:</span>{" "}
                  {formatSize(product.sizeKg)}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Customer reviews
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                What people say about {product.name}
              </h2>
              <p className="text-sm text-slate-500">
                {approvedReviews.length
                  ? `${approvedReviews.length} verified review${
                      approvedReviews.length > 1 ? "s" : ""
                    }`
                  : "No verified reviews yet. Be the first to share your experience."}
              </p>
            </div>

           <div className="space-y-4">
              {localReviews.length ? (
                localReviews.map((review) => (
                  <ReviewCardComponent
                    key={review.id}
                    customerName={review.customerName}
                    rating={review.rating}
                    comment={review.comment}
                    createdAt={review.createdAt}
                    status={review.status}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No reviews yet. Share your feedback using the form.
                </p>
              )}
            </div>
          </div>

          <ReviewFormComponent
            productName={product.name}
            productSlug={product.slug ?? ""}
            onSubmit={submitReview}
          />
        </section>
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

      <ProductOrderModal
        open={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        productName={product.name}
        productSlug={product.slug ?? ""}
        price={product.price}
        sizeKg={product.sizeKg}
      />
    </div>
  );
}
