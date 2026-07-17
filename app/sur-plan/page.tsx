import type { Metadata } from "next";
import { BusinessRouteContent } from "@/components/business/BusinessRouteContent";
import { getPageContent } from "@/lib/content/pages";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

const content = getPageContent("sur-plan");

export const metadata: Metadata = buildPageMetadata({
  title: "Immobilier sur plan à Marrakech — Projets sélectionnés | OFF MARKET",
  description:
    "Guide d’achat immobilier sur plan à Marrakech et au Maroc : projets neufs, documents à vérifier, paiements, risques, livraison et lecture d’investissement.",
  canonicalPath: "/sur-plan/",
  ogLocale: "fr_FR",
});

export const viewport = buildPageViewport("#565449");

export default function SurPlanPage() {
  return <BusinessRouteContent content={content} />;
}
