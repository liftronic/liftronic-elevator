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

const normalizeSource = (
  source: string,
): { pathname: string; query?: URLSearchParams } => {
  const trimmed = source.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      return { pathname: parsed.pathname || "/", query: parsed.searchParams };
    } catch {
      return { pathname: trimmed || "/" };
    }
  }

  const [pathPart, queryPart] = trimmed.split("?");
  return {
    pathname: pathPart || "/",
    query: queryPart ? new URLSearchParams(queryPart) : undefined,
  };
};

const expandSources = (source: string): string[] => {
  if (source === "/") {
    return [source];
  }

  if (source.endsWith("/")) {
    return [source, source.slice(0, -1)];
  }

  return [source, `${source}/`];
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

    const { pathname, query } = normalizeSource(mapping.source);
    const queryEntries = mapping.query
      ? Object.entries(mapping.query)
      : query
        ? Array.from(query.entries())
        : [];

    const has = queryEntries.length
      ? queryEntries.map(([key, value]) => ({
          type: "query" as const,
          key,
          value,
        }))
      : undefined;

    for (const source of expandSources(pathname)) {
      const dedupeKey = `${source}|${has ? JSON.stringify(has) : ""}`;
      if (seen.has(dedupeKey)) {
        continue;
      }
      seen.add(dedupeKey);

      redirects.push({
        source,
        destination: mapping.destination,
        permanent: true,
        ...(has ? { has } : {}),
      });
    }
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
