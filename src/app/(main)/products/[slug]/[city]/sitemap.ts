import type { MetadataRoute } from "next";
import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";

interface LocationProductSitemap {
  productSlug: string;
  citySlug: string;
  updatedAt?: string;
  enableIndexing: boolean;
}

async function getLocationProductsForSitemap(): Promise<LocationProductSitemap[]> {
  const query = groq`*[_type == "product" && defined(locationPages)] {
    "productSlug": slug.current,
    "locations": locationPages[published == true] {
      "citySlug": citySlug.current,
      enableIndexing,
      _updatedAt
    }
  }`;

  const products = await client.fetch(query, {}, { next: { revalidate: 3600 } });

  const sitemapItems: LocationProductSitemap[] = [];

  for (const product of products) {
    for (const location of product.locations || []) {
      if (location.citySlug) {
        sitemapItems.push({
          productSlug: product.productSlug,
          citySlug: location.citySlug,
          updatedAt: location._updatedAt,
          enableIndexing: location.enableIndexing || false,
        });
      }
    }
  }

  return sitemapItems;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locationProducts = await getLocationProductsForSitemap();

  // Only include location products that are published
  // Priority is slightly lower than main product pages (0.7 vs 0.8)
  const locationUrls: MetadataRoute.Sitemap = locationProducts.map((item) => ({
    url: `${siteUrl}/products/${item.productSlug}/${item.citySlug}`,
    lastModified: item.updatedAt || new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return locationUrls;
}
