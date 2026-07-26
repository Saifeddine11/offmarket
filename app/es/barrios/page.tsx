import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Dónde invertir en Marrakech — Barrios y proyectos inmobiliarios",
  description:
    "Compare los barrios de Marrakech antes de comprar o invertir: Guéliz, Hivernage, Triangle d'Or, Medina, apartamentos, villas y proyectos sobre plano.",
  ogTitle: "Dónde invertir en Marrakech — OFF MARKET",
  ogDescription:
    "Una lectura clara de los barrios de Marrakech según centralidad, standing, rareza, potencial de alquiler y valor patrimonial.",
  twitterDescription:
    "Una lectura clara de los barrios de Marrakech según centralidad, standing, rareza, potencial de alquiler y valor patrimonial.",
  canonicalPath: "/es/barrios/",
  ogLocale: "es_ES",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function EsBarriosPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />
      <QuartiersPageContent locale="es" />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
