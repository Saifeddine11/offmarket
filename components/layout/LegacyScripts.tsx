type LegacyScriptsProps = {
  srcs: readonly string[];
};

/**
 * Native defer scripts — same load semantics as static HTML pages.
 */
export function LegacyScripts({ srcs }: LegacyScriptsProps) {
  return (
    <>
      {srcs.map((src) => (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script key={src} src={src} defer suppressHydrationWarning />
      ))}
    </>
  );
}
