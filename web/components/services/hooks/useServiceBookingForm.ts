"use client";

import { useState, type FormEvent } from "react";

import type { Booking } from "../../../@types/booking";
import {
  validateServiceBooking,
  type ServiceBookingErrors,
  type ServiceBookingValues,
} from "../utils/bookingValidators";

type UseServiceBookingFormProps = {
  serviceSlug: string;
  onSuccess?: (values: ServiceBookingValues, response: BookingResponse) => void;
};

type BookingResponse = {
  bookingId: Booking["id"];
  customerStatus: "existing" | "created";
};

const initialState: ServiceBookingValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

export const useServiceBookingForm = ({
  serviceSlug,
  onSuccess,
}: UseServiceBookingFormProps) => {
  const [values, setValues] = useState<ServiceBookingValues>(initialState);
  const [errors, setErrors] = useState<ServiceBookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [customerStatus, setCustomerStatus] = useState<
    BookingResponse["customerStatus"] | null
  >(null);

  const updateField = (
    field: keyof ServiceBookingValues,
    value: string | number,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = validateServiceBooking(values);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError(null);
    setBookingId(null);
    setCustomerStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: serviceSlug,
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          address: values.address.trim(),
          preferredDate: values.preferredDate,
          preferredTime: values.preferredTime,
          notes: values.notes.trim(),
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? "Unable to book service.");
      }

      const responseBody = (await response.json()) as BookingResponse;

      setBookingId(responseBody.bookingId);
      setCustomerStatus(responseBody.customerStatus);

      onSuccess?.(values, responseBody);

      setValues(initialState);
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to book service.";
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
    bookingId,
    customerStatus,
    updateField,
    handleSubmit,
    setValues,
  };
};
