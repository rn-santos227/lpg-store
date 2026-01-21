"use client";

import { useState, type FormEvent } from "react";

import type { Order } from "../../../@types/order";
import {
  validateProductOrder,
  type ProductOrderErrors,
  type ProductOrderValues,
} from "../utils/orderValidators";

type UseProductOrderFormProps = {
  productSlug: string;
  onSuccess?: (values: ProductOrderValues, response: OrderResponse) => void;
};

type OrderResponse = {
  orderId: Order["id"];
  customerStatus: "existing" | "created";
};

const initialState: ProductOrderValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  quantity: 1,
  deliveryNotes: "",
  latitude: "",
  longitude: "",
};

export const useProductOrderForm = ({
  productSlug,
  onSuccess,
}: UseProductOrderFormProps) => {
  const [values, setValues] = useState<ProductOrderValues>(initialState);
  const [errors, setErrors] = useState<ProductOrderErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [customerStatus, setCustomerStatus] = useState<
    OrderResponse["customerStatus"] | null
  >(null);

  const updateField = (
    field: keyof ProductOrderValues,
    value: string | number,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = validateProductOrder(values);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setSubmitError(null);
    setOrderId(null);
    setCustomerStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: productSlug,
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          address: values.address.trim(),
          quantity: values.quantity,
          deliveryNotes: values.deliveryNotes.trim(),
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? "Unable to place order.");
      }

      const responseBody = (await response.json()) as OrderResponse;

      setOrderId(responseBody.orderId);
      setCustomerStatus(responseBody.customerStatus);

      onSuccess?.(values, responseBody);

      setValues(initialState);
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to place order.";
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
    orderId,
    customerStatus,
    updateField,
    handleSubmit,
    setValues,
  };
}
