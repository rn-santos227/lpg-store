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

