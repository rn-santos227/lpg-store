import type { SanityDocument } from "@sanity/client";

import { sanityClient, sanityWriteClient } from "./sanity.client";

type MutationResult<T> = {
  document: T;
};


