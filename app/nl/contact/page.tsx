import {
  buildLocaleContactMetadata,
  buildLocaleContactViewport,
  LocaleContactPage,
} from "@/lib/contact/LocaleContactPage";

export const metadata = buildLocaleContactMetadata("nl/contact");
export const viewport = buildLocaleContactViewport("nl/contact");

export default function NlContactPage() {
  return <LocaleContactPage localeKey="nl/contact" />;
}
