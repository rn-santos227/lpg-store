"use client";

import { Button, RatingInput, TextArea, TextField } from "../ui";
import { useReviewForm } from "./hooks/useReviewForm";

type ReviewFormComponentProps = {
  productName: string;
  productSlug: string;
  onSubmit: (values: { name: string; rating: number; comment: string }) => void;
};

export default function ReviewFormComponent({
  productName,
  productSlug,
  onSubmit,
}: ReviewFormComponentProps) {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    updateField,
    handleSubmit,
  } = useReviewForm({
    productSlug,
    onSuccess: onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Leave a review
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">
          Share feedback on {productName}
        </h3>
        <p className="text-sm text-slate-500">
          Reviews help other customers decide which LPG products to order.
        </p>
      </div>

      <TextField
        label="Your name"
        value={values.name}
        onChange={(event) => updateField("name", event.target.value)}
        placeholder="Juan dela Cruz"
        error={errors.name}
      />

      <RatingInput
        value={values.rating}
        onChange={(value) => updateField("rating", value)}
        label="Rating"
        error={errors.rating}
      />

      <TextArea
        label="Your review"
        value={values.comment}
        onChange={(event) => updateField("comment", event.target.value)}
        placeholder="Tell us what you liked about the delivery or product."
        rows={4}
        error={errors.comment}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit review"}
        </Button>
        <p className="text-xs text-slate-500">
          Submissions are reviewed before going live.
        </p>
      </div>

      {submitError ? (
        <p className="text-sm font-medium text-rose-600">{submitError}</p>
      ) : null}

      {isSubmitted ? (
        <p className="text-sm font-medium text-emerald-600">
          Thanks! Your review has been added to the pending queue.
        </p>
      ) : null}
    </form>
  );
}
