import { existsSync } from "node:fs";

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const SENDMAIL_CANDIDATES = [
  "/usr/sbin/sendmail",
  "/usr/bin/sendmail",
  "/usr/lib/sendmail",
] as const;

export type NativeMailTransportKind = "sendmail" | "local_mta" | "unavailable";

export type NativeMailTransport = {
  kind: Exclude<NativeMailTransportKind, "unavailable">;
  path?: string;
  transporter: Transporter;
};

function resolveSendmailPath(): string | null {
  for (const candidate of SENDMAIL_CANDIDATES) {
    try {
      if (existsSync(candidate)) return candidate;
    } catch {
      // ignore filesystem probe errors
    }
  }
  return null;
}

/**
 * Hostinger-native mail only:
 * 1) local sendmail binary
 * 2) unauthenticated local MTA on 127.0.0.1:25
 *
 * No API keys, SMTP passwords, or env-based credentials.
 */
export function createNativeMailTransport(): NativeMailTransport {
  const sendmailPath = resolveSendmailPath();
  if (sendmailPath) {
    return {
      kind: "sendmail",
      path: sendmailPath,
      transporter: nodemailer.createTransport({
        sendmail: true,
        newline: "unix",
        path: sendmailPath,
      }),
    };
  }

  // Many Hostinger / cPanel Node hosts relay via the local MTA on port 25.
  return {
    kind: "local_mta",
    transporter: nodemailer.createTransport({
      host: "127.0.0.1",
      port: 25,
      secure: false,
      ignoreTLS: true,
      // Intentionally no auth — server-local submission only.
    }),
  };
}

export function probeNativeMailAvailability(): {
  kind: NativeMailTransportKind;
  sendmailPath: string | null;
} {
  const sendmailPath = resolveSendmailPath();
  if (sendmailPath) {
    return { kind: "sendmail", sendmailPath };
  }
  return { kind: "local_mta", sendmailPath: null };
}
