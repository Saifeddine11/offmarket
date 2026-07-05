import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { MavericksChrome } from "@/components/layout/MavericksChrome";
import { PageShell } from "@/components/layout/PageShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NosProjetsPageContent } from "@/components/sections/NosProjetsPageContent";
import { SCRIPTS } from "@/lib/assets";
import { LANG_LINKS } from "@/lib/routes";
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
  ogImage: "https://offmarket.ma/assets/mavericks/gallery/mavericks-collection-estates.jpg",
});

export const viewport = buildPageViewport("#565449");

export default function NosProjetsPage() {
  return (
    <PageShell className="om-nos-projets-page om-animated-page om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-nos-projets-page om-animated-page om-inner-page" />

      <MavericksChrome
        variant="hero"
        activeLang="FR"
        langLinks={LANG_LINKS.nosProjets}
      />
      <NosProjetsPageContent />
      <SiteFooter />
      <LegacyScripts srcs={SCRIPTS.nosProjets} />
    </PageShell>
  );
}
