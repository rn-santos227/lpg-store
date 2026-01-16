import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;
type CardSectionProps = HTMLAttributes<HTMLDivElement>;
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function Card({ className, ...props }: CardProps) {
  const classes = [
    "rounded-2xl border border-slate-200 bg-white shadow-sm",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}

export function CardHeader({ className, ...props }: CardSectionProps) {
  const classes = ["px-6 pt-6", className ?? ""].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}

