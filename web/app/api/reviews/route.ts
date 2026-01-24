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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReviewRequestBody;
    const slug = body.slug?.trim();
    const rating = body.rating ?? 0;
    const comment = body.comment?.trim();

    if (!slug) {
      return NextResponse.json({ message: "Product slug is required." }, { status: 400 });
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const product = await fetchSanityQuery<{ _id: string }>(productIdQuery, {
      slug,
    });

    if (!product?._id) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    const reviewDocument = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: product._id,
      },
      rating,
      comment: comment ?? null,
      customerName: body.name?.trim() || null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const created = await createSanityDocument(reviewDocument);

    return NextResponse.json({
      review: {
        id: created.document._id,
        rating,
        comment: comment ?? null,
        createdAt: reviewDocument.createdAt,
        customerName: body.name?.trim() || "Verified customer",
        status: "pending",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit review.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
