import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Où investir à Marrakech — Quartiers et projets immobiliers",
  description:
    "Comparez les quartiers de Marrakech avant d’acheter ou d’investir : Guéliz, Hivernage, Triangle d’Or, Médina, appartements, villas et projets sur plan.",
  ogTitle: "Où investir à Marrakech — OFF MARKET",
  ogDescription:
    "Une lecture claire des quartiers de Marrakech selon centralité, standing, rareté, potentiel locatif et valeur patrimoniale.",
  canonicalPath: "/quartiers/",
  ogImage: "https://offmarketofficial.com/assets/mavericks/gallery/mavericks-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function QuartiersPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />

      <QuartiersPageContent />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
