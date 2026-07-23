import type { Metadata } from "next";
import { BusinessRouteContent } from "@/components/business/BusinessRouteContent";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";
import { getLocalizedOffPlanContent } from "@/lib/business/businessPages";

const content = getLocalizedOffPlanContent("no");

export const metadata: Metadata = buildPageContentMetadata(content);
export const viewport = buildPageContentViewport(content);

export default function NoNybyggPage() {
  return <BusinessRouteContent content={content} />;
}
