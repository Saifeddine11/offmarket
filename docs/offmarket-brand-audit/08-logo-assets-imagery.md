# 08 — Logo, Assets & Imagery

## Logos

| Asset | Path | Brand |
|-------|------|-------|
| Header left mark | `assets/images/icons.svg#logo-left` | OffMarket (SVG artwork may still show previous Springs wordmark) |
| Header right mark | `assets/images/icons.svg#logo-right` | OffMarket (SVG artwork may still show previous Springs wordmark) |
| Mobile logo | `assets/images/icons.svg#logo-mobile` | OffMarket (SVG artwork may still show previous Springs wordmark) |
| Footer wordmark | `assets/images/media/logo-footer.svg` | OffMarket (SVG artwork may still show previous Springs wordmark) |
| Vide Infra credit | `icons.svg#vig-logo` | Agency |

**Logo status (post-cleanup):** All visible logo slots use **OffMarket** text (`offmarket-logo` CSS). Unused legacy files: `assets/images/media/logo-footer.svg`, Springs symbols in `assets/images/icons.svg` (`#logo-left`, `#logo-right`, `#logo-mobile`).

---

## Favicons & PWA

| Asset | Path |
|-------|------|
| `favicon.ico` | Root |
| `favicon-light.png` | Root |
| Manifest icons | `assets/manifest/favicon-*.png` |
| Apple touch icon | `assets/manifest/apple-touch-icon.png` |
| Safari pinned tab | `assets/manifest/safari-pinned-tab.svg` |
| OG image | `assets/manifest/og.jpg` |
| Web manifest | `assets/manifest/manifest.webmanifest` |

`theme-color`: `#162D24` (Springs dark green) in HTML.

---

## Image folder structure

```
assets/images/
├── icons.svg              # UI + logo sprite
├── media/
│   ├── logo-footer.svg
│   ├── menu/              # Menu bg + preview images (webp @md/xxl/xxxl)
│   ├── location/          # SVG titles for location page
│   ├── infrastructure/
│   └── about/
media/cache/               # Symfony-style responsive image cache (slider)
```

Homepage hero/gallery images load from `/assets/images/media/` and `/media/cache/` with responsive `<picture>` srcsets.

---

## Hero / video

- Homepage hero: **horizontal gallery** of stills (not single video on main export)
- `data-plugin="gallery"` drives auto-scroll collage
- Subpages may include video embeds (lazy `iframe[loading]`)

---

## Menu imagery

| Pattern | Example |
|---------|---------|
| Menu panel background | `/assets/images/media/menu/bg-desktop-2@{md,xxl,xxxl}.webp` |
| Per-nav preview | `/assets/images/media/menu/menu-{1..6}@{md,xxl,xxxl}.webp` |

Mapped to: Residences, Design, Location, Amenities, Gallery, About.

---

## WebGL assets

| Script | Purpose |
|--------|---------|
| `assets/javascripts/webgl-wellness.js` | Wellness section circle |
| `assets/javascripts/webgl-nature.js` | Nature section atmosphere |
| `assets/webgl/` | Supporting textures/shaders (if present) |

**Color migration risk:** WebGL shaders may hardcode green/beige tints — audit separately before migration.

---

## Fonts

| File area | Fonts |
|-----------|-------|
| `assets/fonts/` | TT Commons Pro, Victor Serif (self-hosted) |

---

## Springs / template-specific assets

These belong to the **Springs Estate** template and will likely need replacement for OffMarket Marrakech:

- All Springs logo SVGs
- Wellness / nature photography (generic luxury wellness)
- Location/infrastructure copy illustrations
- `og.jpg` social preview
- Menu preview photos tied to Springs sections

---

## Mavericks assets (reference — not on main site)

```
mavericks/public/
├── images/          # Hero, real estate placeholders
├── videos/          # hero-placeholder.mp4, posters
├── logos/           # mavericks-outline.svg, mavericks-mask.svg
└── favicon.svg
```

Use Mavericks assets only when product/copy migration begins — **not** for color-only phase.

---

## Duplicate asset trees

| Path | Note |
|------|------|
| `mavericks/library design/` | Mirror of static Springs export — avoid editing |
| `assets/assets/stylesheets/` | Nested duplicate — verify which is served |

**Served paths** (from HTML): `/assets/stylesheets/global.css`, `/assets/javascripts/landing.js`.

---

## Naming conventions

- Responsive images: `@{md,xxl,xxxl}.webp`
- Cache busting: `?v=1765268659` query param on static assets
- SVG sprite fragments: `#icon-name` in `icons.svg`
