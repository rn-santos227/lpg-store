"use client";

import { useState } from "react";
import Link from "next/link";

import type { Product } from "../../@types/product";
import type { Review } from "../../@types/review";
import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { useProductGallery } from "./hooks/useProductGallery";
import { useProductReviews } from "./hooks/useProductReviews";
import ReviewCardComponent from "./ReviewCardComponent";
import ReviewFormComponent from "./ReviewFormComponent";
import {
  Badge,
  Button,
  ImageViewer,
  Modal,
  RatingDisplay,
  SlideShow,
} from "../ui";
