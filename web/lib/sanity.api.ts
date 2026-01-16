import type { SanityDocument } from "@sanity/client";

import { sanityClient, sanityWriteClient } from "./sanity.client";

type MutationResult<T> = {
  document: T;
};

export async function fetchSanityQuery<T>(
  query: string,
  params?: Record<string, string>,
): Promise<T | null> {
  if (params) {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? null;
  }

  const result = await sanityClient.fetch<T>(query);
  return result ?? null;
}

export async function fetchSanityDocument<T extends SanityDocument>(
  id: string,
): Promise<T | null> {
  const result = await sanityClient.getDocument(id);
  return (result as T | null) ?? null;
}

export async function createSanityDocument<T extends SanityDocument>(
  document: T,
): Promise<MutationResult<T>> {
  const created = await sanityWriteClient.create(document);
  return { document: created as T };
}

