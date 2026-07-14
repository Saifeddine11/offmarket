# OFF MARKET — Static → Next.js Migration Audit

**Objective (updated):** Full Next.js migration — no legacy HTML bridge in the final version. Every production page must become a real Next.js route/component. The legacy bridge (`app/[[...slug]]/route.ts`) is temporary only.

**Date:** 2026-06-30  
**Project:** `/Users/namousssifeddine/offmarket-website`  
**Backup:** `_backup_static_before_next_migration/` (329 MB, frozen — do not modify)

---

## 1. Current folder structure (production-relevant)

```
offmarket-website/
├── _backup_static_before_next_migration/   # Safety backup (read-only)
├── about/
├── archive/                                # Archived pages/assets (not public routes)
├── archives/
├── assets/
│   ├── chrome/
│   ├── documents/
│   ├── fonts/
│   ├── images/
│   ├── javascripts/
│   ├── logos/
│   ├── manifest/
│   ├── mavericks/
│   ├── pano/
│   ├── snippets/
│   ├── stylesheets/
│   ├── videos/
│   └── webgl/
├── blog/
│   └── [5 article slugs]/
├── contact/
├── docs/
├── en/
│   ├── contact/
│   └── off-plan/
├── fr/
│   ├── about/
│   ├── contact/
│   └── sur-plan/
├── infrastructure/                         # Meta-refresh redirect → /sur-plan/
├── it/
│   ├── contatto/
│   └── progetti-su-piano/
├── location/
├── media/                                  # Cache only
├── nl/
│   ├── contact/
│   └── nieuwbouw/
├── off-market/
├── privacy-policy/
├── scripts/                                # Dev/migration scripts (not served)
├── simulateur/
├── sur-plan/
├── index.html
├── robots.txt
└── sitemap.xml
```

---

## 2. Production HTML pages (28 live routes)

| URL | File | Lines (approx) |
|-----|------|----------------|
| `/` | `index.html` | 7,927 |
| `/fr/` | `fr/index.html` | ~7,900 |
| `/en/` | `en/index.html` | ~7,900 |
| `/it/` | `it/index.html` | ~7,900 |
| `/nl/` | `nl/index.html` | ~7,900 |
| `/about/` | `about/index.html` | 225 |
| `/fr/about/` | `fr/about/index.html` | ~225 |
| `/contact/` | `contact/index.html` | 267 |
| `/fr/contact/` | `fr/contact/index.html` | — |
| `/en/contact/` | `en/contact/index.html` | — |
| `/nl/contact/` | `nl/contact/index.html` | — |
| `/it/contatto/` | `it/contatto/index.html` | — |
| `/off-market/` | `off-market/index.html` | 124 |
| `/sur-plan/` | `sur-plan/index.html` | 6,467 |
| `/fr/sur-plan/` | `fr/sur-plan/index.html` | ~6,400 |
| `/en/off-plan/` | `en/off-plan/index.html` | ~6,400 |
| `/it/progetti-su-piano/` | `it/progetti-su-piano/index.html` | ~6,400 |
| `/nl/nieuwbouw/` | `nl/nieuwbouw/index.html` | ~6,400 |
| `/location/` | `location/index.html` | 5,903 |
| `/simulateur/` | `simulateur/index.html` | — |
| `/privacy-policy/` | `privacy-policy/index.html` | — |
| `/blog/` | `blog/index.html` | — |
| `/blog/acheter-villa-sur-plan-marrakech/` | `blog/acheter-villa-sur-plan-marrakech/index.html` | — |
| `/blog/investir-immobilier-luxe-marrakech/` | `blog/investir-immobilier-luxe-marrakech/index.html` | — |
| `/blog/adresses-immobilier-marrakech/` | `blog/adresses-immobilier-marrakech/index.html` | — |
| `/blog/off-market-marrakech-biens-confidentiels/` | `blog/off-market-marrakech-biens-confidentiels/index.html` | — |
| `/blog/appartement-hypercentre-gueliz-marrakech/` | `blog/appartement-hypercentre-gueliz-marrakech/index.html` | — |
| `/infrastructure/` | `infrastructure/index.html` | Redirect only |

**Not production (archived):** `archive/removed-pages/*`, `archive/*` — excluded from routing.

---

## 3. URL map & multilingual routing

| Locale | Home | Contact | Sur plan |
|--------|------|---------|----------|
| Default (FR) | `/` | `/contact/` | `/sur-plan/` |
| FR | `/fr/` | `/fr/contact/` | `/fr/sur-plan/` |
| EN | `/en/` | `/en/contact/` | `/en/off-plan/` |
| IT | `/it/` | `/it/contatto/` | `/it/progetti-su-piano/` |
| NL | `/nl/` | `/nl/contact/` | `/nl/nieuwbouw/` |

**Shared across locales:** `/about/`, `/fr/about/`, `/off-market/`, `/blog/*`, `/simulateur/`, `/privacy-policy/`, `/location/`

**Redirects required:**
| From | To | Type |
|------|-----|------|
| `/infrastructure` | `/sur-plan/` | 301 |
| `/infrastructure/` | `/sur-plan/` | 301 |

**Note:** `/location` canonical is `https://offmarketofficial.com/location` (no trailing slash). Next.js `trailingSlash: true` serves `/location/` — add redirect `/location` → `/location/` or preserve both.

---

## 4. CSS files (32)

```
assets/stylesheets/browser-message.css
assets/stylesheets/global.css
assets/stylesheets/landing.css
assets/stylesheets/location.css
assets/stylesheets/mav-hero.css
assets/stylesheets/mav-who.css
assets/stylesheets/mavericks-chrome.css
assets/stylesheets/offmarket-logo.css
assets/stylesheets/offmarket-overrides.css
assets/stylesheets/offmarket-tokens.css
assets/stylesheets/om-blog.css
assets/stylesheets/om-buttons.css
assets/stylesheets/om-cinematic-video.css
assets/stylesheets/om-contact.css
assets/stylesheets/om-featured-projects.css
assets/stylesheets/om-final-cta.css
assets/stylesheets/om-footer.css
assets/stylesheets/om-inner-hero.css
assets/stylesheets/om-legacy-type.css
assets/stylesheets/om-legal.css
assets/stylesheets/om-mobile-desktop-parity.css
assets/stylesheets/om-nav-menu.css
assets/stylesheets/om-private-access-popup.css
assets/stylesheets/om-property-modal.css
assets/stylesheets/om-simulator-home.css
assets/stylesheets/om-simulator.css
assets/stylesheets/om-territories.css
assets/stylesheets/om-testimonials.css
assets/stylesheets/om-text-reveal.css
assets/stylesheets/om-typography.css
assets/stylesheets/sur-plan.css
assets/stylesheets/tour.css
```

---

## 5. JavaScript files (44)

```
assets/javascripts/browser-message/browser-message.js
assets/javascripts/gsap.min.js
assets/javascripts/landing.js
assets/javascripts/location.js
assets/javascripts/mav-editorial-text-reveal.js
assets/javascripts/mav-hero-blur-text.js
assets/javascripts/mav-hero-counter.js
assets/javascripts/mav-lazy-videos.js
assets/javascripts/mav-navbar-hero-visibility.js
assets/javascripts/mav-who-reveal.js
assets/javascripts/mavericks-chrome.js
assets/javascripts/om-blog-data.js
assets/javascripts/om-blog.js
assets/javascripts/om-cinematic-video.js
assets/javascripts/om-contact.js
assets/javascripts/om-featured-projects.js
assets/javascripts/om-home-private-access-reveal.js
assets/javascripts/om-inner-hero.js
assets/javascripts/om-language-switcher.js
assets/javascripts/om-location-boot.js
assets/javascripts/om-mobile-legacy-guard.js
assets/javascripts/om-mobile-reveal.js
assets/javascripts/om-nav-menu.js
assets/javascripts/om-nav-scroll.js
assets/javascripts/om-no-preloader.js
assets/javascripts/om-private-access-form.js
assets/javascripts/om-private-access-popup.js
assets/javascripts/om-property-modal.js
assets/javascripts/om-simulator.js
assets/javascripts/om-territories.js
assets/javascripts/om-testimonials.js
assets/javascripts/om-text-reveal.js
assets/javascripts/plan-lazy.js
assets/javascripts/popover-lazy.js
assets/javascripts/recaptcha-cloudflare.js
assets/javascripts/recaptcha-v2.js
assets/javascripts/recaptcha-yandex.js
assets/javascripts/scrolltrigger.min.js
assets/javascripts/shared.js
assets/javascripts/sur-plan.js
assets/javascripts/tooltip-lazy.js
assets/javascripts/tour.js
assets/javascripts/webgl-nature.js
assets/javascripts/webgl-wellness.js
```

---

## 6. Fonts (9 files)

```
assets/fonts/VictorSerif-40Regular.woff2
assets/fonts/VictorSerif-40Regular.woff
assets/fonts/VictorSerif-45RegularItalic.woff2
assets/fonts/VictorSerif-45RegularItalic.woff
assets/fonts/TTCommonsPro-Md.woff
assets/fonts/TTCommonsPro-Md.woff2
assets/fonts/TT_Commons_Pro_Regular.woff2
assets/fonts/TT_Commons_Pro_Regular.woff
assets/fonts/TT_Commons_Pro_Bold.otf
```

---

## 7. Forms & CTAs

### Private access form (`.om-private-access-form`)
- **Homepage** (all langs): `#acces-off-market`, intent `homepage-off-market`
- **Off-market page:** `/off-market/`, intents `off-market` / `biens-existants` (URL param)
- **Contact pages:** tabbed private access, intents `contact-off-market` / `biens-existants`
- **JS:** `om-private-access-form.js` — validation, country/budget, mailto submit
- **Popup CTA:** `om-private-access-popup.js` → links to `/off-market/`

### Standard contact form
- **Contact pages:** `om-contact.js` — tabs, standard inquiry

### Simulator
- **Simulateur:** `om-simulator.js` — investment calculator

### Navigation CTAs (`om-nav-menu.js`)
- Accueil → `/`
- Notre Histoire → `/about/`
- Quartiers → `/#territories`
- OFF MARKET → `/off-market/`
- Sur Plan → `/sur-plan/` (+ sub-anchors)
- Biens Existants → `/off-market/?intent=biens-existants`
- Contact → `/contact/`

---

## 8. SEO inventory

### hreflang
**None present** on any production page.

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://offmarketofficial.com/sitemap.xml
```

### sitemap.xml URLs (17)
- `https://offmarketofficial.com/`
- `https://offmarketofficial.com/fr/`
- `https://offmarketofficial.com/sur-plan/`
- `https://offmarketofficial.com/fr/sur-plan/`
- `https://offmarketofficial.com/about/`
- `https://offmarketofficial.com/fr/about/`
- `https://offmarketofficial.com/off-market/`
- `https://offmarketofficial.com/contact/`
- `https://offmarketofficial.com/fr/contact/`
- `https://offmarketofficial.com/blog/`
- `https://offmarketofficial.com/blog/acheter-villa-sur-plan-marrakech/`
- `https://offmarketofficial.com/blog/investir-immobilier-luxe-marrakech/`
- `https://offmarketofficial.com/blog/adresses-immobilier-marrakech/`
- `https://offmarketofficial.com/blog/off-market-marrakech-biens-confidentiels/`
- `https://offmarketofficial.com/blog/appartement-hypercentre-gueliz-marrakech/`
- `https://offmarketofficial.com/simulateur/`
- `https://offmarketofficial.com/privacy-policy/`

**Pages live but NOT in sitemap:** `/en/`, `/it/`, `/nl/`, `/en/contact/`, `/nl/contact/`, `/it/contatto/`, `/en/off-plan/`, `/it/progetti-su-piano/`, `/nl/nieuwbouw/`, `/location/`

### Structured data (JSON-LD)
- **Blog index only:** `CollectionPage` schema on `blog/index.html`
- No structured data on other pages (checked)

### Per-page metadata (summary)

| Page | Title | Canonical |
|------|-------|-----------|
| `/` | OFF MARKET — Immobilier privé de prestige à Marrakech | `https://offmarketofficial.com/` |
| `/fr/` | OFF MARKET — Immobilier privé de prestige à Marrakech | `https://offmarketofficial.com/fr/` |
| `/en/`, `/it/`, `/nl/` | Same title pattern | Respective locale URL |
| `/about/` | Notre Histoire — OFF MARKET Marrakech | `https://offmarketofficial.com/about/` |
| `/fr/about/` | Notre Histoire — OFF MARKET Marrakech | `https://offmarketofficial.com/fr/about/` |
| `/off-market/` | Accès privé — OFF MARKET Marrakech | `https://offmarketofficial.com/off-market/` |
| `/contact/` | Contact — OFF MARKET Marrakech | `https://offmarketofficial.com/contact/` |
| `/sur-plan/` + locale variants | OFF MARKET — Sur plan \| Opportunités sélectionnées à Marrakech | Locale-specific |
| `/location/` | OFF MARKET — Adresses \| Territoires d'investissement à Marrakech | `https://offmarketofficial.com/location` |
| `/simulateur/` | Simulateur investissement immobilier Marrakech \| OFF MARKET | `https://offmarketofficial.com/simulateur/` |
| `/privacy-policy/` | Mentions légales \| OFF MARKET | `https://offmarketofficial.com/privacy-policy/` |
| `/blog/` | Blog immobilier Marrakech — OFF MARKET | `https://offmarketofficial.com/blog/` |

**Open Graph / Twitter:** Present on all production pages. Standard pattern: `og:type=website`, locale-specific `og:locale`, hero image `mavericks-hero-poster.jpg` or `mavericks-hero-villa.webp` on about/blog.

---

## 9. Migration risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Homepage ~8k lines with legacy template (Barba, locomotive scroll, inline markup) | High | Phase 1: serve raw HTML via route handler; componentize incrementally |
| Sur-plan / location pages ~6k lines each | High | Same legacy bridge; migrate last |
| Script execution order in React | High | Raw HTML response preserves order exactly during bridge phase |
| Locale-specific URL slugs (contatto, off-plan, nieuwbouw) | Medium | Explicit route table in `lib/legacy/routes.ts` |
| CSS cache-busting `?v=` query params | Low | Preserve in HTML; public assets symlinked |
| GSAP / ScrollTrigger animations | Medium | Keep exact script includes; test scroll reveals |
| WebGL (webgl-nature, webgl-wellness) | Medium | Verify canvas init after hydration |
| No hreflang today | Low | Do not add unless requested; preserve absence |
| `/location` canonical without trailing slash | Low | Redirect or dual-serve |
| Archive folder accidentally routed | Medium | Block `archive` path prefix in resolver |
| Duplicate asset paths during transition | Low | Symlink `public/assets` → `assets/` |

---

## 10. Migration plan

### Phase 1 — Backup & audit ✅
- [x] Create `_backup_static_before_next_migration/`
- [x] Copy full static site into backup
- [x] Create `MIGRATION_AUDIT.md`
- [x] Do not modify backup

### Phase 2 — Next.js setup ✅
- [x] Initialize Next.js (App Router, TypeScript) alongside static files
- [x] `trailingSlash: true` to match current URLs
- [x] Legacy HTML route handler (`app/[[...slug]]/route.ts`) for pixel-perfect parity
- [x] `lib/legacy/` route resolver + blocked paths
- [x] `app/robots.ts` + `app/sitemap.ts` mirroring current SEO files
- [x] Redirects: `/infrastructure` → `/sur-plan/`, `/location` → `/location/`

### Phase 3 — Asset migration ✅
- [x] Symlink `public/assets` → `../assets` (preserve `/assets/...` URLs)
- [x] Do not recompress or rename images

### Phase 4 — Layout migration (in progress)
- [x] Shared chrome: `components/chrome/MavericksChrome.tsx`
- [x] Shared footer: `components/chrome/SiteFooter.tsx`
- [x] Shared form: `components/forms/PrivateAccessForm.tsx`
- [ ] Full homepage chrome integration (pending)

### Phase 5 — Page migration (in progress)

| Page | Status | Implementation |
|------|--------|----------------|
| `/off-market/` | ✅ React | `app/off-market/page.tsx` |
| `/about/` | ✅ React | `app/about/page.tsx` |
| `/fr/about/` | Legacy bridge | `fr/about/index.html` |
| All other routes | Legacy bridge | `app/[[...slug]]/route.ts` |

### Phase 6 — SEO preservation
- [ ] Metadata API per migrated page
- [ ] Preserve canonical, OG, Twitter
- [ ] Blog JSON-LD on blog index
- [ ] Document any URL changes + redirects here

### Phase 7 — Final verification
- [ ] Visual diff vs `_backup_static_before_next_migration/`
- [ ] All CTAs, forms, nav links
- [ ] Mobile + desktop layouts
- [ ] sitemap + robots
- [ ] Remove static HTML only after full sign-off

---

## 11. Redirects log

| Source | Destination | Status | Reason |
|--------|-------------|--------|--------|
| `/infrastructure` | `/sur-plan/` | 301 | Existing meta-refresh redirect |
| `/infrastructure/` | `/sur-plan/` | 308 | Existing meta-refresh redirect |
| `/location` | `/location/` | 301 | Canonical normalization |

*No other redirects planned.*

---

## 12. Next.js target structure

```
offmarket-website/
├── app/
│   ├── [[...slug]]/route.ts      # Legacy HTML bridge (transitional)
│   ├── robots.ts
│   └── sitemap.ts
├── lib/
│   └── legacy/
│       ├── routes.ts
│       └── resolve.ts
├── public/
│   └── assets/ → symlink
├── components/                    # Incremental React components
├── package.json
├── next.config.ts
└── tsconfig.json
```

Static HTML files remain at project root until each page is fully migrated to React components.
