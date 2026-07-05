import type { Metadata, Viewport } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { StaticHtmlBody } from "@/components/layout/StaticHtmlBody";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import type { PageContent } from "@/lib/content/types";
import { buildMetadataFromParsed, buildPageViewport } from "@/lib/seo/metadata";
import type { BodySegment } from "@/lib/static-html/parsePage";
import type { ParsedStaticPage } from "@/lib/static-html/parsePage";

type PageContentShellProps = {
  content: PageContent;
  bodySegments?: BodySegment[];
};

function asParsed(content: PageContent): ParsedStaticPage {
  return content;
}

export function buildPageContentMetadata(content: PageContent): Metadata {
  return buildMetadataFromParsed(asParsed(content));
}

export function buildPageContentViewport(content: PageContent): Viewport {
  return buildPageViewport(content.themeColor);
}

export function PageContentShell({
  content,
  bodySegments = content.bodySegments,
}: PageContentShellProps) {
  return (
    <div suppressHydrationWarning style={{ display: "contents" }}>
      {content.headInitScript ? (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: content.headInitScript }}
        />
      ) : null}
      {content.bodyClass ? <BodyClass className={content.bodyClass} /> : null}
      {content.preconnects.map((href) => (
        <link key={href} rel="preconnect" href={href} />
      ))}
      <StylesheetLinks hrefs={content.stylesheets} />
      {content.manifestHref ? (
        <link rel="manifest" href={content.manifestHref} />
      ) : null}
      {content.headInlineStyles.map((css, index) => (
        <style key={index} suppressHydrationWarning>
          {css}
        </style>
      ))}
      {content.headJsonLdScripts.map((json, index) => (
        <script
          key={`ld+json-${index}`}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
      <StaticHtmlBody segments={bodySegments} />
    </div>
  );
}
