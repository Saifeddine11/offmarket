#!/usr/bin/env node
/**
 * Strict visual/structure comparison: Next.js vs backup static.
 * Usage: node scripts/qa-visual-compare.mjs
 */
const NEXT = "http://localhost:3000";
const BACKUP = "http://localhost:8765";

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

function extract(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "";
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "";
  const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1] ?? "";
  const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i)?.[1] ?? "";
  const ogLocale = html.match(/<meta\s+property="og:locale"\s+content="([^"]*)"/i)?.[1] ?? "";
  const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)?.[1] ?? "";
  const ogType = html.match(/<meta\s+property="og:type"\s+content="([^"]*)"/i)?.[1] ?? "";
  const twitterCard = html.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"/i)?.[1] ?? "";
  const hasJsonLd = /type\s*=\s*["']application\/ld\+json["']/i.test(html);
  const htmlLang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1] ?? "";
  const stylesheets = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi)].map((m) => m[1]);
  const legacyScripts = [
    ...html.matchAll(/<script[^>]+src="([^"]+)"/gi),
  ]
    .map((m) => m[1])
    .filter((s) => s.includes("/assets/"));
  const loaderScripts = [
    ...html.matchAll(/s\.src="(\/assets\/javascripts\/[^"]+)"/g),
  ].map((m) => m[1]);
  const allLegacyScripts = [...new Set([...legacyScripts, ...loaderScripts])];
  const imgCount = (html.match(/<img\b/gi) ?? []).length;
  const pictureCount = (html.match(/<picture\b/gi) ?? []).length;
  const formCount = (html.match(/<form\b/gi) ?? []).length;
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  );
  const mvChrome = html.includes('id="mv-chrome"');
  const omFooter = html.includes('class="om-footer"');
  const omNavMenu = html.includes("data-om-nav-menu") || html.includes('id="om-nav-menu"');
  const langDropdown = html.includes("data-language-dropdown");
  const hasSimulator = html.includes("data-simulator");
  const hasContactPage = html.includes("om-contact-page");
  const internalLinks = [...html.matchAll(/href="(\/(?:fr|en|it|nl|about|contact|sur-plan|simulateur|blog|off-market)[^"]*)"/gi)].map((m) => m[1]);

  return {
    title,
    desc,
    canonical,
    ogTitle,
    ogUrl,
    ogLocale,
    ogDesc,
    ogType,
    twitterCard,
    hasJsonLd,
    htmlLang,
    stylesheets,
    legacyScripts: allLegacyScripts,
    imgCount,
    pictureCount,
    formCount,
    h1s,
    mvChrome,
    omFooter,
    omNavMenu,
    langDropdown,
    hasSimulator,
    hasContactPage,
    internalLinkCount: internalLinks.length,
  };
}

function norm(s) {
  return s
    .replace(/&amp;rsquo;/g, "\u2019")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\u2019/g, "'");
}

function compareRoute(path) {
  return Promise.all([
    fetch(`${NEXT}${path}`).then((r) => r.text().then((html) => ({ status: r.status, html }))),
    fetch(`${BACKUP}${path}`).then((r) => r.text().then((html) => ({ status: r.status, html }))),
  ]).then(([nextRes, backupRes]) => {
    const next = extract(nextRes.html);
    const backup = extract(backupRes.html);
    const issues = [];

    if (nextRes.status !== 200) issues.push(`Next HTTP ${nextRes.status}`);
    if (backupRes.status !== 200) issues.push(`Backup HTTP ${backupRes.status}`);

    for (const key of ["canonical", "ogUrl", "ogLocale", "htmlLang"]) {
      if (next[key] !== backup[key]) {
        issues.push(`SEO ${key}: Next="${next[key]}" Backup="${backup[key]}"`);
      }
    }
    for (const key of ["title", "ogTitle"]) {
      if (norm(next[key]) !== norm(backup[key])) {
        issues.push(`SEO ${key}: Next="${next[key]}" Backup="${backup[key]}"`);
      }
    }
    if (norm(next.desc) !== norm(backup.desc)) issues.push("SEO description mismatch");
    if (norm(next.ogDesc) !== norm(backup.ogDesc)) issues.push("SEO og:description mismatch");
    if (backup.ogType && next.ogType !== backup.ogType) {
      issues.push(`SEO ogType: Next="${next.ogType}" Backup="${backup.ogType}"`);
    }
    if (backup.hasJsonLd && !next.hasJsonLd) issues.push("SEO JSON-LD missing on Next");

    const cssMissing = backup.stylesheets.filter((x) => !next.stylesheets.includes(x));
    if (cssMissing.length) issues.push(`CSS missing: ${cssMissing.join(", ")}`);

    const jsMissing = backup.legacyScripts.filter((x) => !next.legacyScripts.includes(x));
    if (jsMissing.length) issues.push(`JS missing: ${jsMissing.join(", ")}`);

    for (const key of [
      "imgCount",
      "pictureCount",
      "formCount",
      "mvChrome",
      "omFooter",
      "omNavMenu",
      "langDropdown",
      "hasSimulator",
      "hasContactPage",
    ]) {
      if (next[key] !== backup[key]) {
        issues.push(`${key}: Next=${next[key]} Backup=${backup[key]}`);
      }
    }

    const h1Next = next.h1s.map(norm).join("|");
    const h1Backup = backup.h1s.map(norm).join("|");
    if (h1Next !== h1Backup) {
      issues.push(`H1: Next="${h1Next}" Backup="${h1Backup}"`);
    }

    return { path, issues, pass: issues.length === 0, nextUrl: `${NEXT}${path}`, backupUrl: `${BACKUP}${path}` };
  });
}

async function main() {
  const results = [];
  for (const path of ROUTES) {
    results.push(await compareRoute(path));
  }

  const passed = results.filter((r) => r.pass).length;
  console.log(`\n=== QA Visual Compare: ${passed}/${results.length} routes pass ===\n`);
  for (const r of results) {
    console.log(`${r.pass ? "PASS" : "FAIL"} ${r.path}`);
    if (r.issues.length) {
      for (const issue of r.issues) console.log(`  - ${issue}`);
    }
  }

  console.log("\nViewports for browser QA:", VIEWPORTS.map((v) => v.name).join(", "));
  process.exit(results.some((r) => !r.pass) ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
