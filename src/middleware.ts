import { NextRequest, NextResponse } from "next/server";

/**
 * Exposes the current pathname as a request header so Server Components
 * (like Footer) can read it via `headers()` from `next/headers`.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Run on all routes except Next.js internals and the Sanity Studio
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|studio).*)"],
};
