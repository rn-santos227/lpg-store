"use client";

import { useId, useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Accordion({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={`rounded-2xl border border-emerald-100 bg-white ${className ?? ""}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span>{title}</span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-emerald-100 text-emerald-700 transition ${
            isOpen ? "rotate-180 bg-emerald-50" : "bg-white"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div
        id={contentId}
        className={`overflow-hidden px-5 transition-all duration-300 ${
          isOpen ? "max-h-125 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
        }`}
      >
        <div className="space-y-4 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}
