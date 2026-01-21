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


}
