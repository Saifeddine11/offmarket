import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hvor investere i Marrakech — Områder og eiendomsprosjekter",
  description:
    "Sammenlign områdene i Marrakech før kjøp eller investering: Guéliz, Hivernage, Triangle d'Or, Medina, leiligheter, villaer og nybyggprosjekter.",
  ogTitle: "Hvor investere i Marrakech — OFF MARKET",
  ogDescription:
    "En tydelig analyse av Marrakech-områder etter sentralitet, nivå, sjeldenhet, utleiepotensial og langsiktig verdi.",
  twitterDescription:
    "En tydelig analyse av Marrakech-områder etter sentralitet, nivå, sjeldenhet, utleiepotensial og langsiktig verdi.",
  canonicalPath: "/no/omrader/",
  ogLocale: "nb_NO",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function NoOmraderPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />
      <QuartiersPageContent locale="no" />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
