import type { MetadataRoute } from "next";
import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";

type ProductSitemap = {
  slug: string;
  _updatedAt?: string;
};

async function getProductsForSitemap(): Promise<ProductSitemap[]> {
  return client.fetch(
    groq`*[_type == "product" && defined(slug.current)] | order(_updatedAt desc) {
      "slug": slug.current,
      _updatedAt
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = await getProductsForSitemap();

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: product._updatedAt || new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Add products list page
  const productListPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...productListPage, ...productUrls];
}
