import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getPageContent } from "@/lib/content/pages";
import {
  buildHomepageMetadata,
  buildHomepageViewport,
  getHomepagePageId,
  type HomepageLocale,
} from "@/lib/homepage/homepagePages";

export type { HomepageLocale };

export { buildHomepageMetadata, buildHomepageViewport };

export function LocaleHomepage({ locale }: { locale: HomepageLocale }) {
  const content = getPageContent(getHomepagePageId(locale));
  return <HomePageContent content={content} />;
}
