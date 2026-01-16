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
      <div className="relative">
        <ImageViewer
          src={image}
          alt={name}
          className="h-52 w-full"
          imgClassName="transition duration-300 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute left-4 top-4">
            <Badge tone="info">{badge}</Badge>
          </div>
        )}
      </div> 
    </Card>
  );
}
