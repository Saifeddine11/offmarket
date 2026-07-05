# Cleanup Plan — Post Phase 9

**Status:** Phase 9 complete (2026-06-30). No production route reads archived HTML at runtime.

## Phase 8 (complete)

| Action | Status |
|--------|--------|
| Remove `app/[[...slug]]/route.ts` | ✅ |
| Archive root static HTML | ✅ `_legacy_static_archived_after_full_next_migration/` |
| Keep `_backup_static_before_next_migration/` untouched | ✅ |

## Phase 9 (complete)

| Action | Status |
|--------|--------|
| Extract archive → `content/pages/*.json` | ✅ `scripts/extract-page-content.mjs` |
| `lib/content/pages.ts` registry | ✅ |
| Homepages → `HomePageContent` | ✅ 5 locales |
| Blog → `BlogIndexContent` / `BlogArticleContent` | ✅ |
| Business routes → `BusinessRouteContent` | ✅ 6 routes |
| Contact SEO from `contact-*.json` | ✅ |
| Remove production `contentRoot` / `parseStaticHtmlFile` usage | ✅ |

## Active structure

| Path | Role |
|------|------|
| `app/`, `components/`, `lib/` | Next.js application |
| `content/pages/` | Structured page content (source of truth) |
| `public/assets` → `assets/` | Static assets |
| `_legacy_static_archived_after_full_next_migration/` | Reference only — not read at runtime |
| `_backup_static_before_next_migration/` | Frozen QA baseline |

## Deprecated (safe to remove after approval)

- `lib/static-html/contentRoot.ts`
- `lib/static-html/parsePage.ts` (keep logic mirrored in extract script)
- `lib/static-html/StaticHtmlRoutePage.tsx`
- `lib/static-html/StaticHtmlHeadMeta.tsx`

## Optional future cleanup

- Per-section homepage React (`HomeHero.tsx`, …) from `content/home/*-sections.json`
- Replace `bodySegments` HTML strings with typed components
- Delete deprecated `lib/static-html/*` modules
- Commit Phase 9 when approved

## QA (Phase 9)

| Check | Result |
|-------|--------|
| `npm run build` | ✅ |
| Visual compare | 24/27 (About approved, location canonical slash) |
| Browser metrics | 75/81 (About approved) |

```bash
cd _backup_static_before_next_migration && python3 -m http.server 8765
npm start   # port 3000
node scripts/qa-visual-compare.mjs
node scripts/qa-browser-metrics.mjs --json
```
