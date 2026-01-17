"use client";

import { Badge, Card, CardContent, RatingDisplay } from "../ui";

type ReviewCardComponentProps = {
  customerName?: string | null;
  rating: number;
  comment?: string | null;
  createdAt?: string | null;
  status?: "approved" | "pending";
};

const formatDate = (value?: string | null) => {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


