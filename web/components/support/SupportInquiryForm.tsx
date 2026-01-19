"use client";

import { useEffect, type ChangeEvent } from "react";

import { Button } from "../ui/Button";
import { TextArea } from "../ui/TextArea";
import { TextField } from "../ui/TextField";
import { Toast } from "../ui/Toast";
import { useToast } from "../../hooks/useToast";
import { useSupportInquiryForm } from "./hooks/useSupportInquiryForm";

const inquiryTopics = [
  "Delivery scheduling",
  "Cylinder refill",
  "Safety inspection",
  "Bulk/business quote",
  "Billing and payments",
  "Other",
];

export default function SupportInquiryForm() {
  const { toasts, dismissToast, showError, showSuccess } = useToast();
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    updateField,
    handleSubmit,
  } = useSupportInquiryForm({});

  useEffect(() => {
    if (submitError) {
      showError("Inquiry failed", submitError);
    }
  }, [showError, submitError]);

  useEffect(() => {
    if (isSubmitted) {
      showSuccess(
        "Inquiry received",
        "Our support team will reply within 1 business day.",
      );
    }
  }, [isSubmitted, showSuccess]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Send an inquiry
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Tell us how we can help
          </h2>
          <p className="text-sm text-slate-500">
            Share details about your delivery, refill, or safety concern and we
            will get back to you quickly.
          </p>
        </div>

       <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Full name"
            value={values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("name", event.target.value)
            }
            placeholder="Maria Santos"
            error={errors.name}
          />

          <TextField
            label="Email address"
            type="email"
            value={values.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("email", event.target.value)
            }
            placeholder="maria@email.com"
            error={errors.email}
          />

       </div>
      </form>
    </>
  );
}