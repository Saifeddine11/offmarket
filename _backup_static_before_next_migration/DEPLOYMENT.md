# OffMarket — Homepage Deployment Guide

**Status:** Production-ready homepage (verified against Chrome HAR capture)  
**Deploy folder:** Upload the entire contents of this directory to your static host root.

---

## What to upload

```
rebuild-production/
├── index.html          # Homepage
├── assets/             # CSS, JS, fonts, images, WebGL textures, manifest
├── media/              # Symfony-style image cache (slider variants)
├── favicon.ico
├── favicon-light.png
└── DEPLOYMENT.md       # This file (optional on server)
```

**Do not upload:** `_raw-source/`, HAR files, audit scripts, or development-only folders from `rebuild/`.

---

## Run locally (pre-deploy test)

```bash
cd ~/path/to/offmarket-website
python3 -m http.server 8766
```

Open **http://localhost:8766/** — must use HTTP server, not `file://`.

Hard refresh: `Cmd + Shift + R`. Test in incognito to avoid extension interference.

---

## Recommended hosting

| Platform | Notes |
|----------|-------|
| **Cloudflare Pages** | Drop folder, custom domain `offmarket.ma` (previous template domain: `springs.estate`), disable/minimize Workers cache on first deploy |
| **Vercel** | Static deploy, preserve `/assets/` and `/media/` paths |
| **Netlify** | Same as Vercel; add `_redirects` only if you need SPA fallback (not required for homepage-only) |
| **AWS S3 + CloudFront** | Upload with `index.html` as default root object |
| **nginx** | `root` pointing to this folder; no rewrite needed |

### Required path preservation

These URL prefixes **must** resolve at the domain root:

- `/assets/*`
- `/media/cache/*`
- `/favicon.ico`, `/favicon-light.png`

Example nginx:

```nginx
server {
    listen 443 ssl;
    server_name offmarket.ma;
    root /var/www/offmarket-production;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Forms / backend limitation

The callback modal (`#callback-modal`) POSTs to production API endpoints with reCAPTCHA validation. **Forms will not submit** from static-only hosting unless you:

1. Restore the original backend `/api/` routes on the same domain, or
2. Proxy form submissions to your API, or
3. Replace the form handler with a third-party service (Formspree, etc.)

The form UI and modal animations work locally; only submission requires backend.

---

## External dependencies (network required)

| Dependency | Purpose |
|------------|---------|
| **Vimeo** (`player.vimeo.com`) | Background videos in Wellness, Nature, Place, Design sections |
| **reCAPTCHA** (lazy-loaded) | Form submission only |

All OffMarket site images, fonts, CSS, and JS are self-contained in this folder.

---

## Cache notes

- **Do not deploy the old Workbox service worker** (`sw.js`) unless you intentionally reconfigure cache names. The homepage includes a script that unregisters existing service workers on load (safe for migration).
- CSS/JS use `?v=1765268659` query strings — bump these if you update assets to bust CDN cache.
- `/media/cache/` paths are content-hashed by Symfony cache names; replace entire `media/` tree when slider images change.

---

## Rollback

1. Keep a copy of the previous production folder or git tag before upload.
2. Re-upload the previous `index.html` + `assets/` + `media/` snapshot.
3. Purge CDN cache (Cloudflare: Caching → Purge Everything).
4. If service worker was active, unregister via DevTools → Application → Service Workers, or redeploy without `sw.js`.

---

## Verification checklist (post-deploy)

- [ ] Homepage loads without console errors (except form/API if no backend)
- [ ] Preloader runs on first visit (~5 s)
- [ ] Scroll animations, pinned gallery, WebGL sections work
- [ ] Menu opens/closes
- [ ] Slider sections show images (Wellness, Nature, Residences, Interiors)
- [ ] Mobile: 390px, 768px, 1440px — no horizontal overflow
- [ ] Vimeo videos play (requires network)
- [ ] Hard refresh + incognito both work

---

## File counts (this build)

- **371 files**, ~56 MB
- Verified: 335 local asset references, 0 missing (2026-06-22)

Built from verified Chrome HAR capture + programmatic archive.
