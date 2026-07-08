import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Projet de villas sur plan",
  description:
    "Découvrez Villa Jaz à Marrakech : villas sur plan, disponibilité limitée, informations générales, caractéristiques, extérieurs, intérieurs et plans.",
  ogTitle: "Villa Jaz Marrakech — Projet de villas sur plan",
  ogDescription:
    "Découvrez Villa Jaz à Marrakech : villas sur plan, disponibilité limitée, informations générales, caractéristiques, extérieurs, intérieurs et plans.",
  twitterDescription:
    "Découvrez Villa Jaz à Marrakech : villas sur plan, disponibilité limitée, informations générales, caractéristiques, extérieurs, intérieurs et plans.",
  canonicalPath: "/sur-plan/villa-jaz/",
  ogImage:
    "https://offmarket.ma/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function VillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />

      <VillaJazDetailPageContent />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
