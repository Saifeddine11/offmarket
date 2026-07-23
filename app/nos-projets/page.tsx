import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageShell } from "@/components/layout/PageShell";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Nos projets immobiliers à Marrakech — Villas, appartements et off-market",
  description:
    "Découvrez les projets immobiliers sélectionnés à Marrakech : villas sur plan, appartements neufs, opportunités off-market et biens confidentiels étudiés avant présentation.",
  ogDescription:
    "Une sélection de villas, appartements et opportunités confidentielles à Marrakech, étudiées avant présentation.",
  twitterDescription:
    "Une sélection de villas, appartements et opportunités confidentielles à Marrakech, étudiées avant présentation.",
  canonicalPath: "/nos-projets/",
  ogImage: "https://offmarketofficial.com/assets/mavericks/gallery/mavericks-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function NosProjetsPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />

      <NosProjetsPageContent />
    </PageShell>
  );
}
