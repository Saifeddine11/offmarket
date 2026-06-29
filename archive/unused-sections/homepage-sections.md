# Homepage sections — archive index

Source file: `index.html`  
Last updated: 2026-06-23

## Visible flow (after cleanup)

1. Arc reveal preloader (overlay)
2. **Video hero** — `#l-gallery-sticky` (new `om-hero-video`)
3. `l-intro` — about / positioning
4. `l-wellness` — WebGL wellness
5. `l-nature` — WebGL territories
6. `l-place` — location / video stickies
7. Mavericks footer

## Archived (commented out)

### Old gallery collage hero
- **Lines:** ~731–2210 (before edit)
- **Snippet:** `snippets/old-gallery-hero.html`
- **Why:** Replaced by full-screen Mavericks video hero
- **Hooks removed:** `data-plugin="gallery"` on inner `.l-gallery`
- **Hooks preserved:** `#l-gallery-sticky`, `data-plugin="reveal"`, `data-reveal="gallery"` on sticky layer

### Map (`l-map`)
- **IDs:** `#l-map-sticky`, `#l-map-sticky-2`
- **Why:** Old template map section; not part of OffMarket MVP homepage narrative

### Design (`l-design`)
- **IDs:** `#design`, `#design-mobile`, `#l-design-sticky-*`
- **Why:** Old interior-design template slides; English leftover copy

### Residences (`l-residences`)
- **IDs:** `#l-residences-sticky-1`, `#l-residences-sticky-2`
- **Why:** Template residence picker; redundant with gallery/off-market positioning

### Interiors (`l-interiors`)
- **IDs:** `#interiors`, `#interiors-2`, `#interiors-mobile`
- **Why:** Template interiors carousel; English leftover copy in captions

## Hidden but kept

| Block | Notes |
|-------|-------|
| `preloader--landing` | Legacy landing preloader; hidden when arc reveal runs |
| `js-preloader` | Global preloader shell (`data-preloader-visible="false"`) |
| Legacy `.header` | Hidden via CSS; Mavericks chrome is active nav |
| Mobile duplicates (`*-mobile`) for intro/wellness/nature/place | Required for responsive scroll/WebGL |

## English leftover inside archived blocks

The archived tail sections contain template English (e.g. Quadro Room studio copy in interiors). Do not restore without French content rewrite.
