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

export const BLOG_ARTICLES_EN = {
  "buying-off-plan-villa-marrakech":
    "blog-acheter-villa-sur-plan-marrakech",
  "luxury-real-estate-investment-marrakech":
    "blog-investir-immobilier-luxe-marrakech",
  "best-addresses-real-estate-marrakech":
    "blog-adresses-immobilier-marrakech",
  "off-market-properties-marrakech":
    "blog-off-market-marrakech-biens-confidentiels",
  "apartment-hypercentre-gueliz-marrakech":
    "blog-appartement-hypercentre-gueliz-marrakech",
} as const;

export const BLOG_ARTICLES_NL = {
  "nieuwbouwvilla-kopen-marrakech":
    "blog-acheter-villa-sur-plan-marrakech",
  "investeren-luxe-vastgoed-marrakech":
    "blog-investir-immobilier-luxe-marrakech",
  "beste-adressen-vastgoed-marrakech":
    "blog-adresses-immobilier-marrakech",
  "off-market-vastgoed-marrakech":
    "blog-off-market-marrakech-biens-confidentiels",
  "appartement-hypercentre-gueliz-marrakech":
    "blog-appartement-hypercentre-gueliz-marrakech",
} as const;

export type BlogArticleSlugEn = keyof typeof BLOG_ARTICLES_EN;
export type BlogArticleSlugNl = keyof typeof BLOG_ARTICLES_NL;

export const BLOG_ARTICLE_SLUGS_EN = Object.keys(
  BLOG_ARTICLES_EN,
) as BlogArticleSlugEn[];

export const BLOG_ARTICLE_SLUGS_NL = Object.keys(
  BLOG_ARTICLES_NL,
) as BlogArticleSlugNl[];

export function blogArticlePath(slug: BlogArticleSlug): string {
  return `/blog/${slug}/`;
}
