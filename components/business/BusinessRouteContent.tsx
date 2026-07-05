import { LeadFormStaticBridge } from "@/components/forms/LeadFormStaticBridge";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { PageContent } from "@/lib/content/types";

type BusinessRouteContentProps = {
  content: PageContent;
};

/** Sur-plan, location, and localized business listing pages. */
export function BusinessRouteContent({ content }: BusinessRouteContentProps) {
  const prepared = preparePageWithFinalCta(content);

  return (
    <>
      <PageContentShell
        content={prepared.content}
        bodySegments={prepared.bodySegments}
      />
      <LeadFormStaticBridge />
    </>
  );
}
