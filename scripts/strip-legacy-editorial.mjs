#!/usr/bin/env node
/**
 * Removes #legacy-editorial archive block from homepage content JSON.
 * That section sits after the footer and inflates scroll height (~335KB).
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGET_DIRS = [
  path.join(ROOT, "content", "pages"),
  path.join(ROOT, "content", "home"),
];

export function stripLegacyEditorialHtml(html) {
  const marker = 'id="legacy-editorial"';
  const idx = html.indexOf(marker);
  if (idx < 0) return html;

  const start = html.lastIndexOf("<section", idx);
  if (start < 0) return html;

  let depth = 0;
  let pos = start;
  let end = -1;

  while (pos < html.length) {
    const open = html.indexOf("<section", pos);
    const close = html.indexOf("</section>", pos);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      pos = open + 8;
      continue;
    }

    depth -= 1;
    end = close + "</section>".length;
    pos = end;
    if (depth === 0) break;
  }

  if (end < 0) return html;
  return html.slice(0, start) + html.slice(end);
}

/** Removes legacy favorites card template and post-footer archive tail. */
export function stripPostFooterLegacyHtml(html) {
  let next = html;

  const templateMarker = 'class="js-favourite-list-single"';
  const templateIdx = next.indexOf(templateMarker);
  if (templateIdx >= 0) {
    const start = next.lastIndexOf("<div", templateIdx);
    if (start >= 0) {
      next = next.slice(0, start);
    }
  }

  const footerIdx = next.lastIndexOf("</footer>");
  const favoritesIdx = next.indexOf('class="l-favorites', footerIdx);
  if (footerIdx >= 0 && favoritesIdx > footerIdx) {
    next = next.slice(0, favoritesIdx);
  }

  return next;
}

function isLegacyPostFooterSegment(html) {
  if (!html || !html.includes("js-favourite-list-single")) return false;
  const trimmed = html.trim();
  return trimmed.length > 10000;
}

function isLegacyTemplateScript(segment) {
  return (
    segment.kind === "script" &&
    segment.type === "text/template" &&
    segment.dataAttributes?.["data-template-variable"] === "flat"
  );
}

function processPageContent(data) {
  let changed = false;

  if (Array.isArray(data.bodySegments)) {
    data.bodySegments = data.bodySegments
      .map((segment) => {
        if (isLegacyTemplateScript(segment)) {
          changed = true;
          return null;
        }

        if (segment.kind === "html" && segment.html) {
          if (isLegacyPostFooterSegment(segment.html)) {
            changed = true;
            return { ...segment, html: "" };
          }

          let next = stripLegacyEditorialHtml(segment.html);
          next = stripPostFooterLegacyHtml(next);
          if (next !== segment.html) {
            changed = true;
            return { ...segment, html: next };
          }
        }
        return segment;
      })
      .filter(
        (segment) =>
          segment &&
          (segment.kind !== "html" || segment.html),
      );
  }

  if (typeof data.chrome === "string") {
    const next = stripLegacyEditorialHtml(data.chrome);
    if (next !== data.chrome) {
      data.chrome = next;
      changed = true;
    }
  }

  if (data.sections && typeof data.sections === "object") {
    for (const key of Object.keys(data.sections)) {
      if (typeof data.sections[key] === "string") {
        const next = stripLegacyEditorialHtml(data.sections[key]);
        if (next !== data.sections[key]) {
          data.sections[key] = next;
          changed = true;
        }
      }
    }
  }

  return changed;
}

let updated = 0;

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) continue;

  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".json") || name.startsWith("_")) continue;
    const filePath = path.join(dir, name);
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!data.bodySegments && !data.chrome && !data.sections) continue;

    if (processPageContent(data)) {
      fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
      updated++;
      console.log("Updated:", path.relative(ROOT, filePath));
    }
  }
}

console.log(`Done: ${updated} files updated.`);
