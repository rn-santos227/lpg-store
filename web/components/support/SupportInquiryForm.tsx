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
}