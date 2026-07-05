import type { ReactNode } from "react";
import fs from "fs";
import { resolveStaticHtmlFile } from "./contentRoot";

export type BodySegment =
  | { kind: "html"; html: string }
  | { kind: "react"; element: ReactNode; key?: string }
  | {
      kind: "script";
      src?: string;
      inline?: string;
      defer?: boolean;
      async?: boolean;
      type?: string;
      fetchpriority?: string;
      dataAttributes?: Record<string, string>;
    };

export type ParsedStaticPage = {
  htmlLang: string;
  stylesheets: string[];
  headInlineStyle: string | null;
  preconnects: string[];
  manifestHref: string | null;
  bodyClass: string;
  headInlineStyles: string[];
  headInitScript: string | null;
  headJsonLdScripts: string[];
  bodySegments: BodySegment[];
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  themeColor: string;
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D");
}

function parseBodySegments(bodyHtml: string): BodySegment[] {
  const segments: BodySegment[] = [];
  const scriptRegex = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = scriptRegex.exec(bodyHtml)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        kind: "html",
        html: bodyHtml.slice(lastIndex, match.index),
      });
    }

    const attrs = match[1] ?? "";
    const inline = match[2]?.trim();
    const src = attrs.match(/\bsrc="([^"]+)"/)?.[1];
    const type = attrs.match(/\btype="([^"]+)"/)?.[1];
    const fetchpriority = attrs.match(/\bfetchpriority="([^"]+)"/)?.[1];
    const dataAttributes: Record<string, string> = {};
    for (const dataMatch of attrs.matchAll(/\b(data-[\w-]+)="([^"]*)"/g)) {
      dataAttributes[dataMatch[1]] = dataMatch[2];
    }

    segments.push({
      kind: "script",
      src,
      inline: inline || undefined,
      defer: /\bdefer\b/.test(attrs),
      async: /\basync\b/.test(attrs),
      type,
      fetchpriority,
      dataAttributes:
        Object.keys(dataAttributes).length > 0 ? dataAttributes : undefined,
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < bodyHtml.length) {
    segments.push({ kind: "html", html: bodyHtml.slice(lastIndex) });
  }

  return segments;
}

/**
 * @deprecated Production uses lib/content/pages.ts. Kept for extraction tooling parity.
 */
export function parseStaticHtmlFile(relativeFile: string): ParsedStaticPage {
  const filePath = resolveStaticHtmlFile(relativeFile);
  const html = fs.readFileSync(filePath, "utf8");

  const htmlLang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1] ?? "fr";

  const stylesheets = [
    ...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi),
  ].map((m) => m[1]);

  const preconnects = [
    ...html.matchAll(/<link[^>]+rel="preconnect"[^>]+href="([^"]+)"/gi),
  ].map((m) => m[1]);

  const manifestHref =
    html.match(/<link[^>]+rel="manifest"[^>]+href="([^"]+)"/i)?.[1] ?? null;

  const headContent = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";

  const headInlineStyles = [
    ...headContent.matchAll(/<style>([\s\S]*?)<\/style>/gi),
  ].map((m) => m[1].trim());

  const headInitScript =
    [...headContent.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)]
      .find((m) => !/type\s*=\s*["']application\/ld\+json["']/i.test(m[1] ?? ""))
      ?.[2]?.trim() ?? null;

  const headJsonLdScripts = [
    ...headContent.matchAll(
      /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1].trim());

  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*)<\/body>/i);
  const bodyClass = bodyMatch?.[1]?.match(/\bclass="([^"]*)"/i)?.[1] ?? "";
  const bodyInner = bodyMatch?.[2] ?? "";

  const meta = (name: string) => {
    const re = new RegExp(
      `<meta\\s+name="${name}"\\s+content="([^"]*)"`,
      "i",
    );
    return html.match(re)?.[1] ?? "";
  };

  const og = (prop: string) => {
    const re = new RegExp(
      `<meta\\s+property="og:${prop}"\\s+content="([^"]*)"`,
      "i",
    );
    return html.match(re)?.[1] ?? "";
  };

  return {
    htmlLang,
    stylesheets,
    headInlineStyle: headInlineStyles[0] ?? null,
    headInlineStyles,
    headInitScript,
    headJsonLdScripts,
    preconnects,
    manifestHref,
    bodyClass,
    bodySegments: parseBodySegments(bodyInner),
    title: decodeHtmlEntities(
      html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "",
    ),
    description: decodeHtmlEntities(meta("description")),
    canonical: html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "",
    ogType: og("type") || "website",
    ogTitle: decodeHtmlEntities(og("title")),
    ogDescription: decodeHtmlEntities(og("description")),
    ogLocale: og("locale"),
    ogImage: og("image"),
    twitterTitle: decodeHtmlEntities(meta("twitter:title")),
    twitterDescription: decodeHtmlEntities(meta("twitter:description")),
    twitterImage: meta("twitter:image") || og("image"),
    themeColor: meta("theme-color") || "#565449",
  };
}
