"use client";

import { useEffect, type ChangeEvent } from "react";

import { useToast } from "../../hooks/useToast";
import { Button, Modal, TextArea, TextField, Toast } from "../ui";
import { useProductOrderForm } from "./hooks/useProductOrderForm";

type ProductOrderModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
  price?: number | null;
  sizeKg?: number | null;
};

const formatPrice = (price?: number | null) => {
  if (!price) return "Contact for price";
  return `₱${price.toLocaleString("en-PH")}`;
};

const formatSize = (sizeKg?: number | null) => {
  if (!sizeKg) return "Size varies";
  return `${sizeKg}kg`;
};


export default function ProductOrderModal({
  open,
  onClose,
  productName,
  productSlug,
  price,
  sizeKg,
}: ProductOrderModalProps) {
  const { toasts, dismissToast, showError, showInfo, showSuccess } = useToast();
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    orderId,
    customerStatus,
    updateField,
    handleSubmit,
  } = useProductOrderForm({
    productSlug,
  });

  useEffect(() => {
    if (submitError) {
      showError("Order failed", submitError);
    }
  }, [showError, submitError]);

  useEffect(() => {
    if (isSubmitted) {
      showSuccess(
        "Order submitted",
        orderId
          ? `Order reference ${orderId}. We'll confirm delivery details shortly.`
          : "We'll confirm delivery details shortly.",
      );
    }
  }, [isSubmitted, orderId, showSuccess]);

  useEffect(() => {
    if (isSubmitted && customerStatus === "existing") {
      showInfo(
        "Customer record matched",
        "We found your existing customer profile and linked it to this order.",
      );
    }
  }, [customerStatus, isSubmitted, showInfo]);

}
