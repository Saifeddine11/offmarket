import { buildLeadNotificationEmail } from "@/lib/email/leadNotificationTemplate";
import type { NormalizedLead } from "@/lib/email/leadTypes";

const DEFAULT_TO = "contact@offmarketofficial.com";
const DEFAULT_FROM = "OFF MARKET Website <notifications@offmarketofficial.com>";

export type SendLeadResult =
  | { ok: true; id: string }
  | { ok: false; category: "not_configured" | "provider_error" };

type ResendClient = {
  emails: {
    send: (payload: {
      from: string;
      to: string[];
      replyTo: string;
      subject: string;
      html: string;
      text: string;
    }) => Promise<{ data?: { id?: string } | null; error?: unknown }>;
  };
};

function getResendClient(): ResendClient | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  try {
    // Lazy load so a missing local install does not break Next.js builds
    // before `npm install`. Package remains listed in package.json.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend } = require(/* webpackIgnore: true */ "resend") as {
      Resend: new (apiKey: string) => ResendClient;
    };
    return new Resend(key);
  } catch {
    console.warn(
      "[leads] resend is not installed. Run `npm install`, then restart.",
    );
    return null;
  }
}

/**
 * Sends one internal notification to the fixed OFF MARKET inbox.
 * Recipient is never taken from the client payload.
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
): Promise<SendLeadResult> {
  const to = DEFAULT_TO;
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
