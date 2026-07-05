#!/usr/bin/env node
/**
 * Compare Next.js migrated pages vs backup static HTML.
 * Usage: node scripts/qa-compare-pages.mjs
 */
const ROUTES = [
  { path: "/", backupPath: "/" },
  { path: "/off-market/", backupPath: "/off-market/" },
  { path: "/about/", backupPath: "/about/" },
  { path: "/fr/about/", backupPath: "/fr/about/" },
  { path: "/privacy-policy/", backupPath: "/privacy-policy/" },
  { path: "/contact/", backupPath: "/contact/" },
  { path: "/simulateur/", backupPath: "/simulateur/" },
  { path: "/fr/", backupPath: "/fr/" },
  { path: "/en/", backupPath: "/en/" },
  { path: "/it/", backupPath: "/it/" },
  { path: "/nl/", backupPath: "/nl/" },
  { path: "/fr/contact/", backupPath: "/fr/contact/" },
  { path: "/en/contact/", backupPath: "/en/contact/" },
  { path: "/it/contatto/", backupPath: "/it/contatto/" },
  { path: "/nl/contact/", backupPath: "/nl/contact/" },
  { path: "/sur-plan/", backupPath: "/sur-plan/" },
  { path: "/fr/sur-plan/", backupPath: "/fr/sur-plan/" },
  { path: "/en/off-plan/", backupPath: "/en/off-plan/" },
  { path: "/it/progetti-su-piano/", backupPath: "/it/progetti-su-piano/" },
  { path: "/nl/nieuwbouw/", backupPath: "/nl/nieuwbouw/" },
  { path: "/location/", backupPath: "/location/" },
  { path: "/blog/", backupPath: "/blog/" },
  { path: "/blog/acheter-villa-sur-plan-marrakech/", backupPath: "/blog/acheter-villa-sur-plan-marrakech/" },
  { path: "/blog/investir-immobilier-luxe-marrakech/", backupPath: "/blog/investir-immobilier-luxe-marrakech/" },
  { path: "/blog/adresses-immobilier-marrakech/", backupPath: "/blog/adresses-immobilier-marrakech/" },
  { path: "/blog/off-market-marrakech-biens-confidentiels/", backupPath: "/blog/off-market-marrakech-biens-confidentiels/" },
  { path: "/blog/appartement-hypercentre-gueliz-marrakech/", backupPath: "/blog/appartement-hypercentre-gueliz-marrakech/" },
];

const NEXT = "http://localhost:3000";
const BACKUP = "http://localhost:8765";

function extract(html) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  const desc =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "";
  const canonical =
    html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "";
  const ogTitle =
    html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1] ?? "";
  const ogUrl =
    html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i)?.[1] ?? "";
  const bodyClass = html.match(/<body[^>]*class="([^"]*)"/i)?.[1] ?? "";
  const stylesheets = [
    ...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi),
  ].map((m) => m[1]);
  const scripts = [
    ...html.matchAll(/<script[^>]+src="([^"]+)"/gi),
  ].map((m) => m[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
  const formCount = (html.match(/<form\b/gi) ?? []).length;
  const dataPrivateForm = html.includes("data-private-access-form");
  const dataSimulator = html.includes("data-simulator");
  const mvChrome = html.includes('id="mv-chrome"');
  const omFooter = html.includes('class="om-footer"');

  return {
    title,
    desc,
    canonical,
    ogTitle,
    ogUrl,
    bodyClass,
    stylesheets,
    scripts,
    h1s,
    formCount,
    dataPrivateForm,
    dataSimulator,
    mvChrome,
    omFooter,
  };
}

function diffArrays(a, b, label) {
  const issues = [];
  const missing = a.filter((x) => !b.includes(x));
  const extra = b.filter((x) => !a.includes(x));
  if (missing.length) issues.push(`${label} missing in Next: ${missing.join(", ")}`);
  if (extra.length) issues.push(`${label} extra in Next: ${extra.join(", ")}`);
  return issues;
}

async function compareRoute(route) {
  const [nextRes, backupRes] = await Promise.all([
    fetch(`${NEXT}${route.path}`),
    fetch(`${BACKUP}${route.backupPath}`),
  ]);

  const nextHtml = await nextRes.text();
  const backupHtml = await backupRes.text();
  const next = extract(nextHtml);
  const backup = extract(backupHtml);
  const issues = [];

  if (nextRes.status !== 200) issues.push(`Next HTTP ${nextRes.status}`);
  if (backupRes.status !== 200) issues.push(`Backup HTTP ${backupRes.status}`);

  for (const key of ["title", "desc", "canonical", "ogTitle", "ogUrl"]) {
    if (next[key] !== backup[key]) {
      issues.push(`SEO ${key}: Next="${next[key]}" vs Backup="${backup[key]}"`);
    }
  }

  if (next.bodyClass !== backup.bodyClass) {
    issues.push(
      `body class: Next="${next.bodyClass}" vs Backup="${backup.bodyClass}"`,
    );
  }

  issues.push(...diffArrays(backup.stylesheets, next.stylesheets, "CSS"));
  issues.push(...diffArrays(backup.scripts, next.scripts, "JS"));

  if (JSON.stringify(next.h1s) !== JSON.stringify(backup.h1s)) {
    issues.push(`H1 mismatch: Next=${JSON.stringify(next.h1s)} Backup=${JSON.stringify(backup.h1s)}`);
  }
  if (next.formCount !== backup.formCount) {
    issues.push(`form count: Next=${next.formCount} Backup=${backup.formCount}`);
  }
  for (const flag of [
    "dataPrivateForm",
    "dataSimulator",
    "mvChrome",
    "omFooter",
  ]) {
    if (next[flag] !== backup[flag]) {
      issues.push(`${flag}: Next=${next[flag]} Backup=${backup[flag]}`);
    }
  }

  return { path: route.path, issues, next, backup };
}

async function main() {
  const results = [];
  for (const route of ROUTES) {
    results.push(await compareRoute(route));
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
