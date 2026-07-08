import type { SiteLocale } from "@/lib/i18n/types";

/** Edge-safe locale detection from a URL pathname. */
export function detectLocaleFromPathname(pathname: string): SiteLocale {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/it")) return "it";
  if (pathname.startsWith("/nl")) return "nl";
  return "fr";
}

export function resolveSiteLocale(lang: string | null | undefined): SiteLocale {
  if (lang === "en" || lang === "it" || lang === "nl" || lang === "fr") {
    return lang;
  }
  return "fr";
}
