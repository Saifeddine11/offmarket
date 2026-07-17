import type { SiteLocale } from "@/lib/i18n/types";

export type LocaleLinkMap = {
  en: string;
  fr: string;
  it: string;
  nl: string;
};

/** Single route-to-locale mapping shared by server and client UI. */
export function localeFromPathname(pathname: string | null | undefined): SiteLocale {
  const path = pathname ?? "/";
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/nl" || path.startsWith("/nl/")) return "nl";
  if (path === "/it" || path.startsWith("/it/")) return "it";
  return "fr";
}

export function languageTagForLocale(locale: SiteLocale): string {
  return locale === "en"
    ? "en"
    : locale === "nl"
      ? "nl"
      : locale === "it"
        ? "it"
        : "fr";
}

/** Equivalent public route for the global language switcher. */
export function languageLinksForPathname(pathname: string | null | undefined): LocaleLinkMap {
  const path = (pathname ?? "/").replace(/\/$/, "") || "/";

  if (path === "/about" || path === "/fr/about" || path === "/en/about" || path === "/nl/over-ons") {
    return { en: "/en/about/", fr: "/about/", it: "/it/", nl: "/nl/over-ons/" };
  }
  if (path === "/quartiers" || path === "/en/neighbourhoods" || path === "/nl/wijken") {
    return { en: "/en/neighbourhoods/", fr: "/quartiers/", it: "/it/", nl: "/nl/wijken/" };
  }
  if (path === "/nos-projets" || path === "/en/projects" || path === "/nl/projecten") {
    return { en: "/en/projects/", fr: "/nos-projets/", it: "/it/", nl: "/nl/projecten/" };
  }
  if (path === "/sur-plan" || path === "/fr/sur-plan" || path === "/en/off-plan" || path === "/nl/nieuwbouw" || path === "/it/progetti-su-piano") {
    return { en: "/en/off-plan/", fr: "/sur-plan/", it: "/it/progetti-su-piano/", nl: "/nl/nieuwbouw/" };
  }
  if (path === "/sur-plan/villa-jaz" || path === "/en/off-plan/villa-jaz" || path === "/nl/nieuwbouw/villa-jaz") {
    return { en: "/en/off-plan/villa-jaz/", fr: "/sur-plan/villa-jaz/", it: "/it/progetti-su-piano/", nl: "/nl/nieuwbouw/villa-jaz/" };
  }
  if (path === "/off-market" || path === "/en/off-market" || path === "/nl/off-market" || path === "/it/off-market") {
    return { en: "/en/off-market/", fr: "/off-market/", it: "/it/off-market/", nl: "/nl/off-market/" };
  }
  if (path === "/simulateur" || path === "/en/simulator" || path === "/nl/simulator") {
    return { en: "/en/simulator/", fr: "/simulateur/", it: "/it/", nl: "/nl/simulator/" };
  }
  if (path === "/contact" || path === "/fr/contact" || path === "/en/contact" || path === "/nl/contact" || path === "/it/contatto") {
    return { en: "/en/contact/", fr: "/contact/", it: "/it/contatto/", nl: "/nl/contact/" };
  }
  if (path === "/blog" || path === "/en/blog" || path === "/nl/blog") {
    return { en: "/en/blog/", fr: "/blog/", it: "/it/", nl: "/nl/blog/" };
  }
  if (path.startsWith("/blog/") || path.startsWith("/en/blog/") || path.startsWith("/nl/blog/")) {
    return { en: "/en/blog/", fr: "/blog/", it: "/it/", nl: "/nl/blog/" };
  }
  if (path === "/privacy-policy" || path === "/en/privacy-policy" || path === "/nl/privacybeleid") {
    return { en: "/en/privacy-policy/", fr: "/privacy-policy/", it: "/it/", nl: "/nl/privacybeleid/" };
  }

  return { en: "/en/", fr: "/", it: "/it/", nl: "/nl/" };
}
