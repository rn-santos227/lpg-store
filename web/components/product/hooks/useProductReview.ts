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


