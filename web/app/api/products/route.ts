import { NextRequest, NextResponse } from "next/server";

import type { Product } from "../../../@types/product";
import { productSearchQuery } from "../../../constants/queries";
import { fetchSanityQuery } from "../../../lib/sanity.api";

const MIN_QUERY_LENGTH = 2;

type ProductResult = Product & {
  _id: string;
  slug?: string | null;
};

type ProductSearchResult = {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
};

function toProductResult(result: ProductResult): ProductSearchResult {
  return {
    id: result._id,
    name: result.name,
    slug: result.slug,
    description: result.description ?? null,
  };
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  try {
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return NextResponse.json({ results: [] });
    }

    const results = await fetchSanityQuery<ProductResult[]>(
      productSearchQuery,
      {
        term: `${query}*`,
      },
    );

    const products = (results ?? []).map(toProductResult);
    return NextResponse.json({ results: products });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch products.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
