import type { Metadata } from "next";
import { BusinessRouteContent } from "@/components/business/BusinessRouteContent";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";
import { getPageContent } from "@/lib/content/pages";

const content = getPageContent("sur-plan-fr");

export const metadata: Metadata = buildPageContentMetadata(content);
export const viewport = buildPageContentViewport(content);

export default function FrSurPlanPage() {
  return <BusinessRouteContent content={content} />;
}
