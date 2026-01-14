import { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};


