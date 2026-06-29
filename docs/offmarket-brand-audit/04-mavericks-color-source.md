# 04 — Mavericks Color Source (OffMarket/Mavericks)

**Path:** `/offmarket-website/mavericks/`  
**Role:** Brand and color **source of truth** for future migration. **Not applied** to main site in this audit step.

---

## Verified core palette

| Token | Hex | Verified in |
|-------|-----|-------------|
| Dark Red | `#270707` | `src/config/brand.js`, `src/styles/colors.css`, `index.css`, `index.html` theme-color |
| Deep Red | `#660810` | `brand.js`, `colors.css`, ObsidianExplorePlaces, hero gradients |
| Stone | `#F1EBEB` | `brand.js`, `colors.css`, Tailwind `stone-brand` |
| Grey Orange | `#D6C0B1` | `brand.js`, `colors.css`, Tailwind `grey-orange` |
| Champagne | `#B88A5A` | `brand.js`, `colors.css`, CTAs, borders |
| Champagne Light | `#C49A6C` | `brand.js`, `colors.css`, hovers, eyebrows |
| Graphite | `#2E3430` | `brand.js`, `colors.css`, body on light sections |
| White | `#FFFFFF` | `brand.js` |

**Additional alias (muted tertiary):** `#8A7E7A` — Tailwind `stone` / `ink-muted` in `tailwind.config.js` (not core brand hex).

---

## Where colors are defined

| File | Purpose |
|------|---------|
| `src/config/brand.js` | **Canonical JS hex** — imported by Tailwind + `tokens.js` |
| `src/styles/colors.css` | CSS custom properties + semantic aliases |
| `src/styles/tokens.css` | Imports `colors.css`; spacing/shadows |
| `tailwind.config.js` | Tailwind color tokens from `brand.js` |
| `src/index.css` | Global body, menu glass, hero CTAs, pin-spacer |
| `src/styles/tokens.js` | JS motion + color re-exports for animations |
| `docs/BRAND_SYSTEM.md` | Human-readable brand documentation |

### Semantic CSS variables (`colors.css`)

```css
--color-bg-primary: #270707 (dark red)
--color-bg-secondary: #F1EBEB (stone)
--color-text-primary: stone on dark contexts
--color-text-muted: grey orange
--color-accent: champagne
--color-accent-light: champagne light
--color-glass-dark: rgba(39,7,7,0.56)
--color-overlay-backdrop: rgba(39,7,7,0.35)
--color-border-soft: rgba(stone, 0.14)
```

---

## Backgrounds / fonds

| Surface | Implementation |
|---------|----------------|
| Default page (homepage) | `bg-dark-red` on shell + `Home.jsx` wrapper |
| Light interior pages | `bg-stone-brand`, `body.app-light` |
| `html` / safe area | `--color-bg-primary` (#270707) |
| Pin spacers (GSAP) | `var(--color-bg-primary)` — prevents white gaps |
| Hero sections | `#270707` + photographic media + red overlays |
| Obsidian explore section | Dark red surface, champagne radial accents |
| Footer | `bg-dark-red` + gradient fade from transparent |

---

## Gradients

| Location | Description |
|----------|-------------|
| `Footer.jsx` | `transparent → rgba(39,7,7,0.52) → #270707` |
| `LocationsInspiredHero.module.css` | Dark red dim layers, deep-red/champagne/grey-orange radial orbs |
| `ArchitectureSection.jsx` | Radial reading veils `rgba(39,7,7,*)` |
| `index.css` desktop menu panel | `linear-gradient(145deg, deep-red 0.78, dark-red 0.9)` |
| `heroV2.config.js` / scroll hero | Red + stone radial read veils |
| `VideoFallback.jsx` | Champagne → dark red radial |

---

## Overlays

| Type | Typical value |
|------|----------------|
| Hero dim | `rgba(39,7,7,0.35–0.72)` |
| Image scrims | Dark red linear/radial (not pure black) |
| Menu backdrop | `rgba(39,7,7,0.35)` closed / `0.55` open |
| Cinematic chrome header wash | `from-dark-red/50` gradients |

---

## Buttons

| Pattern | Colors |
|---------|--------|
| Primary CTA | `bg-champagne text-dark-red`, hover `champagne-light` |
| Secondary / glass | `border-champagne`, `bg-dark-red/35`, stone text |
| Hero v2 primary | `border-champagne bg-dark-red/35`, hover fill champagne |
| `LuxuryButton` ghost | `border-champagne/60`, hover champagne tint |
| Mobile phone pill | `bg-champagne`, icon `dark-red` |

---

## Glass effects

Defined in `index.css`:

| Class | Background | Border |
|-------|------------|--------|
| `.cinematic-menu-panel` | `rgba(39,7,7,0.56)` + blur | `stone 14%` |
| `.mobile-chrome-pill` | `rgba(39,7,7,0.72)` + blur | soft stone border |
| `.glassCard` (cinematicClasses) | `bg-dark-red/40` | `border-stone-brand/12` |

---

## Text hierarchy

| Role | Token / class |
|------|----------------|
| On dark bg | `text-stone-brand` |
| Muted on dark | `text-grey-orange`, `text-stone-brand/55–90` |
| Eyebrow | `text-champagne`, `text-champagne-light/80` |
| On light bg | `text-dark-red`, `text-graphite` |
| Language switcher active (dark) | `text-champagne` |

---

## Mobile colors

| Element | Treatment |
|---------|-------------|
| `html` background | Dark red (safe-area) |
| Mobile header gradient | `from-dark-red/50` when hero theme light |
| Menu pill | Dark red glass + champagne phone button |
| Open menu panel | Same glass tokens as desktop |
| Footer safe-area | `pb-[env(safe-area-inset-bottom)]` on dark red |

---

## Footer (Mavericks)

- Base: `bg-dark-red text-stone-brand`
- Labels: `text-champagne/80`
- Links hover: `hover:text-champagne`
- Border top: `border-champagne/15`
- Watermark: `text-champagne` at 16% opacity

---

## Obsidian / preview-only colors (not core brand)

Separate experimental palette in preview routes:

- `#151415`, `#f1eade`, `#7b5136` — Obsidian section only; **exclude** from main migration unless explicitly requested.

---

## Tailwind token map

| Utility | Hex |
|---------|-----|
| `dark-red` | #270707 |
| `deep-red` | #660810 |
| `stone-brand` | #F1EBEB |
| `grey-orange` | #D6C0B1 |
| `champagne` | #B88A5A |
| `champagne-light` | #C49A6C |
| `graphite` | #2E3430 |

Legacy aliases: `ivory`→stone, `navy`→dark red, `gold`→champagne, `sand`→grey orange.
