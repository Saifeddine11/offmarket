# Homepage section map

```
index.html (main)
│
├── [body] data-barba="wrapper"
│   ├── #offmarket-arc-reveal          ACTIVE — session intro
│   ├── .preloader--landing            ACTIVE (hidden during arc reveal)
│   ├── #mv-chrome                     ACTIVE — glass/floating nav
│   │
│   └── [data-barba=container]
│       ├── .js-header (legacy)        HIDDEN — CSS
│       └── main#top
│           └── section[data-scroll-section]
│               │
│               ├── #l-gallery-sticky    ACTIVE — VIDEO HERO SHELL
│               │   └── .om-hero-video   NEW visual layer
│               │
│               ├── #about (l-intro)     ACTIVE — sticky successor
│               ├── #about-mobile        ACTIVE
│               ├── #wellness            ACTIVE — webglWellness
│               ├── #wellness-mobile     ACTIVE
│               ├── #nature              ACTIVE — webglNature
│               ├── #nature-mobile       ACTIVE
│               ├── #l-place-content     ACTIVE
│               ├── #l-place-sticky-*    ACTIVE
│               ├── #l-place-sticky-mobile-* ACTIVE
│               │
│               ├── [ARCHIVED] #l-map-sticky
│               ├── [ARCHIVED] #design
│               ├── [ARCHIVED] #l-residences-sticky-*
│               └── [ARCHIVED] #interiors
│
└── footer#contact                     ACTIVE
```

## Sticky chain (active)

```
#l-gallery-sticky  (sticky--under-next)
    ↓
#about / #about-mobile  (sticky--under-previous + under-next)
    ↓
#wellness / #wellness-mobile
    ↓
#nature / #nature-mobile
    ↓
#l-place-* 
    ↓
[archived sections removed from chain]
    ↓
footer
```

## Script dependencies on hero

| Script | Selector / hook | Action taken |
|--------|---------------|--------------|
| `landing.js` | `.l-gallery-container [data-reveal]` | Preserved `l-gallery-container` + `data-reveal` attrs |
| `shared.js` | `gallery` plugin | Removed inner `data-plugin="gallery"` with collage |
| `arc-reveal-hero.js` | preloader coordination | Unchanged |
| `mavericks-chrome.js` | `#mv-chrome`, preloader watch | Unchanged |

## Media

| Asset | Use |
|-------|-----|
| `/assets/mavericks/hero/mavericks-hero-offmarket-hero-video2.mp4` | Hero background video |
| `/assets/mavericks/hero/mavericks-hero-poster.jpg` | Video poster |
