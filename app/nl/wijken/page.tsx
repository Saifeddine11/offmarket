import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Waar investeren in Marrakech — Wijken en vastgoedprojecten",
  description:
    "Vergelijk de wijken van Marrakech voordat u koopt of investeert: Guéliz, Hivernage, Triangle d'Or, Medina, appartementen, villa's en nieuwbouwprojecten.",
  ogTitle: "Waar investeren in Marrakech — OFF MARKET",
  ogDescription:
    "Een heldere lezing van de wijken van Marrakech volgens centraliteit, standing, schaarste, huurpotentieel en vermogenswaarde.",
  canonicalPath: "/nl/wijken/",
  ogLocale: "nl_NL",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NlWijkenPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />

      <QuartiersPageContent locale="nl" />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
