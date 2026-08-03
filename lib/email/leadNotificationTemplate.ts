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
  if (locale === "es") return "Español";
  if (locale === "no" || locale === "nb") return "Norsk";
  return "Français";
}

const COUNTRY_BY_DIAL: Record<string, string> = {
  "+212": "Maroc",
  "+33": "France",
  "+32": "Belgique",
  "+41": "Suisse",
  "+49": "Allemagne",
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

function cardRows(rows: Array<Row | null>): Row[] {
  return rows.filter((row): row is Row => Boolean(row && row.value));
}

function renderCard(title: string, rows: Row[]): string {
  if (!rows.length) return "";
  const body = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #ece8e1;width:38%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#8a857a;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #ece8e1;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#2b2a26;line-height:1.45;">
            ${escapeHtml(row.value).replace(/\n/g, "<br>")}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px;background:#faf8f4;border:1px solid #ece8e1;border-radius:16px;">
      <tr>
        <td style="padding:18px 20px 6px;">
          <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#565449;">
            ${escapeHtml(title)}
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${body}
          </table>
        </td>
      </tr>
    </table>`;
}

function formatSubmittedAt(iso: string): { date: string; time: string } {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return { date: iso, time: "" };
  }
  return {
    date: new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeZone: "Africa/Casablanca",
    }).format(date),
    time: new Intl.DateTimeFormat("fr-FR", {
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(date),
  };
}

export function buildLeadNotificationEmail(lead: NormalizedLead): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = subjectForLead(lead.type, lead.locale, lead.fullName);
  const title = "Nouvelle demande d’accès privé";
  const when = formatSubmittedAt(lead.submittedAt);
  const country = countryLabel(lead.phoneCountry);
  const phoneDigits = (lead.phoneFull || "").replace(/[^\d+]/g, "");

  const leadCard = cardRows([
    lead.fullName ? { label: "Nom complet", value: lead.fullName } : null,
    { label: "Email", value: lead.email },
    lead.phoneFull ? { label: "Téléphone", value: lead.phoneFull } : null,
    country ? { label: "Indicatif / pays", value: country } : null,
    { label: "Langue", value: localeLabel(lead.locale) },
  ]);

  const projectCard = cardRows([
    lead.intent ? { label: "Projet recherché", value: lead.intent } : null,
    lead.propertyType ? { label: "Type de bien", value: lead.propertyType } : null,
    lead.objective ? { label: "Objectif d’achat", value: lead.objective } : null,
    lead.budget ? { label: "Budget", value: lead.budget } : null,
    lead.message ? { label: "Message", value: lead.message } : null,
  ]);

  const sourceCard = cardRows([
    lead.pagePath ? { label: "Page d’origine", value: lead.pagePath } : null,
    lead.pageUrl ? { label: "URL", value: lead.pageUrl } : null,
    { label: "Date d’envoi", value: when.date },
    when.time ? { label: "Heure", value: when.time } : null,
    lead.source ? { label: "Source", value: lead.source } : null,
    lead.context ? { label: "Contexte", value: lead.context } : null,
    lead.utmSource ? { label: "utm_source", value: lead.utmSource } : null,
    lead.utmMedium ? { label: "utm_medium", value: lead.utmMedium } : null,
    lead.utmCampaign ? { label: "utm_campaign", value: lead.utmCampaign } : null,
    { label: "Type de notification", value: typeLabel(lead.type) },
  ]);

  const replyHref = `mailto:${encodeURIComponent(lead.email)}`;
  const telHref = phoneDigits ? `tel:${phoneDigits}` : "";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f4f2;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f4f2;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e8e4de;border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 20px;background:#ffffff;border-bottom:1px solid #ece8e1;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.08em;color:#2b2a26;">
                OFF MARKET
              </p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#565449;">
                Private real estate in Marrakech
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#2b2a26;font-weight:normal;">
                ${escapeHtml(title)}
              </h1>
              <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#5f5a50;">
                Une nouvelle demande a été envoyée depuis le formulaire OFF MARKET.
              </p>
              ${renderCard("Lead", leadCard)}
              ${renderCard("Projet", projectCard)}
              ${renderCard("Source", sourceCard)}
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 18px;">
                <tr>
                  <td style="border-radius:999px;background:#565449;">
                    <a href="${replyHref}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                      Répondre au prospect
                    </a>
                  </td>
                  ${
                    telHref
                      ? `<td style="width:10px;"></td>
                  <td style="border-radius:999px;border:1px solid #565449;">
                    <a href="${telHref}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#565449;text-decoration:none;">
                      Appeler
                    </a>
                  </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 26px;border-top:1px solid #ebe6de;background:#faf8f4;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#2b2a26;">
                OFF MARKET
              </p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a857a;">
                Private real estate in Marrakech<br />
                <a href="https://offmarketofficial.com/" style="color:#565449;text-decoration:underline;">https://offmarketofficial.com/</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines = [
    "OFF MARKET — Private real estate in Marrakech",
    title,
    "",
    "Une nouvelle demande a été envoyée depuis le formulaire OFF MARKET.",
    "",
    "— Lead —",
    ...leadCard.map((row) => `${row.label}: ${row.value}`),
    "",
    "— Projet —",
    ...(projectCard.length
      ? projectCard.map((row) => `${row.label}: ${row.value}`)
      : ["(aucun détail projet supplémentaire)"]),
    "",
    "— Source —",
    ...sourceCard.map((row) => `${row.label}: ${row.value}`),
    "",
    `Répondre au prospect: ${lead.email}`,
    telHref ? `Appeler: ${lead.phoneFull}` : "",
    "",
    "https://offmarketofficial.com/",
  ].filter(Boolean);

  return { subject, html, text: textLines.join("\n") };
}
