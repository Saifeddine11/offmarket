import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("root");
export const viewport = buildHomepageViewport("root");

export default function HomePage() {
  return <HomePageContent content={getPageContent("home-root")} includeFaqSection />;
}
