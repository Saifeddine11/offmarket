import type { Metadata, Viewport } from "next";
import {
  getPageContent,
  type HomepagePageId,
} from "@/lib/content/pages";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";

export type HomepageLocale = "root" | "fr" | "en" | "it" | "nl";

const LOCALE_PAGE_IDS: Record<HomepageLocale, HomepagePageId> = {
  root: "home-root",
  fr: "home-fr",
  en: "home-en",
  it: "home-it",
  nl: "home-nl",
};

export function getHomepagePageId(locale: HomepageLocale): HomepagePageId {
  return LOCALE_PAGE_IDS[locale];
}

export function buildHomepageMetadata(locale: HomepageLocale): Metadata {
  return buildPageContentMetadata(getPageContent(getHomepagePageId(locale)));
}

export function buildHomepageViewport(locale: HomepageLocale): Viewport {
  return buildPageContentViewport(getPageContent(getHomepagePageId(locale)));
}
