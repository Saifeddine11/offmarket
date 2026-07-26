import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Nuestros proyectos inmobiliarios en Marrakech — OFF MARKET",
  description:
    "Descubra villas, apartamentos, proyectos sobre plano y oportunidades confidenciales en Marrakech, analizados antes de su presentación.",
  ogDescription:
    "Una selección de villas, apartamentos y oportunidades confidenciales en Marrakech, analizadas antes de su presentación.",
  twitterDescription:
    "Una selección de villas, apartamentos y oportunidades confidenciales en Marrakech, analizadas antes de su presentación.",
  canonicalPath: "/es/proyectos/",
  ogLocale: "es_ES",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function EsProyectosPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />
      <NosProjetsPageContent locale="es" />
    </PageShell>
  );
}
