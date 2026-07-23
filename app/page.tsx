import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
  getHomepageContent,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("root");
export const viewport = buildHomepageViewport("root");

export default function HomePage() {
  return <HomePageContent content={getHomepageContent("root")} includeFaqSection />;
}
