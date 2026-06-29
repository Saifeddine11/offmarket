# 03 — Current Color System (Main Website)

**Source files audited:**

- `index.html` (inline critical CSS)
- `assets/stylesheets/global.css` (primary token system)
- `assets/stylesheets/landing.css` (homepage-specific)
- `assets/stylesheets/about.css`, `gallery.css`, `location.css`, `infrastructure.css` (subpages)
- Theme classes: `ui-dark`, `ui-light`, `ui-background`, `ui-dark-background`, `ui-light-background`

**No Tailwind** on the main static site. **No CSS variables file** separate from `global.css`.

---

## Core palette (`--c-*` primitives)

Defined in `assets/stylesheets/global.css`:

| Token | Hex | RGB | Semantic role |
|-------|-----|-----|---------------|
| `--c-beige-background` | `#F5E8D1` | 245, 232, 209 | **Dominant page background** (light sections) |
| `--c-beige` | `#E0D1B6` | 224, 209, 182 | Warm beige text on dark / secondary |
| `--c-dark-green` | `#162D24` | 22, 45, 36 | **Primary dark surface** (`ui-dark` background) |
| `--c-green` | `#1B4732` | 27, 71, 50 | Button hover, secondary accent |
| `--c-light-green` | `#A7B431` | 167, 180, 49 | Accent highlight |
| `--c-olive` | `#758535` | 117, 133, 53 | Olive accent |
| `--c-dark-blue` | `#101E27` | 16, 30, 39 | Deep blue (rare) |
| `--c-blue` | `#005160` | 0, 81, 96 | Teal-blue accent |
| `--c-light-blue` | `#67BFDA` | 103, 191, 218 | Light blue accent |
| `--c-sky` | `#BEE5EE` | 190, 229, 238 | Sky tint |
| `--c-black` | `#030303` | 3, 3, 3 | Near-black |
| `--c-white` | `#FFFFFF` | 255, 255, 255 | White |
| `--c-error` | `#E1C35B` | 225, 195, 91 | Error / warning gold |

### Landing-only (`landing.css`)

| Hex | Likely use |
|-----|------------|
| `#274C19` | Deep green gradient / map |
| `#583E23` | Brown earth tone |
| `#A69C8C` | Warm grey-brown |

---

## Theme system (`ui-dark` vs `ui-light`)

The site does **not** use fixed colors per component. It swaps **semantic tokens** (`--t-*`) based on section class.

### `ui-light` (default / light sections)

| Token | Resolves to | Usage |
|-------|-------------|-------|
| `--t-background` | `--c-beige-background` (#F5E8D1) | Section/page background |
| `--t-heading` | `--c-dark-green` (#162D24) | Headlines |
| `--t-text` | `--c-dark-green` | Body text |
| `--t-primary` | `--c-dark-green` | Links, emphasis |
| `--t-secondary` | `--c-green` (#1B4732) | Secondary accents |
| `--t-line` | `rgba(beige-rgb, 0.2)` | Dividers |
| `--t-small` | `rgba(dark-green-rgb, 0.4)` | Small / muted text |

### `ui-dark` (immersive dark sections)

| Token | Resolves to | Usage |
|-------|-------------|-------|
| `--t-background` | `--c-dark-green` (#162D24) | Dark section background |
| `--t-heading` | `--c-beige` (#E0D1B6) | Headlines on dark |
| `--t-text` | `--c-beige` | Body on dark |
| `--t-primary` | `--c-beige-background` (#F5E8D1) | Primary on dark |
| `--t-secondary` | `--c-beige` | Secondary on dark |
| `--t-line` | `rgba(dark-green-rgb, 0.2)` | Dividers on dark |
| `--t-small` | `rgba(beige-background-rgb, 0.5)` | Muted on dark |

### Background helpers

| Class | Effect |
|-------|--------|
| `.ui-background` | `background: var(--t-background)` |
| `.ui-dark-background` | Forces dark green background context |
| `.ui-light-background` | Forces `#F5E8D1` beige background |

---

## Inline / HTML hardcoded colors

| Location | Value | Usage |
|----------|-------|-------|
| `index.html` `<style>` | `#F5E8D1` | Critical FOUC prevention: body, links |
| `index.html` `theme-color` | `#162D24` | Mobile browser chrome |
| `index.html` mask-icon | `#ffffff` | Safari pinned tab |

---

## Button colors

Buttons use `--t-button-*` tokens derived from heading/background:

| Variant | Background | Border | Text | Hover |
|---------|------------|--------|------|-------|
| `btn--primary` | `--t-primary` | — | `--t-background` or `--t-button-text` (beige) | `--t-heading` / `--t-secondary` |
| `btn--outline` | transparent | `--t-heading` | `--t-heading` | Gradient: `--c-button-hover-gradient-light` (green) or `-dark` (beige tint) |
| `btn--link` | transparent | underline | `--t-text` / `--t-heading` | `--t-heading` |
| `btn--tab` | transparent | `--t-line` | `--t-heading` | gradient dark hover |

**Button hover gradients (hardcoded):**

- Light: `linear-gradient(..., #1B4732 308.4%)` — green wash
- Dark: `linear-gradient(..., hsla(39,40%,80%,.15) 90.77%)` — warm beige wash

---

## Overlay & gradient colors

| Element | Colors | File |
|---------|--------|------|
| `l-gallery__gradient` | Multi-layer div gradients (green/beige) | `landing.css` / HTML structure |
| `footer__gradient` | `.g3`, `.interactive` blur orbs | Footer section |
| `preloader__gradient` | Animated gradient layers | Preloader |
| `modal__background` | Dark overlay on modals | `global.css` |
| Menu modal | `ui-dark` + menu bg image | `#menu` |

---

## Footer colors

- Section: `ui-dark ui-background` → **#162D24** background
- Text: `text-color-small` → muted beige via `--t-small`
- Links: `btn--link` on dark theme
- Gradient decoration: `footer__gradient` (green/warm orbs)

---

## Mobile menu colors

- Modal: `modal--full modal--split-animate--reverse ui-dark`
- Background: dark green + full-bleed menu photography (`/assets/images/media/menu/`)
- Links: beige heading color on dark
- Close control: `icon-close-large`, inherits `--t-heading`
- Header clone inside menu: same `ui-dark` tokens

---

## Text hierarchy (color)

| Class | Color source |
|-------|----------------|
| `h0`, `h1`, `h2`, `g1` | `--t-heading` |
| `text-t1` | Primary intro text |
| `text-c2`, `text-c2-small` | Small caps / legal |
| `text-color-small` | Muted (`--t-small`) |
| `leading-trim` | Typographic trim (no color) |

---

## Section → theme map (homepage)

| Section | Theme class |
|---------|-------------|
| Hero gallery | `ui-dark ui-background` |
| Intro (desktop) | `ui-background` → switches `ui-dark` via `data-themed-class` |
| Wellness | `ui-dark` |
| Nature / place | `ui-dark` on mobile blocks |
| Footer | `ui-dark ui-background` |
| Page wrapper | `ui-light-background` on `page-content-wrapper` |

---

## Other hex found (normalize / legacy)

`#000`, `#333`, `#666`, `#FF0`, `#CE0000`, `#BC9400`, `#FCB467` — mostly normalize.css defaults, error states, or rare utilities. Not part of brand palette.

---

## Centralization assessment

| Layer | Centralized? | Notes |
|-------|--------------|-------|
| Primitives `--c-*` | Yes | Single block in `global.css` |
| Semantic `--t-*` | Yes | Per `ui-dark` / `ui-light` |
| Component colors | Mostly via tokens | Some gradients hardcoded |
| Subpage CSS | Partial | Each page adds stylesheet |
| HTML inline | Minimal | FOUC + theme-color only |

**Future migration target:** Replace `--c-*` primitives (or add parallel OffMarket tokens) rather than editing hundreds of component rules.
