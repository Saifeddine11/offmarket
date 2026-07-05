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
  "/fr/about",
  "/quartiers",
  "/nos-projets",
  "/contact",
  "/fr/contact",
  "/en/contact",
  "/nl/contact",
  "/it/contatto",
  "/off-market",
  "/en/off-market",
  "/it/off-market",
  "/sur-plan",
  "/fr/sur-plan",
  "/en/off-plan",
  "/it/progetti-su-piano",
  "/nl/nieuwbouw",
  "/location",
  "/simulateur",
  "/privacy-policy",
  "/blog",
  "/blog/acheter-villa-sur-plan-marrakech",
  "/blog/investir-immobilier-luxe-marrakech",
  "/blog/adresses-immobilier-marrakech",
  "/blog/off-market-marrakech-biens-confidentiels",
  "/blog/appartement-hypercentre-gueliz-marrakech",
] as const;

export const SITE_URL = "https://offmarket.ma";

export const SITEMAP_URLS: Array<{
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/fr/", changefreq: "weekly", priority: 1.0 },
  { path: "/sur-plan/", changefreq: "monthly", priority: 0.9 },
  { path: "/fr/sur-plan/", changefreq: "monthly", priority: 0.9 },
  { path: "/about/", changefreq: "monthly", priority: 0.85 },
  { path: "/fr/about/", changefreq: "monthly", priority: 0.85 },
  { path: "/quartiers/", changefreq: "monthly", priority: 0.85 },
  { path: "/nos-projets/", changefreq: "monthly", priority: 0.85 },
  { path: "/off-market/", changefreq: "monthly", priority: 0.9 },
  { path: "/contact/", changefreq: "monthly", priority: 0.8 },
  { path: "/fr/contact/", changefreq: "monthly", priority: 0.8 },
  { path: "/blog/", changefreq: "weekly", priority: 0.85 },
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
  { path: "/simulateur/", changefreq: "monthly", priority: 0.9 },
  { path: "/privacy-policy/", changefreq: "yearly", priority: 0.3 },
];
