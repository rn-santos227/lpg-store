import type { SanityDocument } from "@sanity/client";

import { sanityClient, sanityWriteClient } from "./sanity.client";

type SanitySystemFields =
  | "_id"
  | "_rev"
  | "_createdAt"
  | "_updatedAt";

type SanityCreateInput<T extends SanityDocument> =
  Omit<T, SanitySystemFields> & {
    _type: T["_type"];
  };

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
  document: SanityCreateInput<T>,
): Promise<MutationResult<T>> {
  const created = await sanityWriteClient.create(document);
  return { document: created as T };
}

export async function replaceSanityDocument<T extends SanityDocument>(
  document: T,
): Promise<MutationResult<T>> {
  const replaced = await sanityWriteClient.createOrReplace(document);
  return { document: replaced as T };
}

export async function patchSanityDocument<T extends SanityDocument>(
  id: string,
  patch: Partial<T>,
): Promise<MutationResult<T>> {
  const updated = await sanityWriteClient.patch(id).set(patch).commit();
  return { document: updated as T };
}

export async function deleteSanityDocument(
  id: string,
): Promise<{ id: string }> {
  const deleted = await sanityWriteClient.delete(id);
  return { id: deleted._id };
}
