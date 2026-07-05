import Script from "next/script";

type LegacyScriptsProps = {
  srcs: string[];
};

export function LegacyScripts({ srcs }: LegacyScriptsProps) {
  return (
    <>
      {srcs.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
