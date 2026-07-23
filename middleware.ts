import { NextResponse, type NextRequest } from "next/server";

import { languageLinksForPathname, localeFromPathname } from "@/lib/i18n/locale";
import {
  DEFAULT_LOCALE,
  detectLocale,
  isLikelyBot,
  isSupportedLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
} from "@/lib/i18n/localeDetection";
import type { SiteLocale } from "@/lib/i18n/types";

const CANONICAL_HOST = "offmarketofficial.com";
const CANONICAL_HOSTS = new Set([CANONICAL_HOST, `www.${CANONICAL_HOST}`]);

const IS_PRODUCTION = process.env.NODE_ENV === "production";

function firstForwardedValue(value: string | null): string | null {
  return value?.split(",")[0]?.trim().toLowerCase() || null;
}

function normalizePath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

/**
 * Reads the passive country hint exposed by the hosting/CDN layer. No precise
 * geolocation and no third-party dependency; missing header simply means the
 * country step is skipped.
 */
function requestCountry(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-geo-country") ||
    null
  );
}

function setLocaleCookie(response: NextResponse, locale: SiteLocale): void {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    secure: IS_PRODUCTION,
    maxAge: LOCALE_COOKIE_MAX_AGE,
  });
}

/**
 * Handles canonical host redirects, first-visit language detection and exposes
 * the pathname to the root layout for server-rendered locale selection.
 */
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

  const { pathname } = request.nextUrl;
  const currentLocale = localeFromPathname(pathname);
  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const hasValidCookie = isSupportedLocale(cookieValue);
  const isBot = isLikelyBot(request.headers.get("user-agent"));

  // Crawlers are never geo/language redirected: every localized URL must stay
  // directly accessible and indexable with stable canonical/hreflang.
  if (!isBot) {
    // Auto-detection only applies to French (unprefixed) URLs. Localized URLs
    // are explicit and are never redirected, which also prevents any loop.
    if (currentLocale === "fr") {
      const target: SiteLocale = hasValidCookie
        ? (cookieValue as SiteLocale)
        : detectLocale({
            acceptLanguage: request.headers.get("accept-language"),
            country: requestCountry(request),
          });

      if (target !== "fr") {
        const links = languageLinksForPathname(pathname);
        // Only redirect known routes; unknown French paths (e.g. real 404s) are
        // left untouched so we never bounce visitors to a wrong-language page.
        const isKnownRoute = normalizePath(links.fr) === normalizePath(pathname);
        const destinationPath = links[target];

        if (
          isKnownRoute &&
          destinationPath &&
          normalizePath(destinationPath) !== normalizePath(pathname)
        ) {
          const destination = request.nextUrl.clone();
          destination.pathname = destinationPath;
          const response = NextResponse.redirect(destination, 307);
          if (!hasValidCookie) setLocaleCookie(response, target);
          return response;
        }
      }
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-offmarket-pathname", pathname);

  const response = NextResponse.next({
    request: { headers },
  });

  // Remember the served locale so later visits skip detection. Never overrides
  // an existing choice, and crawlers are left cookie-free.
  if (!isBot && !hasValidCookie) {
    setLocaleCookie(response, currentLocale ?? DEFAULT_LOCALE);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
