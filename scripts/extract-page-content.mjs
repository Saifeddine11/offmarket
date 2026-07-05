#!/usr/bin/env node
/**
 * One-time / maintenance extractor: reads archived HTML and writes content/*.json
 * for Next.js production pages. Archive is not read at runtime after extraction.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ARCHIVE = path.join(
  ROOT,
  "_legacy_static_archived_after_full_next_migration",
);
const CONTENT_DIR = path.join(ROOT, "content", "pages");
const HOME_SECTIONS_DIR = path.join(ROOT, "content", "home");

const PAGES = [
  { id: "home-root", file: "index.html", homeSections: true },
  { id: "home-fr", file: "fr/index.html", homeSections: true },
  { id: "home-en", file: "en/index.html", homeSections: true },
  { id: "home-it", file: "it/index.html", homeSections: true },
  { id: "home-nl", file: "nl/index.html", homeSections: true },
  { id: "blog-index", file: "blog/index.html" },
  {
    id: "blog-acheter-villa-sur-plan-marrakech",
    file: "blog/acheter-villa-sur-plan-marrakech/index.html",
  },
  {
    id: "blog-investir-immobilier-luxe-marrakech",
    file: "blog/investir-immobilier-luxe-marrakech/index.html",
  },
  {
    id: "blog-adresses-immobilier-marrakech",
    file: "blog/adresses-immobilier-marrakech/index.html",
  },
  {
    id: "blog-off-market-marrakech-biens-confidentiels",
    file: "blog/off-market-marrakech-biens-confidentiels/index.html",
  },
  {
    id: "blog-appartement-hypercentre-gueliz-marrakech",
    file: "blog/appartement-hypercentre-gueliz-marrakech/index.html",
  },
  { id: "location", file: "location/index.html" },
  { id: "sur-plan", file: "sur-plan/index.html" },
  { id: "sur-plan-fr", file: "fr/sur-plan/index.html" },
  { id: "off-plan-en", file: "en/off-plan/index.html" },
  { id: "progetti-it", file: "it/progetti-su-piano/index.html" },
  { id: "nieuwbouw-nl", file: "nl/nieuwbouw/index.html" },
  { id: "contact-fr", file: "fr/contact/index.html", metadataOnly: true },
  { id: "contact-en", file: "en/contact/index.html", metadataOnly: true },
  { id: "contact-it", file: "it/contatto/index.html", metadataOnly: true },
  { id: "contact-nl", file: "nl/contact/index.html", metadataOnly: true },
];

function decodeHtmlEntities(text) {
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

function parseBodySegments(bodyHtml) {
  const segments = [];
  const scriptRegex = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let lastIndex = 0;
  let match;

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
    const dataAttributes = {};
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

function parsePage(html) {
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

  const meta = (name) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i");
    return html.match(re)?.[1] ?? "";
  };

  const og = (prop) => {
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
    title: decodeHtmlEntities(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ""),
    description: decodeHtmlEntities(meta("description")),
    canonical:
      html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "",
    ogType: og("type") || "website",
    ogTitle: decodeHtmlEntities(og("title")),
    ogDescription: decodeHtmlEntities(og("description")),
    ogLocale: og("locale"),
    ogImage: og("image"),
    twitterTitle: decodeHtmlEntities(meta("twitter:title")),
    twitterDescription: decodeHtmlEntities(meta("twitter:description")),
    twitterImage: meta("twitter:image") || og("image"),
    themeColor: meta("theme-color") || "#270707",
  };
}

function extractMetadataOnly(parsed) {
  return {
    title: parsed.title,
    description: parsed.description,
    canonical: parsed.canonical,
    ogType: parsed.ogType,
    ogTitle: parsed.ogTitle,
    ogDescription: parsed.ogDescription,
    ogLocale: parsed.ogLocale,
    ogImage: parsed.ogImage,
    twitterTitle: parsed.twitterTitle,
    twitterDescription: parsed.twitterDescription,
    twitterImage: parsed.twitterImage,
    themeColor: parsed.themeColor,
    htmlLang: parsed.htmlLang,
  };
}

/** Split homepage HTML chunks for section React components. */
function extractHomeSections(bodyHtml) {
  const heroStart = bodyHtml.search(/<section class="mav-hero"/);
  if (heroStart < 0) {
    return { chrome: bodyHtml };
  }

  const chrome = bodyHtml.slice(0, heroStart);
  const rest = bodyHtml.slice(heroStart);

  const sectionRegex =
    /<section[\s\S]*?(?=<section[\s\S]*?class=" section ui-dark ui-background"|<\/body>|$)/g;

  const markers = [
    { key: "hero", test: /class="mav-hero"/ },
    { key: "intro", test: /class="mav-who/ },
    { key: "properties", test: /class="om-featured-projects"/ },
    { key: "territories", test: /class="om-territories"/ },
    { key: "cinematic", test: /class="om-cinematic-video"/ },
    { key: "testimonials", test: /class="om-testimonials"/ },
    { key: "privateAccess", test: /om-private-access-form--embedded/ },
    { key: "blog", test: /data-om-blog/ },
    { key: "finalCta", test: /class="om-final-cta"/ },
  ];

  const sections = {};
  let remaining = rest;

  for (let i = 0; i < markers.length; i++) {
    const { key, test } = markers[i];
    const idx = remaining.search(test);
    if (idx < 0) continue;

    const sectionStart = remaining.lastIndexOf("<section", idx);
    const startAt = sectionStart >= 0 ? sectionStart : idx;

    let endAt = remaining.length;
    for (let j = i + 1; j < markers.length; j++) {
      const nextIdx = remaining.search(markers[j].test);
      if (nextIdx > startAt) {
        const nextSectionStart = remaining.lastIndexOf("<section", nextIdx);
        endAt = nextSectionStart >= 0 ? nextSectionStart : nextIdx;
        break;
      }
    }

    sections[key] = remaining.slice(startAt, endAt).trim();
    if (i === markers.length - 1) {
      remaining = remaining.slice(endAt);
    }
  }

  const legacyIdx = remaining.search(
    /class=" section ui-dark ui-background"[\s\S]*id="legacy-editorial"/,
  );
  const footerIdx = remaining.search(/<footer[\s\S]*class="om-footer"/);

  let tail = remaining;
  if (footerIdx >= 0) {
    sections.footer = remaining.slice(footerIdx).trim();
    tail = remaining.slice(0, footerIdx);
  }
  if (legacyIdx >= 0) {
    sections.legacy = remaining.slice(legacyIdx, footerIdx >= 0 ? footerIdx : undefined).trim();
  }
  sections.tail = tail.trim();

  return { chrome, sections };
}

function stripLegacyFromPage(parsed) {
  parsed.bodySegments = parsed.bodySegments
    .map((segment) => {
      if (segment.kind === "html" && segment.html) {
        let next = stripLegacyEditorialHtml(segment.html);
        next = stripPostFooterLegacyHtml(next);
        if (next.includes('class="js-favourite-list-single"') && next.trim().length > 10000) {
          return null;
        }
        return next !== segment.html ? { ...segment, html: next } : segment;
      }
      return segment;
    })
    .filter(Boolean);
  return parsed;
}

function stripPostFooterLegacyHtml(html) {
  let next = html;
  const templateMarker = 'class="js-favourite-list-single"';
  const templateIdx = next.indexOf(templateMarker);
  if (templateIdx >= 0) {
    const start = next.lastIndexOf("<div", templateIdx);
    if (start >= 0) next = next.slice(0, start);
  }
  const footerIdx = next.lastIndexOf("</footer>");
  const favoritesIdx = next.indexOf('class="l-favorites', footerIdx);
  if (footerIdx >= 0 && favoritesIdx > footerIdx) {
    next = next.slice(0, favoritesIdx);
  }
  return next;
}

function stripLegacyEditorialHtml(html) {
  const marker = 'id="legacy-editorial"';
  const idx = html.indexOf(marker);
  if (idx < 0) return html;

  const start = html.lastIndexOf("<section", idx);
  if (start < 0) return html;

  let depth = 0;
  let pos = start;
  let end = -1;

  while (pos < html.length) {
    const open = html.indexOf("<section", pos);
    const close = html.indexOf("</section>", pos);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      pos = open + 8;
      continue;
    }

    depth -= 1;
    end = close + "</section>".length;
    pos = end;
    if (depth === 0) break;
  }

  if (end < 0) return html;
  return html.slice(0, start) + html.slice(end);
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 0), "utf8");
}

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(HOME_SECTIONS_DIR, { recursive: true });

const manifest = [];

for (const page of PAGES) {
  const sourcePath = path.join(ARCHIVE, page.file);
  if (!fs.existsSync(sourcePath)) {
    console.error("Missing:", sourcePath);
    process.exit(1);
  }

  const html = fs.readFileSync(sourcePath, "utf8");
  const parsed = stripLegacyFromPage(parsePage(html));

  if (page.metadataOnly) {
    const meta = extractMetadataOnly(parsed);
    writeJson(path.join(CONTENT_DIR, `${page.id}.json`), meta);
    manifest.push({ id: page.id, file: page.file, type: "metadata" });
    continue;
  }

  writeJson(path.join(CONTENT_DIR, `${page.id}.json`), parsed);
  manifest.push({ id: page.id, file: page.file, type: "page" });

  if (page.homeSections) {
    const bodyHtml = parsed.bodySegments
      .filter((s) => s.kind === "html")
      .map((s) => s.html)
      .join("");
    const homeSections = extractHomeSections(bodyHtml);
    const locale = page.id.replace("home-", "");
    writeJson(
      path.join(HOME_SECTIONS_DIR, `${locale}-sections.json`),
      homeSections,
    );
  }
}

writeJson(path.join(CONTENT_DIR, "_manifest.json"), manifest);
console.log(`Extracted ${manifest.length} content files to content/`);
