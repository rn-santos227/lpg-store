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
    const body = (await request.json()) as OrderRequestBody;
    const slug = body.slug?.trim();
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const email = normalizeEmail(body.email);
    const address = body.address?.trim();
    const quantity = body.quantity ?? 0;
    const deliveryNotes = body.deliveryNotes?.trim();
    const latitude = body.latitude;
    const longitude = body.longitude;

    if (!slug) {
      return NextResponse.json({ message: "Product slug is required." }, { status: 400 });
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ message: "Customer name is required." }, { status: 400 });
    }

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ message: "Customer phone is required." }, { status: 400 });
    }

    if (!address || address.length < 10) {
      return NextResponse.json({ message: "Delivery address is required." }, { status: 400 });
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      return NextResponse.json({ message: "Quantity must be at least 1." }, { status: 400 });
    }

    if (!isValidCoordinate(latitude, -90, 90) || !isValidCoordinate(longitude, -180, 180)) {
      return NextResponse.json({ message: "Valid coordinates are required." }, { status: 400 });
    }

    const product = await fetchSanityQuery<ProductSnapshot>(productOrderSnapshotQuery, {
      slug,
    });

    if (!product?._id) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    const existingCustomer = await fetchSanityQuery<CustomerRecord>(
      customerByContactQuery,
      { phone, email },
    );

    let customerId = existingCustomer?._id ?? "";
    let customerStatus: "existing" | "created" = "existing";

    if (!customerId) {
      const created = await createSanityDocument({
        _type: "customer",
        name,
        phone,
        email: email || undefined,
        address,
        location: {
          _type: "geopoint",
          lat: latitude,
          lng: longitude,
        },
      });

      customerId = created.document._id;
      customerStatus = "created";
    }

    const snapshotSource = existingCustomer ?? {
      name,
      phone,
      address,
      location: {
        lat: latitude,
        lng: longitude,
      },
    };

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit order.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
