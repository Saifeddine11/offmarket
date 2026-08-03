import { buildLeadNotificationEmail } from "@/lib/email/leadNotificationTemplate";
import type { NormalizedLead } from "@/lib/email/leadTypes";
import {
  createNativeMailTransport,
  probeNativeMailAvailability,
} from "@/lib/email/nativeMailTransport";

/** Hardcoded OFF MARKET inbox — never accept from the client. */
const RECIPIENT = "contact@offmarketofficial.com";
const SENDER = "OFF MARKET Website <contact@offmarketofficial.com>";

export type SendLeadResult =
  | { ok: true; id: string; transport: "sendmail" | "local_mta" }
  | {
      ok: false;
      category: "not_configured" | "provider_error";
      code: "NATIVE_MAIL_UNAVAILABLE" | "EMAIL_DELIVERY_REJECTED";
      hint?: string;
    };

function isUnavailableError(hint: string): boolean {
  const lower = hint.toLowerCase();
  return (
    lower.includes("econnrefused") ||
    lower.includes("enoent") ||
    lower.includes("connect econnrefused") ||
    lower.includes("spawn") ||
    lower.includes("sendmail")
  );
}

/**
 * Delivers the lead recap through Hostinger server-native mail (sendmail / local MTA).
 * No third-party providers, API keys, passwords, or dry-run simulation.
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
): Promise<SendLeadResult> {
  const { subject, html, text } = buildLeadNotificationEmail(lead);
  const probe = probeNativeMailAvailability();
  const transport = createNativeMailTransport();

  try {
    const info = await transport.transporter.sendMail({
      from: SENDER,
      to: RECIPIENT,
      replyTo: lead.email,
      subject,
      html,
      text,
      envelope: {
        from: "contact@offmarketofficial.com",
        to: RECIPIENT,
      },
    });

    const id =
      (typeof info.messageId === "string" && info.messageId) ||
      (typeof info.response === "string" && info.response.slice(0, 80)) ||
      "sent";

    console.info("[leads] native mail accepted", {
      transport: transport.kind,
      path: transport.path || null,
      probe: probe.kind,
      type: lead.type,
      locale: lead.locale,
      id,
    });

    return { ok: true, id, transport: transport.kind };
  } catch (error) {
    const hint =
      error instanceof Error ? error.message.slice(0, 160) : "unknown_error";
    const unavailable = isUnavailableError(hint);
    console.error("[leads] native mail rejected", {
      category: unavailable ? "not_configured" : "provider_error",
      code: unavailable ? "NATIVE_MAIL_UNAVAILABLE" : "EMAIL_DELIVERY_REJECTED",
      transport: transport.kind,
      path: transport.path || null,
      probe: probe.kind,
      type: lead.type,
      locale: lead.locale,
      hint,
    });
    return {
      ok: false,
      category: unavailable ? "not_configured" : "provider_error",
      code: unavailable ? "NATIVE_MAIL_UNAVAILABLE" : "EMAIL_DELIVERY_REJECTED",
      hint,
    };
  }
}
