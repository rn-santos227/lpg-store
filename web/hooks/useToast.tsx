"use client";

import { useCallback, useRef, useState } from "react";

import type { ToastItem } from "../components/ui/Toast";

type ToastInput = Omit<ToastItem, "id">;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((toast: ToastInput) => {
    const id = `toast-${idRef.current++}`;
    const nextToast: ToastItem = {
      id,
      tone: "info",
      durationMs: 6000,
      ...toast,
    };

    setToasts((current) => [nextToast, ...current]);
    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string) =>
      showToast({ title, message, tone: "success" }),
    [showToast],
  );

  const showInfo = useCallback(
    (title: string, message?: string) =>
      showToast({ title, message, tone: "info" }),
    [showToast],
  );

  const showWarning = useCallback(
    (title: string, message?: string) =>
      showToast({ title, message, tone: "warning" }),
    [showToast],
  );

  const showError = useCallback(
    (title: string, message?: string) =>
      showToast({ title, message, tone: "error" }),
    [showToast],
  );

  return {
    toasts,
    showToast,
    dismissToast,
    clearToasts,
    showSuccess,
    showInfo,
    showWarning,
    showError,
  };
};
