import { client } from "../lib/client";
import { productRangesQuery } from "../lib/queries";
import type { ProductRange } from "../lib/productRangeTypes";

/**
 * Fetches all product ranges ordered by featured status, order field, and title
 * @returns Promise<ProductRange[]> Array of product ranges
 */
export async function getProductRanges(): Promise<ProductRange[]> {
  return client.fetch<ProductRange[]>(
    productRangesQuery,
    {},
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
}
