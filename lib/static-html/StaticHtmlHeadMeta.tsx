/**
 * @deprecated Phase 9 — use PageHeadMeta + lib/content/pages.ts.
 * Kept for reference only; no production route imports this module.
 */
import fs from "fs";
import { resolveStaticHtmlFile } from "./contentRoot";

type HeadMetaTag =
  | { kind: "meta"; name?: string; property?: string; content: string }
  | { kind: "link"; rel: string; href: string };

function parseHeadSeoTags(relativeFile: string): HeadMetaTag[] {
  const filePath = resolveStaticHtmlFile(relativeFile);
  const html = fs.readFileSync(filePath, "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const tags: HeadMetaTag[] = [];

  for (const match of head.matchAll(/<meta\s+([^>]+)>/gi)) {
    const attrs = match[1];
    const name = attrs.match(/\bname="([^"]+)"/)?.[1];
    const property = attrs.match(/\bproperty="([^"]+)"/)?.[1];
    const contentMatch = attrs.match(/\bcontent="([^"]*)"/);
    if (!contentMatch) continue;

    const isSeoMeta =
      name === "description" ||
      (name?.startsWith("twitter:") ?? false) ||
      (property?.startsWith("og:") ?? false);

    if (isSeoMeta) {
      tags.push({ kind: "meta", name, property, content: contentMatch[1] });
    }
  }

  const canonical = head.match(
    /<link\s+rel="canonical"\s+href="([^"]+)"/i,
  )?.[1];
  if (canonical) {
    tags.push({ kind: "link", rel: "canonical", href: canonical });
  }

  return tags;
}

export function StaticHtmlHeadMeta({ relativeFile }: { relativeFile: string }) {
  const tags = parseHeadSeoTags(relativeFile);

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
