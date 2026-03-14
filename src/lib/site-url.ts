const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (!trimmed) {
    return LOCAL_SITE_URL;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isConfiguredLocalhost =
    configuredSiteUrl?.includes("localhost") || configuredSiteUrl?.includes("127.0.0.1");

  if (configuredSiteUrl && !isConfiguredLocalhost) {
    return normalizeSiteUrl(configuredSiteUrl);
  }

  if (process.env.VERCEL_ENV === "production") {
    const vercelProductionUrl =
      process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

    if (vercelProductionUrl) {
      return normalizeSiteUrl(vercelProductionUrl);
    }
  }

  if (configuredSiteUrl) {
    return normalizeSiteUrl(configuredSiteUrl);
  }

  return LOCAL_SITE_URL;
}
