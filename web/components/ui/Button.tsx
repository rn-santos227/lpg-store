import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SharedProps = {
  variant?: ButtonVariant;
  fullwidth?: boolean;
  className?: string;
};

type NativeButtonProps =
  SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorButtonProps =
  SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    type?: never;
  };

type ButtonProps = NativeButtonProps | AnchorButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary:
    "bg-white text-gray-900 ring-1 ring-inset ring-gray-200 hover:ring-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};


