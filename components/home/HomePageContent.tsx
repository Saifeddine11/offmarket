import { LeadFormStaticBridge } from "@/components/forms/LeadFormStaticBridge";
import { HomeFaqBoot } from "@/components/home/HomeFaqBoot";
import {
  buildHomeFaqHtml,
  buildHomeFaqJsonLd,
  HOME_FAQ_STYLES,
  HOME_FAQ_SECTION_ID,
} from "@/components/home/homeFaqContent";
import { DeferredBlogBoot } from "@/components/layout/DeferredBlogBoot";
import { DeferredSimulatorBoot } from "@/components/layout/DeferredSimulatorBoot";
import { DeferredHeroBoot } from "@/components/home/DeferredHeroBoot";
import { DeferredHomeLegacyBoot } from "@/components/home/DeferredHomeLegacyBoot";
import { HeroResourceHints } from "@/components/home/HeroResourceHints";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { boostAboveFoldImages } from "@/lib/homepage/boostAboveFoldImages";
import { localizeHomeLegacySegments } from "@/lib/homepage/localizeHomeLegacyContent";
import { replaceFeaturedProjectsSection } from "@/lib/homepage/replaceFeaturedProjectsSection";
import { withServerRenderedBlogHub } from "@/lib/blog/buildBlogHubHtml";
import {
  deprioritizeLegacyBundles,
  prioritizeHomepageStylesheets,
  reorderHomepageScripts,
  stripDuplicateHeadInit,
} from "@/lib/homepage/optimizeHomepageLoad";
import type { PageContent } from "@/lib/content/types";
import type { SiteLocale } from "@/lib/i18n/types";
import type { BodySegment } from "@/lib/static-html/parsePage";

function hasBlogHubSection(content: PageContent): boolean {
  return content.bodySegments.some(
    (segment) =>
      segment.kind === "html" && segment.html.includes("data-om-blog"),
  );
}

type HomePageContentProps = {
  content: PageContent;
  includeFaqSection?: boolean;
};

const HOME_LEAD_QUESTIONNAIRE_STYLES =
  "/assets/stylesheets/om-contact-page.css?v=1767552000";
const HOME_MARKET_DEMAND_STYLES =
  "/assets/stylesheets/om-market-demand.css?v=1767582000";

function resolveContentLocale(content: PageContent): SiteLocale {
  return content.htmlLang === "en" ||
    content.htmlLang === "it" ||
    content.htmlLang === "nl" ||
    content.htmlLang === "es" ||
    content.htmlLang === "no"
    ? content.htmlLang
    : "fr";
}

function withLeadQuestionnaireStyles(content: PageContent): PageContent {
  const styles = content.stylesheets ?? [];
  if (styles.some((href) => href.includes("om-contact-page.css"))) {
    return content;
  }
  return { ...content, stylesheets: [...styles, HOME_LEAD_QUESTIONNAIRE_STYLES] };
}

function withMarketDemandStyles(content: PageContent): PageContent {
  const styles = content.stylesheets ?? [];
  if (styles.some((href) => href.includes("om-market-demand.css"))) {
    return content;
  }
  return { ...content, stylesheets: [...styles, HOME_MARKET_DEMAND_STYLES] };
}

/**
 * French / locale homepages — structured content from content/pages/home-*.json.
 * Body segments preserve exact legacy markup, classes, and script order.
 */
export function HomePageContent({
  content,
  includeFaqSection = false,
}: HomePageContentProps) {
  const locale = resolveContentLocale(content);
  const contentWithLeadStyles = withMarketDemandStyles(
    withLeadQuestionnaireStyles(content),
  );
  const optimizedContent = stripDuplicateHeadInit({
    ...contentWithLeadStyles,
    stylesheets: prioritizeHomepageStylesheets(
      contentWithLeadStyles.stylesheets,
    ),
    headInlineStyles: includeFaqSection
      ? [...content.headInlineStyles, HOME_FAQ_STYLES]
      : content.headInlineStyles,
    headJsonLdScripts: includeFaqSection
      ? [...content.headJsonLdScripts, buildHomeFaqJsonLd(locale)]
      : content.headJsonLdScripts,
  });
  const orderedSegments = replaceFeaturedProjectsSection(
    deprioritizeLegacyBundles(
      reorderHomepageScripts(
        boostAboveFoldImages(
          localizeHomeLegacySegments(optimizedContent.bodySegments, locale),
        ),
      ),
    ),
    locale,
  );
  const bodySegments = includeFaqSection
    ? insertFaqBeforeBlog(orderedSegments, buildHomeFaqHtml(locale))
    : orderedSegments;
  const deduplicatedSimulatorSegments = removeLegacySimulatorPanelNote(bodySegments);
  const serverRenderedBodySegments = deduplicatedSimulatorSegments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes("data-om-blog-root")) {
      return segment;
    }
    return { ...segment, html: withServerRenderedBlogHub(segment.html, locale) };
  });
  const shellBodySegments = withoutExternalScriptSegments(serverRenderedBodySegments);
  const needsBlogBoot = hasBlogHubSection({
    ...content,
    bodySegments: serverRenderedBodySegments,
  });

  return (
    <>
      <HtmlInit preloaderDisabled removeNotReady />
      <HeroResourceHints />
      <PageContentShell
        content={{ ...optimizedContent, bodySegments: shellBodySegments }}
        bodySegments={shellBodySegments}
      />
      <LeadFormStaticBridge />
      {includeFaqSection ? <HomeFaqBoot sectionId={HOME_FAQ_SECTION_ID} /> : null}
      <DeferredHomeLegacyBoot />
      <DeferredHeroBoot />
      <DeferredSimulatorBoot />
      {needsBlogBoot ? <DeferredBlogBoot /> : null}
    </>
  );
}

function withoutExternalScriptSegments(
  segments: PageContent["bodySegments"],
): BodySegment[] {
  return segments.filter((segment) => segment.kind !== "script" || !segment.src);
}

/**
 * The legacy home simulator includes two copies of the same note: one in the
 * hidden panel introduction and one beside the results. The latter is the
 * visible, semantic note used by the calculator. Remove only the hidden copy;
 * its wrapper has no script hook.
 */
function removeLegacySimulatorPanelNote(
  segments: PageContent["bodySegments"],
): PageContent["bodySegments"] {
  return segments.map((segment) =>
    segment.kind !== "html"
      ? segment
      : {
          ...segment,
          html: segment.html.replace(
            /<p class="om-simulator__note om-simulator__panel-copy" data-simulator-note>[\s\S]*?<\/p>/,
            "",
          ),
        },
  );
}

function insertFaqBeforeBlog(
  segments: PageContent["bodySegments"],
  faqHtml: string,
): BodySegment[] {
  const result: BodySegment[] = [];

  for (const segment of segments) {
    if (segment.kind !== "html" || !segment.html.includes("om-blog-section")) {
      result.push(segment);
      continue;
    }

    const blogStart = findBlogSectionStart(segment.html);
    if (blogStart < 0) {
      result.push(segment);
      continue;
    }

    const beforeBlog = segment.html.slice(0, blogStart);
    const fromBlog = segment.html.slice(blogStart);

    result.push({ kind: "html", html: `${beforeBlog}${faqHtml}${fromBlog}` });

    return result;
  }

  return [...segments, { kind: "html", html: faqHtml }];
}

function findBlogSectionStart(html: string): number {
  const markers = [
    '<section\n  class="om-blog-section"',
    '<section class="om-blog-section"',
  ];

  for (const marker of markers) {
    const index = html.indexOf(marker);
    if (index >= 0) {
      return index;
    }
  }

  return -1;
}
