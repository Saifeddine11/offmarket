import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { VillaJazDetailPageContent } from "@/components/sections/VillaJazDetailPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Villa Jaz Marrakech — Proyecto de villas sobre plano",
  description:
    "Descubra Villa Jaz en Marrakech: villas sobre plano, disponibilidad limitada, información general, características, exteriores, interiores y planos.",
  ogTitle: "Villa Jaz Marrakech — Proyecto de villas sobre plano",
  ogDescription:
    "Descubra Villa Jaz en Marrakech: villas sobre plano, disponibilidad limitada, información general, características, exteriores, interiores y planos.",
  twitterDescription:
    "Descubra Villa Jaz en Marrakech: villas sobre plano, disponibilidad limitada, información general, características, exteriores, interiores y planos.",
  canonicalPath: "/es/sobre-plano/villa-jaz/",
  ogLocale: "es_ES",
  ogImage:
    "https://offmarketofficial.com/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EsVillaJazDetailPage() {
  return (
    <PageShell className="om-villa-jaz-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-villa-jaz-page om-animated-page om-inner-page" />
      <VillaJazDetailPageContent locale="es" />
      <DeferredLegacyScripts srcs={SCRIPTS.villaJazDetail} />
    </PageShell>
  );
}
