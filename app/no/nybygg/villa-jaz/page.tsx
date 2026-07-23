import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Nybyggvilla-prosjekt",
  description:
    "Oppdag Villa Jaz i Marrakech: nybyggvillaer, begrenset tilgjengelighet, generell informasjon, egenskaper, eksteriør, interiør og plantegninger.",
  ogTitle: "Villa Jaz Marrakech — Nybyggvilla-prosjekt",
  ogDescription:
    "Oppdag Villa Jaz i Marrakech: nybyggvillaer, begrenset tilgjengelighet, generell informasjon, egenskaper, eksteriør, interiør og plantegninger.",
  twitterDescription:
    "Oppdag Villa Jaz i Marrakech: nybyggvillaer, begrenset tilgjengelighet, generell informasjon, egenskaper, eksteriør, interiør og plantegninger.",
  canonicalPath: "/no/nybygg/villa-jaz/",
  ogLocale: "nb_NO",
  ogImage:
    "https://offmarketofficial.com/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NoVillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />
      <VillaJazDetailPageContent locale="no" />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
