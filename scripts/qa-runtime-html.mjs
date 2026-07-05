#!/usr/bin/env node
/**
 * Runtime browser QA via CDP-like checks using fetch + parsing script tags.
 * Full visual QA done via browser MCP; this validates post-fix HTML output.
 */
const ROUTES = [
  "/off-market/",
  "/about/",
  "/fr/about/",
  "/privacy-policy/",
  "/contact/",
  "/simulateur/",
];

const NEXT = "http://localhost:3000";

async function check(path) {
  const html = await (await fetch(`${NEXT}${path}`)).text();
  const hasPageShell =
    html.includes('class="om-off-market-page"') ||
    html.includes('class="om-about-page om-inner-page"') ||
    html.includes('class="om-contact-body"') ||
    path.includes("privacy") ||
    path.includes("simulateur");
  const legacyScripts = [
    ...html.matchAll(/<script[^>]+src="(\/assets\/javascripts\/[^"]+)"/gi),
  ].map((m) => m[1]);
  const hasJsInit = html.includes("document.documentElement.classList.remove('no-js')");
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const canonical =
    html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? "";

  return {
    path,
    title,
    canonical,
    hasJsInit,
    hasPageShell,
    legacyScriptCount: legacyScripts.length,
    legacyScripts,
  };
}

async function main() {
  for (const path of ROUTES) {
    const r = await check(path);
    console.log(JSON.stringify(r));
  }
}

main();
