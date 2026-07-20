import { Resend } from "resend";

import { buildLeadNotificationEmail } from "@/lib/email/leadNotificationTemplate";
import type { NormalizedLead } from "@/lib/email/leadTypes";

const DEFAULT_TO = "contact@offmarketofficial.com";
const DEFAULT_FROM = "OFF MARKET Website <notifications@offmarketofficial.com>";

export type SendLeadResult =
  | { ok: true; id: string }
  | { ok: false; category: "not_configured" | "provider_error" };

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

/**
 * Sends one internal notification to the fixed OFF MARKET inbox.
 * Recipient is never taken from the client payload.
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
): Promise<SendLeadResult> {
  const to = process.env.EMAIL_TO?.trim() || DEFAULT_TO;
  const from = process.env.EMAIL_FROM?.trim() || DEFAULT_FROM;
  const { subject, html, text } = buildLeadNotificationEmail(lead);

  // Safe local/CI mode — builds the message but does not call the provider.
  if (process.env.EMAIL_DRY_RUN === "1" || process.env.EMAIL_DRY_RUN === "true") {
    console.info("[leads] dry_run", {
      type: lead.type,
      locale: lead.locale,
      to,
      subject,
    });
    return { ok: true, id: `dry-run-${Date.now()}` };
  }

  const client = getResendClient();
  if (!client) {
    return { ok: false, category: "not_configured" };
  }

  try {
    const result = await client.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[leads] provider_error", {
        category: "provider_error",
        type: lead.type,
        locale: lead.locale,
      });
      return { ok: false, category: "provider_error" };
    }

    return { ok: true, id: result.data?.id || "sent" };
  } catch {
    console.error("[leads] provider_error", {
      category: "provider_error",
      type: lead.type,
      locale: lead.locale,
    });
    return { ok: false, category: "provider_error" };
  }
}
