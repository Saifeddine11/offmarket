import { BlogArticleTemplate } from "@/components/blog/BlogArticleTemplate";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { buildBlogArticleViewModel } from "@/lib/blog/blogArticleViewModel";
import {
  findBlogArticleHtml,
  parseBlogArticleHtml,
  stripLegacyBlogArticleChrome,
} from "@/lib/blog/parseBlogArticleHtml";
import type { PageContent } from "@/lib/content/types";
import type { PageId } from "@/lib/content/pages";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { BodySegment } from "@/lib/static-html/parsePage";

type BlogArticleContentProps = {
  content: PageContent;
  pageId?: PageId;
};

const ARTICLE_CSS = "/assets/stylesheets/om-blog.css?v=1765404900";

function withArticleStylesheet(content: PageContent): PageContent {
  const stylesheets = content.stylesheets.map((href) =>
    href.includes("/assets/stylesheets/om-blog.css") ? ARTICLE_CSS : href,
  );
  if (!stylesheets.some((href) => href.includes("/assets/stylesheets/om-blog.css"))) {
    stylesheets.push(ARTICLE_CSS);
  }
  return { ...content, stylesheets };
}

function stripLegacyArticleSegments(segments: BodySegment[]): BodySegment[] {
  return segments.map((segment) => {
    if (segment.kind !== "html" || !segment.html.includes("om-blog-article")) {
      return segment;
    }
    return {
      ...segment,
      html: stripLegacyBlogArticleChrome(segment.html),
    };
  });
}

export function BlogArticleContent({ content, pageId }: BlogArticleContentProps) {
  const styled = withArticleStylesheet(content);
  const sourceHtml = findBlogArticleHtml(styled.bodySegments);
  const parsed = sourceHtml ? parseBlogArticleHtml(sourceHtml) : null;

  if (!parsed) {
    const prepared = preparePageWithFinalCta(styled);
    return (
      <>
        <PageContentShell
          content={prepared.content}
          bodySegments={prepared.bodySegments}
        />
      </>
    );
  }

  const article = buildBlogArticleViewModel({
    content: styled,
    parsed,
    pageId: pageId ?? null,
  });

  const prepared = preparePageWithFinalCta({
    ...styled,
    bodySegments: stripLegacyArticleSegments(styled.bodySegments),
    headJsonLdScripts: [
      ...styled.headJsonLdScripts,
      ...article.jsonLd.map((entry) => JSON.stringify(entry)),
    ],
  });

  return (
    <>
      <PageContentShell
        content={{
          ...prepared.content,
          // Article chrome is rendered by the React template; keep assets/CTA/footer path.
          bodyClass: prepared.content.bodyClass
            ? `${prepared.content.bodyClass} om-blog-article-page`
            : "om-blog-page om-blog-article-page",
        }}
        bodySegments={[
          {
            kind: "react",
            key: "blog-article-template",
            element: <BlogArticleTemplate article={article} />,
          },
          ...prepared.bodySegments,
        ]}
      />
    </>
  );
}
