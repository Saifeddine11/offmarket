import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("nl");
export const viewport = buildHomepageViewport("nl");

export default function NlHomePage() {
  return <HomePageContent content={getPageContent("home-nl")} includeFaqSection />;
}
