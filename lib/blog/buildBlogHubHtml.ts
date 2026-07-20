import type { SiteLocale } from "@/lib/i18n/types";
import {
  blogHubArticleHref,
  blogHubHomeHref,
  getBlogHubArticles,
  getBlogHubCategories,
  getBlogHubCategoryLabel,
  type BlogHubArticle,
  type BlogHubCategory,
} from "@/lib/blog/blogHubData";

const ARROW_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

const CONTROL_PREV_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

const CONTROL_NEXT_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

const BUTTON_ARROW_SVG =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>' +
  "</svg>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function padCount(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatArticleCount(count: number, locale: SiteLocale): string {
  if (locale === "nl") {
    return `${count} ${count === 1 ? "artikel" : "artikelen"}`;
  }
  if (locale === "en") {
    return `${count} ${count === 1 ? "article" : "articles"}`;
  }
  return `${padCount(count)} ${count === 1 ? "article" : "articles"}`;
}

function getHubCopy(locale: SiteLocale) {
  if (locale === "en") {
    return {
      title: "Private readings",
      lead: "Private notes on Marrakech real estate: off-plan, investment, neighbourhoods, off-market properties, and how to secure a project reading.",
      ctaLabel: "Back to home",
      categoriesLabel: "Blog categories",
      carouselLabel: "Blog articles",
      controlsLabel: "Article navigation",
      prevLabel: "Previous articles",
      nextLabel: "Next articles",
    };
  }
  if (locale === "nl") {
    return {
      title: "Private analyses",
      lead: "Private lectuur over vastgoed in Marrakech: nieuwbouw, investeren, wijken, off-market panden, en hoe u een projectanalyse beveiligt.",
      ctaLabel: "Terug naar home",
      categoriesLabel: "Blogcategorieën",
      carouselLabel: "Blogartikelen",
      controlsLabel: "Artikelnavigatie",
      prevLabel: "Vorige artikelen",
      nextLabel: "Volgende artikelen",
    };
  }
  return {
    title: "Regards privés",
    lead: "Lectures privées sur l’immobilier à Marrakech : sur plan, investissement, quartiers, biens off-market, et la sécurisation des projets.",
    ctaLabel: "Retour à l’accueil",
    categoriesLabel: "Catégories du blog",
    carouselLabel: "Articles du blog",
    controlsLabel: "Navigation articles",
    prevLabel: "Articles précédents",
    nextLabel: "Articles suivants",
  };
}

function getCategoryCounts(
  categories: BlogHubCategory[],
  articles: BlogHubArticle[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of categories) {
    counts[category.slug] = 0;
  }
  for (const article of articles) {
    if (counts[article.category] !== undefined) {
      counts[article.category] += 1;
    }
  }
  return counts;
}

function renderCard(article: BlogHubArticle, locale: SiteLocale): string {
  const wideClass = article.featured ? " om-blog-card--wide" : "";
  const title = escapeHtml(article.title);
  const category = escapeHtml(getBlogHubCategoryLabel(locale, article.category));
  const excerpt = escapeHtml(article.excerpt);
  const href = blogHubArticleHref(locale, article.slug);

  return (
    `<article class="om-blog-card${wideClass}" data-category="${escapeHtml(article.category)}">` +
    `<a class="om-blog-card__link" href="${href}" aria-label="${title}">` +
    `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" loading="lazy" decoding="async">` +
    `<span class="om-blog-card__arrow" aria-hidden="true">${ARROW_SVG}</span>` +
    `<div class="om-blog-card__content">` +
    `<span class="om-blog-card__meta">` +
    `<span class="om-blog-card__category">${category}</span>` +
    `<span class="om-blog-card__date">${escapeHtml(article.date)}</span>` +
    `</span>` +
    `<h3 class="om-blog-card__title" data-text="${title}">${title}</h3>` +
    `<p class="om-blog-card__excerpt">${excerpt}</p>` +
    `</div>` +
    `</a>` +
    `</article>`
  );
}

/**
 * Server-rendered blog hub markup matching `om-blog.js` hub mode.
 * Cards and links are present without client JS; filters remain progressive enhancement.
 */
export function buildBlogHubHtml(locale: SiteLocale): string {
  const copy = getHubCopy(locale);
  const categories = getBlogHubCategories(locale);
  const articles = getBlogHubArticles(locale);
  const counts = getCategoryCounts(categories, articles);

  // Hide categories with zero articles so columns never look misleadingly empty.
  const visibleCategories = categories.filter(
    (category) => (counts[category.slug] || 0) > 0,
  );

  const categoriesHtml = visibleCategories
    .map((category, index) => {
      const count = counts[category.slug] || 0;
      const isActive = index === 0;
      return (
        `<button type="button" class="om-blog-category${isActive ? " is-active" : ""}" data-category="${escapeHtml(category.slug)}" role="tab" aria-selected="${isActive ? "true" : "false"}">` +
        `${escapeHtml(category.label)} <span>${escapeHtml(formatArticleCount(count, locale))}</span>` +
        `</button>`
      );
    })
    .join("");

  const cardsHtml = articles.map((article) => renderCard(article, locale)).join("");

  const colsAttr =
    visibleCategories.length > 0 && visibleCategories.length !== 4
      ? ` data-cols="${visibleCategories.length}" style="grid-template-columns: repeat(${visibleCategories.length}, minmax(180px, 1fr));"`
      : "";

  return (
    `<div class="om-blog-section__header">` +
    `<div>` +
    `<span class="om-blog-section__eyebrow">Blog</span>` +
    `<h2 class="om-blog-section__title" id="om-blog-title">${escapeHtml(copy.title)}</h2>` +
    `<p class="om-blog-section__lead">${escapeHtml(copy.lead)}</p>` +
    `</div>` +
    `<a class="om-blog-section__button om-button" href="${blogHubHomeHref(locale)}">` +
    `<span class="om-button__icon" aria-hidden="true">${BUTTON_ARROW_SVG}</span>` +
    `<span>${escapeHtml(copy.ctaLabel)}</span>` +
    `</a>` +
    `</div>` +
    `<div class="om-blog-categories" role="tablist" aria-label="${escapeHtml(copy.categoriesLabel)}"${colsAttr}>${categoriesHtml}</div>` +
    `<div class="om-blog-carousel" data-om-blog-carousel tabindex="0" aria-label="${escapeHtml(copy.carouselLabel)}" data-empty="false">${cardsHtml}</div>` +
    `<div class="om-blog-controls" aria-label="${escapeHtml(copy.controlsLabel)}">` +
    `<button class="om-blog-control" type="button" data-blog-prev aria-label="${escapeHtml(copy.prevLabel)}">${CONTROL_PREV_SVG}</button>` +
    `<button class="om-blog-control" type="button" data-blog-next aria-label="${escapeHtml(copy.nextLabel)}">${CONTROL_NEXT_SVG}</button>` +
    `</div>`
  );
}

/** Injects SSR hub markup into the empty `[data-om-blog-root]` shell. */
export function withServerRenderedBlogHub(
  html: string,
  locale: SiteLocale,
): string {
  if (!html.includes("data-om-blog-root")) {
    return html;
  }

  const hubHtml = buildBlogHubHtml(locale);

  let next = html.replace(
    /(<div class="om-blog-section__inner" data-om-blog-root)(>)(<\/div>)/,
    `$1$2${hubHtml}$3`,
  );

  // Remove legacy continue nav if present in older cached shells.
  next = next.replace(
    /<nav class="om-blog-section__continue"[\s\S]*?<\/nav>\s*/i,
    "",
  );

  return next;
}
