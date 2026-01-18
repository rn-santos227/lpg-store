"use client";

export type ReviewFormValues = {
  name: string;
  rating: number;
  comment: string;
};

export type ReviewFormErrors = Partial<Record<keyof ReviewFormValues, string>>;

export const validateReviewForm = (values: ReviewFormValues) => {
  const nextErrors: ReviewFormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedComment = values.comment.trim();

  if (trimmedName.length < 2) {
    nextErrors.name = "Please share your name.";
  } else if (trimmedName.length > 60) {
    nextErrors.name = "Name should be 60 characters or fewer.";
  }

  if (values.rating <= 0 || values.rating > 5) {
    nextErrors.rating = "Select a rating between 1 and 5.";
  }

  if (trimmedComment.length < 10) {
    nextErrors.comment = "Tell us more (at least 10 characters).";
  } else if (trimmedComment.length > 500) {
    nextErrors.comment = "Review should be 500 characters or fewer.";
  }

  return nextErrors;
};
