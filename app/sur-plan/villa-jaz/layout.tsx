import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function VillaJazDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.villaJazDetail} />
      <style>{`body { margin: 0; background: #f5f4f2; color: #565449; }`}</style>
      {children}
    </>
  );
}
