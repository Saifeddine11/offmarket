/**
 * @deprecated Phase 9 — use PageContentShell + lib/content/pages.ts.
 * Kept for reference only; no production route imports this module.
 */
import type { Metadata, Viewport } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { StaticHtmlBody } from "@/components/layout/StaticHtmlBody";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { buildMetadataFromParsed, buildPageViewport } from "@/lib/seo/metadata";
import { parseStaticHtmlFile } from "@/lib/static-html/parsePage";

export function buildStaticHtmlRouteMetadata(relativeFile: string): Metadata {
  return buildMetadataFromParsed(parseStaticHtmlFile(relativeFile));
}

export function buildStaticHtmlRouteViewport(relativeFile: string): Viewport {
  return buildPageViewport(parseStaticHtmlFile(relativeFile).themeColor);
}

export function StaticHtmlRoutePage({ relativeFile }: { relativeFile: string }) {
  const parsed = parseStaticHtmlFile(relativeFile);

  return (
    <div suppressHydrationWarning style={{ display: "contents" }}>
      {parsed.headInitScript ? (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: parsed.headInitScript }}
        />
      ) : null}
      {parsed.bodyClass ? <BodyClass className={parsed.bodyClass} /> : null}
      {parsed.preconnects.map((href) => (
        <link key={href} rel="preconnect" href={href} />
      ))}
      <StylesheetLinks hrefs={parsed.stylesheets} />
      {parsed.manifestHref ? (
        <link rel="manifest" href={parsed.manifestHref} />
      ) : null}
      {parsed.headInlineStyles.map((css, index) => (
        <style key={index} suppressHydrationWarning>
          {css}
        </style>
      ))}
      {parsed.headJsonLdScripts.map((json, index) => (
        <script
          key={`ld+json-${index}`}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
      <StaticHtmlBody segments={parsed.bodySegments} />
    </div>
  );
}
