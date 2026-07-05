import { Fragment } from "react";
import type { BodySegment } from "@/lib/static-html/parsePage";

type StaticHtmlBodyProps = {
  segments: BodySegment[];
};

type ScriptSegment = Extract<BodySegment, { kind: "script" }>;

function escapeScriptBody(html: string): string {
  return html.replace(/<\/script/gi, "<\\/script");
}

/**
 * Legacy page extracts can be cut mid-tree: segment 0 of the archived pages
 * opens layout wrappers (`.page-content-wrapper`, …) whose closers were lost,
 * and can even end inside an unfinished `<div …` tag. Injected as-is, the
 * browser's stream parser re-nests every following sibling inside those open
 * divs, so the DOM no longer matches React's rendered tree and hydration
 * fails — React then regenerates the whole page client-side, wiping the DOM
 * state legacy scripts already set up (blank/missing homepage sections).
 *
 * Balancing each segment keeps server DOM and React tree identical:
 * - drop a trailing unfinished tag,
 * - drop `</div>` closers with no opener in the same segment,
 * - close any `<div>` still open at the end of the segment.
 */
const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function balanceHtmlSegment(html: string): string {
  // Trailing unfinished tag (e.g. "<div \n   " with no ">")
  let result = html.replace(/<[a-zA-Z][^<>]*$/, "");

  const stack: string[] = [];
  const strayClosers: { start: number; end: number }[] = [];

  for (const token of result.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g)) {
    const [raw, slash, rawName, attrs] = token;
    const name = rawName.toLowerCase();

    if (!slash) {
      if (!VOID_ELEMENTS.has(name) && !attrs.endsWith("/")) {
        stack.push(name);
      }
      continue;
    }

    const openIndex = stack.lastIndexOf(name);
    if (openIndex === -1) {
      // Closer without an opener in this segment — would close the segment
      // wrapper itself and leak the rest of the page out of it.
      strayClosers.push({ start: token.index, end: token.index + raw.length });
    } else {
      stack.length = openIndex;
    }
  }

  for (let i = strayClosers.length - 1; i >= 0; i -= 1) {
    result = result.slice(0, strayClosers[i].start) + result.slice(strayClosers[i].end);
  }

  for (let i = stack.length - 1; i >= 0; i -= 1) {
    result += `</${stack[i]}>`;
  }

  return result;
}

function stripIncompleteLanguageControls(html: string): string {
  return html
    .replace(
      /<div class="om-language-dropdown"[\s\S]*?<\/div>\s*<\/div>\s*(<a class="om-header__access-btn)/g,
      "$1",
    )
    .replace(/<nav class="mv-lang-switcher[\s\S]*?<\/nav>/g, "");
}

/** Inline scripts as raw HTML — React <script> children hydrate inconsistently. */
function buildInlineScriptHtml(segment: ScriptSegment): string {
  const attrs: string[] = [];

  if (segment.type) {
    attrs.push(`type="${segment.type}"`);
  }
  if (segment.fetchpriority) {
    attrs.push(`fetchpriority="${segment.fetchpriority}"`);
  }
  if (segment.defer) {
    attrs.push("defer");
  }
  if (segment.async) {
    attrs.push("async");
  }

  for (const [key, value] of Object.entries(segment.dataAttributes ?? {})) {
    attrs.push(`${key}="${value.replace(/"/g, "&quot;")}"`);
  }

  const attrStr = attrs.length ? ` ${attrs.join(" ")}` : "";
  return `<script${attrStr}>${escapeScriptBody(segment.inline ?? "")}</script>`;
}

/**
 * Renders static HTML body segments in document order.
 * HTML chunks use display:contents wrappers; scripts are native tags.
 */
export function StaticHtmlBody({ segments }: StaticHtmlBodyProps) {
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.kind === "react") {
          return <Fragment key={segment.key ?? `react-${index}`}>{segment.element}</Fragment>;
        }

        if (segment.kind === "html") {
          if (!segment.html.trim()) {
            return null;
          }
          return (
            <div
              key={`html-${index}`}
              style={{ display: "contents" }}
              dangerouslySetInnerHTML={{
                __html: balanceHtmlSegment(stripIncompleteLanguageControls(segment.html)),
              }}
              suppressHydrationWarning
            />
          );
        }

        if (segment.src) {
          const src = JSON.stringify(segment.src);

          if (segment.async) {
            const extraAttrs = [
              segment.fetchpriority
                ? `s.fetchPriority=${JSON.stringify(segment.fetchpriority)};`
                : "",
            ].join("");
            const loader = `(function(){var s=document.createElement('script');s.src=${src};s.async=true;${extraAttrs}(document.head||document.body).appendChild(s);})();`;

            return (
              <script
                key={`script-${index}-${segment.src}`}
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: loader }}
              />
            );
          }

          const extraAttrs = [
            segment.async ? "s.async=true;" : "",
            segment.fetchpriority
              ? `s.fetchPriority=${JSON.stringify(segment.fetchpriority)};`
              : "",
          ].join("");
          // Dynamically inserted scripts ignore defer ordering — chain via onload.
          const loader = `(function(){var s=document.createElement('script');s.src=${src};${extraAttrs}var q=window.__staticHtmlScriptQueue=window.__staticHtmlScriptQueue||Promise.resolve();window.__staticHtmlScriptQueue=q.then(function(){return new Promise(function(r){s.onload=s.onerror=function(){r();};(document.head||document.body).appendChild(s);});});})();`;

          return (
            <script
              key={`script-${index}-${segment.src}`}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: loader }}
            />
          );
        }

        if (segment.inline) {
          return (
            <div
              key={`inline-${index}`}
              style={{ display: "contents" }}
              dangerouslySetInnerHTML={{
                __html: buildInlineScriptHtml(segment),
              }}
              suppressHydrationWarning
            />
          );
        }

        return null;
      })}
    </>
  );
}
