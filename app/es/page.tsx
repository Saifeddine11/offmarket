import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
  getHomepageContent,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("es");
export const viewport = buildHomepageViewport("es");

export default function EsHomePage() {
  return <HomePageContent content={getHomepageContent("es")} includeFaqSection />;
}
