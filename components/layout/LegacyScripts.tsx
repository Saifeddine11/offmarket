import Script from "next/script";

type LegacyScriptsProps = {
  srcs?: readonly string[] | null;
};

/**
 * Native defer scripts — same load semantics as static HTML pages.
 */
export function LegacyScripts({ srcs }: LegacyScriptsProps) {
  const resolved =
    Array.isArray(srcs)
      ? srcs.filter((src): src is string => typeof src === "string" && src.length > 0)
      : [];

  if (
    process.env.NODE_ENV !== "production" &&
    !Array.isArray(srcs)
  ) {
    console.warn(
      "[LegacyScripts] `srcs` was missing or invalid; defaulting to []. Check SCRIPTS registry.",
      srcs,
    );
  }

  return (
    <>
      {resolved.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
