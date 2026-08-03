import { Resend } from "resend";

import { buildLeadNotificationEmail } from "@/lib/email/leadNotificationTemplate";
import type { NormalizedLead } from "@/lib/email/leadTypes";

const DEFAULT_TO = "contact@offmarketofficial.com";
const DEFAULT_FROM = "OFF MARKET <noreply@offmarketofficial.com>";
const PROVIDER = "resend";

function resolveRecipient(): string {
  return (
    process.env.EMAIL_TO?.trim() ||
    process.env.CONTACT_EMAIL?.trim() ||
    DEFAULT_TO
  );
}

export type SendLeadResult =
  | { ok: true; id: string; mode: "live" | "dry_run" }
  | {
      ok: false;
      category: "not_configured" | "provider_error";
      code:
        | "EMAIL_PROVIDER_NOT_CONFIGURED"
        | "EMAIL_DRY_RUN_BLOCKED"
        | "EMAIL_DELIVERY_REJECTED";
      hint?: string;
    };

function envFlags() {
  return {
    provider: PROVIDER,
    hasResendKey: Boolean(process.env.RESEND_API_KEY?.trim()),
    hasEmailTo: Boolean(
      process.env.EMAIL_TO?.trim() || process.env.CONTACT_EMAIL?.trim(),
    ),
    hasEmailFrom: Boolean(process.env.EMAIL_FROM?.trim()),
    dryRunRequested:
      process.env.EMAIL_DRY_RUN === "1" || process.env.EMAIL_DRY_RUN === "true",
    nodeEnv: process.env.NODE_ENV || "undefined",
  };
}

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
  const flags = envFlags();

  const dryRunRequested = flags.dryRunRequested;

  // Dry-run is for local/CI only. Hosted production must omit EMAIL_DRY_RUN.
  // Local `next start` also uses NODE_ENV=production, so we allow dry-run whenever
  // EMAIL_DRY_RUN is explicitly set, unless DISALLOW_EMAIL_DRY_RUN=1.
  if (dryRunRequested) {
    if (process.env.DISALLOW_EMAIL_DRY_RUN === "1") {
      console.error("[leads] EMAIL_DRY_RUN blocked", {
        category: "not_configured",
        code: "EMAIL_DRY_RUN_BLOCKED",
        type: lead.type,
        locale: lead.locale,
        ...flags,
      });
      return {
        ok: false,
        category: "not_configured",
        code: "EMAIL_DRY_RUN_BLOCKED",
      };
    }

    console.info("[leads] dry_run", {
      provider: PROVIDER,
      type: lead.type,
      locale: lead.locale,
      to,
      subject,
      mode: "dry_run",
    });
    return { ok: true, id: `dry-run-${Date.now()}`, mode: "dry_run" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[leads] RESEND_API_KEY missing", {
      category: "not_configured",
      code: "EMAIL_PROVIDER_NOT_CONFIGURED",
      provider: PROVIDER,
      type: lead.type,
      locale: lead.locale,
      hasResendKey: false,
      hasEmailTo: flags.hasEmailTo,
      hasEmailFrom: flags.hasEmailFrom,
      nodeEnv: flags.nodeEnv,
    });
    return {
      ok: false,
      category: "not_configured",
      code: "EMAIL_PROVIDER_NOT_CONFIGURED",
    };
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
      const status =
        typeof result.error === "object" &&
        result.error &&
        "statusCode" in result.error
          ? String((result.error as { statusCode?: unknown }).statusCode || "")
          : "";
      console.error("[leads] provider_error", {
        category: "provider_error",
        code: "EMAIL_DELIVERY_REJECTED",
        provider: PROVIDER,
        type: lead.type,
        locale: lead.locale,
        providerStatus: status || undefined,
        hint: message.slice(0, 160),
      });
      return {
        ok: false,
        category: "provider_error",
        code: "EMAIL_DELIVERY_REJECTED",
        hint: message.slice(0, 160),
      };
    }

    console.info("[leads] sent", {
      provider: PROVIDER,
      type: lead.type,
      locale: lead.locale,
      id: result.data?.id || "sent",
      mode: "live",
    });

    return { ok: true, id: result.data?.id || "sent", mode: "live" };
  } catch (error) {
    const hint =
      error instanceof Error ? error.message.slice(0, 160) : "unknown_error";
    console.error("[leads] provider_error", {
      category: "provider_error",
      code: "EMAIL_DELIVERY_REJECTED",
      provider: PROVIDER,
      type: lead.type,
      locale: lead.locale,
      hint,
    });
    return {
      ok: false,
      category: "provider_error",
      code: "EMAIL_DELIVERY_REJECTED",
      hint,
    };
  }
}
