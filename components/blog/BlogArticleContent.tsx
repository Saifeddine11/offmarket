import { PageContentShell } from "@/components/pages/PageContentShell";
import { PageHeadMeta } from "@/components/pages/PageHeadMeta";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { PageContent } from "@/lib/content/types";

type BlogArticleContentProps = {
  content: PageContent;
};

export function BlogArticleContent({ content }: BlogArticleContentProps) {
  const prepared = preparePageWithFinalCta(content);

  return (
    <>
      <PageHeadMeta content={prepared.content} />
      <PageContentShell
        content={prepared.content}
        bodySegments={prepared.bodySegments}
      />
    </>
  );
}
