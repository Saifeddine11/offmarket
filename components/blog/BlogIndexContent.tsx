import { DeferredBlogBoot } from "@/components/layout/DeferredBlogBoot";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { getBlogHubLocale } from "@/lib/blog/blogHubData";
import { withServerRenderedBlogHub } from "@/lib/blog/buildBlogHubHtml";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { PageContent } from "@/lib/content/types";
import type { SiteLocale } from "@/lib/i18n/types";
import type { BodySegment } from "@/lib/static-html/parsePage";

type BlogIndexContentProps = {
  content: PageContent;
};

function withBlogHubMarkup(
  segments: BodySegment[],
  locale: SiteLocale,
): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes("data-om-blog-root")) {
      return segment;
    }
    return {
      ...segment,
      html: withServerRenderedBlogHub(segment.html, locale),
    };
  });
}

export function BlogIndexContent({ content }: BlogIndexContentProps) {
  const prepared = preparePageWithFinalCta(content);
  const locale = getBlogHubLocale(content.htmlLang);
  const bodySegments = withBlogHubMarkup(prepared.bodySegments, locale);
  const heading =
    content.htmlLang === "en"
      ? "Marrakech real estate blog"
      : content.htmlLang === "nl"
        ? "Vastgoedblog Marrakech"
        : content.htmlLang === "it"
          ? "Blog immobiliare Marrakech"
        : "Blog immobilier Marrakech";

  return (
    <>
      <h1 style={screenReaderOnlyStyle}>{heading}</h1>
      <PageContentShell
        content={{ ...prepared.content, bodySegments }}
        bodySegments={bodySegments}
      />
      <DeferredBlogBoot />
    </>
  );
}

const screenReaderOnlyStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;
