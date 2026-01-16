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

export function ProductCard({
  name,
  description,
  price,
  image,
  href,
  badge,
  rating,
  reviewCount,
  actionLabel = "Add to cart",
  actionHref,
  onAction,
  className,
}: ProductCardProps) {
  const titleContent = href ? (
    <Link
      href={href}
      className="text-base font-semibold text-slate-900 transition hover:text-indigo-600"
    >
      {name}
    </Link>
  ) : (
    <h3 className="text-base font-semibold text-slate-900">{name}</h3>
  );

  const actionProps = actionHref
    ? { href: actionHref }
    : { onClick: onAction };

  return (
    <Card
      className={[
        "group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      
    </Card>
  );
}
