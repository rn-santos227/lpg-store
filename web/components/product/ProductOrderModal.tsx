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


