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

export function CardTitle({ className, ...props }: CardTitleProps) {
  const classes = ["text-lg font-semibold text-slate-900", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <h3 className={classes} {...props} />;
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  const classes = ["text-sm text-slate-600", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return <p className={classes} {...props} />;
}

export function CardContent({ className, ...props }: CardSectionProps) {
  const classes = ["px-6 pb-6", className ?? ""].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  const classes = [
    "flex items-center justify-between gap-3 px-6 pb-6",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
