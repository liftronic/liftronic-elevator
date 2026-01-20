import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

type RedirectConfig = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: Array<{
    type: "query";
    key: string;
    value?: string;
  }>;
};

type RedirectMapping = {
  source: string;
  destination: string;
  query?: Record<string, string>;
};

const redirectsFromJson = (): RedirectConfig[] => {
  const jsonPath = path.join(process.cwd(), "redirects.json");
  let content = "";
  try {
    content = fs.readFileSync(jsonPath, "utf-8");
  } catch {
    return [];
  }

  let mappings: RedirectMapping[] = [];
  try {
    mappings = JSON.parse(content) as RedirectMapping[];
  } catch {
    return [];
  }

  const redirects: RedirectConfig[] = [];
  const seen = new Set<string>();

  for (const mapping of mappings) {
    if (!mapping.source || !mapping.destination) {
      continue;
    }

    const has = mapping.query
      ? Object.entries(mapping.query).map(([key, value]) => ({
          type: "query" as const,
          key,
          value,
        }))
      : undefined;

    const dedupeKey = `${mapping.source}|${has ? JSON.stringify(has) : ""}`;
    if (seen.has(dedupeKey)) {
      continue;
    }
    seen.add(dedupeKey);

    redirects.push({
      source: mapping.source,
      destination: mapping.destination,
      permanent: true,
      ...(has ? { has } : {}),
    });
  }

  return redirects;
};

const nextConfig: NextConfig = {
  async redirects() {
    return redirectsFromJson();
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: false,
    qualities: [75, 85, 90, 95, 100], // Support custom quality values
  },
};

export default nextConfig;
