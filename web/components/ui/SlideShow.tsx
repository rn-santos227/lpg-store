"use client";

import clsx from "clsx";
import { Children, ReactNode, useEffect, useMemo, useState } from "react";

import { Button } from "./Button";

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path
        d="M14.5 18.5 8.5 12l6-6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path
        d="m9.5 5.5 6 6.5-6 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SlideShowProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  autoAdvanceMs?: number;
  showIndicators?: boolean;
};

export function SlideShow({
  children,
  ariaLabel,
  className,
  autoAdvanceMs = 8000,
  showIndicators = true,
}: SlideShowProps) {

}
