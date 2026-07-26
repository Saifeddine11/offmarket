import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "I nostri progetti immobiliari a Marrakech — OFF MARKET",
  description:
    "Scopri ville, appartamenti, progetti su progetto e opportunità riservate a Marrakech, analizzati prima della presentazione.",
  ogDescription:
    "Una selezione di ville, appartamenti e opportunità riservate a Marrakech, analizzate prima della presentazione.",
  twitterDescription:
    "Una selezione di ville, appartamenti e opportunità riservate a Marrakech, analizzate prima della presentazione.",
  canonicalPath: "/it/progetti/",
  ogLocale: "it_IT",
  ogImage: "https://offmarketofficial.com/assets/offmarket/gallery/offmarket-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function ItProgettiPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />
      <NosProjetsPageContent locale="it" />
    </PageShell>
  );
}
