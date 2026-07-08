import { StylesheetLinks } from "@/components/layout/StylesheetLinks";
import { GLOBAL_FOOTER_STYLES } from "@/lib/nav/globalNav";

/** Global footer styles — loaded once from the root layout. */
export function GlobalFooterAssets() {
  return <StylesheetLinks hrefs={GLOBAL_FOOTER_STYLES} />;
}
