import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  ImageViewer,
  RatingDisplay,
} from "../ui";

type ProductCardProps = {
  name: string;
  description?: string;
  price: string;
  image?: string | null;
  href?: string;
  badge?: string;
  rating?: number | null;
  reviewCount?: number | null;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
};


