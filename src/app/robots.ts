import type { MetadataRoute } from "next";

export const runtime = "nodejs";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/*", "/api/*", "/admin", "/admin/*"],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/blogs/sitemap.xml`,
      `${siteUrl}/products/sitemap.xml`,
      `${siteUrl}/services/sitemap.xml`,
      `${siteUrl}/media/sitemap.xml`,
    ],
  };
}
