import { NextRequest, NextResponse } from "next/server";

import type { Review } from "../../../@types/review";
import { productReviewsQuery } from "../../../constants/queries";
import { createSanityDocument, fetchSanityQuery } from "../../../lib/sanity.api";
import { productIdQuery } from "../../../constants/queries";

type ReviewResponse = {
  reviews: Review[];
};

type ReviewRequestBody = {
  slug?: string;
  rating?: number;
  comment?: string;
  name?: string;
};

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json({ reviews: [] satisfies Review[] });
  }

  try {
    const reviews =
      (await fetchSanityQuery<Review[]>(productReviewsQuery, { slug })) ?? [];
    const normalized = reviews.map((review) => ({
      ...review,
      status: "approved" as const,
    }));
    return NextResponse.json({ reviews: normalized } satisfies ReviewResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch reviews.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

