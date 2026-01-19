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

          <TextField
            label="Phone number"
            value={values.phone}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("phone", event.target.value)
            }
            placeholder="+63 900 123 4567"
            helperText="Optional, but helpful for urgent concerns."
            error={errors.phone}
          />

          <TextField
            label="Order reference"
            value={values.orderId}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("orderId", event.target.value)
            }
            placeholder="e.g. ORD-4821"
            helperText="Optional, if this relates to an order."
            error={errors.orderId}
          />
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          <span>Inquiry Topic</span>
          <select
            className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
              errors.topic
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                : ""
            }`}
            value={values.topic}
            onChange={(event) => updateField("topic", event.target.value)}
          >
            <option value="">Select a topic</option>
            {inquiryTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic ? (
            <span className="text-xs font-normal text-rose-600">
              {errors.topic}
            </span>
          ) : (
            <span className="text-xs font-normal text-gray-500">
              Choose the closest match so we can route your request.
            </span>
          )}
        </label>

        <TextArea
          label="Message"
          value={values.message}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            updateField("message", event.target.value)
          }
          placeholder="Let us know what you need, including your location and preferred schedule."
          rows={5}
          error={errors.message}
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit inquiry"}
          </Button>
        </div>
      </form>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}