import { STYLES } from "@/lib/assets";
import { StylesheetLinks } from "@/components/layout/StylesheetLinks";

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StylesheetLinks hrefs={STYLES.privacyPolicy} />
      {children}
    </>
  );
}
