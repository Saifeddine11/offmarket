import { NextRequest, NextResponse } from "next/server";

function detectLangFromPath(pathname: string): "fr" | "en" | "it" | "nl" {
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
    "/((?!_next/static|_next/image|favicon.ico|favicon.png|robots.txt|sitemap.xml|assets|images|.*\\..*).*)",
  ],
};
