import type { SiteLocale } from "@/lib/i18n/types";

export type LeadSubmissionType =
  | "contact"
  | "private_access"
  | "off_market"
  | "villa_jaz"
  | "project"
  | "simulator"
  | "newsletter"
  | "lead";

export type LeadSubmissionPayload = {
  type: LeadSubmissionType;
  locale: SiteLocale | string;
  fullName?: string;
  email: string;
  phoneCountry?: string;
  phone?: string;
  message?: string;
  intent?: string;
  propertyType?: string;
  budget?: string;
  objective?: string;
  source?: string;
  context?: string;
  pagePath?: string;
  pageUrl?: string;
  /** Explicit newsletter marketing consent — never invent if absent. */
  marketingConsent?: boolean;
  /** Contact-form consent (separate from newsletter). */
  contactConsent?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** Honeypot — must be empty. */
  companyWebsite?: string;
};

export type NormalizedLead = {
  type: LeadSubmissionType;
  locale: string;
  fullName: string | null;
  email: string;
  phoneCountry: string | null;
  phone: string | null;
  phoneFull: string | null;
  message: string | null;
  intent: string | null;
  propertyType: string | null;
  budget: string | null;
  objective: string | null;
  source: string | null;
  context: string | null;
  pagePath: string | null;
  pageUrl: string | null;
  marketingConsent: boolean | null;
  contactConsent: boolean | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  submittedAt: string;
};

const MAX = {
  fullName: 120,
  email: 254,
  phone: 40,
  phoneCountry: 12,
  message: 4000,
  intent: 80,
  propertyType: 120,
  budget: 120,
  objective: 120,
  source: 120,
  context: 160,
  pagePath: 300,
  pageUrl: 500,
  utm: 120,
} as const;

function trimTo(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

function sanitizeHeaderish(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function classifyLeadType(input: {
  type?: string;
  intent?: string;
  source?: string;
  context?: string;
}): LeadSubmissionType {
  const type = String(input.type ?? "")
    .toLowerCase()
    .replace(/-/g, "_");

  if (type === "newsletter") return "newsletter";
  if (type === "private_access" || type === "privateaccess") return "private_access";
  if (type === "off_market" || type === "offmarket") return "off_market";
  if (type === "villa_jaz" || type === "villajaz") return "villa_jaz";
  if (type === "simulator" || type === "simulateur") return "simulator";
  if (type === "project" || type === "projet") return "project";
  if (type === "contact") return "contact";
  if (type === "lead") return "lead";

  const blob = `${input.intent ?? ""} ${input.source ?? ""} ${input.context ?? ""}`.toLowerCase();
  if (blob.includes("villa-jaz") || blob.includes("villa_jaz") || blob.includes("villajaz")) {
    return "villa_jaz";
  }
  if (blob.includes("off-market") || blob.includes("off_market") || blob.includes("offmarket")) {
    return "off_market";
  }
  if (blob.includes("simulator") || blob.includes("simulateur")) return "simulator";
  if (
    blob.includes("nos_projets") ||
    blob.includes("nos-projets") ||
    blob.includes("projects") ||
    blob.includes("homepage") ||
    blob.includes("home_page") ||
    blob.includes("home-page")
  ) {
    return "project";
  }
  if (blob.includes("private") || blob.includes("accès") || blob.includes("acces")) {
    return "private_access";
  }
  if (blob.includes("contact")) return "contact";
  return "lead";
}

export function subjectForLead(
  type: LeadSubmissionType,
  locale: string,
  fullName?: string | null,
): string {
  void locale;
  const name = fullName ? sanitizeHeaderish(fullName).slice(0, 80) : "";

  if (type === "newsletter") {
    return name
      ? `Nouvelle inscription newsletter — ${name} — OFF MARKET`
      : "Nouvelle inscription newsletter — OFF MARKET";
  }

  if (type === "villa_jaz") {
    return name
      ? `Nouvelle demande Villa Jaz — ${name} — OFF MARKET`
      : "Nouvelle demande Villa Jaz — OFF MARKET";
  }

  if (type === "contact") {
    return name
      ? `Nouvelle demande de contact — ${name} — OFF MARKET`
      : "Nouvelle demande de contact — OFF MARKET";
  }

  // Private-access / off-market / project / simulator / generic lead
  return name
    ? `Nouvelle demande privée — ${name} — OFF MARKET`
    : "Nouvelle demande privée — OFF MARKET";
}

export function normalizeLeadPayload(
  raw: unknown,
): { ok: true; lead: NormalizedLead } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "invalid_payload" };
  }

  const body = raw as Record<string, unknown>;
  const honeypot = trimTo(body.companyWebsite, 200);
  if (honeypot) {
    return { ok: false, error: "spam_rejected" };
  }

  const email = sanitizeHeaderish(trimTo(body.email, MAX.email).toLowerCase());
  if (!email || !isEmail(email)) {
    return { ok: false, error: "invalid_email" };
  }

  const classified = classifyLeadType({
    type: String(body.type ?? ""),
    intent: String(body.intent ?? ""),
    source: String(body.source ?? ""),
    context: String(body.context ?? ""),
  });

  const fullName = sanitizeHeaderish(trimTo(body.fullName ?? body.name, MAX.fullName)) || null;
  const phoneCountry = sanitizeHeaderish(trimTo(body.phoneCountry ?? body.dialCode, MAX.phoneCountry)) || null;
  const phone = sanitizeHeaderish(trimTo(body.phone, MAX.phone)) || null;

  if (classified !== "newsletter") {
    if (!fullName) return { ok: false, error: "missing_name" };
    if (!phoneCountry || !phone) return { ok: false, error: "missing_phone" };
  }

  const marketingConsent =
    typeof body.marketingConsent === "boolean" ? body.marketingConsent : null;

  if (classified === "newsletter" && marketingConsent !== true) {
    return { ok: false, error: "missing_consent" };
  }

  // Contact/lead forms: submitting the form accepts contact about the request.
  // Newsletter marketing consent stays separate and must be explicit.
  const contactConsent =
    classified === "newsletter"
      ? null
      : typeof body.contactConsent === "boolean"
        ? body.contactConsent
        : true;

  const locale = sanitizeHeaderish(trimTo(body.locale, 8).toLowerCase()) || "fr";
  const phoneFull =
    phoneCountry && phone ? `${phoneCountry} ${phone}`.trim() : phone;

  return {
    ok: true,
    lead: {
      type: classified,
      locale,
      fullName,
      email,
      phoneCountry,
      phone,
      phoneFull,
      message: sanitizeHeaderish(trimTo(body.message, MAX.message)) || null,
      intent: sanitizeHeaderish(trimTo(body.intent, MAX.intent)) || null,
      propertyType: sanitizeHeaderish(trimTo(body.propertyType, MAX.propertyType)) || null,
      budget: sanitizeHeaderish(trimTo(body.budget, MAX.budget)) || null,
      objective: sanitizeHeaderish(trimTo(body.objective, MAX.objective)) || null,
      source: sanitizeHeaderish(trimTo(body.source, MAX.source)) || null,
      context: sanitizeHeaderish(trimTo(body.context, MAX.context)) || null,
      pagePath: sanitizeHeaderish(trimTo(body.pagePath, MAX.pagePath)) || null,
      pageUrl: sanitizeHeaderish(trimTo(body.pageUrl, MAX.pageUrl)) || null,
      marketingConsent,
      contactConsent,
      utmSource: sanitizeHeaderish(trimTo(body.utmSource, MAX.utm)) || null,
      utmMedium: sanitizeHeaderish(trimTo(body.utmMedium, MAX.utm)) || null,
      utmCampaign: sanitizeHeaderish(trimTo(body.utmCampaign, MAX.utm)) || null,
      submittedAt: new Date().toISOString(),
    },
  };
}
