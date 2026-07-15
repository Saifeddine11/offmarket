import { SITE_URL } from "@/lib/legacy/routes";

/**
 * Site-wide JSON-LD graph (Organization + WebSite).
 * Rendered once in the root layout so Google can resolve the brand entity
 * on every page. Kept minimal and factual — no invented social profiles.
 */
export const SITE_STRUCTURED_DATA = {
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
      description:
        "Immobilier privé à Marrakech : une sélection confidentielle de villas, appartements, projets sur plan et opportunités off-market.",
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
      knowsLanguage: ["fr", "en", "nl", "it"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "OFF MARKET",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
