"use client";

import { useEffect } from "react";

import { cn } from "./types/cn";

export type ToastTone = "success" | "info" | "warning" | "error";

export type ToastItem = {
  id: string;
  title: string;
  message?: string;
  tone?: ToastTone;
  durationMs?: number;
};

type ToastProps = {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
};

const toneStyles: Record<ToastTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  info: "border-indigo-200 bg-indigo-50 text-indigo-900",
  warning: "border-red-200 bg-amber-50 text-red-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
};

const toneIcon: Record<ToastTone, string> = {
  success: "✅",
  info: "ℹ️",
  warning: "⚠️",
  error: "❌",
};

export function Toast({ toasts, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toasts.length) return undefined;

    const timers = toasts
      .filter((toast) => (toast.durationMs ?? 6000) > 0)
      .map((toast) =>
        window.setTimeout(() => onDismiss(toast.id), toast.durationMs ?? 6000),
      );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onDismiss, toasts]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const tone = toast.tone ?? "info";
        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg",
              toneStyles[tone],
            )}
            role="status"
            aria-live="polite"
          >
            <span className="text-lg">{toneIcon[tone]}</span>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.message ? (
                <p className="text-xs text-slate-600">{toast.message}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-700"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
