import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function detectLang(pathname: string): string {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/it")) return "it";
  if (pathname.startsWith("/nl")) return "nl";
  return "fr";
}

/**
 * Edge-safe locale hint for the root layout.
 * Do not clone request.headers — Vercel rejects x-middleware-request-*
 * headers that contain non-ASCII values (e.g. Cloudflare cf-ipcity).
 */
export default function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl?.pathname ?? "/";
    const response = NextResponse.next();
    response.headers.set("x-site-lang", detectLang(pathname));
    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets|robots.txt|sitemap.xml).*)",
  ],
};
