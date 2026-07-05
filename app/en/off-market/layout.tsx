import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function EnOffMarketLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.offMarket} />
      <style>{`body { margin: 0; background: #f1ebeb; color: #565449; }`}</style>
      {children}
    </>
  );
}
