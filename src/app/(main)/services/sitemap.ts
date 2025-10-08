import type { MetadataRoute } from "next";
import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";

type ServiceSitemap = {
  slug: string;
  _updatedAt?: string;
};

async function getServicesForSitemap(): Promise<ServiceSitemap[]> {
  return client.fetch(
    groq`*[_type == "service" && defined(slug.current)] | order(_updatedAt desc) {
      "slug": slug.current,
      _updatedAt
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const services = await getServicesForSitemap();

  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: service._updatedAt || new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Add services list page
  const serviceListPage: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...serviceListPage, ...serviceUrls];
}
