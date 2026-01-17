import { NextRequest, NextResponse } from "next/server";

import { fetchSanityQuery } from "../../../lib/sanity.api";
import { categorySearchQuery } from "../../../constants/queries";
import type { Category } from "../../../@types/category";

const MIN_QUERY_LENGTH = 2;

type CategoryResult = Category & {
  _id: string;
};

function toCategory(result: CategoryResult): Category {
  return {
    id: result._id,
    title: result.title,
    slug: result.slug,
  };
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  if (!query || query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await fetchSanityQuery<CategoryResult[]>(
      categorySearchQuery,
      {
        term: `${query}*`,
      },
    );

    const categories = (results ?? []).map(toCategory);
    return NextResponse.json({ results: categories });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to search for categories.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
