# Removed homepage sections — after hero cleanup

Date: 2026-06-24
Source: `index.html` lines 807–6086
Full markup: `removed-after-hero-2026-06-23.html`

Reason: Removed from live homepage — sections not approved / broken / experimental.

## Sections removed (in order)

1. **Territories (`#territories`, `.om-territories`)** — Mavericks gallery port; experimental, not approved for live MVP.
2. **About / Intro (`#about`, `#about-mobile`, `#l-intro`)** — Imported template intro with broken typography (`&rsquo;` entities).
3. **Wellness (`#wellness`, `#wellness-mobile`, `.l-wellness`)** — WebGL wellness block; wrong imported section.
4. **Nature / Place (`#nature`, `#place`, `.l-nature`, `.l-place-*`)** — Green Place section visible in screenshots; experimental.
5. **Map (`#l-map-sticky`, `#l-map-sticky-2`, `.l-map`)** — Wrong map/light card block with vintage map illustration.
6. **Design (`#design`, `#design-mobile`, `.l-design__slide`)** — Imported selection/design slides; broken typography.
7. **Residences (`#l-residences-sticky-*`, `#residences`)** — Wrong card/residence picker section.
8. **Interiors (`#interiors`, `#interiors-2`, `.l-interiors`)** — Imported interiors carousel; English leftover copy.

## Approved sections kept on homepage

- Header / menu (`#mv-chrome`, Mavericks chrome)
- Hero (`#l-gallery-sticky`, `.om-hero-video`)
- Footer (`#contact`, `.om-footer`)

## CSS disconnected from `index.html`

- `assets/stylesheets/om-territories.css` (files kept on disk)

## JS disconnected from `index.html`

- `assets/javascripts/om-territories.js` (file kept on disk)

## Related assets (not deleted)

- `assets/stylesheets/om-territories.css`
- `assets/javascripts/om-territories.js`
- `assets/mavericks/territories/investment/*`
- WebGL scripts loaded via `landing.js` / `shared.js` for removed sections (shared bundles unchanged)

## Restore

To restore any section, copy the relevant block from `removed-after-hero-2026-06-23.html` back into `index.html` after the hero `</section>` and reconnect CSS/JS as needed.
