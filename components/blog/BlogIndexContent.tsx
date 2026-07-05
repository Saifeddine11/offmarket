import { DeferredBlogBoot } from "@/components/layout/DeferredBlogBoot";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { PageContent } from "@/lib/content/types";

type BlogIndexContentProps = {
  content: PageContent;
};

export function BlogIndexContent({ content }: BlogIndexContentProps) {
  const prepared = preparePageWithFinalCta(content);

  return (
    <>
      <h1 style={screenReaderOnlyStyle}>Blog immobilier Marrakech</h1>
      <PageContentShell
        content={prepared.content}
        bodySegments={prepared.bodySegments}
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
