import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { SCRIPTS } from "@/lib/assets";
import { LANG_LINKS } from "@/lib/routes";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "La nostra storia — OFF MARKET Marrakech",
  description:
    "Scopri l'approccio di OFF MARKET a Marrakech: selezione, analisi e accesso riservato a opportunità immobiliari.",
  ogDescription:
    "Un approccio privato, selettivo e riservato al mercato immobiliare di Marrakech.",
  twitterDescription:
    "Un approccio privato, selettivo e riservato al mercato immobiliare di Marrakech.",
  canonicalPath: "/it/chi-siamo/",
  ogLocale: "it_IT",
  ogImage: "https://offmarketofficial.com/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function ItChiSiamoPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />
      <AboutPageContent
        langLinks={LANG_LINKS.about}
        aboutHref="/it/chi-siamo/"
        locale="it"
      />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
