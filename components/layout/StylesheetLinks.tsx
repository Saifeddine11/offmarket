type StylesheetLinksProps = {
  hrefs: readonly string[];
};

export function StylesheetLinks({ hrefs }: StylesheetLinksProps) {
  return (
    <>
      {hrefs.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
