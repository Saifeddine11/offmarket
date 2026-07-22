import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("en");
export const viewport = buildHomepageViewport("en");

export default function EnHomePage() {
  return <HomePageContent content={getPageContent("home-en")} includeFaqSection />;
}
