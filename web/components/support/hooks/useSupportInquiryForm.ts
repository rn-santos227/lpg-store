"use client";

import { useState, type FormEvent } from "react";

import {
  validateSupportInquiry,
  type SupportInquiryErrors,
  type SupportInquiryValues,
} from "../utils/supportValidators";

type UseSupportInquiryFormProps = {
  onSuccess?: (values: SupportInquiryValues) => void;
};

const initialState: SupportInquiryValues = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  orderId: "",
  message: "",
};

export const useSupportInquiryForm = ({
  onSuccess,
}: UseSupportInquiryFormProps) => {
  const [values, setValues] = useState<SupportInquiryValues>(initialState);
  const [errors, setErrors] = useState<SupportInquiryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (
    field: keyof SupportInquiryValues,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = validateSupportInquiry(values);

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      onSuccess?.({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        topic: values.topic,
        orderId: values.orderId.trim(),
        message: values.message.trim(),
      });

      setValues(initialState);
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to submit inquiry.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    updateField,
    handleSubmit,
  };
};
