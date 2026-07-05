import {
  buildLocaleContactMetadata,
  buildLocaleContactViewport,
  LocaleContactPage,
} from "@/lib/contact/LocaleContactPage";

export const metadata = buildLocaleContactMetadata("en/contact");
export const viewport = buildLocaleContactViewport("en/contact");

export default function EnContactPage() {
  return <LocaleContactPage localeKey="en/contact" />;
}
