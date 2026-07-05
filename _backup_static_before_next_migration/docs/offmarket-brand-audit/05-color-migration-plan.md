# 05 — Color Migration Plan (Future — Not Implemented)

This document plans the application of Mavericks colors to the main static site. **Color migration was implemented** after this audit. Brand copy was later renamed from Springs to OffMarket.

---

## Migration strategy (recommended order)

1. **Add OffMarket token layer** — new `--om-*` or remap `--c-*` in `global.css` without touching layout selectors.
2. **Swap primitives** — map green/beige system to Mavericks reds/stone/champagne.
3. **Update `ui-dark` / `ui-light` semantic tokens** — largest visual impact, fewest HTML edits.
4. **Replace hardcoded gradients** in `landing.css` and footer/preloader.
5. **Update `theme-color` and FOUC inline styles** in all HTML pages.
6. **Replace menu photography overlays** (tint only — keep images until copy rebrand).
7. **Verify contrast** on buttons, legal text, form modals.
8. **Do not touch** `data-plugin`, GSAP/scroll attributes, or HTML structure.

---

## Master mapping table

| Current Off-Market Color | Current Usage | Mavericks Replacement | Semantic Role | Risk | Files / areas |
|--------------------------|---------------|----------------------|---------------|------|----------------|
| `#F5E8D1` `--c-beige-background` | Light page bg, `ui-light-background`, FOUC body | `#F1EBEB` Stone | `--color-bg-secondary` | **Low** | `global.css`, `index.html` inline, all pages |
| `#E0D1B6` `--c-beige` | Text on dark, button text | `#F1EBEB` Stone | `--color-text-primary` (on dark) | **Low** | `global.css` `--t-*` on `ui-dark` |
| `#162D24` `--c-dark-green` | Dark sections, footer, `ui-dark` bg, theme-color | `#270707` Dark Red | `--color-bg-primary` | **Medium** | `global.css`, all `ui-dark` sections, manifest |
| `#1B4732` `--c-green` | Secondary, button hover gradient | `#660810` Deep Red | Accent depth | **Medium** | Button hover gradients, `--t-secondary` light theme |
| `#A7B431` `--c-light-green` | Accent highlights | `#B88A5A` Champagne | Primary accent | **Medium** | Rare highlights, check WebGL tints |
| `#758535` `--c-olive` | Olive accent | `#C49A6C` Champagne Light | Warm accent | **Low** | Sparse |
| `#101E27` / `#005160` blues | Minor accents | `#2E3430` Graphite or drop | De-emphasize cool tones | **Low** | Search usage before replace |
| `#E1C35B` `--c-error` | Error state | `#C49A6C` Champagne Light | Warning (keep visible) | **Medium** | Form validation |
| `rgba(22,45,36,0.2)` lines | Dividers on dark | `rgba(241,235,235,0.14)` | `--color-border-soft` | **Low** | `--t-line` tokens |
| `rgba(22,45,36,0.55)` image scrims | Card/location overlays | `rgba(39,7,7,0.55)` | Image overlay | **Medium** | Section-specific gradients |
| Button hover green gradient | Outline button hover | Champagne tint or `rgba(184,138,90,0.15)` | CTA hover | **High** | `--c-button-hover-gradient-light` |
| Menu modal `ui-dark` bg | Full-screen nav | Dark red glass `rgba(39,7,7,0.56)` | Menu panel | **Medium** | Modal + menu CSS |
| Footer gradient orbs | Decorative | Deep red + champagne radials | Premium fade | **Low** | `footer__gradient` |
| `#274C19`, `#583E23`, `#A69C8C` | Landing map/earth | `#270707`, `#660810`, `#D6C0B1` | Map palette | **Medium** | `landing.css` |
| Black `rgba(0,0,0,*)` modal overlays | Modal backdrop | `rgba(39,7,7,0.35–0.55)` | Overlay backdrop | **Low** | Modal styles |

---

## Semantic token proposal (post-migration)

| Semantic | Mavericks value |
|----------|-----------------|
| `--color-bg-primary` | #270707 |
| `--color-bg-secondary` | #F1EBEB |
| `--color-text-primary` | #F1EBEB (on dark) / #270707 (on light) |
| `--color-text-muted` | #D6C0B1 |
| `--color-accent` | #B88A5A |
| `--color-accent-light` | #C49A6C |
| `--color-graphite` | #2E3430 |
| `--color-glass-dark` | rgba(39,7,7,0.56) |
| `--color-overlay-dark` | rgba(39,7,7,0.45) |

Map these onto existing `--t-*` assignments inside `.ui-dark` and `.ui-light` blocks.

---

## Readability notes

| Pairing | Concern | Mitigation |
|---------|---------|------------|
| Champagne button + dark red text | Mavericks standard | Use for primary CTAs only |
| Stone text on dark red | Good contrast | Default for `ui-dark` body |
| Grey orange muted | May be faint on deep red | Keep ≥ 72% opacity for small text |
| Graphite on stone | Good for light sections | Use for `ui-light` body |
| Green → red shift on photography | Existing photos have green grade | Color migration only — image regrade is separate project |

---

## Components affected (by area)

| Area | Primary files |
|------|----------------|
| Global theme | `assets/stylesheets/global.css` |
| Homepage sections | `assets/stylesheets/landing.css`, `index.html` theme classes |
| Subpages | `about.css`, `gallery.css`, `location.css`, `infrastructure.css` |
| Header / menu | `global.css`, menu modal in `index.html` |
| Footer | `index.html` footer block, `global.css` |
| Forms / modals | `global.css`, modal `ui-dark` classes |
| PWA manifest | `assets/manifest/manifest.webmanifest`, `theme-color` meta |
| WebGL | `webgl-wellness.js`, `webgl-nature.js` — **tint uniforms may need audit** |

---

## Out of scope for color-only migration

- Logo SVG colors (Springs wordmark shape)
- Photography color grading
- Copy / Springs → OffMarket text
- `mavericks/` React app (already on Mavericks palette)
- Backend form endpoints

---

## Risk summary

| Level | Count | Examples |
|-------|-------|----------|
| Low | 6 | Background swaps, theme-color, divider tokens |
| Medium | 7 | Button hovers, scrims, landing map, menu glass |
| High | 1 | Button hover gradient behavior (must preserve interaction, only recolor) |
