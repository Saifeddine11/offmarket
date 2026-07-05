#!/usr/bin/env node
/**
 * Browser-level layout metrics comparison (Next vs backup) at multiple viewports.
 * Usage: node scripts/qa-browser-metrics.mjs [--json]
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const NEXT = "http://localhost:3000";
const BACKUP = "http://localhost:8765";
const WRITE_JSON = process.argv.includes("--json");

/** Injected at runtime by om-featured-projects.js — not in static HTML. */
const JS_INJECTED_ASSET_IMAGES = [
  "/assets/images/properties/villa-sur-plan-marrakech/Oasis-exterieur-face.webp",
  "/assets/images/properties/appartement-sur-plan-gueliz/b666e486-f6f8-4f32-b709-b89099173502.JPG",
  "/assets/mavericks/projects/jemaa-el-fna-restaurant.webp",
  "/assets/mavericks/hero/mavericks-hero-villa.webp",
  "/assets/mavericks/gallery/mavericks-collection-estates.jpg",
];

const ROUTES = [
  "/",
  "/off-market/",
  "/about/",
  "/fr/about/",
  "/privacy-policy/",
  "/contact/",
  "/simulateur/",
  "/fr/",
  "/en/",
  "/it/",
  "/nl/",
  "/fr/contact/",
  "/en/contact/",
  "/it/contatto/",
  "/nl/contact/",
  "/sur-plan/",
  "/fr/sur-plan/",
  "/en/off-plan/",
  "/it/progetti-su-piano/",
  "/nl/nieuwbouw/",
  "/location/",
  "/blog/",
  "/blog/acheter-villa-sur-plan-marrakech/",
  "/blog/investir-immobilier-luxe-marrakech/",
  "/blog/adresses-immobilier-marrakech/",
  "/blog/off-market-marrakech-biens-confidentiels/",
  "/blog/appartement-hypercentre-gueliz-marrakech/",
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

function isHomepageRoute(route) {
  return route === "/" || /^\/(fr|en|it|nl)\/$/.test(route);
}

const BLOG_INDEX_ROUTE = /^\/blog\/$/;

async function waitForBlogIndexReady(page) {
  await page.waitForLoadState("load", { timeout: 120000 }).catch(() => {});

  await page
    .waitForFunction(
      () =>
        document.querySelectorAll(
          '[data-om-blog-root] .om-blog-card img[src*="/assets/"]',
        ).length >= 2,
      { timeout: 20000 },
    )
    .catch(() => {});

  await page.waitForTimeout(2000);
}

async function waitForHomepageReady(page) {
  await page.waitForLoadState("load", { timeout: 60000 }).catch(() => {});

  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );

    for (let y = 0; y <= scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await sleep(180);
    }

    window.scrollTo(0, scrollHeight);
    await sleep(500);
    window.scrollTo(0, 0);
    await sleep(300);
  });

  await page.waitForTimeout(4000);
}

async function preparePage(page, route) {
  if (isHomepageRoute(route)) {
    await waitForHomepageReady(page);
  } else if (BLOG_INDEX_ROUTE.test(route)) {
    await waitForBlogIndexReady(page);
  } else {
    await page.waitForLoadState("load", { timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1200);
  }
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const chrome = document.getElementById("mv-chrome");
    const footer = document.querySelector(".om-footer");
    const h1 = document.querySelector("h1");
    const navTrigger = document.querySelector(
      "[data-om-nav-trigger], .om-nav-menu__trigger, .mv-chrome__menu-button",
    );
    const langDropdown = document.querySelector("[data-language-dropdown]");
    const contactClose = document.querySelector(".om-contact-close");
    const primaryCta = document.querySelector(
      ".om-hero__cta a, .om-contact-tab.is-active, .om-final-cta a",
    );

    const rect = (el) =>
      el
        ? {
            w: Math.round(el.getBoundingClientRect().width),
            h: Math.round(el.getBoundingClientRect().height),
          }
        : null;

    const cs = (el) =>
      el
        ? {
            display: getComputedStyle(el).display,
            color: getComputedStyle(el).color,
            fontSize: getComputedStyle(el).fontSize,
            fontFamily: getComputedStyle(el).fontFamily.split(",")[0],
            bg: getComputedStyle(el).backgroundColor,
          }
        : null;

    const resolveAssetUrl = (img) => {
      const src = img.getAttribute("src") || img.src || "";
      if (src.includes("/assets/")) {
        return src.replace(/^https?:\/\/[^/]+/, "");
      }
      const dataSrc = img.getAttribute("data-src") || "";
      if (dataSrc.includes("/assets/")) {
        return dataSrc;
      }
      return null;
    };

    const assetImgUrls = [
      ...new Set(
        [...document.querySelectorAll("img")]
          .map(resolveAssetUrl)
          .filter(Boolean),
      ),
    ].sort();

    const pendingLazyCount = [...document.querySelectorAll("img[data-src]")].filter(
      (img) => {
        const ds = img.getAttribute("data-src") || "";
        const src = img.getAttribute("src") || "";
        return ds.includes("/assets/") && !src.includes("/assets/");
      },
    ).length;

    return {
      htmlLang: document.documentElement.lang,
      bodyClass: document.body.className,
      chrome: rect(chrome),
      chromeDisplay: chrome ? getComputedStyle(chrome).display : null,
      footer: rect(footer),
      h1: h1 ? h1.innerText.replace(/\s+/g, " ").trim().slice(0, 100) : null,
      h1Style: cs(h1),
      assetImgCount: assetImgUrls.length,
      assetImgUrls,
      pendingLazyCount,
      pictureCount: document.querySelectorAll("picture").length,
      formCount: document.querySelectorAll("form").length,
      navTriggerVisible: navTrigger
        ? getComputedStyle(navTrigger).display !== "none"
        : null,
      langDropdown: !!langDropdown,
      contactCloseHref: contactClose?.getAttribute("href") ?? null,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      hasSimulator: !!document.querySelector("[data-simulator]"),
      hasContactPage: !!document.querySelector(".om-contact-page"),
      primaryCtaDisplay: primaryCta
        ? getComputedStyle(primaryCta).display
        : null,
    };
  });
}

function diffMetrics(next, backup, route, tolerance = 2) {
  const issues = [];
  const isHomepage = isHomepageRoute(route);

  const compareRect = (label, a, b) => {
    if (!a && !b) return;
    if (!a || !b) {
      issues.push(`${label} missing: Next=${!!a} Backup=${!!b}`);
      return;
    }
    if (Math.abs(a.w - b.w) > tolerance || Math.abs(a.h - b.h) > tolerance) {
      issues.push(
        `${label} size: Next=${a.w}x${a.h} Backup=${b.w}x${b.h}`,
      );
    }
  };

  for (const key of [
    "htmlLang",
    "pictureCount",
    "formCount",
    "langDropdown",
    "contactCloseHref",
    "hasSimulator",
    "hasContactPage",
    "navTriggerVisible",
  ]) {
    if (next[key] !== backup[key]) {
      issues.push(`${key}: Next=${next[key]} Backup=${backup[key]}`);
    }
  }

  const filterInjected = (urls) =>
    urls.filter((u) => !JS_INJECTED_ASSET_IMAGES.includes(u));

  const nextCount = filterInjected(next.assetImgUrls).length;
  const backupCount = filterInjected(backup.assetImgUrls).length;

  const countTolerance = isHomepage ? 2 : 0;
  if (Math.abs(nextCount - backupCount) > countTolerance) {
    issues.push(
      `assetImgCount: Next=${next.assetImgCount} (${nextCount} excl. JS-injected) Backup=${backup.assetImgCount} (${backupCount} excl. JS-injected)`,
    );
  }

  const missingAssets = backup.assetImgUrls.filter(
    (u) =>
      !next.assetImgUrls.includes(u) && !JS_INJECTED_ASSET_IMAGES.includes(u),
  );
  const missingTolerance = isHomepage ? 2 : 0;
  if (missingAssets.length > missingTolerance) {
    issues.push(
      `asset images missing in Next (${missingAssets.length}): ${missingAssets.slice(0, 5).join(", ")}`,
    );
  }

  const normH1 = (s) => (s ? s.replace(/\s+/g, " ").trim() : null);
  if (normH1(next.h1) !== normH1(backup.h1)) {
    issues.push(`h1: Next="${next.h1}" Backup="${backup.h1}"`);
  }

  compareRect("chrome", next.chrome, backup.chrome);
  compareRect("footer", next.footer, backup.footer);

  if (!next.hasContactPage && next.bodyClass !== backup.bodyClass) {
    issues.push(`bodyClass: Next="${next.bodyClass}" Backup="${backup.bodyClass}"`);
  }

  if (next.bodyBg !== backup.bodyBg) {
    issues.push(`bodyBg: Next=${next.bodyBg} Backup=${backup.bodyBg}`);
  }

  if (next.h1Style?.fontSize && backup.h1Style?.fontSize) {
    if (next.h1Style.fontSize !== backup.h1Style.fontSize) {
      issues.push(
        `h1 fontSize: Next=${next.h1Style.fontSize} Backup=${backup.h1Style.fontSize}`,
      );
    }
  }

  return issues;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  let failures = 0;

  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.goto(`${NEXT}${route}`, {
        waitUntil: "load",
        timeout: 120000,
      });
      await preparePage(page, route);
      const nextMetrics = await collectMetrics(page);

      await page.goto(`${BACKUP}${route}`, {
        waitUntil: "load",
        timeout: 120000,
      });
      await preparePage(page, route);
      const backupMetrics = await collectMetrics(page);

      const issues = diffMetrics(nextMetrics, backupMetrics, route);
      const pass = issues.length === 0;
      if (!pass) failures++;

      results.push({
        route,
        viewport: vp.name,
        pass,
        issues,
        nextUrl: `${NEXT}${route}`,
        backupUrl: `${BACKUP}${route}`,
        nextMetrics: {
          assetImgCount: nextMetrics.assetImgCount,
          pendingLazyCount: nextMetrics.pendingLazyCount,
        },
        backupMetrics: {
          assetImgCount: backupMetrics.assetImgCount,
          pendingLazyCount: backupMetrics.pendingLazyCount,
        },
        jsInjectedOnlyInBackup: backupMetrics.assetImgUrls.filter(
          (u) =>
            JS_INJECTED_ASSET_IMAGES.includes(u) &&
            !nextMetrics.assetImgUrls.includes(u),
        ),
      });
    }
  }

  await browser.close();

  const passed = results.filter((r) => r.pass).length;
  const summary = {
    passed,
    total: results.length,
    failed: results.filter((r) => !r.pass),
    runAt: new Date().toISOString(),
  };

  console.log(
    `\n=== Browser Metrics QA: ${passed}/${results.length} checks pass ===\n`,
  );

  for (const r of results) {
    if (!r.pass) {
      console.log(`FAIL ${r.route} @ ${r.viewport}`);
      for (const issue of r.issues) console.log(`  - ${issue}`);
    }
  }

  const failedRoutes = [
    ...new Set(results.filter((r) => !r.pass).map((r) => r.route)),
  ];
  if (failedRoutes.length === 0) {
    console.log("All routes pass at desktop, tablet, and mobile.");
  } else {
    console.log(`\nRoutes with issues: ${failedRoutes.join(", ")}`);
  }

  if (WRITE_JSON) {
    const outPath = path.join(
      process.cwd(),
      "scripts",
      "qa-browser-metrics-results.json",
    );
    fs.writeFileSync(outPath, JSON.stringify({ summary, results }, null, 2));
    console.log(`\nWrote ${outPath}`);
  }

  process.exit(failures > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
