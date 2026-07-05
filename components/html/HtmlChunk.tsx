type HtmlChunkProps = {
  html: string;
};

/** Renders a static HTML fragment without altering layout (display: contents). */
export function HtmlChunk({ html }: HtmlChunkProps) {
  if (!html.trim()) {
    return null;
  }

  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
