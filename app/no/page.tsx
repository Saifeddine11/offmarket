import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
  getHomepageContent,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("no");
export const viewport = buildHomepageViewport("no");

export default function NoHomePage() {
  return <HomePageContent content={getHomepageContent("no")} includeFaqSection />;
}
