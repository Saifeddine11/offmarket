type StylesheetsProps = {
  hrefs: string[];
};

export function Stylesheets({ hrefs }: StylesheetsProps) {
  return (
    <>
      {hrefs.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
