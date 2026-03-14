import { NextRequest, NextResponse } from "next/server";

type ProtectedFormData = {
  website: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

declare global {
  var __liftronicRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__liftronicRateLimitStore) {
    globalThis.__liftronicRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return globalThis.__liftronicRateLimitStore;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const store = getRateLimitStore();
  const now = Date.now();

  for (const [entryKey, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(entryKey);
    }
  }

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  store.set(key, current);
  return false;
}

export function protectFormSubmission(
  request: NextRequest,
  data: ProtectedFormData,
  scope: string,
) {
  if (data.website.trim().length > 0) {
    return NextResponse.json(
      { error: "Invalid form submission. Please try again." },
      { status: 400 },
    );
  }

  const rateLimitKey = `${scope}:${getClientIp(request)}`;
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.floor(RATE_LIMIT_WINDOW_MS / 1000)),
        },
      },
    );
  }

  return null;
}
