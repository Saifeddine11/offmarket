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
  title: "S.A.F.E. — Cadre indépendant d’analyse immobilière | OFF MARKET",
  description:
    "Découvrez S.A.F.E., un cadre indépendant d'analyse et de sécurisation immobilière dont OFF MARKET respecte et applique les principes lors de l'étude des opportunités.",
  ogDescription:
    "Un cadre indépendant d'analyse immobilière dont OFF MARKET respecte et applique les principes.",
  twitterDescription:
    "Un cadre indépendant d'analyse immobilière dont OFF MARKET respecte et applique les principes.",
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
