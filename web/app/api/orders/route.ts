import { NextRequest, NextResponse } from "next/server";

import type {
  OrderCustomerSnapshot,
  OrderLineItem,
  OrderProductSnapshot,
} from "../../../@types/order";
import {
  customerByContactQuery,
  productOrderSnapshotQuery,
} from "../../../constants/queries";
import {
  createSanityDocument,
  fetchSanityQuery,
} from "../../../lib/sanity.api";

type OrderRequestBody = {
  slug?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  quantity?: number;
  deliveryNotes?: string;
  latitude?: number;
  longitude?: number;
};

type CustomerRecord = {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  location?: { lat: number; lng: number; _type?: "geopoint" };
};

type ProductSnapshot = {
  _id: string;
  name: string;
  sizeKg?: number | null;
  price?: number | null;
};


const normalizeEmail = (value?: string) => value?.trim().toLowerCase() ?? "";

const isValidCoordinate = (value: number | undefined, min: number, max: number) =>
  typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;

export async function POST(request: NextRequest) {
  try {

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit order.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
