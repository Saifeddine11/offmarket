# Archived old homepage hero

## Original location

- `index.html` — homepage hero section
  - `<head>`: arc-reveal pending inline script
  - `<head>`: CSS links `arc-reveal-hero.css`, `om-hero-video.css`
  - `<body>` start: `#offmarket-arc-reveal` arc intro overlay
  - `<main>`: first `<section>` with `#l-gallery-sticky` / `.om-hero-video`
  - Footer scripts: `arc-reveal-hero.js` (after `gsap.min.js`)

## Archived on

2026-06-26

## Files/code archived

| File | Description |
|------|-------------|
| `hero.html` | Full hero markup (arc reveal + video hero section) |
| `hero.css` | Concatenation of `arc-reveal-hero.css` + `om-hero-video.css` |
| `hero.js` | Copy of `arc-reveal-hero.js` |
| `arc-reveal-hero.css` | Original arc reveal stylesheet (source copy) |
| `om-hero-video.css` | Original video hero stylesheet (source copy) |
| `arc-reveal-hero.js` | Original arc reveal script (source copy) |

### Shared styles (not moved — still in repo)

Hero button overrides live in `assets/stylesheets/om-buttons.css` (`.om-hero-video__btn*`, `.om-hero-video .om-cta`, etc.). Restore hero with `om-buttons.css` already linked globally.

Typography notes for hero live in `assets/stylesheets/om-typography.css` (comments only; hero title/subtitle rules are in `om-hero-video.css`).

## Assets used (not deleted from `/assets/`)

### Video / image

- `/assets/mavericks/hero/mavericks-hero-offmarket-hero-video2.mp4`
- `/assets/mavericks/hero/mavericks-hero-poster.jpg`

### Icons / SVG

- `/assets/images/icons.svg` — `#arrow-down` (scroll chevron)

### Fonts

- Inherited from global site tokens (`om-typography.css`, `--font-main`, serif stack for title line)

### Scripts (dependencies)

- `/assets/javascripts/gsap.min.js` — arc reveal word animation (optional fallback without GSAP)
- `/assets/javascripts/arc-reveal-hero.js` — archived as `hero.js`

## Restore instructions

1. Copy contents of `hero.html` back into `index.html`:
   - Inline `<script>` block into `<head>` (before body)
   - Arc reveal `<div>` after `<body>` opening (before preloader)
   - Hero `<section>` as first section inside `<main id="top">`
2. Re-add in `<head>`:
   ```html
   <link rel="stylesheet" href="/assets/stylesheets/arc-reveal-hero.css?v=...">
   <link rel="stylesheet" href="/assets/stylesheets/om-hero-video.css?v=...">
   ```
3. Re-add before `mavericks-chrome.js`:
   ```html
   <script src="/assets/javascripts/arc-reveal-hero.js?v=..."></script>
   ```
   Ensure `gsap.min.js` loads before `arc-reveal-hero.js`.
4. Verify desktop and mobile: arc intro, video autoplay, CTAs, scroll chevron, navbar visibility after intro.

## Live removal (2026-06-26)

Removed from homepage only. Source files remain in `assets/stylesheets/` and `assets/javascripts/` for easy restore.
