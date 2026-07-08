import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type SiteLang = "fr" | "en" | "it" | "nl";

function detectLangFromPath(pathname: string): SiteLang {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/it")) return "it";
  if (pathname.startsWith("/nl")) return "nl";
  if (pathname.startsWith("/fr")) return "fr";
  return "fr";
}

export default function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname ?? "/";
    const lang = detectLangFromPath(pathname);

    const response = NextResponse.next();
    response.headers.set("x-site-lang", lang);
    response.cookies.set("site-lang", lang, {
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|images|.*\\..*).*)",
  ],
};
