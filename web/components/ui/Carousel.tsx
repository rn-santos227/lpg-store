"use client";

import clsx from "clsx";
import { ReactNode, useRef } from "react";

import { Button } from "./Button";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  alignment?: "start" | "center" | "end";
};

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

export function Carousel({ children, className, ariaLabel, alignment = "start" }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={clsx("relative", className)}>
      <div
        className={clsx(
          "no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pr-10 py-6",
          {
            "justify-start": alignment === "start",
            "justify-center": alignment === "center",
            "justify-end": alignment === "end",
          },
        )}
        ref={scrollContainerRef}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
      </div> 
    </div>
  )
}
