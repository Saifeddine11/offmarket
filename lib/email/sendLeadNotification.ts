import { Resend } from "resend";

import { buildLeadNotificationEmail } from "@/lib/email/leadNotificationTemplate";
import type { NormalizedLead } from "@/lib/email/leadTypes";

const DEFAULT_TO = "contact@offmarketofficial.com";
const DEFAULT_FROM = "OFF MARKET <noreply@offmarketofficial.com>";

function resolveRecipient(): string {
  return (
    process.env.EMAIL_TO?.trim() ||
    process.env.CONTACT_EMAIL?.trim() ||
    DEFAULT_TO
  );
}

export type SendLeadResult =
  | { ok: true; id: string }
  | { ok: false; category: "not_configured" | "provider_error" };

/**
 * Sends one internal notification to the fixed OFF MARKET inbox.
 * Recipient is never taken from the client payload.
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
): Promise<SendLeadResult> {
  const to = resolveRecipient();
  const from = process.env.EMAIL_FROM?.trim() || DEFAULT_FROM;
  const { subject, html, text } = buildLeadNotificationEmail(lead);

  const dryRunRequested =
    process.env.EMAIL_DRY_RUN === "1" || process.env.EMAIL_DRY_RUN === "true";

  // Dry-run is intentionally limited to non-production environments.
  if (dryRunRequested && process.env.NODE_ENV === "production") {
    console.error("[leads] EMAIL_DRY_RUN is not allowed in production", {
      category: "not_configured",
      type: lead.type,
      locale: lead.locale,
    });
    return { ok: false, category: "not_configured" };
  }

  // Safe local/CI mode — builds the message but does not call the provider.
  if (dryRunRequested) {
    console.info("[leads] dry_run", {
      type: lead.type,
      locale: lead.locale,
      to,
      subject,
    });
    return { ok: true, id: `dry-run-${Date.now()}` };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[leads] RESEND_API_KEY missing", {
      category: "not_configured",
      type: lead.type,
      locale: lead.locale,
    });
    return { ok: false, category: "not_configured" };
  }

  try {
    const client = new Resend(apiKey);
    const result = await client.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      const message =
        typeof result.error === "object" &&
        result.error &&
        "message" in result.error
          ? String((result.error as { message?: unknown }).message || "")
          : "";
      console.error("[leads] provider_error", {
        category: "provider_error",
        type: lead.type,
        locale: lead.locale,
        // Safe short provider hint only — never log API keys or full payloads.
        hint: message.slice(0, 160),
      });
      return { ok: false, category: "provider_error" };
    }

    return { ok: true, id: result.data?.id || "sent" };
  } catch (error) {
    const hint =
      error instanceof Error ? error.message.slice(0, 160) : "unknown_error";
    console.error("[leads] provider_error", {
      category: "provider_error",
      type: lead.type,
      locale: lead.locale,
      hint,
    });
    return { ok: false, category: "provider_error" };
  }
}
