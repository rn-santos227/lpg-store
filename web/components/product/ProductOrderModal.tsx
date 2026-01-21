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

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Order ${productName}`}
      description="Share delivery details so our team can confirm your order."
      size="lg"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Customer name"
            value={values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("name", event.target.value)
            }
            placeholder="Juan dela Cruz"
            error={errors.name}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Mobile number"
              value={values.phone}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("phone", event.target.value)
              }
              placeholder="09xx xxx xxxx"
              error={errors.phone}
            />
            <TextField
              label="Email (optional)"
              type="email"
              value={values.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("email", event.target.value)
              }
              placeholder="name@email.com"
              error={errors.email}
            />
          </div>

        </form>
      </div>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Modal>
  );
}
