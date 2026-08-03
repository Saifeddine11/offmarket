type StylesheetLinksProps = {
  hrefs: readonly string[];
};

/** Blocking stylesheet linker for critical CSS. */
export function StylesheetLinks({ hrefs }: StylesheetLinksProps) {
  return (
    <>
      {hrefs.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
