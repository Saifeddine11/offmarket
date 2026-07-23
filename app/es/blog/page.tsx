import type { Metadata } from "next";
import { BlogIndexContent } from "@/components/blog/BlogIndexContent";
import {
  buildPageContentMetadata,
  buildPageContentViewport,
} from "@/components/pages/PageContentShell";
import { BLOG_INDEX_PAGE_ID } from "@/lib/blog/articles";
import { localizeBlogIndexContent } from "@/lib/blog/localizedBlogContent";
import { getPageContent } from "@/lib/content/pages";

const content = localizeBlogIndexContent(getPageContent(BLOG_INDEX_PAGE_ID), "es");

export const metadata: Metadata = buildPageContentMetadata(content);
export const viewport = buildPageContentViewport(content);

export default function EsBlogIndexPage() {
  return <BlogIndexContent content={content} />;
}
