import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Våre eiendomsprosjekter i Marrakech — OFF MARKET",
  description:
    "Oppdag villaer, leiligheter, nybyggprosjekter og konfidensielle muligheter i Marrakech, analysert før presentasjon.",
  ogDescription:
    "Et utvalg villaer, leiligheter og konfidensielle muligheter i Marrakech, analysert før presentasjon.",
  twitterDescription:
    "Et utvalg villaer, leiligheter og konfidensielle muligheter i Marrakech, analysert før presentasjon.",
  canonicalPath: "/no/prosjekter/",
  ogLocale: "nb_NO",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function NoProsjekterPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />
      <NosProjetsPageContent locale="no" />
    </PageShell>
  );
}
