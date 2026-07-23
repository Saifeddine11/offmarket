import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "offmarketofficial.com";
const CANONICAL_HOSTS = new Set([CANONICAL_HOST, `www.${CANONICAL_HOST}`]);

function firstForwardedValue(value: string | null): string | null {
  return value?.split(",")[0]?.trim().toLowerCase() || null;
}

/** Makes the pathname available to the root layout for server-rendered locale selection. */
export function middleware(request: NextRequest) {
  const forwardedHost =
    firstForwardedValue(request.headers.get("x-forwarded-host")) ??
    firstForwardedValue(request.headers.get("host"));
  const forwardedProtocol = firstForwardedValue(
    request.headers.get("x-forwarded-proto"),
  );

  if (
    forwardedHost &&
    CANONICAL_HOSTS.has(forwardedHost) &&
    (forwardedHost !== CANONICAL_HOST || forwardedProtocol === "http")
  ) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.host = CANONICAL_HOST;
    destination.port = "";
    return NextResponse.redirect(destination, 301);
  }

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
