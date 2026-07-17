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
  title: "S.A.F.E. — Cadre de vérification immobilière au Maroc | OFF MARKET",
  description:
    "Découvrez S.A.F.E., le cadre propriétaire d'OFF MARKET pour examiner les informations, documents, risques et transparence des projets immobiliers à Marrakech et au Maroc avant leur présentation.",
  ogDescription:
    "Le cadre propriétaire d'OFF MARKET pour lire les informations, documents et points de vigilance d'un projet immobilier.",
  twitterDescription:
    "Le cadre propriétaire d'OFF MARKET pour lire les informations, documents et points de vigilance d'un projet immobilier.",
  canonicalPath: "/about/",
  ogImage: "https://offmarketofficial.com/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function AboutPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />

      <AboutPageContent langLinks={LANG_LINKS.about} aboutHref="/about/" />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
