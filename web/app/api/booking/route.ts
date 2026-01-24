import { NextRequest, NextResponse } from "next/server";

import type {
  BookingCustomerSnapshot,
  BookingServiceSnapshot,
} from "../../../@types/booking";
import {
  customerByContactQuery,
  serviceBookingSnapshotQuery,
} from "../../../constants/queries";
import {
  createSanityDocument,
  fetchSanityQuery,
} from "../../../lib/sanity.api";

type BookingRequestBody = {
  slug?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
};

type CustomerRecord = {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
};

type ServiceSnapshot = {
  _id: string;
  title: string;
  fee?: number | null;
};

const normalizeEmail = (value?: string) => value?.trim().toLowerCase() ?? "";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingRequestBody;
    const slug = body.slug?.trim();
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const email = normalizeEmail(body.email);
    const address = body.address?.trim();
    const preferredDate = body.preferredDate?.trim();
    const preferredTime = body.preferredTime?.trim();
    const notes = body.notes?.trim();

    if (!slug) {
      return NextResponse.json({ message: "Service slug is required." }, { status: 400 });
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ message: "Customer name is required." }, { status: 400 });
    }

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ message: "Customer phone is required." }, { status: 400 });
    }

    if (!address || address.length < 10) {
      return NextResponse.json({ message: "Service address is required." }, { status: 400 });
    }

    if (!preferredDate) {
      return NextResponse.json({ message: "Preferred date is required." }, { status: 400 });
    }

    if (!preferredTime) {
      return NextResponse.json({ message: "Preferred time is required." }, { status: 400 });
    }

    const service = await fetchSanityQuery<ServiceSnapshot>(
      serviceBookingSnapshotQuery,
      { slug },
    );

    if (!service?._id) {
      return NextResponse.json({ message: "Service not found." }, { status: 404 });
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
      });

      customerId = created.document._id;
      customerStatus = "created";
    }

    const snapshotSource = existingCustomer ?? {
      name,
      phone,
      email: email || undefined,
      address,
    };

    const customerSnapshot: BookingCustomerSnapshot = {
      name: snapshotSource.name ?? name,
      phone: snapshotSource.phone ?? phone,
      email: snapshotSource.email ?? (email || undefined),
      address: snapshotSource.address ?? address,
    };

    const serviceSnapshot: BookingServiceSnapshot = {
      title: service.title,
      fee: service.fee ?? null,
    };

    const bookingDocument = {
      _type: "booking",
      service: {
        _type: "reference",
        _ref: service._id,
      },
      serviceSnapshot: {
        title: serviceSnapshot.title,
        fee: serviceSnapshot.fee ?? null,
      },
      customer: {
        _type: "reference",
        _ref: customerId,
      },
      customerSnapshot,
      preferredDate,
      preferredTime,
      notes: notes || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const createdBooking = await createSanityDocument(bookingDocument);

    return NextResponse.json({
      bookingId: createdBooking.document._id,
      customerStatus,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit booking.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
