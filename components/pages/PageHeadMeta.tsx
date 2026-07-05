import type { PageContent } from "@/lib/content/types";

type PageHeadMetaProps = {
  content: PageContent;
};

/** Extra head SEO tags from structured content (blog articles). */
export function PageHeadMeta({ content }: PageHeadMetaProps) {
  const tags: Array<
    | { kind: "meta"; name?: string; property?: string; content: string }
    | { kind: "link"; rel: string; href: string }
  > = [];

  if (content.description) {
    tags.push({ kind: "meta", name: "description", content: content.description });
  }
  if (content.ogTitle) {
    tags.push({ kind: "meta", property: "og:title", content: content.ogTitle });
  }
  if (content.ogDescription) {
    tags.push({
      kind: "meta",
      property: "og:description",
      content: content.ogDescription,
    });
  }
  if (content.ogImage) {
    tags.push({ kind: "meta", property: "og:image", content: content.ogImage });
  }
  if (content.ogType) {
    tags.push({ kind: "meta", property: "og:type", content: content.ogType });
  }
  if (content.canonical) {
    tags.push({ kind: "meta", property: "og:url", content: content.canonical });
  }
  if (content.twitterTitle) {
    tags.push({
      kind: "meta",
      name: "twitter:title",
      content: content.twitterTitle,
    });
  }
  if (content.twitterDescription) {
    tags.push({
      kind: "meta",
      name: "twitter:description",
      content: content.twitterDescription,
    });
  }
  if (content.canonical) {
    tags.push({ kind: "link", rel: "canonical", href: content.canonical });
  }

  return (
    <>
      {tags.map((tag, index) => {
        if (tag.kind === "link") {
          return <link key={`link-${index}`} rel={tag.rel} href={tag.href} />;
        }
        if (tag.property) {
          return (
            <meta
              key={`meta-${index}`}
              property={tag.property}
              content={tag.content}
            />
          );
        }
        return (
          <meta key={`meta-${index}`} name={tag.name} content={tag.content} />
        );
      })}
    </>
  );
}
