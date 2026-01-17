"use client";

import { useState, type FormEvent } from "react";

type ReviewFormValues = {
  name: string;
  rating: number;
  comment: string;
};

type ReviewFormErrors = Partial<Record<keyof ReviewFormValues, string>>;

type UseReviewFormProps = {
  productSlug: string;
  onSuccess?: (values: ReviewFormValues) => void;
};

const initialState: ReviewFormValues = {
  name: "",
  rating: 0,
  comment: "",
};

export const useReviewForm = ({ productSlug, onSuccess }: UseReviewFormProps) => {
  const [values, setValues] = useState<ReviewFormValues>(initialState);
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (field: keyof ReviewFormValues, value: string | number) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: ReviewFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please share your name.";
    }
    if (values.rating <= 0) {
      nextErrors.rating = "Select a rating.";
    }
    if (!values.comment.trim()) {
      nextErrors.comment = "Tell us about your experience.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: productSlug,
          name: values.name.trim(),
          rating: values.rating,
          comment: values.comment.trim(),
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? "Unable to submit review.");
      }

      onSuccess?.({
        name: values.name.trim(),
        rating: values.rating,
        comment: values.comment.trim(),
      });

      setValues(initialState);
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to submit review.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    updateField,
    handleSubmit,
  };
};
