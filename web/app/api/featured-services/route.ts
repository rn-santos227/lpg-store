import { NextResponse } from "next/server";

import { servicesQuery } from "../../../constants/queries";
import { fetchSanityQuery } from "../../../lib/sanity.api";
import type { Service } from "../../../@types/service";

export async function GET() {
  try {
    const services = await fetchSanityQuery<Service[]>(servicesQuery);
    return NextResponse.json({ services: services ?? [] });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch featured services.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
