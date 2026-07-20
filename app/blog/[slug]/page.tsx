import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { buildPageContentViewport } from "@/components/pages/PageContentShell";
import { buildBlogArticleMetadata } from "@/lib/seo/blogMetadata";
import {
  BLOG_ARTICLES,
  BLOG_ARTICLE_SLUGS,
  type BlogArticleSlug,
} from "@/lib/blog/articles";
import { getPageContent, type PageId } from "@/lib/content/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveArticlePageId(slug: string): PageId | null {
  if (slug in BLOG_ARTICLES) {
    return BLOG_ARTICLES[slug as BlogArticleSlug];
  }
  return null;
}

export function generateStaticParams() {
  return BLOG_ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) return {};

  const content = getPageContent(pageId);
  return buildBlogArticleMetadata(content);
}

export async function generateViewport({
  params,
}: PageProps): Promise<Viewport> {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) return {};
  return buildPageContentViewport(getPageContent(pageId));
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const pageId = resolveArticlePageId(slug);
  if (!pageId) notFound();

  return <BlogArticleContent content={getPageContent(pageId)} pageId={pageId} />;
}
