import type { NormalizedLead } from "@/lib/email/leadTypes";
import { subjectForLead } from "@/lib/email/leadTypes";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function typeLabel(type: NormalizedLead["type"]): string {
  switch (type) {
    case "newsletter":
      return "Inscription newsletter";
    case "contact":
      return "Demande de contact";
    case "private_access":
    case "off_market":
      return "Demande d’accès privé";
    case "villa_jaz":
      return "Demande Villa Jaz";
    case "simulator":
      return "Prospect simulateur";
    case "project":
      return "Prospect immobilier";
    default:
      return "Nouveau prospect";
  }
}

function localeLabel(locale: string): string {
  if (locale === "en") return "English";
  if (locale === "nl") return "Nederlands";
  if (locale === "it") return "Italiano";
  return "Français";
}

const COUNTRY_BY_DIAL: Record<string, string> = {
  "+212": "Maroc",
  "+33": "France",
  "+32": "Belgique",
  "+41": "Suisse",
  "+34": "Espagne",
  "+39": "Italie",
  "+31": "Pays-Bas",
  "+44": "Royaume-Uni",
  "+1": "États-Unis / Canada",
  "+971": "Émirats arabes unis",
  "+966": "Arabie saoudite",
  "+974": "Qatar",
};

function countryLabel(dial: string | null): string | null {
  if (!dial) return null;
  return COUNTRY_BY_DIAL[dial] || dial;
}

type Row = { label: string; value: string };

function buildRows(lead: NormalizedLead): Row[] {
  const country = countryLabel(lead.phoneCountry);
  const rows: Array<Row | null> = [
    { label: "Type", value: typeLabel(lead.type) },
    { label: "Date", value: lead.submittedAt },
    lead.pagePath ? { label: "Page", value: lead.pagePath } : null,
    lead.pageUrl ? { label: "URL", value: lead.pageUrl } : null,
    { label: "Langue", value: localeLabel(lead.locale) },
    lead.fullName ? { label: "Nom complet", value: lead.fullName } : null,
    { label: "Email", value: lead.email },
    lead.phoneFull ? { label: "Téléphone / WhatsApp", value: lead.phoneFull } : null,
    country ? { label: "Pays", value: country } : null,
    lead.intent ? { label: "Intent", value: lead.intent } : null,
    lead.propertyType ? { label: "Bien / projet", value: lead.propertyType } : null,
    lead.budget ? { label: "Budget", value: lead.budget } : null,
    lead.objective ? { label: "Objectif", value: lead.objective } : null,
    lead.message ? { label: "Message", value: lead.message } : null,
    lead.source ? { label: "Source", value: lead.source } : null,
    lead.context ? { label: "Contexte", value: lead.context } : null,
    lead.contactConsent !== null
      ? {
          label: "Consentement contact",
          value: lead.contactConsent ? "Oui (soumission formulaire)" : "Non",
        }
      : null,
    lead.marketingConsent !== null
      ? {
          label: "Consentement marketing (newsletter)",
          value: lead.marketingConsent ? "Oui (explicite)" : "Non",
        }
      : null,
    lead.utmSource ? { label: "utm_source", value: lead.utmSource } : null,
    lead.utmMedium ? { label: "utm_medium", value: lead.utmMedium } : null,
    lead.utmCampaign ? { label: "utm_campaign", value: lead.utmCampaign } : null,
  ];
  return rows.filter((row): row is Row => Boolean(row && row.value));
}

export function buildLeadNotificationEmail(lead: NormalizedLead): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = subjectForLead(lead.type, lead.locale, lead.fullName);
  const rows = buildRows(lead);
  const title = typeLabel(lead.type);

  const rowsHtml = rows
    .map(
      (row) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e8e4de;width:34%;vertical-align:top;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#8a857a;letter-spacing:0.02em;">
          ${escapeHtml(row.label)}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #e8e4de;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2b2a26;line-height:1.45;">
          ${escapeHtml(row.value).replace(/\n/g, "<br>")}
        </td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1ea;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e7e1d7;">
          <tr>
            <td style="padding:28px 28px 18px;border-bottom:3px solid #9b2c2c;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.08em;color:#2b2a26;">
                OFF MARKET
              </p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#9b2c2c;">
                Notification site web
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 28px 8px;">
              <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;color:#2b2a26;font-weight:normal;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5f5a50;">
                Une nouvelle soumission a été reçue depuis le site officiel.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${rowsHtml}
              </table>
              <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#2b2a26;">
                Répondez directement à cet email pour contacter le visiteur
                ${lead.email ? `(Reply-To : ${escapeHtml(lead.email)})` : ""}.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 26px;border-top:1px solid #ebe6de;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a857a;">
                Message transactionnel généré automatiquement par offmarketofficial.com.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "OFF MARKET — Notification site web",
    title,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    lead.email
      ? `Répondez directement à cet email pour contacter le visiteur (${lead.email}).`
      : "Répondez directement à cet email pour contacter le visiteur.",
  ].join("\n");

  return { subject, html, text };
}
