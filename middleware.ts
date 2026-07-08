import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { detectLocaleFromPathname } from "@/lib/i18n/detectLocale";

const STATIC_PATH_PREFIXES = [
  "/_next/static",
  "/_next/image",
  "/assets/",
  "/images/",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
] as const;

const STATIC_FILE_RE =
  /\.(?:avif|bmp|css|gif|ico|jpe?g|js|json|map|mp4|png|svg|ttf|txt|webm|webp|woff2?)$/i;

function shouldSkipMiddleware(pathname: string): boolean {
  if (!pathname || pathname === "/") {
    return false;
  }

  if (STATIC_FILE_RE.test(pathname)) {
    return true;
  }

  return STATIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}

/**
 * Edge-safe locale hint for the root layout.
 * Uses a short-lived cookie only — never clones or rewrites request/response headers.
 * Cloning request.headers triggers x-middleware-request-* forwarding on Vercel,
 * which crashes when upstream headers contain non-ASCII characters.
 */
export default function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl?.pathname ?? "/";

    if (shouldSkipMiddleware(pathname)) {
      return NextResponse.next();
    }

    const lang = detectLocaleFromPathname(pathname);
    const response = NextResponse.next();

    response.cookies.set("site-lang", lang, {
      path: "/",
      maxAge: 60 * 60,
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });

    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|images).*)",
  ],
};
