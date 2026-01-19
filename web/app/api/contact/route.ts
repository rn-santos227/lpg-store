import { NextResponse } from "next/server";

import type { Contact } from "../../../@types/contact";
import { contactInfoQuery } from "../../../constants/queries";
import { normalizeContactInfo } from "../../../lib/contact";
import { fetchSanityQuery } from "../../../lib/sanity.api";

type ContactResponse = {
  contact: Contact;
};

export async function GET() {
  try {
    const contactInfo = normalizeContactInfo(
      await fetchSanityQuery<Contact>(contactInfoQuery),
    );

    return NextResponse.json({ contact: contactInfo } satisfies ContactResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch contact info.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
