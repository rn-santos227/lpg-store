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
