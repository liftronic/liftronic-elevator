import type { MetadataRoute } from "next";
import { getSiteUrl } from "~/lib/site-url";

export const runtime = "nodejs";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const protectedPaths = [
    "/studio",
    "/studio/*",
    "/api/*",
    "/admin",
    "/admin/*",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: protectedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: protectedPaths,
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
