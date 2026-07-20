/**
 * Safe offline validation for lead normalization + email templates.
 * Run: npx --yes tsx scripts/validate-leads.ts
 */
import { buildLeadNotificationEmail } from "../lib/email/leadNotificationTemplate";
import {
  classifyLeadType,
  normalizeLeadPayload,
  subjectForLead,
} from "../lib/email/leadTypes";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const contact = normalizeLeadPayload({
  type: "contact",
  fullName: "Test Visitor",
  email: "test.visitor@example.com",
  phoneCountry: "+212",
  phone: "612345678",
  message: "Bonjour, je souhaite un échange privé.",
  intent: "contact_page",
  locale: "fr",
  pagePath: "/contact/",
  budget: "",
  propertyType: "Villa",
});
assert(contact.ok, "contact should validate");
assert(contact.lead.marketingConsent === null, "contact must not invent newsletter consent");
assert(
  subjectForLead(contact.lead.type, contact.lead.locale).includes("contact"),
  "contact subject",
);
const contactMail = buildLeadNotificationEmail(contact.lead);
assert(!contactMail.html.includes("Budget"), "empty budget hidden in HTML");
assert(contactMail.html.includes("Villa"), "property type shown");
assert(contactMail.text.includes("Reply-To") || contactMail.text.includes("test.visitor@example.com"), "reply instruction");

const newsletterOk = normalizeLeadPayload({
  type: "newsletter",
  email: "news@example.com",
  locale: "en",
  marketingConsent: true,
  pagePath: "/en/",
  source: "footer_newsletter",
});
assert(newsletterOk.ok, "newsletter with consent should validate");
assert(newsletterOk.lead.type === "newsletter", "newsletter type");
assert(
  subjectForLead(newsletterOk.lead.type, "en").includes("newsletter"),
  "newsletter subject",
);

const newsletterNoConsent = normalizeLeadPayload({
  type: "newsletter",
  email: "news@example.com",
  locale: "en",
});
assert(!newsletterNoConsent.ok, "newsletter without consent rejected");

const spam = normalizeLeadPayload({
  type: "contact",
  fullName: "Bot",
  email: "bot@example.com",
  phoneCountry: "+33",
  phone: "612345678",
  companyWebsite: "http://spam.example",
});
assert(!spam.ok && spam.error === "spam_rejected", "honeypot rejected");

const invalidEmail = normalizeLeadPayload({
  type: "contact",
  fullName: "A",
  email: "not-an-email",
  phoneCountry: "+33",
  phone: "612345678",
});
assert(!invalidEmail.ok, "invalid email rejected");

const injection = normalizeLeadPayload({
  type: "contact",
  fullName: "Evil\r\nBcc: evil@example.com",
  email: "ok@example.com",
  phoneCountry: "+33",
  phone: "612345678",
  message: "<script>alert(1)</script>",
});
assert(injection.ok, "injection payload still normalizes");
assert(!injection.lead.fullName?.includes("\n"), "header newlines stripped");
const injectionMail = buildLeadNotificationEmail(injection.lead);
assert(!injectionMail.html.includes("<script>"), "HTML escaped in template");
assert(injectionMail.html.includes("&lt;script&gt;"), "script escaped");

assert(classifyLeadType({ intent: "villa-jaz" }) === "villa_jaz", "villa jaz");
assert(classifyLeadType({ intent: "off-market" }) === "off_market", "off market");
assert(classifyLeadType({ type: "newsletter" }) === "newsletter", "explicit newsletter");
assert(classifyLeadType({ intent: "contact_page" }) === "contact", "contact");
assert(classifyLeadType({ source: "homepage" }) === "project", "homepage project");

const nl = normalizeLeadPayload({
  type: "off_market",
  fullName: "Jan Jansen",
  email: "jan@example.com",
  phoneCountry: "+31",
  phone: "612345678",
  locale: "nl",
  intent: "off-market",
  pagePath: "/nl/off-market/",
});
assert(nl.ok && nl.lead.locale === "nl", "nl locale preserved");

const it = normalizeLeadPayload({
  type: "private_access",
  fullName: "Mario Rossi",
  email: "mario@example.com",
  phoneCountry: "+39",
  phone: "3123456789",
  locale: "it",
  intent: "private",
  pagePath: "/it/contatto/",
});
assert(it.ok && it.lead.locale === "it", "it locale preserved");

console.log("validate-leads: all checks passed");
