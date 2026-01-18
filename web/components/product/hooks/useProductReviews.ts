"use client";

import { useEffect, useMemo, useState } from "react";

import type { Review } from "../../../@types/review";

type ReviewSubmission = {
  name: string;
  rating: number;
  comment: string;
};

type UseProductReviewsProps = {
  reviews?: Review[];
  productSlug?: string | null;
  productKey: string;
};

export const useProductReviews = ({
  reviews,
  productSlug,
  productKey,
}: UseProductReviewsProps) => {
  const initialReviews = useMemo(() => reviews ?? [], [reviews]);
  const [localReviews, setLocalReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);

  const approvedReviews = useMemo(
    () => localReviews.filter((review) => review.status !== "pending"),
    [localReviews],
  );

  const averageRating = useMemo(() => {
    if (!approvedReviews.length) return null;
    const total = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
    return total / approvedReviews.length;
  }, [approvedReviews]);

  const submitReview = (values: ReviewSubmission) => {
    setLocalReviews((current) => [
      {
        id: `${productKey}-${Date.now()}`,
        rating: values.rating,
        comment: values.comment,
        createdAt: new Date().toISOString(),
        customerName: values.name,
        status: "pending",
      },
      ...current,
    ]);
  };

  useEffect(() => {
    if (!productSlug) return;

    const controller = new AbortController();
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/reviews?slug=${encodeURIComponent(productSlug)}`,
          { signal: controller.signal },
        );
        if (!response.ok) return;

        const data = (await response.json()) as { reviews?: Review[] };
        if (!data.reviews) return;

        setLocalReviews((current) => {
          const pending = current.filter((review) => review.status === "pending");
          const fetched = data.reviews ?? [];
          return [...pending, ...fetched];
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();

    return () => controller.abort();
  }, [productSlug]);

  return {
    localReviews,
    approvedReviews,
    averageRating,
    submitReview,
    isLoading,
  };
};
