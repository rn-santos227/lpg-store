"use client";

import { ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
};

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};
