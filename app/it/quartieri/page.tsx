import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { DeferredLegacyScripts } from "@/components/layout/DeferredLegacyScripts";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { QuartiersPageContent } from "@/components/sections/QuartiersPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Dove investire a Marrakech — Quartieri e progetti immobiliari",
  description:
    "Confronta i quartieri di Marrakech prima di acquistare o investire: Guéliz, Hivernage, Triangle d'Or, Medina, appartamenti, ville e nuove costruzioni.",
  ogTitle: "Dove investire a Marrakech — OFF MARKET",
  ogDescription:
    "Una lettura chiara dei quartieri di Marrakech secondo centralità, prestigio, rarità, potenziale locativo e valore nel tempo.",
  twitterDescription:
    "Una lettura chiara dei quartieri di Marrakech secondo centralità, prestigio, rarità, potenziale locativo e valore nel tempo.",
  canonicalPath: "/it/quartieri/",
  ogLocale: "it_IT",
  ogImage: "https://offmarketofficial.com/assets/mavericks/gallery/mavericks-the-passage.webp",
});

export const viewport = buildPageViewport("#565449");

export default function ItQuartieriPage() {
  return (
    <PageShell className="om-quartiers-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-quartiers-page om-inner-page" deferLegacyBoot />
      <QuartiersPageContent locale="it" />
      <DeferredLegacyScripts srcs={SCRIPTS.quartiers} />
    </PageShell>
  );
}
