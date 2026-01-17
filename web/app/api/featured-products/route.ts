import { NextResponse } from "next/server";

import { featuredProductsQuery } from "../../../constants/queries";
import { fetchSanityQuery } from "../../../lib/sanity.api";
import type { Product } from "../../../@types/product";

export async function GET() {
  try {
    const products = await fetchSanityQuery<Product[]>(featuredProductsQuery);
    return NextResponse.json({ products: products ?? [] });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to fetch featured products.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
