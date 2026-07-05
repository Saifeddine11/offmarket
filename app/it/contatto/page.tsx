import {
  buildLocaleContactMetadata,
  buildLocaleContactViewport,
  LocaleContactPage,
} from "@/lib/contact/LocaleContactPage";

export const metadata = buildLocaleContactMetadata("it/contatto");
export const viewport = buildLocaleContactViewport("it/contatto");

export default function ItContattoPage() {
  return <LocaleContactPage localeKey="it/contatto" />;
}
