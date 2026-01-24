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
      <TextArea
            label="Delivery address"
            value={values.address}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              updateField("address", event.target.value)
            }
            placeholder="Street, barangay, city, and landmark"
            rows={3}
            error={errors.address}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="Quantity"
              type="number"
              min={1}
              max={50}
              value={values.quantity}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("quantity", Number(event.target.value))
              }
              error={errors.quantity}
            />
            <TextField
              label="Latitude"
              type="number"
              step="0.000001"
              value={values.latitude}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("latitude", event.target.value)
              }
              placeholder="14.5995"
              error={errors.latitude}
            />
            <TextField
              label="Longitude"
              type="number"
              step="0.000001"
              value={values.longitude}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("longitude", event.target.value)
              }
              placeholder="120.9842"
              error={errors.longitude}
            />
          </div>

          <TextArea
            label="Delivery notes (optional)"
            value={values.deliveryNotes}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              updateField("deliveryNotes", event.target.value)
            }
            placeholder="Gate code, preferred time, or landmark notes."
            rows={3}
            error={errors.deliveryNotes}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit order"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Order Summary
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">{productName}</h3>
            <p className="text-sm text-slate-600">
              {formatSize(sizeKg)} • {formatPrice(price)}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-700">
              Existing customers
            </p>
            <p className="mt-1 text-sm text-amber-900">
              If your details match a customer record in our database, we will
              link this order to that profile automatically.
            </p>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-700">Need help?</p>
            <p>Our team confirms pricing and delivery within one business day.</p>
          </div>
        </aside>
      </div>
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Modal>
  );
}
