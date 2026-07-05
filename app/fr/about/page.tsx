import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { MavericksChrome } from "@/components/layout/MavericksChrome";
import { PageShell } from "@/components/layout/PageShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { SCRIPTS } from "@/lib/assets";
import { LANG_LINKS } from "@/lib/routes";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Notre Histoire — OFF MARKET Marrakech",
  description:
    "Découvrez l'approche OFF MARKET à Marrakech : une maison privée dédiée à la sélection, l'analyse et l'accès confidentiel aux opportunités immobilières.",
  ogDescription:
    "Une approche privée, sélective et confidentielle de l'immobilier à Marrakech.",
  twitterDescription:
    "Une approche privée, sélective et confidentielle de l'immobilier à Marrakech.",
  canonicalPath: "/fr/about/",
  ogImage: "https://offmarket.ma/assets/mavericks/hero/mavericks-hero-villa.webp",
});

export const viewport = buildPageViewport("#565449");

export default function FrAboutPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />

      <MavericksChrome
        variant="hero"
        activeLang="FR"
        langLinks={LANG_LINKS.frAbout}
      />
      <AboutPageContent
        langLinks={LANG_LINKS.frAbout}
        aboutHref="/fr/about/"
      />
      <SiteFooter currentPage="about" aboutHref="/fr/about/" />
      <LegacyScripts srcs={[...SCRIPTS.innerEditorial, ...SCRIPTS.aboutHomeSections]} />
    </PageShell>
  );
}
