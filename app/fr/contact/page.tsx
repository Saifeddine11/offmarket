import {
  buildLocaleContactMetadata,
  buildLocaleContactViewport,
  LocaleContactPage,
} from "@/lib/contact/LocaleContactPage";

export const metadata = buildLocaleContactMetadata("fr/contact");
export const viewport = buildLocaleContactViewport("fr/contact");

export default function FrContactPage() {
  return <LocaleContactPage localeKey="fr/contact" />;
}
