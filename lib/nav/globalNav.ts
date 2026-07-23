import type { BodySegment } from "@/lib/static-html/parsePage";
import type { SiteLocale } from "@/lib/i18n/types";

/** Styles loaded once from app/layout.tsx for the global navbar. */
export const GLOBAL_NAV_STYLES = [
  "/assets/stylesheets/offmarket-logo.css?v=1765317600",
  "/assets/stylesheets/mavericks-chrome.css?v=1784800000",
  "/assets/stylesheets/om-nav-menu.css?v=1767581000",
  "/assets/stylesheets/om-buttons.css?v=1765338000",
] as const;

/** Styles loaded once from app/layout.tsx for the global footer. */
export const GLOBAL_FOOTER_STYLES = [
  "/assets/stylesheets/offmarket-tokens.css?v=1765402900",
  "/assets/stylesheets/om-footer.css?v=1767582100",
] as const;

/** Scripts loaded once from app/layout.tsx — matches homepage nav boot order. */
export const GLOBAL_NAV_SCRIPTS = [
  "/assets/javascripts/om-no-preloader.js?v=1765312000",
  "/assets/javascripts/gsap.min.js?v=1765268700",
  "/assets/javascripts/om-gsap-config.js?v=1767582000",
  "/assets/javascripts/om-nav-menu.js?v=1769203000",
  "/assets/javascripts/mavericks-chrome.js?v=1784800000",
  "/assets/javascripts/om-nav-scroll.js?v=1767562700",
  "/assets/javascripts/mav-navbar-hero-visibility.js?v=1765287000",
] as const;

const GLOBAL_NAV_STYLE_FILES = new Set(
  GLOBAL_NAV_STYLES.map((href) => scriptOrStyleFile(href)),
);

const GLOBAL_FOOTER_STYLE_FILES = new Set(
  GLOBAL_FOOTER_STYLES.map((href) => scriptOrStyleFile(href)),
);

const GLOBAL_NAV_SCRIPT_FILES = new Set(
  GLOBAL_NAV_SCRIPTS.map((href) => scriptOrStyleFile(href)),
);

const SIMULATOR_RANGE_LABELS: Record<SiteLocale, Record<string, string>> = {
  fr: {
    budget: "Budget d'acquisition",
    nightlyRate: "Prix nuitée moyen",
    personalWeeks: "Semaines d'usage personnel",
    occupancy: "Taux d'occupation",
    monthlyRent: "Loyer mensuel estimé",
    resaleHorizonYears: "Horizon de revente",
    annualAppreciationRate: "Hypothèse de valorisation annuelle",
    taxRate: "Taux d'imposition",
  },
  en: {
    budget: "Acquisition budget",
    nightlyRate: "Average nightly rate",
    personalWeeks: "Weeks of personal use",
    occupancy: "Occupancy rate",
    monthlyRent: "Estimated monthly rent",
    resaleHorizonYears: "Resale horizon",
    annualAppreciationRate: "Annual appreciation assumption",
    taxRate: "Tax rate",
  },
  es: {
    budget: "Presupuesto de adquisición",
    nightlyRate: "Precio medio por noche",
    personalWeeks: "Semanas de uso personal",
    occupancy: "Tasa de ocupación",
    monthlyRent: "Alquiler mensual estimado",
    resaleHorizonYears: "Horizonte de reventa",
    annualAppreciationRate: "Hipótesis de valorización anual",
    taxRate: "Tipo impositivo",
  },
  it: {
    budget: "Budget di acquisizione",
    nightlyRate: "Tariffa media per notte",
    personalWeeks: "Settimane di utilizzo personale",
    occupancy: "Tasso di occupazione",
    monthlyRent: "Canone mensile stimato",
    resaleHorizonYears: "Orizzonte di rivendita",
    annualAppreciationRate: "Ipotesi di rivalutazione annua",
    taxRate: "Aliquota fiscale",
  },
  nl: {
    budget: "Aankoopprijs",
    nightlyRate: "Gemiddelde nachtprijs",
    personalWeeks: "Weken eigen gebruik",
    occupancy: "Bezettingsgraad",
    monthlyRent: "Maandelijkse huur",
    resaleHorizonYears: "Herverkoophorizon",
    annualAppreciationRate: "Aanname jaarlijkse waardestijging",
    taxRate: "Belastingtarief",
  },
  no: {
    budget: "Kjøpsbudsjett",
    nightlyRate: "Gjennomsnittlig nattpris",
    personalWeeks: "Uker med egen bruk",
    occupancy: "Beleggsgrad",
    monthlyRent: "Estimert månedlig leie",
    resaleHorizonYears: "Videresalgshorisont",
    annualAppreciationRate: "Antatt årlig verdistigning",
    taxRate: "Skattesats",
  },
};

function scriptOrStyleFile(href: string): string {
  return href.split("/").pop()?.split("?")[0] ?? "";
}

export function withoutGlobalFooterStyles<T extends readonly string[]>(
  hrefs: T,
): string[] {
  return hrefs.filter((href) => !GLOBAL_FOOTER_STYLE_FILES.has(scriptOrStyleFile(href)));
}

export function withoutGlobalNavStyles<T extends readonly string[]>(
  hrefs: T,
): string[] {
  return hrefs.filter((href) => !GLOBAL_NAV_STYLE_FILES.has(scriptOrStyleFile(href)));
}

export function withoutGlobalNavScripts<T extends readonly string[]>(
  srcs: T,
): string[] {
  return srcs.filter((href) => !GLOBAL_NAV_SCRIPT_FILES.has(scriptOrStyleFile(href)));
}

/** Removes legacy embedded #mv-chrome markup from static HTML pages. */
export function stripEmbeddedChrome(html: string): string {
  const marker = 'id="mv-chrome"';
  const markerAt = html.indexOf(marker);
  if (markerAt < 0) {
    return html;
  }

  let start = html.lastIndexOf("<div", markerAt);
  if (start < 0) {
    return html;
  }

  const commentStart = html.lastIndexOf("<!--", start);
  if (commentStart >= 0 && start - commentStart < 120) {
    start = commentStart;
  }

  let depth = 0;
  let index = start;

  while (index < html.length) {
    const nextOpen = html.indexOf("<div", index);
    const nextClose = html.indexOf("</div>", index);

    if (nextClose < 0) {
      break;
    }

    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
      continue;
    }

    depth -= 1;
    index = nextClose + 6;

    if (depth === 0) {
      return html.slice(0, start) + html.slice(index);
    }
  }

  return html;
}

/** Removes legacy embedded site footer markup from static HTML pages. */
export function stripEmbeddedFooter(html: string): string {
  const footerMatch = html.match(/<footer[^>]*class="[^"]*om-footer[^"]*"/i);
  if (!footerMatch || footerMatch.index === undefined) {
    return html;
  }

  const start = footerMatch.index;
  const closeTag = "</footer>";
  const closeAt = html.indexOf(closeTag, start);

  if (closeAt < 0) {
    return html;
  }

  return html.slice(0, start) + html.slice(closeAt + closeTag.length);
}

/** Removes the older static header that can leave empty menu/favourite links active. */
export function stripLegacyStaticHeader(html: string): string {
  const headerMatch = html.match(/<header[^>]*class="[^"]*\bjs-header\b[^"]*"/i);
  if (!headerMatch || headerMatch.index === undefined) {
    return html;
  }

  const start = headerMatch.index;
  const closeTag = "</header>";
  const closeAt = html.indexOf(closeTag, start);

  if (closeAt < 0) {
    return html;
  }

  return html.slice(0, start) + html.slice(closeAt + closeTag.length);
}

/** Removes legacy static callback/favourites modals superseded by React routes/forms. */
export function stripLegacyStaticModals(html: string): string {
  return html.replace(
    /<div\s+class="modal modal--full[\s\S]*?<\/div>\s*(?=<div\s+class="modal modal--full|<div\s+class="turn-message|$)/gi,
    "",
  );
}

/** Removes legacy property modal shells superseded by the shared React modal. */
export function stripLegacyStaticPropertyModals(html: string): string {
  let nextHtml = html;

  while (true) {
    const match = nextHtml.match(
      /<div[^>]*class="[^"]*\bom-property-modal\b[^"]*"[^>]*>/i,
    );

    if (!match || match.index === undefined) {
      return nextHtml;
    }

    const start = match.index;
    let depth = 0;
    let index = start;

    while (index < nextHtml.length) {
      const nextOpen = nextHtml.indexOf("<div", index);
      const nextClose = nextHtml.indexOf("</div>", index);

      if (nextClose < 0) {
        return nextHtml.slice(0, start);
      }

      if (nextOpen >= 0 && nextOpen < nextClose) {
        depth += 1;
        index = nextOpen + 4;
        continue;
      }

      depth -= 1;
      index = nextClose + 6;

      if (depth === 0) {
        nextHtml = nextHtml.slice(0, start) + nextHtml.slice(index);
        break;
      }
    }
  }
}

/** Rewrites stale or placeholder interactive targets in migrated static chunks. */
export function fixStaticInteractiveTargets(html: string, locale: SiteLocale = "fr"): string {
  const contactHref = locale === "en" ? "/en/contact/" : locale === "es" ? "/es/contacto/" : locale === "nl" ? "/nl/contact/" : locale === "no" ? "/no/kontakt/" : locale === "it" ? "/it/contatto/" : "/contact/";
  const aboutHref = locale === "en" ? "/en/about/#acteurs-verifies" : locale === "es" ? "/es/sobre-nosotros/#acteurs-verifies" : locale === "nl" ? "/nl/over-ons/#acteurs-verifies" : locale === "no" ? "/no/om-oss/#acteurs-verifies" : locale === "it" ? "/it/chi-siamo/#acteurs-verifies" : "/about/#acteurs-verifies";
  const neighbourhoodsHref = locale === "en" ? "/en/neighbourhoods/" : locale === "es" ? "/es/barrios/" : locale === "nl" ? "/nl/wijken/" : locale === "no" ? "/no/omrader/" : locale === "it" ? "/it/quartieri/" : "/quartiers/";
  const privacyHref = locale === "en" ? "/en/privacy-policy/" : locale === "es" ? "/es/politica-de-privacidad/" : locale === "nl" ? "/nl/privacybeleid/" : locale === "no" ? "/no/personvernerklaering/" : locale === "it" ? "/it/privacy-policy/" : "/privacy-policy/";
  const interactiveLabels = {
    introNext:
      locale === "en"
        ? "View project details"
        : locale === "es"
          ? "Ver detalles del proyecto"
        : locale === "nl"
          ? "Bekijk projectdetails"
          : locale === "no"
            ? "Se prosjektdetaljer"
          : locale === "it"
            ? "Vedi i dettagli del progetto"
            : "Voir les détails du projet",
    carouselPrev:
      locale === "en"
        ? "Previous project"
        : locale === "es"
          ? "Proyecto anterior"
        : locale === "nl"
          ? "Vorig project"
          : locale === "no"
            ? "Forrige prosjekt"
          : locale === "it"
            ? "Progetto precedente"
            : "Projet précédent",
    carouselNext:
      locale === "en"
        ? "Next project"
        : locale === "es"
          ? "Proyecto siguiente"
        : locale === "nl"
          ? "Volgend project"
          : locale === "no"
            ? "Neste prosjekt"
          : locale === "it"
            ? "Progetto successivo"
            : "Projet suivant",
    neighbourhoods:
      locale === "en"
        ? "Explore neighbourhoods"
        : locale === "es"
          ? "Explorar los barrios"
        : locale === "nl"
          ? "Ontdek de wijken"
          : locale === "no"
            ? "Utforsk områdene"
          : locale === "it"
            ? "Esplora i quartieri"
            : "Découvrir les quartiers",
  };
  return html
    .replace(/aria-label="Voir les détails du projet"/g, `aria-label="${interactiveLabels.introNext}"`)
    .replace(/aria-label="Projet précédent"/g, `aria-label="${interactiveLabels.carouselPrev}"`)
    .replace(/aria-label="Projet suivant"/g, `aria-label="${interactiveLabels.carouselNext}"`)
    .replace(/aria-label="Découvrir les quartiers"/g, `aria-label="${interactiveLabels.neighbourhoods}"`)
    .replace(
      /<section class="section ui-dark-background"/,
      '<section id="sur-plan-details" class="section ui-dark-background"',
    )
    .replace(
      /(class="[^"]*\bi-intro__next\b[^"]*"[\s\S]*?)href=(["'])\2/g,
      '$1href="#sur-plan-details"',
    )
    .replace(
      /<a((?=[^>]*\bclass="[^"]*\bi-intro__next\b)(?![^>]*\baria-label=)[^>]*)>/gi,
      `<a$1 aria-label="${interactiveLabels.introNext}">`,
    )
    .replace(
      /(class="[^"]*\bmore-block__button\b[^"]*"[\s\S]*?)href=(["'])\2/g,
      `$1href="${neighbourhoodsHref}"`,
    )
    .replace(
      /<a((?=[^>]*\bclass="[^"]*\bmore-block__button\b)(?![^>]*\baria-label=)[^>]*)>/gi,
      `<a$1 aria-label="${interactiveLabels.neighbourhoods}">`,
    )
    .replace(
      /<a((?=[^>]*\brole="button")(?=[^>]*(?:\bcarousel__thumb__item\b|\bjs-content-animation-(?:prev|next)\b))(?![^>]*\bhref=)[^>]*)>/g,
      '<a$1 href="#sur-plan-details">',
    )
    .replace(
      /<a((?=[^>]*\bclass="[^"]*\bjs-content-animation-prev\b)(?![^>]*\baria-label=)[^>]*)>/gi,
      `<a$1 aria-label="${interactiveLabels.carouselPrev}">`,
    )
    .replace(
      /<a((?=[^>]*\bclass="[^"]*\bjs-content-animation-next\b)(?![^>]*\baria-label=)[^>]*)>/gi,
      `<a$1 aria-label="${interactiveLabels.carouselNext}">`,
    )
    .replace(
      /(<div[^>]*\bdata-field-key="([^"]+)"[^>]*>[\s\S]*?<input(?=[^>]*\bclass="[^"]*\bom-simulator__range\b)(?![^>]*\baria-label=)[^>]*)(>)/gi,
      (match, fieldHtml: string, fieldKey: string, close: string) => {
        const label = SIMULATOR_RANGE_LABELS[locale][fieldKey];
        return label ? `${fieldHtml} aria-label="${label}"${close}` : match;
      },
    )
    .replace(/href="#callback-modal"/g, `href="${contactHref}"`)
    .replace(/href="#safe"/g, `href="${aboutHref}"`)
    .replace(/href="\/about\/?#acteurs-verifies"/g, `href="${aboutHref}"`)
    .replace(/href="\/privacy-policy\/?"/g, `href="${privacyHref}"`)
    .replace(/href="\/location\/?"/g, `href="${neighbourhoodsHref}"`)
    .replace(/href="\/fr\/?"/g, 'href="/"')
    .replace(/href="\/fr\/about\/?"/g, 'href="/about/"')
    .replace(/href="\/fr\/sur-plan\/?"/g, 'href="/sur-plan/"')
    .replace(/href="\/fr\/contact\/?"/g, 'href="/contact/"')
    .replace(/href="tel:\+212000000000"/g, `href="${contactHref}"`)
    .replace(/href=(["'])\1/g, `href="${contactHref}"`)
    .replace(/href=(["'])#\1/g, `href="${contactHref}"`);
}

export function stripEmbeddedFooterFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes("om-footer")) {
      return segment;
    }

    return {
      ...segment,
      html: stripEmbeddedFooter(segment.html),
    };
  });
}

export function stripEmbeddedChromeFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes('id="mv-chrome"')) {
      return segment;
    }

    return {
      ...segment,
      html: stripEmbeddedChrome(segment.html),
    };
  });
}

export function stripGlobalNavScriptsFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.filter((segment) => {
    if (segment.kind !== "script" || !segment.src) {
      return true;
    }

    return withoutGlobalNavScripts([segment.src]).length > 0;
  });
}

export function stripStaleInlineFooterScriptsFromSegments(
  segments: BodySegment[],
): BodySegment[] {
  return segments.filter((segment) => {
    if (segment.kind !== "script" || !segment.inline) {
      return true;
    }

    return !segment.inline.includes("data-mv-year");
  });
}

export function prepareStaticPageSegments(segments: BodySegment[], locale: SiteLocale = "fr"): BodySegment[] {
  return stripStaleInlineFooterScriptsFromSegments(
    stripGlobalNavScriptsFromSegments(
      stripEmbeddedFooterFromSegments(
        stripEmbeddedChromeFromSegments(segments).map((segment) => {
          if (segment.kind !== "html") {
            return segment;
          }

          return {
            ...segment,
            html: fixStaticInteractiveTargets(
              stripLegacyStaticPropertyModals(
                stripLegacyStaticModals(stripLegacyStaticHeader(segment.html)),
              ),
              locale,
            ),
          };
        }),
      ),
    ),
  );
}
