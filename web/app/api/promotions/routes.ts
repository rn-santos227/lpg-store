import { NextResponse } from "next/server";

import { fetchSanityQuery } from "../../../lib/sanity.api";
import { promotionQuery } from "../../../constants/queries";
import type { Promotion } from "../../../@types/promotion";

export async function GET() {
  try {
    const promotion = await fetchSanityQuery<Promotion>(promotionQuery);
    return NextResponse.json({ promotion });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch promotion.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
