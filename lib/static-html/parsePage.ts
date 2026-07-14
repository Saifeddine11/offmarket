import type { ReactNode } from "react";

export type BodySegment =
  | { kind: "html"; html: string }
  | { kind: "react"; element: ReactNode; key?: string }
  | {
      kind: "script";
      src?: string;
      inline?: string;
      defer?: boolean;
      async?: boolean;
      type?: string;
      fetchpriority?: string;
      dataAttributes?: Record<string, string>;
    };

export type ParsedStaticPage = {
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
