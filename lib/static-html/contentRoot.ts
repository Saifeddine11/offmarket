import path from "path";

/**
 * @deprecated Archive path — used only by scripts/extract-page-content.mjs.
 * Production pages load structured content from content/pages/*.json via lib/content/.
 */
export const STATIC_HTML_ARCHIVE_DIR =
  "_legacy_static_archived_after_full_next_migration";

/** @deprecated Extraction script only — not used by production routes. */
export function resolveStaticHtmlFile(relativeFile: string): string {
  return path.join(process.cwd(), STATIC_HTML_ARCHIVE_DIR, relativeFile);
}
