import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.contact} />
      <link
        rel="manifest"
        href="/assets/manifest/manifest.webmanifest?v=1765268659"
      />
      {children}
    </>
  );
}
