import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Nieuwbouwvillaproject",
  description:
    "Ontdek Villa Jaz in Marrakech: nieuwbouwvilla's, beperkte beschikbaarheid, algemene informatie, kenmerken, exterieurs, interieurs en plattegronden.",
  ogTitle: "Villa Jaz Marrakech — Nieuwbouwvillaproject",
  ogDescription:
    "Ontdek Villa Jaz in Marrakech: nieuwbouwvilla's, beperkte beschikbaarheid, algemene informatie, kenmerken, exterieurs, interieurs en plattegronden.",
  twitterDescription:
    "Ontdek Villa Jaz in Marrakech: nieuwbouwvilla's, beperkte beschikbaarheid, algemene informatie, kenmerken, exterieurs, interieurs en plattegronden.",
  canonicalPath: "/nl/nieuwbouw/villa-jaz/",
  ogLocale: "nl_NL",
  ogImage:
    "https://offmarketofficial.com/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NlVillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />

      <VillaJazDetailPageContent locale="nl" />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
