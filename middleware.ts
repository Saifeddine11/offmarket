import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function detectLang(pathname: string): string {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/it")) return "it";
  if (pathname.startsWith("/nl")) return "nl";
  return "fr";
}

export function middleware(request: NextRequest) {
  const lang = detectLang(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-lang", lang);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|robots.txt|sitemap.xml).*)"],
};
