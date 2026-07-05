import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.about} />
      <style>{`body { margin: 0; background: #f5f4f2; color: #565449; }`}</style>
      {children}
    </>
  );
}
