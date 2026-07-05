# OffMarket Homepage — Archived Sections

This folder stores backups of homepage sections removed from the live `index.html` during the 2026 hero refactor. Nothing was permanently deleted — sections are **commented out** in the live page and full markup is preserved here.

## What was archived

| Section | Original lines (approx.) | Status in live page | Animation hooks | Dependencies |
|---------|--------------------------|---------------------|-----------------|--------------|
| Old gallery collage hero | 731–2210 | **Replaced** with video hero | `data-plugin="gallery"`, `data-reveal="gallery"`, `#l-gallery-sticky` | `landing.js`, `gallery.js`, `landing.css` |
| `l-map` (desktop + mobile) | 5050–5249 | Commented out | `data-plugin="reveal"`, parallax | `landing.css`, scroll sticky |
| `l-design` slides (desktop + mobile) | 5250–5859 | Commented out | `data-plugin="reveal"`, parallax, carousel | `landing.css`, `contentAnimation` |
| `l-residences` (desktop + mobile) | 5860–6747 | Commented out | `data-plugin="reveal"`, WebGL residences | `landing.css`, residences WebGL bundle |
| `l-interiors` (desktop + mobile) | 6748–7473 | Commented out | `data-plugin="reveal"`, `contentAnimation` | `landing.css`, `gallery.js` patterns |

## Snippet files

- `snippets/old-gallery-hero.html` — previous collage hero markup
- `snippets/homepage-tail-sections.html` — map, design, residences, interiors block

## Sections kept active (and why)

| Section | Reason |
|---------|--------|
| `l-gallery-container` / `#l-gallery-sticky` | Required shell for hero → intro scroll transition; referenced by `landing.js` |
| `l-intro` (desktop + mobile) | Direct sticky successor to hero; anchor targets `#l-intro`, `#l-intro-mobile` |
| `l-wellness` | WebGL `webglWellness` plugin; sticky chain |
| `l-nature` | WebGL `webglNature` plugin; sticky chain |
| `l-place` | Video + WebGL tree; sticky chain through territories narrative |
| Mavericks chrome (`#mv-chrome`) | Primary navigation — separate from hero shell |
| Arc reveal preloader | Session intro overlay |

## Restore procedure

1. Open `index.html`
2. Find `<!-- ARCHIVED SECTION START` / `END` markers
3. Uncomment the desired block **or** paste from `snippets/`
4. Reconnect sticky classes (`sticky--under-previous` / `sticky--under-next`) on adjacent sections if needed
5. Hard-refresh and test scroll + WebGL sections

## Notes

- Global CSS/JS bundles were **not** moved — only section HTML archived.
- Commenting tail sections does not affect hero → intro → wellness → nature → place transitions.
- Old hero gallery plugin (`data-plugin="gallery"`) was removed with the collage; sticky/reveal shell preserved on `#l-gallery-sticky`.
