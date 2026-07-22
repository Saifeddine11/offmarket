import { NextRequest, NextResponse } from "next/server";

import { normalizeLeadPayload } from "@/lib/email/leadTypes";
import {
  assertMinimumCompletionTime,
  buildPayloadFingerprint,
  enforceSubmissionRateLimits,
  parseFormStartedAt,
  rateLimitMessage,
  readDuplicatePayloadResult,
  readIdempotentResult,
  resolveClientIp,
  sanitizeIdempotencyKey,
  writeDuplicatePayloadResult,
  writeIdempotentResult,
  type IdempotencyRecord,
} from "@/lib/email/rateLimit";
import { getRateLimitStore } from "@/lib/email/rateLimitStore";
import { sendLeadNotification } from "@/lib/email/sendLeadNotification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function genericError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function rateLimitedResponse(locale: string, retryAfterSec: number) {
  const retry = Math.max(1, Math.ceil(retryAfterSec));
  return NextResponse.json(
    {
      ok: false,
      error: "rate_limited",
      message: rateLimitMessage(locale),
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retry),
      },
    },
  );
}

function successResponse(result: IdempotencyRecord) {
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const ip = resolveClientIp(request.headers);
  // Raw IP is not logged — only hashed category metadata.

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return genericError(400, "invalid_json");
  }

  let localeHint = "fr";
  let idempotencyKey: string | null = null;
  let formStartedAt: number | null = null;

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const body = raw as Record<string, unknown>;
    // Never accept client-controlled recipients.
    delete body.to;
    delete body.recipient;
    delete body.emailTo;
    delete body.from;

    localeHint = String(body.locale || "fr").toLowerCase().slice(0, 8) || "fr";
    idempotencyKey = sanitizeIdempotencyKey(body.idempotencyKey);
    formStartedAt = parseFormStartedAt(body.formStartedAt);
  }

  const normalized = normalizeLeadPayload(raw);
  if (!normalized.ok) {
    if (normalized.error === "spam_rejected") {
      return NextResponse.json({ ok: true, id: "ignored" });
    }
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }

  const lead = normalized.lead;
  localeHint = lead.locale || localeHint;

  const timing = assertMinimumCompletionTime(lead.type, formStartedAt);
  if (!timing.ok) {
    // Do not reveal timing heuristics — treat like ignored spam.
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  try {
    // Resolve before idempotency/duplicate reads so production never proceeds
    // without a shared rate-limit backend.
    getRateLimitStore();
  } catch {
    console.error("[api/leads] rate-limit unavailable", {
      category: "rate_limit_unavailable",
      type: lead.type,
      locale: lead.locale,
    });
    return genericError(503, "rate_limit_unavailable");
  }

  // Idempotent retries (network) — return prior success, do not re-send.
  const priorIdem = await readIdempotentResult(idempotencyKey);
  if (priorIdem) {
    return successResponse(priorIdem);
  }

  const fingerprint = buildPayloadFingerprint(lead);
  const priorDup = await readDuplicatePayloadResult(fingerprint);
  if (priorDup) {
    if (idempotencyKey) {
      await writeIdempotentResult(idempotencyKey, priorDup);
    }
    return successResponse(priorDup);
  }

  // Rate limits run after validation and before any email / subscription side-effect.
  const limited = await enforceSubmissionRateLimits({
    ipHash: ip.ipHash,
    lead,
  });
  if (!limited.ok) {
    console.error("[api/leads] rate_limited", {
      category: "rate_limited",
      bucket: limited.bucket,
      type: lead.type,
      locale: lead.locale,
      store: getRateLimitStore().kind,
    });
    return rateLimitedResponse(localeHint, limited.retryAfterSec);
  }

  const result = await sendLeadNotification(lead);
  if (!result.ok) {
    console.error("[api/leads] send failed", {
      category: result.category,
      type: lead.type,
      locale: lead.locale,
    });
    return genericError(502, "send_failed");
  }

  const payload: IdempotencyRecord = {
    ok: true,
    id: result.id,
    type: lead.type,
  };

  await writeDuplicatePayloadResult(fingerprint, payload);
  await writeIdempotentResult(idempotencyKey, payload);

  return successResponse(payload);
}
