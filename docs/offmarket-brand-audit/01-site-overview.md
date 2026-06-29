# 01 — Site Overview

## What this website is

The main OffMarket website in this repository is a **static, production-exported marketing site** branded **OffMarket** (previous template name: **Springs Estate**). It is **not** the Mavericks / OffMarket Marrakech React application.

| Attribute | Value (post-rebrand) |
|-----------|----------------------|
| **Public brand name** | OffMarket |
| **Domain (canonical)** | `https://offmarket.ma/` |
| **Previous template name** | Springs Estate (`springs.estate`) |
| **Meta positioning** | “Wellness-residences” |
| **Primary language** | English (with Russian UI strings in modals/menus) |
| **Build type** | Static HTML + compiled CSS/JS (no npm at repo root) |
| **Design agency** | Vide Infra (footer credit) |

## Relationship to OffMarket / Mavericks

- **`mavericks/`** contains the **target product direction**: private luxury real estate in Marrakech (OffMarket / Mavericks brand, FR-first i18n, cinematic React homepage).
- **Repo root** contains the static site — now **OffMarket** naming and Mavericks palette (colors applied; brand copy renamed from Springs).
- Logo SVG artwork may still visually read as the previous Springs wordmark until asset replacement.

## Market positioning (as published)

- **Category:** Ultra-premium wellness residential development
- **Promise:** Exclusive residence with rich wellness infrastructure next to a nature park
- **Tone:** Renewal, nature, wellness, design, prestige Western District location
- **Audience:** High-net-worth buyers seeking wellness lifestyle + investment-grade residence
- **Geography (in copy):** Fictional “Western District” / capital city — **not Marrakech** in current HTML

## Page structure

### Homepage (`index.html`)

Long-scroll cinematic landing with pinned/sticky sections:

| Section ID / class | Theme | Purpose |
|--------------------|-------|---------|
| `l-gallery-sticky` | `ui-dark` | Hero image gallery + headline “Splendor of Renewal” |
| `about` / `l-intro` | light → dark | Brand introduction, “Open the doors of OffMarket…” (was: Springs) |
| `wellness` | `ui-dark` | Wellness center, WebGL circle animation |
| `nature` / `place` | mixed | Nature park, location storytelling |
| `l-map-sticky` | — | Map / connectivity |
| `design` | — | WowHouse design narrative |
| `residences` | `ui-dark` | Apartment/residence cards, pricing |
| `interiors` | — | Interior design showcase |
| Footer | `ui-dark` | Logo, legal, Vide Infra credit |

### Subpages (standalone HTML)

| Path | Title |
|------|-------|
| `/about/` | OffMarket \| About (was: Springs \| About) |
| `/gallery/` | OffMarket \| Photos |
| `/location/` | OffMarket \| Location |
| `/infrastructure/` | OffMarket \| Infrastructure and amenities |
| `/flats` | Residences (referenced, may be external/API-driven) |

### Global chrome

- Sticky header (`ui-dark` on landing)
- Full-screen modal menu (`#menu`) with image crossfade per nav item
- Callback modal (`#callback-modal`) — Russian label “Заказать звонок”
- Favorites modal, subscribe modals, cookie consent
- Barba.js page transitions (`data-barba="wrapper"`)

## Visual direction (current)

- **Palette:** Warm beige page background + deep forest green dark sections
- **Typography:** Victor Serif (display) + TT Commons Pro (UI/body)
- **Motion:** Locomotive Scroll–style `data-scroll` pinning, preloader, horizontal hero gallery, WebGL wellness/nature scenes
- **Imagery:** Full-bleed photography, responsive WebP srcsets, menu preview images
- **UI pattern:** `ui-dark` / `ui-light` theme classes swap text/background tokens per section

## Technical serving

```bash
cd offmarket-website
python3 -m http.server 8767
# Open http://localhost:8767/
```

Must be served over HTTP (not `file://`). See root `DEPLOYMENT.md`.
