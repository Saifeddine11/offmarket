/**
 * Production URL registry — sitemap, migration tracking.
 * Legacy HTML bridge removed in Phase 8; static HTML lives under
 * `_legacy_static_archived_after_full_next_migration/` (parsed by Next.js).
 */
export const BLOCKED_PATH_PREFIXES = [
  "archive",
  "archives",
  "_backup_static_before_next_migration",
  "_legacy_static_archived_after_full_next_migration",
  "node_modules",
  ".next",
  "scripts",
  "docs",
  "media",
  "app",
  "lib",
  "components",
  "public",
] as const;

/** @deprecated Bridge removed — kept empty for reference only */
export const EXPLICIT_LEGACY_ROUTES: Record<string, string> = {};

/**
 * All known production URL paths (trailing slash normalized away for lookup).
 * Used for sitemap generation and migration tracking.
 */
export const PRODUCTION_URLS = [
  "/",
  "/fr",
  "/en",
  "/it",
  "/nl",
  "/about",
  "/en/about",
  "/nl/over-ons",
  "/fr/about",
  "/quartiers",
  "/en/neighbourhoods",
  "/nl/wijken",
  "/nos-projets",
  "/en/projects",
  "/nl/projecten",
  "/contact",
  "/fr/contact",
  "/en/contact",
  "/nl/contact",
  "/it/contatto",
  "/off-market",
  "/en/off-market",
  "/nl/off-market",
  "/it/off-market",
  "/sur-plan",
  "/sur-plan/villa-jaz",
  "/fr/sur-plan",
  "/en/off-plan",
  "/en/off-plan/villa-jaz",
  "/it/progetti-su-piano",
  "/nl/nieuwbouw",
  "/nl/nieuwbouw/villa-jaz",
  "/location",
  "/simulateur",
  "/en/simulator",
  "/nl/simulator",
  "/privacy-policy",
  "/en/privacy-policy",
  "/nl/privacybeleid",
  "/blog",
  "/en/blog",
  "/nl/blog",
  "/blog/acheter-villa-sur-plan-marrakech",
  "/blog/investir-immobilier-luxe-marrakech",
  "/blog/adresses-immobilier-marrakech",
  "/blog/off-market-marrakech-biens-confidentiels",
  "/blog/appartement-hypercentre-gueliz-marrakech",
  "/en/blog/buying-off-plan-villa-marrakech",
  "/en/blog/luxury-real-estate-investment-marrakech",
  "/en/blog/best-addresses-real-estate-marrakech",
  "/en/blog/off-market-properties-marrakech",
  "/en/blog/apartment-hypercentre-gueliz-marrakech",
  "/nl/blog/nieuwbouwvilla-kopen-marrakech",
  "/nl/blog/investeren-luxe-vastgoed-marrakech",
  "/nl/blog/beste-adressen-vastgoed-marrakech",
  "/nl/blog/off-market-vastgoed-marrakech",
  "/nl/blog/appartement-hypercentre-gueliz-marrakech",
] as const;

export const SITE_URL = "https://offmarketofficial.com";

export const SITEMAP_URLS: Array<{
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/en/", changefreq: "weekly", priority: 1.0 },
  { path: "/nl/", changefreq: "weekly", priority: 1.0 },
  { path: "/sur-plan/", changefreq: "monthly", priority: 0.9 },
  { path: "/en/off-plan/", changefreq: "monthly", priority: 0.9 },
  { path: "/nl/nieuwbouw/", changefreq: "monthly", priority: 0.9 },
  { path: "/sur-plan/villa-jaz/", changefreq: "monthly", priority: 0.85 },
  { path: "/en/off-plan/villa-jaz/", changefreq: "monthly", priority: 0.85 },
  { path: "/nl/nieuwbouw/villa-jaz/", changefreq: "monthly", priority: 0.85 },
  { path: "/about/", changefreq: "monthly", priority: 0.85 },
  { path: "/en/about/", changefreq: "monthly", priority: 0.85 },
  { path: "/nl/over-ons/", changefreq: "monthly", priority: 0.85 },
  { path: "/quartiers/", changefreq: "monthly", priority: 0.85 },
  { path: "/en/neighbourhoods/", changefreq: "monthly", priority: 0.85 },
  { path: "/nl/wijken/", changefreq: "monthly", priority: 0.85 },
  { path: "/nos-projets/", changefreq: "monthly", priority: 0.85 },
  { path: "/en/projects/", changefreq: "monthly", priority: 0.85 },
  { path: "/nl/projecten/", changefreq: "monthly", priority: 0.85 },
  { path: "/off-market/", changefreq: "monthly", priority: 0.9 },
  { path: "/en/off-market/", changefreq: "monthly", priority: 0.9 },
  { path: "/nl/off-market/", changefreq: "monthly", priority: 0.9 },
  { path: "/contact/", changefreq: "monthly", priority: 0.8 },
  { path: "/en/contact/", changefreq: "monthly", priority: 0.8 },
  { path: "/nl/contact/", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/", changefreq: "weekly", priority: 0.85 },
  { path: "/en/blog/", changefreq: "weekly", priority: 0.85 },
  { path: "/nl/blog/", changefreq: "weekly", priority: 0.85 },
  {
    path: "/blog/acheter-villa-sur-plan-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/investir-immobilier-luxe-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/adresses-immobilier-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/off-market-marrakech-biens-confidentiels/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/appartement-hypercentre-gueliz-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/en/blog/buying-off-plan-villa-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/en/blog/luxury-real-estate-investment-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/en/blog/best-addresses-real-estate-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/en/blog/off-market-properties-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/en/blog/apartment-hypercentre-gueliz-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/nl/blog/nieuwbouwvilla-kopen-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/nl/blog/investeren-luxe-vastgoed-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/nl/blog/beste-adressen-vastgoed-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/nl/blog/off-market-vastgoed-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/nl/blog/appartement-hypercentre-gueliz-marrakech/",
    changefreq: "monthly",
    priority: 0.7,
  },
  { path: "/simulateur/", changefreq: "monthly", priority: 0.9 },
  { path: "/en/simulator/", changefreq: "monthly", priority: 0.9 },
  { path: "/nl/simulator/", changefreq: "monthly", priority: 0.9 },
  { path: "/privacy-policy/", changefreq: "yearly", priority: 0.3 },
  { path: "/en/privacy-policy/", changefreq: "yearly", priority: 0.3 },
  { path: "/nl/privacybeleid/", changefreq: "yearly", priority: 0.3 },
];
