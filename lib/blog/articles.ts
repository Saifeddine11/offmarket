export const BLOG_INDEX_PAGE_ID = "blog-index" as const;

export const BLOG_ARTICLES = {
  "acheter-villa-sur-plan-marrakech":
    "blog-acheter-villa-sur-plan-marrakech",
  "investir-immobilier-luxe-marrakech":
    "blog-investir-immobilier-luxe-marrakech",
  "adresses-immobilier-marrakech": "blog-adresses-immobilier-marrakech",
  "off-market-marrakech-biens-confidentiels":
    "blog-off-market-marrakech-biens-confidentiels",
  "appartement-hypercentre-gueliz-marrakech":
    "blog-appartement-hypercentre-gueliz-marrakech",
} as const;

export type BlogArticleSlug = keyof typeof BLOG_ARTICLES;

export const BLOG_ARTICLE_SLUGS = Object.keys(
  BLOG_ARTICLES,
) as BlogArticleSlug[];

export function blogArticlePath(slug: BlogArticleSlug): string {
  return `/blog/${slug}/`;
}
