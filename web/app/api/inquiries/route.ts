import { NextRequest, NextResponse } from "next/server";

import { createSanityDocument } from "../../../lib/sanity.api";

type InquiryRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  orderId?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as InquiryRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const topic = body.topic?.trim();
    const orderId = body.orderId?.trim();
    const message = body.message?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ message: "Sender name is required." }, { status: 400 });
    }

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ message: "Valid email address is required." }, { status: 400 });
    }

    if (phone) {
      const phoneDigits = getPhoneDigits(phone);
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        return NextResponse.json({ message: "Valid phone number is required." }, { status: 400 });
      }
    }

    if (!topic) {
      return NextResponse.json({ message: "Inquiry topic is required." }, { status: 400 });
    }

    if (orderId && (orderId.length < 4 || orderId.length > 20)) {
      return NextResponse.json({ message: "Order reference should be 4-20 characters." }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ message: "Message should be at least 10 characters." }, { status: 400 });
    }

    await createSanityDocument({
      _type: "inquiry",
      name,
      contactNumber: phone || undefined,
      email,
      message,
      topic,
      orderId: orderId || undefined,
      status: "new",
      source: "website",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit inquiry.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
