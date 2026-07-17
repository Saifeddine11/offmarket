import { NextResponse, type NextRequest } from "next/server";

/** Makes the pathname available to the root layout for server-rendered locale selection. */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-offmarket-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
