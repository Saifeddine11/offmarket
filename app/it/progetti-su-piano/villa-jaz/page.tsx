import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Progetto di ville su progetto",
  description:
    "Scopri Villa Jaz a Marrakech: ville su progetto, disponibilità limitata, informazioni generali, caratteristiche, esterni, interni e planimetrie.",
  ogTitle: "Villa Jaz Marrakech — Progetto di ville su progetto",
  ogDescription:
    "Scopri Villa Jaz a Marrakech: ville su progetto, disponibilità limitata, caratteristiche, esterni, interni e planimetrie.",
  twitterDescription:
    "Scopri Villa Jaz a Marrakech: ville su progetto, disponibilità limitata, caratteristiche, esterni, interni e planimetrie.",
  canonicalPath: "/it/progetti-su-piano/villa-jaz/",
  ogLocale: "it_IT",
  ogImage:
    "https://offmarketofficial.com/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function ItVillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />
      <VillaJazDetailPageContent locale="it" />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
