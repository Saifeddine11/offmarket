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
  title: "Ons verhaal — OFF MARKET Marrakech",
  description:
    "Ontdek de aanpak van OFF MARKET in Marrakech: een private speler gewijd aan selectie, analyse en vertrouwelijke toegang tot vastgoedkansen.",
  ogDescription:
    "Een private, selectieve en vertrouwelijke benadering van vastgoed in Marrakech.",
  twitterDescription:
    "Een private, selectieve en vertrouwelijke benadering van vastgoed in Marrakech.",
  canonicalPath: "/nl/over-ons/",
  ogLocale: "nl_NL",
  ogImage: "https://offmarketofficial.com/assets/images/hero/notre-histoire-hero.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NlOverOnsPage() {
  return (
    <PageShell className="om-about-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-about-page om-inner-page" />

      <AboutPageContent
        langLinks={LANG_LINKS.about}
        aboutHref="/nl/over-ons/"
        locale="nl"
      />
      <LegacyScripts srcs={SCRIPTS.innerEditorial} />
    </PageShell>
  );
}
