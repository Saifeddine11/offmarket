import { createHash, randomUUID } from "node:crypto";

import type { LeadSubmissionType, NormalizedLead } from "@/lib/email/leadTypes";
import {
  getRateLimitStore,
  type RateLimitStore,
} from "@/lib/email/rateLimitStore";

export const RATE_LIMITS = {
  leadIp: { max: 5, windowSec: 15 * 60 },
  newsletterIp: { max: 3, windowSec: 30 * 60 },
  emailType: { max: 3, windowSec: 60 * 60 },
  duplicatePayload: { windowSec: 10 * 60 },
  idempotency: { windowSec: 15 * 60 },
} as const;

export const MIN_FORM_MS = {
  lead: 2500,
  newsletter: 1500,
} as const;

export type ClientIpResult = {
  /** Privacy-safe identifier (never log the raw value in production paths). */
  ipHash: string;
  /** Normalized IP used only transiently for hashing — not persisted. */
  normalized: string;
  source: "x-real-ip" | "cf-connecting-ip" | "x-forwarded-for" | "unknown";
};

function hashSecret(): string {
  return (
    process.env.RATE_LIMIT_HASH_SECRET?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    "offmarket-local-rate-limit"
  );
}

export function privacyHash(...parts: string[]): string {
  return createHash("sha256")
    .update(`${hashSecret()}|${parts.join("|")}`)
    .digest("hex")
    .slice(0, 40);
}

export function normalizeIp(raw: string): string | null {
  let value = raw.trim().toLowerCase();
  if (!value) return null;

  // Strip surrounding brackets for IPv6 literals: [2001:db8::1]
  if (value.startsWith("[") && value.includes("]")) {
    value = value.slice(1, value.indexOf("]"));
  }

  // Strip optional port from IPv4 host:port
  if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(value)) {
    value = value.replace(/:\d+$/, "");
  }

  // IPv4-mapped IPv6
  if (value.startsWith("::ffff:")) {
    value = value.slice(7);
  }

  const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4.test(value)) {
    const octets = value.split(".").map((part) => Number(part));
    if (octets.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return null;
    return octets.join(".");
  }

  // Basic IPv6 validation (compressed forms allowed)
  if (value.includes(":") && /^[0-9a-f:]+$/.test(value) && value.length <= 45) {
    return value;
  }

  return null;
}

/**
 * Resolve client IP from trusted hosting proxy headers only.
 * Default trust order for Hostinger/nginx: x-real-ip, then cf-connecting-ip.
 * X-Forwarded-For is ignored unless RATE_LIMIT_TRUST_X_FORWARDED_FOR=1.
 */
export function resolveClientIp(headers: Headers): ClientIpResult {
  const preferred = (process.env.RATE_LIMIT_TRUSTED_IP_HEADER || "x-real-ip")
    .trim()
    .toLowerCase();

  const candidates: Array<{ header: string; source: ClientIpResult["source"] }> = [
    { header: preferred, source: preferred === "cf-connecting-ip" ? "cf-connecting-ip" : "x-real-ip" },
    { header: "x-real-ip", source: "x-real-ip" },
    { header: "cf-connecting-ip", source: "cf-connecting-ip" },
  ];

  if (process.env.RATE_LIMIT_TRUST_X_FORWARDED_FOR === "1") {
    candidates.push({ header: "x-forwarded-for", source: "x-forwarded-for" });
  }

  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (seen.has(candidate.header)) continue;
    seen.add(candidate.header);
    const raw = headers.get(candidate.header);
    if (!raw) continue;

    const first =
      candidate.header === "x-forwarded-for"
        ? raw.split(",")[0]?.trim() || ""
        : raw.trim();
    const normalized = normalizeIp(first);
    if (!normalized) continue;

    return {
      normalized,
      ipHash: privacyHash("ip", normalized),
      source: candidate.source,
    };
  }

  return {
    normalized: "unknown",
    ipHash: privacyHash("ip", "unknown"),
    source: "unknown",
  };
}

/** @deprecated use resolveClientIp — kept for transitional imports */
export function clientIpFromHeaders(headers: Headers): string {
  return resolveClientIp(headers).normalized;
}

export function rateLimitMessage(locale: string): string {
  if (locale === "en") {
    return "Too many attempts. Please try again in a few minutes.";
  }
  if (locale === "nl") {
    return "Te veel pogingen. Probeer het over enkele minuten opnieuw.";
  }
  if (locale === "it") {
    return "Troppi tentativi. Riprova tra qualche minuto.";
  }
  return "Trop de tentatives. Veuillez réessayer dans quelques minutes.";
}

export function formFamily(type: LeadSubmissionType): "newsletter" | "lead" {
  return type === "newsletter" ? "newsletter" : "lead";
}

export function buildPayloadFingerprint(lead: NormalizedLead): string {
  return privacyHash(
    "payload",
    lead.type,
    lead.email,
    lead.fullName || "",
    lead.phoneFull || "",
    lead.message || "",
    lead.intent || "",
    lead.propertyType || "",
    lead.budget || "",
    lead.objective || "",
    lead.source || "",
    lead.locale,
  );
}

export function sanitizeIdempotencyKey(raw: unknown): string | null {
  const value = String(raw ?? "")
    .trim()
    .slice(0, 80);
  if (!value) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  return value;
}

export function parseFormStartedAt(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && /^\d{10,16}$/.test(raw.trim())) {
    return Number(raw.trim());
  }
  return null;
}

export function assertMinimumCompletionTime(
  type: LeadSubmissionType,
  formStartedAt: number | null,
  now = Date.now(),
): { ok: true } | { ok: false; reason: "too_fast" | "missing_started_at" } {
  const minMs = type === "newsletter" ? MIN_FORM_MS.newsletter : MIN_FORM_MS.lead;
  if (formStartedAt == null) {
    // Missing timestamp: treat as suspicious but do not hard-block offline scripts
    // unless RATE_LIMIT_REQUIRE_STARTED_AT=1.
    if (process.env.RATE_LIMIT_REQUIRE_STARTED_AT === "1") {
      return { ok: false, reason: "missing_started_at" };
    }
    return { ok: true };
  }
  if (formStartedAt > now + 5000) {
    return { ok: false, reason: "too_fast" };
  }
  if (now - formStartedAt < minMs) {
    return { ok: false, reason: "too_fast" };
  }
  // Reject absurdly old timestamps (replay)
  if (now - formStartedAt > 1000 * 60 * 60 * 6) {
    return { ok: false, reason: "too_fast" };
  }
  return { ok: true };
}

export type RateLimitDecision =
  | { ok: true }
  | { ok: false; retryAfterSec: number; bucket: string };

async function consumeWindow(
  store: RateLimitStore,
  key: string,
  max: number,
  windowSec: number,
  bucket: string,
): Promise<RateLimitDecision> {
  const { count, ttlSec } = await store.incr(key, windowSec);
  if (count > max) {
    return { ok: false, retryAfterSec: ttlSec, bucket };
  }
  return { ok: true };
}

export async function enforceSubmissionRateLimits(input: {
  ipHash: string;
  lead: NormalizedLead;
}): Promise<RateLimitDecision> {
  const store = getRateLimitStore();
  const family = formFamily(input.lead.type);

  const ipLimit =
    family === "newsletter" ? RATE_LIMITS.newsletterIp : RATE_LIMITS.leadIp;
  const ipKey = `rl:ip:${family}:${input.ipHash}`;
  const ipDecision = await consumeWindow(
    store,
    ipKey,
    ipLimit.max,
    ipLimit.windowSec,
    `ip:${family}`,
  );
  if (!ipDecision.ok) return ipDecision;

  const emailHash = privacyHash("email", input.lead.email);
  const emailKey = `rl:email:${input.lead.type}:${emailHash}`;
  const emailDecision = await consumeWindow(
    store,
    emailKey,
    RATE_LIMITS.emailType.max,
    RATE_LIMITS.emailType.windowSec,
    `email:${input.lead.type}`,
  );
  if (!emailDecision.ok) return emailDecision;

  return { ok: true };
}

export type IdempotencyRecord = {
  ok: true;
  id: string;
  type: LeadSubmissionType;
  duplicate?: boolean;
};

export async function readIdempotentResult(
  idempotencyKey: string | null,
): Promise<IdempotencyRecord | null> {
  if (!idempotencyKey) return null;
  const store = getRateLimitStore();
  const raw = await store.get(`idem:${privacyHash("idem", idempotencyKey)}`);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as IdempotencyRecord;
    if (parsed && parsed.ok === true && typeof parsed.id === "string") {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export async function writeIdempotentResult(
  idempotencyKey: string | null,
  result: IdempotencyRecord,
): Promise<void> {
  if (!idempotencyKey) return;
  const store = getRateLimitStore();
  await store.set(
    `idem:${privacyHash("idem", idempotencyKey)}`,
    JSON.stringify(result),
    RATE_LIMITS.idempotency.windowSec,
  );
}

export async function readDuplicatePayloadResult(
  fingerprint: string,
): Promise<IdempotencyRecord | null> {
  const store = getRateLimitStore();
  const raw = await store.get(`dup:${fingerprint}`);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as IdempotencyRecord;
    if (parsed && parsed.ok === true && typeof parsed.id === "string") {
      return { ...parsed, duplicate: true };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export async function writeDuplicatePayloadResult(
  fingerprint: string,
  result: IdempotencyRecord,
): Promise<void> {
  const store = getRateLimitStore();
  await store.set(
    `dup:${fingerprint}`,
    JSON.stringify(result),
    RATE_LIMITS.duplicatePayload.windowSec,
  );
}

export function newIdempotencyKey(): string {
  return randomUUID().replace(/-/g, "");
}
