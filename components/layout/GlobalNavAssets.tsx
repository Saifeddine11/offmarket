import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { GLOBAL_NAV_SCRIPTS, GLOBAL_NAV_STYLES } from "@/lib/nav/globalNav";

/** Global navbar styles and scripts — loaded once from the root layout. */
export function GlobalNavAssets() {
  return (
    <>
      <StylesheetLinks hrefs={GLOBAL_NAV_STYLES} />
      <LegacyScripts srcs={GLOBAL_NAV_SCRIPTS} />
    </>
  );
}
