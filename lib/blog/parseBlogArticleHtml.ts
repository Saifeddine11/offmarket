export type ParsedBlogArticleMedia = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
};

export type ParsedBlogArticleFaq = {
  question: string;
  answerHtml: string;
};

export type ParsedBlogArticle = {
  categoryLabel: string;
  title: string;
  metaLine: string;
  publishedLabel: string | null;
  image: ParsedBlogArticleMedia | null;
  bodyHtml: string;
  faq: ParsedBlogArticleFaq[];
};

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value: string): string {
  return decodeBasicEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function matchGroup(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match?.[1] ? match[1].trim() : null;
}

function extractPublishedLabel(metaLine: string): string | null {
  const year = metaLine.match(/\b(20\d{2})\b/);
  return year?.[1] ?? null;
}

function extractFaq(bodyHtml: string): {
  bodyHtml: string;
  faq: ParsedBlogArticleFaq[];
} {
  const faqBlock = bodyHtml.match(
    /<section[^>]*class="[^"]*om-blog-article__faq[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
  );
  if (!faqBlock || faqBlock.index === undefined) {
    return { bodyHtml, faq: [] };
  }

  const faqHtml = faqBlock[1];
  const items = [...faqHtml.matchAll(/<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)].map(
    (item) => ({
      question: stripTags(item[1]),
      answerHtml: item[2].trim(),
    }),
  ).filter((item) => item.question && item.answerHtml);

  return {
    bodyHtml:
      bodyHtml.slice(0, faqBlock.index) +
      bodyHtml.slice(faqBlock.index + faqBlock[0].length),
    faq: items,
  };
}

/** Parses the legacy static article shell without altering body copy. */
export function parseBlogArticleHtml(html: string): ParsedBlogArticle | null {
  const articleMatch = html.match(
    /<article[^>]*class="[^"]*om-blog-article[^"]*"[^>]*>([\s\S]*?)<\/article>/i,
  );
  if (!articleMatch) return null;

  const articleHtml = articleMatch[1];
  const title = matchGroup(
    articleHtml,
    /<h1[^>]*class="[^"]*om-blog-article__title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i,
  );
  const categoryLabel = matchGroup(
    articleHtml,
    /<span[^>]*class="[^"]*om-blog-article__eyebrow[^"]*"[^>]*>([\s\S]*?)<\/span>/i,
  );
  const metaLine = matchGroup(
    articleHtml,
    /<p[^>]*class="[^"]*om-blog-article__meta[^"]*"[^>]*>([\s\S]*?)<\/p>/i,
  );
  const mediaMatch = articleHtml.match(
    /<figure[^>]*class="[^"]*om-blog-article__media[^"]*"[^>]*>\s*<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>\s*(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?\s*<\/figure>/i,
  );
  const bodyMatch = articleHtml.match(
    /<div[^>]*class="[^"]*om-blog-article__body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*$/i,
  ) ?? articleHtml.match(
    /<div[^>]*class="[^"]*om-blog-article__body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  );

  if (!title || !bodyMatch) return null;

  const { bodyHtml, faq } = extractFaq(bodyMatch[1].trim());

  return {
    categoryLabel: categoryLabel ? stripTags(categoryLabel) : "",
    title: stripTags(title),
    metaLine: metaLine ? stripTags(metaLine) : "",
    publishedLabel: metaLine ? extractPublishedLabel(stripTags(metaLine)) : null,
    image: mediaMatch
      ? {
          src: mediaMatch[1],
          alt: decodeBasicEntities(mediaMatch[2] || title),
          caption: mediaMatch[3] ? stripTags(mediaMatch[3]) : undefined,
        }
      : null,
    bodyHtml,
    faq,
  };
}

export function findBlogArticleHtml(segments: { kind: string; html?: string }[]): string | null {
  for (const segment of segments) {
    if (segment.kind === "html" && segment.html?.includes("om-blog-article")) {
      return segment.html;
    }
  }
  return null;
}

export function stripLegacyBlogArticleChrome(html: string): string {
  return html
    .replace(/<div[^>]*class="[^"]*om-blog-page__top[^"]*"[^>]*>[\s\S]*?<\/div>\s*/i, "")
    .replace(/<article[^>]*class="[^"]*om-blog-article[^"]*"[^>]*>[\s\S]*?<\/article>\s*/i, "");
}
