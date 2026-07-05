import type { BodySegment } from "@/lib/static-html/parsePage";

/** Structured page content extracted from legacy HTML (not read at runtime from archive). */
export type PageContent = {
  htmlLang: string;
  stylesheets: string[];
  headInlineStyle: string | null;
  preconnects: string[];
  manifestHref: string | null;
  bodyClass: string;
  headInlineStyles: string[];
  headInitScript: string | null;
  headJsonLdScripts: string[];
  bodySegments: BodySegment[];
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  themeColor: string;
};

export type PageMetadata = Pick<
  PageContent,
  | "title"
  | "description"
  | "canonical"
  | "ogType"
  | "ogTitle"
  | "ogDescription"
  | "ogLocale"
  | "ogImage"
  | "twitterTitle"
  | "twitterDescription"
  | "twitterImage"
  | "themeColor"
  | "htmlLang"
>;
