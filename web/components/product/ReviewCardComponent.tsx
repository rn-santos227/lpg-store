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

export default function ReviewCardComponent({
  customerName,
  rating,
  comment,
  createdAt,
  status = "approved",
}: ReviewCardComponentProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {customerName ?? "Verified customer"}
            </p>
            <p className="text-xs text-slate-500">{formatDate(createdAt)}</p>
          </div>
          {status === "pending" ? <Badge tone="warning">Pending</Badge> : null}
        </div>

        <RatingDisplay rating={rating} />

        {comment ? (
          <p className="text-sm text-slate-600">{comment}</p>
        ) : (
          <p className="text-sm italic text-slate-400">
            Shared a rating without a written comment.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
