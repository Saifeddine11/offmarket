import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function NosProjetsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.nosProjets} />
      <style>{`body { margin: 0; background: #f5f4f2; color: #565449; }`}</style>
      {children}
    </>
  );
}
