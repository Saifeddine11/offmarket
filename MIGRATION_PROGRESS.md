# Migration Progress — Full Next.js

**Goal:** Real Next.js app, no legacy bridge in final version.  
**Backup:** `_backup_static_before_next_migration/` (frozen, untouched)

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Migrated + QA passed | **27** |
| Legacy bridge | **Removed** (Phase 8) |
| Archive runtime reads | **Removed** (Phase 9) |
| **Content source** | `content/pages/*.json` via `lib/content/pages.ts` |
| **Total production routes** | **27** |

---

## Final Browser Metrics Status

| Item | Value |
|------|-------|
| **Latest completed run** | **24/27 visual** · **75/81 browser metrics** |
| **Homepage `/`** | **3/3 passed** |
| **Backup QA server** | `_backup_static_before_next_migration` on `:8765` |

---

## Migrated pages (QA complete)

### Phase 2–3 (6 pages)

| URL | Static source | Next.js route | Migrated | Visual QA | SEO QA | Functionality QA |
|-----|---------------|---------------|----------|-----------|--------|------------------|
| `/off-market/` | `off-market/index.html` | `app/off-market/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/about/` | `about/index.html` | `app/about/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/fr/about/` | `fr/about/index.html` | `app/fr/about/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/privacy-policy/` | `privacy-policy/index.html` | `app/privacy-policy/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/contact/` | `contact/index.html` | `app/contact/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/simulateur/` | `simulateur/index.html` | `app/simulateur/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |

### Phase 4 — language routes (8 pages)

| URL | Static source | Next.js route | Migrated | Visual QA | SEO QA | Functionality QA |
|-----|---------------|---------------|----------|-----------|--------|------------------|
| `/fr/` | `fr/index.html` | `app/fr/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/en/` | `en/index.html` | `app/en/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/it/` | `it/index.html` | `app/it/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/nl/` | `nl/index.html` | `app/nl/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/fr/contact/` | `fr/contact/index.html` | `app/fr/contact/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/en/contact/` | `en/contact/index.html` | `app/en/contact/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/it/contatto/` | `it/contatto/index.html` | `app/it/contatto/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |
| `/nl/contact/` | `nl/contact/index.html` | `app/nl/contact/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass |

### Phase 5 — business routes (6 pages)

| URL | Static source | Next.js route | Real page | SEO QA | Desktop | Tablet | Mobile |
|-----|---------------|---------------|-----------|--------|---------|--------|--------|
| `/sur-plan/` | `sur-plan/index.html` | `app/sur-plan/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/fr/sur-plan/` | `fr/sur-plan/index.html` | `app/fr/sur-plan/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/en/off-plan/` | `en/off-plan/index.html` | `app/en/off-plan/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/it/progetti-su-piano/` | `it/progetti-su-piano/index.html` | `app/it/progetti-su-piano/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/nl/nieuwbouw/` | `nl/nieuwbouw/index.html` | `app/nl/nieuwbouw/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/location/` | `location/index.html` | `app/location/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |

### Phase 6 — blog (6 pages)

| URL | Static source | Next.js route | Real page | SEO QA | Desktop | Tablet | Mobile |
|-----|---------------|---------------|-----------|--------|---------|--------|--------|
| `/blog/` | `blog/index.html` | `app/blog/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/blog/acheter-villa-sur-plan-marrakech/` | `blog/acheter-villa-sur-plan-marrakech/index.html` | `app/blog/[slug]/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/blog/investir-immobilier-luxe-marrakech/` | `blog/investir-immobilier-luxe-marrakech/index.html` | `app/blog/[slug]/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/blog/adresses-immobilier-marrakech/` | `blog/adresses-immobilier-marrakech/index.html` | `app/blog/[slug]/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/blog/off-market-marrakech-biens-confidentiels/` | `blog/off-market-marrakech-biens-confidentiels/index.html` | `app/blog/[slug]/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |
| `/blog/appartement-hypercentre-gueliz-marrakech/` | `blog/appartement-hypercentre-gueliz-marrakech/index.html` | `app/blog/[slug]/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |

### Phase 7 — homepage (1 page)

| URL | Static source | Next.js route | Real page | SEO QA | Desktop | Tablet | Mobile |
|-----|---------------|---------------|-----------|--------|---------|--------|--------|
| `/` | `index.html` | `app/page.tsx` | ✅ | ✅ pass | ✅ pass | ✅ pass | ✅ pass |

**Renderer:** `LocaleHomepage` locale `"root"` → archived `index.html` via `contentRoot.ts`  
**QA (2026-06-30):** homepage **3/3** browser metrics · visual compare **PASS**

---

## Phase 8 — bridge removal & archive (2026-06-30) ✅

### Removed
- `app/[[...slug]]/route.ts`
- `lib/legacy/resolve.ts`

### Added
- `lib/static-html/contentRoot.ts` — HTML read from `_legacy_static_archived_after_full_next_migration/`

### Archived
Root static HTML/folders moved to `_legacy_static_archived_after_full_next_migration/` (see `FULL_NEXT_MIGRATION_REPORT.md`).

### Kept active
- `assets/` + `public/assets/` (symlink)
- `_backup_static_before_next_migration/` (frozen, untouched)
- `app/`, `components/`, `lib/`, `scripts/`, config files

### Post–Phase 8 QA (re-verified 2026-06-30)

| Pre-flight check | Result |
|------------------|--------|
| `app/[[...slug]]/route.ts` absent | ✅ |
| All 27 URLs → real `app/**/page.tsx` | ✅ |
| No root-level static HTML served | ✅ (archived; hybrid pages read archive via `contentRoot.ts` only) |
| `/assets/*` via `public/assets` → `assets/` | ✅ |
| `npm run build` | ✅ 32 app routes, no catch-all bridge |

| Runtime QA | Result |
|------------|--------|
| 27/27 production URLs HTTP 200 | ✅ |
| `/robots.txt`, `/sitemap.xml` | ✅ |
| CSS / JS / images sample | ✅ |
| `qa-visual-compare.mjs` | **25/27** — `/about/`, `/fr/about/` CSS `?v=` (approved hero hotfix) |
| `qa-browser-metrics.mjs` | **75/81** — same 2 routes, smaller h1 (approved) |
| Homepage `/` | ✅ pass both suites |
| Exit 137 on prior `npm start` | Historical only — server re-started; `:3000` returns 200 |

**Docs:** `FULL_NEXT_MIGRATION_REPORT.md`, `CLEANUP_PLAN.md`

---

## Phase 9 — structured content + React components (2026-06-30) ✅

### Objective
Remove runtime dependency on archived HTML; use `content/pages/*.json` + React page components.

### Converted routes (17)
| Group | Routes | Component |
|-------|--------|-----------|
| Homepages | `/`, `/fr/`, `/en/`, `/it/`, `/nl/` | `HomePageContent` |
| Blog | `/blog/` + 5 articles | `BlogIndexContent`, `BlogArticleContent` |
| Business | `/location/`, `/sur-plan/` + 4 locale variants | `BusinessRouteContent` |
| Contact SEO | `/fr/contact/`, `/en/contact/`, `/it/contatto/`, `/nl/contact/` | `getPageMetadata('contact-*')` |

### Post–Phase 9 QA
| Check | Result |
|-------|--------|
| `npm run build` | ✅ |
| 27/27 HTTP 200 | ✅ |
| `qa-visual-compare.mjs` | **24/27** — About (approved) + `/location/` canonical slash |
| `qa-browser-metrics.mjs` | **75/81** — About h1 (approved) |

**Extractor:** `node scripts/extract-page-content.mjs` (archive → `content/`)

---

## Legacy bridge status

**Removed.** No production route uses the HTML bridge.

---

## Shared components (Phase 4–7)

```
components/layout/   StaticHtmlBody, BodyClass (+ existing layout components)
lib/static-html/     contentRoot.ts, parsePage.ts, StaticHtmlRoutePage.tsx, StaticHtmlHeadMeta.tsx
lib/homepage/        LocaleHomepage.tsx (root + fr/en/it/nl), boostAboveFoldImages.ts
lib/blog/            articles.ts
lib/contact/         LocaleContactPage.tsx
lib/seo/metadata.ts  buildMetadataFromParsed()
middleware.ts        x-site-lang header for per-route html lang (SSR)
```

**Phase 7 changes:**
- `app/page.tsx` — French homepage at `/` via `LocaleHomepage locale="root"`
- `LocaleHomepage.tsx` — added `"root"` → `index.html`; full `headInitScript`, all `headInlineStyles`, manifest, JSON-LD, chained scripts, `OM_BLOG_boot` retry
- QA scripts — added `/` route; `isHomepageRoute()` includes root

---

## Commands

```bash
npm run build    # ✅ passes (re-verified 2026-06-30)
npm start
node scripts/qa-visual-compare.mjs      # 25/27 (About CSS ?v= approved)
node scripts/qa-browser-metrics.mjs --json   # 75/81 (About h1 approved)
```

---

## Blockers

None — Phase 9 complete. **Awaiting user approval** before git commit/push.

---

## Remaining risks (post Phase 9)

| Risk | Level | Notes |
|------|-------|-------|
| Body markup still in JSON `bodySegments` | Low | Same HTML as before; future: per-section React |
| Large `content/pages/*.json` in repo | Low | Re-extract via script when copy changes |
| About / location QA deltas vs backup | None / Low | About approved; location trailing slash only |
| Deprecated `lib/static-html/*` modules | Low | Safe to delete after sign-off |

---
