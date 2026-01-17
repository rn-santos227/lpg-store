"use client";

import { useMemo, useState } from "react";

import type { Review } from "../../../@types/review";

type ReviewSubmission = {
  name: string;
  rating: number;
  comment: string;
};

type UseProductReviewsProps = {
  reviews: Review[];
  productKey: string;
};

export const useProductReviews = ({
  reviews,
  productKey,
}: UseProductReviewsProps) => {
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

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

  return {
    localReviews,
    approvedReviews,
    averageRating,
    submitReview,
  };
}
