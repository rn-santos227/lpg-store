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

