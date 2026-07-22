import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("it");
export const viewport = buildHomepageViewport("it");

export default function ItHomePage() {
  return <HomePageContent content={getPageContent("home-it")} includeFaqSection />;
}
