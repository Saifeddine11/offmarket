import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
} from "@/lib/homepage/homepagePages";

export const metadata: Metadata = buildHomepageMetadata("fr");
export const viewport = buildHomepageViewport("fr");

export default function FrHomePage() {
  return <HomePageContent content={getPageContent("home-fr")} />;
}
