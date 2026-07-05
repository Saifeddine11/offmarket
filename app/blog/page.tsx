import type { Metadata } from "next";
import { BlogIndexContent } from "@/components/blog/BlogIndexContent";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";
import { BLOG_INDEX_PAGE_ID } from "@/lib/blog/articles";
import { getPageContent } from "@/lib/content/pages";

const content = getPageContent(BLOG_INDEX_PAGE_ID);

export const metadata: Metadata = buildPageContentMetadata(content);
export const viewport = buildPageContentViewport(content);

export default function BlogIndexPage() {
  return <BlogIndexContent content={content} />;
}
