# Full Next.js Migration Report — OFF MARKET

**Date:** 2026-06-30  
**Status:** Phase 9 complete — production routes use structured content + React components; archive is reference-only.

---

## Executive summary

All **27 production routes** are real Next.js pages. Phase 8 removed the legacy bridge and archived root static HTML. **Phase 9** removed runtime dependency on the archive: page content lives in `content/pages/*.json`, loaded via `lib/content/pages.ts` and rendered by React components (`HomePageContent`, `BlogIndexContent`, `BlogArticleContent`, `BusinessRouteContent`, etc.).

`_legacy_static_archived_after_full_next_migration/` is **historical reference only** (re-extract via `scripts/extract-page-content.mjs` if needed).  
`_backup_static_before_next_migration/` remains **untouched**.

---

## Final architecture (post Phase 9)

```
app/                         → 27 Next.js routes
components/
  home/HomePageContent.tsx   → homepages (5 locales)
  blog/                      → blog hub + articles
  business/                  → sur-plan, location locales
  pages/PageContentShell.tsx → head assets + body segment renderer
  sections/                  → fully React pages (about, contact, …)
content/pages/*.json         → structured page content (source of truth)
lib/content/pages.ts         → content registry (no filesystem reads)
lib/seo/blogMetadata.ts      → blog-specific SEO (matches static heads)
scripts/extract-page-content.mjs → one-time extract archive → content/
public/assets → ../assets/   → CSS, JS, images, fonts
_legacy_static_archived_after_full_next_migration/  → reference only
_backup_static_before_next_migration/               → frozen QA baseline
```

**Deprecated (not used by production):** `lib/static-html/contentRoot.ts`, `parsePage.ts`, `StaticHtmlRoutePage.tsx`, `StaticHtmlHeadMeta.tsx` — extraction tooling only.

---

## Route inventory (27)

| Route | Next.js page | Renderer |
|-------|--------------|----------|
| `/` | `app/page.tsx` | `HomePageContent` ← `content/pages/home-root.json` |
| `/fr/`, `/en/`, `/it/`, `/nl/` | `app/{locale}/page.tsx` | `HomePageContent` ← `home-{locale}.json` |
| `/about/`, `/fr/about/` | `app/about/page.tsx`, … | `AboutPageContent` (React) |
| `/contact/` | `app/contact/page.tsx` | `ContactPageContent` (React) |
| `/fr/contact/`, … | locale contact pages | `LocaleContactPage` (React; SEO from `contact-*.json`) |
| `/off-market/`, `/privacy-policy/`, `/simulateur/` | React pages | `lib/assets.ts` bundles |
| `/sur-plan/`, `/fr/sur-plan/`, `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/` | business pages | `BusinessRouteContent` |
| `/location/` | `app/location/page.tsx` | `BusinessRouteContent` |
| `/blog/` + 5 articles | `app/blog/` | `BlogIndexContent` / `BlogArticleContent` |

---

## Remaining HTML Parsing Dependencies

### Production routes: **none** (archive not read at runtime)

| Route | Previous (Phase 8) | Phase 9 replacement |
|-------|-------------------|---------------------|
| `/`, `/fr/`, `/en/`, `/it/`, `/nl/` | `LocaleHomepage` + `parseStaticHtmlFile` | `HomePageContent` + `getPageContent('home-*')` |
| `/blog/` | `StaticHtmlRoutePage` | `BlogIndexContent` |
| `/blog/[slug]` | `StaticHtmlRoutePage` + `StaticHtmlHeadMeta` | `BlogArticleContent` + `buildBlogArticleMetadata` |
| `/location/` | `StaticHtmlRoutePage` | `BusinessRouteContent` |
| `/sur-plan/` + 4 locale variants | `StaticHtmlRoutePage` | `BusinessRouteContent` |
| `/fr/contact/`, … | `parseStaticHtmlFile` (metadata only) | `getPageMetadata('contact-*')` |

### Deprecated modules (extraction / reference only)

| File | Status | Notes |
|------|--------|-------|
| `lib/static-html/contentRoot.ts` | Deprecated | Used only by `scripts/extract-page-content.mjs` |
| `lib/static-html/parsePage.ts` | Deprecated | Same |
| `lib/static-html/StaticHtmlRoutePage.tsx` | Deprecated | Replaced by `PageContentShell` |
| `lib/static-html/StaticHtmlHeadMeta.tsx` | Deprecated | Replaced by `PageHeadMeta` |
| `components/layout/StaticHtmlBody.tsx` | **Active** | Renders `bodySegments` from JSON (not archive) |

### Future optional work

| Item | Strategy |
|------|----------|
| Homepage section TSX (`HomeHero`, etc.) | Split `content/home/*-sections.json` once section boundaries are reliable |
| Inline HTML strings in JSON | Gradual conversion to typed React components |
| Re-sync content after copy edits | Run `node scripts/extract-page-content.mjs` from archive |

---

## Phase 9 changes

### Added

- `content/pages/` — 21 structured JSON files (~4.3 MB total)
- `scripts/extract-page-content.mjs` — archive → content extractor
- `lib/content/types.ts`, `lib/content/pages.ts`
- `components/home/HomePageContent.tsx`
- `components/blog/BlogIndexContent.tsx`, `BlogArticleContent.tsx`
- `components/business/BusinessRouteContent.tsx`
- `components/pages/PageContentShell.tsx`, `PageHeadMeta.tsx`
- `lib/seo/blogMetadata.ts`
- `lib/homepage/homepagePages.ts`

### Removed from production path

- Runtime reads of `_legacy_static_archived_after_full_next_migration/`
- `StaticHtmlRoutePage` / `StaticHtmlHeadMeta` on all hybrid routes

---

## Build & QA (Phase 9 — 2026-06-30)

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Pass |
| 27/27 HTTP 200 | ✅ |
| `/robots.txt`, `/sitemap.xml`, `/assets/*` | ✅ |
| `qa-visual-compare.mjs` | **24/27** |
| `qa-browser-metrics.mjs --json` | **75/81** |
| Homepage `/` | ✅ Pass both suites |

### Documented QA deltas (approved / known)

| Route | Delta | Status |
|-------|-------|--------|
| `/about/`, `/fr/about/` | CSS `?v=` + smaller h1 (hero hotfix) | **Approved** |
| `/location/` | Canonical trailing slash (`/location/` vs `/location`) — Next.js `trailingSlash: true` | Known; no visual impact |

---

## Deployment

```bash
npm run build
npm start
```

To refresh structured content from archive (maintenance only):

```bash
node scripts/extract-page-content.mjs
```

---

## Awaiting approval

- Git commit / push (not done)
- Optional: per-section React homepage components
- Optional: remove deprecated `lib/static-html/*` after final sign-off
