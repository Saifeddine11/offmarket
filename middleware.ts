import { NextResponse, type NextRequest } from "next/server";

/**
 * Makes the pathname available to the root layout for server-rendered locale selection.
 * Also rewrites trailing-slash API URLs to the App Router handler path
 * (required with trailingSlash enabled, otherwise API routes with a final slash 404).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set("x-offmarket-pathname", pathname);

  if (pathname.startsWith("/api/") && pathname.endsWith("/") && pathname.length > 5) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.rewrite(url, {
      request: { headers },
    });
  }

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
