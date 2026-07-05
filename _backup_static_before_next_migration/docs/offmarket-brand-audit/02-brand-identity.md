# 02 — Brand Identity (Main Website)

## Brand name (post-rebrand)

| Context | Name |
|---------|------|
| HTML `<title>` | OffMarket \| Homepage (and subpage variants) |
| Body copy | OffMarket throughout (previous template name: Springs) |
| Footer logo | `logo-footer.svg` (SVG artwork may still show previous Springs wordmark) |
| Header logo | Split SVG: `logo-left` + `logo-right` + `logo-mobile` |
| OG / Twitter | OffMarket branding |
| Deployment doc | OffMarket (was: Springs Estate) |
| Canonical domain | `offmarket.ma` (was: `springs.estate`) |

## Audit baseline (before rebrand)

| Context | Name |
|---------|------|
| HTML `<title>` | Springs \| Homepage (and subpage variants) |
| Body copy | “Springs” throughout |
| OG / Twitter | Springs branding |
| Canonical domain | `springs.estate` |

## Spring / Spring 7 — verification (audit baseline)

| Search term | Result |
|-------------|--------|
| `Spring 7` | **Not found** |
| `Spring7` | **Not found** |
| `Springs` | **Extensive** — previous template brand |
| `springs.estate` | Previous canonical URLs |

**Conclusion:** Previous template identity was **Springs** (Springs Estate) — not “Spring 7”.

## Logo usage

| Asset | Location | Usage |
|-------|----------|-------|
| `icons.svg#logo-left` | Header center (desktop) | Left part of split wordmark |
| `icons.svg#logo-right` | Header center (desktop) | Right part (stylized “7” or mark) |
| `icons.svg#logo-mobile` | Header mobile, preloader | Compact wordmark |
| `assets/images/media/logo-footer.svg` | Footer | Large footer wordmark |
| Favicons | `/favicon.ico`, `/favicon-light.png`, `assets/manifest/*` | Browser chrome |

Logo treatment: SVG sprite, light-on-dark in `ui-dark` sections, animated on preloader landing.

## Typography

Extracted from `assets/stylesheets/global.css`:

| Role | Font |
|------|------|
| Display / editorial | **Victor Serif** (+ Helvetica/Arial fallback) |
| UI / body | **TT Commons Pro** (+ Helvetica/Arial fallback) |
| Monospace | Consolas, Liberation Mono, Menlo |

Type scale uses custom classes: `h0`, `h1`, `h2`, `g1`, `text-t1`, `text-c2`, `text-c2-small`, `leading-trim`.

## Visual mood

- **Warm organic luxury:** beige creams, forest greens, gold-olive accents
- **Wellness & nature:** parks, water, spa, calm copy
- **Cinematic scroll:** pinned sections, slow reveals, full-viewport photography
- **Premium restraint:** thin rules, outline buttons, generous whitespace

## Luxury positioning

- Exclusive residence language
- Designer credentials (WowHouse, Vide Infra)
- Wellness infrastructure as differentiator
- Western District / park adjacency as status signal

## Real estate tone

- Aspirational lifestyle over transactional listings
- “Residences” not “apartments” in primary nav (EN)
- Price cards and flat types on homepage (`/flats` links)
- Lead capture via callback / application forms (backend-dependent)

## Strengths (for future OffMarket adaptation)

- Mature scroll choreography and section pinning
- Strong photography-led storytelling
- Consistent `ui-dark` / `ui-light` theme system via CSS variables
- Responsive image pipeline (WebP srcsets)
- Full mobile menu with visual previews

## Weaknesses / rebrand friction

- **Brand mismatch:** Springs wellness copy vs OffMarket Marrakech positioning
- **Color system:** Green/beige palette unrelated to Mavericks dark red / champagne
- **Mixed languages:** EN page with RU modal labels
- **Backend coupling:** Forms POST to production API; static hosting breaks submission
- **Monolithic CSS:** `global.css` is one minified bundle — hard to grep/edit
- **Duplicate tree:** `mavericks/library design/` mirrors static assets (risk of editing wrong copy)
