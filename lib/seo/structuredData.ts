import { SITE_URL } from "@/lib/legacy/routes";

/**
 * Site-wide JSON-LD graph (Organization + WebSite).
 * Rendered once in the root layout so Google can resolve the brand entity
 * on every page. Kept minimal and factual — no invented social profiles.
 */
export function getSiteStructuredData(locale: "fr" | "en" | "nl" | "it" | "es" | "no") {
  const language =
    locale === "fr"
      ? "fr-FR"
      : locale === "en"
        ? "en-US"
        : locale === "es"
          ? "es-ES"
        : locale === "nl"
        ? "nl-NL"
        : locale === "no"
          ? "nb-NO"
        : "it-IT";
  const descriptions = {
    fr: "Immobilier privé à Marrakech : une sélection confidentielle de villas, appartements, projets sur plan et opportunités off-market.",
    en: "Private real estate in Marrakech: a confidential selection of villas, apartments, off-plan projects and off-market opportunities.",
    es: "Inmobiliaria privada en Marrakech: una selección confidencial de villas, apartamentos, proyectos sobre plano y oportunidades off-market.",
    nl: "Privaat vastgoed in Marrakech: een vertrouwelijke selectie van villa's, appartementen, nieuwbouwprojecten en off-marketkansen.",
    it: "Immobiliare privato a Marrakech: una selezione riservata di ville, appartamenti, progetti in costruzione e opportunità off-market.",
    no: "Privat eiendom i Marrakech: et konfidensielt utvalg av villaer, leiligheter, nybyggprosjekter og off-market-muligheter.",
  } as const;

  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#organization`,
      name: "OFF MARKET",
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logos/logoblack.webp`,
      },
      image: `${SITE_URL}/assets/mavericks/hero/mavericks-hero-poster.jpg`,
      description: descriptions[locale],
      email: "contact@offmarketofficial.com",
      areaServed: {
        "@type": "City",
        name: "Marrakech",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marrakech",
        addressCountry: "MA",
      },
      knowsLanguage: ["fr", "en", "es", "nl", "it", "nb"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "OFF MARKET",
      inLanguage: language,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
  };
}

export const SITE_STRUCTURED_DATA = getSiteStructuredData("fr");
