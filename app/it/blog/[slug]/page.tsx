import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { buildPageContentViewport } from "@/components/pages/PageContentShell";
import { buildBlogArticleMetadata } from "@/lib/seo/blogMetadata";
import {
  BLOG_ARTICLES_IT,
  BLOG_ARTICLE_SLUGS_IT,
  type BlogArticleSlugIt,
} from "@/lib/blog/articles";
import { localizeBlogArticleContent } from "@/lib/blog/localizedBlogContent";
import { getPageContent, type PageId } from "@/lib/content/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveArticlePageId(slug: string): PageId | null {
  if (slug in BLOG_ARTICLES_IT) {
    return BLOG_ARTICLES_IT[slug as BlogArticleSlugIt];
  }
  return null;
}

function getLocalizedContent(pageId: PageId) {
  return localizeBlogArticleContent(getPageContent(pageId), "it", pageId);
}

export function generateStaticParams() {
  return BLOG_ARTICLE_SLUGS_IT.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) return {};
  return buildBlogArticleMetadata(getLocalizedContent(pageId));
}

export async function generateViewport({ params }: PageProps): Promise<Viewport> {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) return {};
  return buildPageContentViewport(getLocalizedContent(pageId));
}

export default async function ItBlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) notFound();
  return (
    <BlogArticleContent content={getLocalizedContent(pageId)} pageId={pageId} />
  );
}
