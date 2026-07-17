import { LeadFormStaticBridge } from "@/components/forms/LeadFormStaticBridge";
import { OffPlanPillarContent } from "@/components/business/OffPlanPillarContent";
import { HOME_FAQ_STYLES } from "@/components/home/homeFaqContent";
import { PageContentShell } from "@/components/pages/PageContentShell";
import { localizeBusinessLegacyContent } from "@/lib/business/localizeBusinessLegacyContent";
import { preparePageWithFinalCta } from "@/lib/pages/preparePageWithFinalCta";
import type { PageContent } from "@/lib/content/types";
import type { BodySegment } from "@/lib/static-html/parsePage";

type BusinessRouteContentProps = {
  content: PageContent;
};

/** Sur-plan, location, and localized business listing pages. */
export function BusinessRouteContent({ content }: BusinessRouteContentProps) {
  const prepared = preparePageWithFinalCta(
    localizeBusinessLegacyContent(content),
  );
  const isFrenchSurPlan =
    content.htmlLang === "fr" && content.canonical.endsWith("/sur-plan/");
  const bodySegments = isFrenchSurPlan
    ? insertOffPlanPillar(prepared.bodySegments)
    : prepared.bodySegments;
  const preparedContent = isFrenchSurPlan
    ? {
        ...prepared.content,
        headInlineStyles: [...prepared.content.headInlineStyles, HOME_FAQ_STYLES],
      }
    : prepared.content;

  return (
    <>
      <PageContentShell
        content={preparedContent}
        bodySegments={bodySegments}
      />
      <LeadFormStaticBridge />
    </>
  );
}

function insertOffPlanPillar(segments: BodySegment[]): BodySegment[] {
  const pillar: BodySegment = {
    kind: "react",
    key: "off-plan-pillar",
    element: <OffPlanPillarContent />,
  };
  const finalCtaIndex = segments.findIndex(
    (segment) => segment.kind === "react" && segment.key === "page-final-cta",
  );

  if (finalCtaIndex < 0) return [...segments, pillar];

  return [
    ...segments.slice(0, finalCtaIndex),
    pillar,
    ...segments.slice(finalCtaIndex),
  ];
}
