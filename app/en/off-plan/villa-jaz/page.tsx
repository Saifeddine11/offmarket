import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Off-plan villa project",
  description:
    "Discover Villa Jaz in Marrakech: off-plan villas, limited availability, general information, features, exteriors, interiors and plans.",
  ogTitle: "Villa Jaz Marrakech — Off-plan villa project",
  ogDescription:
    "Discover Villa Jaz in Marrakech: off-plan villas, limited availability, general information, features, exteriors, interiors and plans.",
  twitterDescription:
    "Discover Villa Jaz in Marrakech: off-plan villas, limited availability, general information, features, exteriors, interiors and plans.",
  canonicalPath: "/en/off-plan/villa-jaz/",
  ogLocale: "en_US",
  ogImage:
    "https://offmarketofficial.com/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EnVillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />

      <VillaJazDetailPageContent locale="en" />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
