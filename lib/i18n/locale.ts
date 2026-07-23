import type { SiteLocale } from "@/lib/i18n/types";

export type LocaleLinkMap = {
  en: string;
  es: string;
  fr: string;
  it: string;
  nl: string;
  no: string;
};

/** Single route-to-locale mapping shared by server and client UI. */
export function localeFromPathname(pathname: string | null | undefined): SiteLocale {
  const path = pathname ?? "/";
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/es" || path.startsWith("/es/")) return "es";
  if (path === "/nl" || path.startsWith("/nl/")) return "nl";
  if (path === "/no" || path.startsWith("/no/")) return "no";
  if (path === "/it" || path.startsWith("/it/")) return "it";
  return "fr";
}

export function languageTagForLocale(locale: SiteLocale): string {
  return locale === "en"
    ? "en"
    : locale === "es"
      ? "es"
    : locale === "nl"
      ? "nl"
      : locale === "no"
        ? "no"
      : locale === "it"
        ? "it"
        : "fr";
}

/** Equivalent public route for the global language switcher. */
export function languageLinksForPathname(pathname: string | null | undefined): LocaleLinkMap {
  const path = (pathname ?? "/").replace(/\/$/, "") || "/";

  if (path === "/about" || path === "/fr/about" || path === "/en/about" || path === "/es/sobre-nosotros" || path === "/it/chi-siamo" || path === "/nl/over-ons" || path === "/no/om-oss") {
    return { en: "/en/about/", es: "/es/sobre-nosotros/", fr: "/about/", it: "/it/chi-siamo/", nl: "/nl/over-ons/", no: "/no/om-oss/" };
  }
  if (path === "/quartiers" || path === "/en/neighbourhoods" || path === "/es/barrios" || path === "/it/quartieri" || path === "/nl/wijken" || path === "/no/omrader") {
    return { en: "/en/neighbourhoods/", es: "/es/barrios/", fr: "/quartiers/", it: "/it/quartieri/", nl: "/nl/wijken/", no: "/no/omrader/" };
  }
  if (path === "/nos-projets" || path === "/en/projects" || path === "/es/proyectos" || path === "/it/progetti" || path === "/nl/projecten" || path === "/no/prosjekter") {
    return { en: "/en/projects/", es: "/es/proyectos/", fr: "/nos-projets/", it: "/it/progetti/", nl: "/nl/projecten/", no: "/no/prosjekter/" };
  }
  if (path === "/sur-plan" || path === "/fr/sur-plan" || path === "/en/off-plan" || path === "/es/sobre-plano" || path === "/nl/nieuwbouw" || path === "/no/nybygg" || path === "/it/progetti-su-piano") {
    return { en: "/en/off-plan/", es: "/es/sobre-plano/", fr: "/sur-plan/", it: "/it/progetti-su-piano/", nl: "/nl/nieuwbouw/", no: "/no/nybygg/" };
  }
  if (path === "/sur-plan/villa-jaz" || path === "/en/off-plan/villa-jaz" || path === "/es/sobre-plano/villa-jaz" || path === "/it/progetti-su-piano/villa-jaz" || path === "/nl/nieuwbouw/villa-jaz" || path === "/no/nybygg/villa-jaz") {
    return { en: "/en/off-plan/villa-jaz/", es: "/es/sobre-plano/villa-jaz/", fr: "/sur-plan/villa-jaz/", it: "/it/progetti-su-piano/villa-jaz/", nl: "/nl/nieuwbouw/villa-jaz/", no: "/no/nybygg/villa-jaz/" };
  }
  if (path === "/off-market" || path === "/en/off-market" || path === "/es/off-market" || path === "/nl/off-market" || path === "/no/off-market" || path === "/it/off-market") {
    return { en: "/en/off-market/", es: "/es/off-market/", fr: "/off-market/", it: "/it/off-market/", nl: "/nl/off-market/", no: "/no/off-market/" };
  }
  if (path === "/simulateur" || path === "/en/simulator" || path === "/es/simulador" || path === "/it/simulatore" || path === "/nl/simulator" || path === "/no/kalkulator") {
    return { en: "/en/simulator/", es: "/es/simulador/", fr: "/simulateur/", it: "/it/simulatore/", nl: "/nl/simulator/", no: "/no/kalkulator/" };
  }
  if (path === "/contact" || path === "/fr/contact" || path === "/en/contact" || path === "/es/contacto" || path === "/nl/contact" || path === "/no/kontakt" || path === "/it/contatto") {
    return { en: "/en/contact/", es: "/es/contacto/", fr: "/contact/", it: "/it/contatto/", nl: "/nl/contact/", no: "/no/kontakt/" };
  }
  if (path === "/blog" || path === "/en/blog" || path === "/es/blog" || path === "/it/blog" || path === "/nl/blog" || path === "/no/blogg") {
    return { en: "/en/blog/", es: "/es/blog/", fr: "/blog/", it: "/it/blog/", nl: "/nl/blog/", no: "/no/blogg/" };
  }
  if (path.startsWith("/blog/") || path.startsWith("/en/blog/") || path.startsWith("/es/blog/") || path.startsWith("/it/blog/") || path.startsWith("/nl/blog/") || path.startsWith("/no/blogg/")) {
    return { en: "/en/blog/", es: "/es/blog/", fr: "/blog/", it: "/it/blog/", nl: "/nl/blog/", no: "/no/blogg/" };
  }
  if (path === "/privacy-policy" || path === "/en/privacy-policy" || path === "/es/politica-de-privacidad" || path === "/it/privacy-policy" || path === "/nl/privacybeleid" || path === "/no/personvernerklaering") {
    return { en: "/en/privacy-policy/", es: "/es/politica-de-privacidad/", fr: "/privacy-policy/", it: "/it/privacy-policy/", nl: "/nl/privacybeleid/", no: "/no/personvernerklaering/" };
  }

  return { en: "/en/", es: "/es/", fr: "/", it: "/it/", nl: "/nl/", no: "/no/" };
}
