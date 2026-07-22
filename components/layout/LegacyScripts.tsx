import Script from "next/script";

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
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
