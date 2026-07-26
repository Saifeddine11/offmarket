import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Where to invest in Marrakech — Neighbourhoods and real estate projects",
  description:
    "Compare Marrakech neighbourhoods before buying or investing: Guéliz, Hivernage, Triangle d'Or, Medina, apartments, villas and off-plan projects.",
  ogTitle: "Where to invest in Marrakech — OFF MARKET",
  ogDescription:
    "A clear reading of Marrakech neighbourhoods by centrality, standing, rarity, rental potential and long-term value.",
  canonicalPath: "/en/neighbourhoods/",
  ogLocale: "en_US",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EnNeighbourhoodsPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />

      <QuartiersPageContent locale="en" />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
