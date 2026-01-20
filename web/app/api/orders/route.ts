import { NextRequest, NextResponse } from "next/server";

import {
  customerByContactQuery,
  productOrderSnapshotQuery,
} from "../../../constants/queries";
import {
  createSanityDocument,
  fetchSanityQuery,
} from "../../../lib/sanity.api";

