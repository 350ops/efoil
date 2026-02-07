import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: force lowercase URLs to prevent duplicate indexing.
 * /Work -> 308 -> /work
 * /About -> 308 -> /about
 *
 * Skips: static files, API routes, Next.js internals, and already-lowercase paths.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".") // files with extensions (.ico, .png, .xml, etc.)
  ) {
    return NextResponse.next();
  }

  // If path has uppercase characters, redirect to lowercase
  const lowercasePath = pathname.toLowerCase();
  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
