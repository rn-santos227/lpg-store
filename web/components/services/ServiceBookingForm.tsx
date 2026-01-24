"use client";

import { useEffect, type ChangeEvent } from "react";

import { useToast } from "../../hooks/useToast";
import { Button, Modal, TextArea, TextField, Toast } from "../ui";
import { useServiceBookingForm } from "./hooks/useServiceBookingForm";

type ServiceBookingFormProps = {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  serviceSlug: string;
  fee?: number | null;
};

const formatFee = (fee?: number | null) => {
  if (!fee) return "Custom quote";
  return `₱${fee.toLocaleString("en-PH")}`;
};

export default function ServiceBookingForm({
  open,
  onClose,
  serviceName,
  serviceSlug,
  fee,
}: ServiceBookingFormProps) {
  const { toasts, dismissToast, showError, showInfo, showSuccess } = useToast();
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    bookingId,
    customerStatus,
    updateField,
    handleSubmit,
  } = useServiceBookingForm({
    serviceSlug,
  });

  useEffect(() => {
    if (submitError) {
      showError("Booking failed", submitError);
    }
  }, [showError, submitError]);

  useEffect(() => {
    if (isSubmitted) {
      showSuccess(
        "Booking received",
        bookingId
          ? `Booking reference ${bookingId}. We'll confirm your schedule shortly.`
          : "We'll confirm your schedule shortly.",
      );
    }
  }, [isSubmitted, bookingId, showSuccess]);

  useEffect(() => {
    if (isSubmitted && customerStatus === "existing") {
      showInfo(
        "Customer record matched",
        "We found your existing customer profile and linked it to this booking.",
      );
    }
  }, [customerStatus, isSubmitted, showInfo]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Book ${serviceName}`}
      description="Share your preferred schedule and contact details."
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
            label="Service address"
            value={values.address}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              updateField("address", event.target.value)
            }
            placeholder="Street, barangay, city, and landmark"
            rows={3}
            error={errors.address}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Preferred date"
              type="date"
              value={values.preferredDate}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("preferredDate", event.target.value)
              }
              error={errors.preferredDate}
            />
            <TextField
              label="Preferred time"
              type="time"
              value={values.preferredTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateField("preferredTime", event.target.value)
              }
              error={errors.preferredTime}
            />
          </div>

          <TextArea
            label="Booking notes (optional)"
            value={values.notes}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              updateField("notes", event.target.value)
            }
            placeholder="Preferred technician, access details, or special requests."
            rows={3}
            error={errors.notes}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit booking"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Booking Summary
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              {serviceName}
            </h3>
            <p className="text-sm text-slate-600">{formatFee(fee)}</p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-700">
              What happens next?
            </p>
            <p className="mt-1 text-sm text-amber-900">
              Our team will confirm your preferred time window and share the
              assigned technician details.
            </p>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-700">Need help?</p>
            <p>Call us if you need to reschedule or adjust your booking.</p>
          </div>
        </aside>
      </div>
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </Modal>
  );
}
