import type { Metadata } from "next";
import { BodyClass } from "@/components/layout/BodyClass";
import { HtmlInit } from "@/components/layout/HtmlInit";
import { LegacyScripts } from "@/components/layout/LegacyScripts";
import { PageShell } from "@/components/layout/PageShell";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { SCRIPTS } from "@/lib/assets";
import { buildPageMetadata, buildPageViewport } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact OFF MARKET — Projet immobilier à Marrakech",
  description:
    "Contactez OFF MARKET pour étudier un projet immobilier à Marrakech : villa, appartement, terrain, riad, achat sur plan ou sélection privée selon votre budget.",
  ogDescription:
    "Contactez OFF MARKET pour étudier un projet immobilier à Marrakech : villa, appartement, terrain, riad, achat sur plan ou sélection privée selon votre budget.",
  twitterDescription:
    "Contactez OFF MARKET pour étudier un projet immobilier à Marrakech : villa, appartement, terrain, riad, achat sur plan ou sélection privée selon votre budget.",
  canonicalPath: "/contact/",
  ogImage: "https://offmarketofficial.com/assets/offmarket/location/offmarket-gueliz-hypercentre.webp",
});

export const viewport = buildPageViewport("#565449");

export default function ContactPage() {
  return (
    <PageShell className="om-contact-lead-body om-inner-page">
      <HtmlInit preloaderDisabled />
      <BodyClass className="om-contact-lead-body om-inner-page" />
      <style>{`body { margin: 0; background: #f5f4f2; color: #11120d; }`}</style>

      <ContactPageContent />
      <LegacyScripts srcs={SCRIPTS.contact} />
    </PageShell>
  );
}
