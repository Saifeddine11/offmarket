import type { Metadata } from "next";
import { BusinessRouteContent } from "@/components/business/BusinessRouteContent";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";
import { getPageContent } from "@/lib/content/pages";

const content = getPageContent("off-plan-en");

export const metadata: Metadata = buildPageContentMetadata(content);
export const viewport = buildPageContentViewport(content);

export default function EnOffPlanPage() {
  return <BusinessRouteContent content={content} />;
}
