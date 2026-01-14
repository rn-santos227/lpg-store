"use client";

import clsx from "clsx";
import {
  FocusEvent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  useId,
  useState,
} from "react";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

type TooltipProps<T extends HTMLElement = HTMLElement> = {
  content: ReactNode;
  children: ReactElement<HTMLAttributes<T>>;
  placement?: TooltipPlacement;
  className?: string;
};

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};
