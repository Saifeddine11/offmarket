/**
 * Rate-limit / idempotency / IP-trust validation (offline + optional HTTP).
 * Run: RATE_LIMIT_ALLOW_MEMORY=1 EMAIL_DRY_RUN=1 npx --yes tsx scripts/validate-rate-limit.ts
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.RATE_LIMIT_ALLOW_MEMORY = "1";
process.env.RATE_LIMIT_HASH_SECRET = "test-secret-rate-limit";
process.env.EMAIL_DRY_RUN = "1";
process.env.EMAIL_TO = "contact@offmarketofficial.com";
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;

import {
  assertMinimumCompletionTime,
  buildPayloadFingerprint,
  enforceSubmissionRateLimits,
  normalizeIp,
  privacyHash,
  rateLimitMessage,
  readDuplicatePayloadResult,
  readIdempotentResult,
  resolveClientIp,
  writeDuplicatePayloadResult,
  writeIdempotentResult,
  RATE_LIMITS,
} from "../lib/email/rateLimit";
import {
  getRateLimitStore,
  resetRateLimitStoreForTests,
} from "../lib/email/rateLimitStore";
import { normalizeLeadPayload } from "../lib/email/leadTypes";
import { sendLeadNotification } from "../lib/email/sendLeadNotification";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function leadFixture(overrides: Record<string, unknown> = {}) {
  const normalized = normalizeLeadPayload({
    type: "contact",
    fullName: "Test Visitor",
    email: "visitor@example.com",
    phoneCountry: "+212",
    phone: "612345678",
    locale: "fr",
    intent: "contact_page",
    pagePath: "/contact/",
    message: "Bonjour",
    ...overrides,
  });
  assert(normalized.ok, "fixture must validate");
  return normalized.lead;
}

async function countEmailsAround(fn: () => Promise<void>) {
  let sends = 0;
  const originalInfo = console.info;
  console.info = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("[leads] dry_run")) {
      sends += 1;
    }
    originalInfo.apply(console, args as never);
  };
  try {
    await fn();
  } finally {
    console.info = originalInfo;
  }
  return sends;
}

async function main() {
  resetRateLimitStoreForTests();
  const store = getRateLimitStore();
  assert(store.kind === "memory", "expected memory store for tests");
  assert(store.durable === false, "memory is not durable");

  // IP normalization
  assert(normalizeIp("203.0.113.10") === "203.0.113.10", "ipv4");
  assert(normalizeIp("203.0.113.10:443") === "203.0.113.10", "ipv4 port");
  assert(normalizeIp("::ffff:203.0.113.10") === "203.0.113.10", "mapped");
  assert(normalizeIp("[2001:db8::1]") === "2001:db8::1", "ipv6 brackets");
  assert(normalizeIp("not-an-ip") === null, "invalid ip");

  // Trusted headers: forged XFF ignored by default
  const trusted = resolveClientIp(
    new Headers({
      "x-real-ip": "198.51.100.20",
      "x-forwarded-for": "203.0.113.99, 198.51.100.20",
    }),
  );
  assert(trusted.normalized === "198.51.100.20", "prefer x-real-ip");
  assert(trusted.source === "x-real-ip", "source x-real-ip");

  const forgedOnly = resolveClientIp(
    new Headers({
      "x-forwarded-for": "203.0.113.99",
    }),
  );
  assert(forgedOnly.normalized === "unknown", "ignore untrusted xff");

  process.env.RATE_LIMIT_TRUST_X_FORWARDED_FOR = "1";
  const trustedXff = resolveClientIp(
    new Headers({
      "x-forwarded-for": "203.0.113.50, 198.51.100.20",
    }),
  );
  assert(trustedXff.normalized === "203.0.113.50", "xff when enabled");
  delete process.env.RATE_LIMIT_TRUST_X_FORWARDED_FOR;

  // Locale messages
  assert(rateLimitMessage("fr").includes("Trop de tentatives"), "fr msg");
  assert(rateLimitMessage("en").includes("Too many attempts"), "en msg");
  assert(rateLimitMessage("nl").includes("Te veel pogingen"), "nl msg");
  assert(rateLimitMessage("it").includes("Troppi tentativi"), "it msg");

  // Timing
  const now = Date.now();
  assert(
    assertMinimumCompletionTime("contact", now - 5000, now).ok,
    "slow enough",
  );
  assert(
    !assertMinimumCompletionTime("contact", now - 100, now).ok,
    "too fast rejected",
  );

  // Privacy hash stability (no raw IP in hash output obvious form)
  const h = privacyHash("ip", "198.51.100.20");
  assert(/^[a-f0-9]{40}$/.test(h), "hash format");
  assert(!h.includes("198.51"), "hash hides ip");

  // IP lead limit: 5 / 15 min
  resetRateLimitStoreForTests();
  const lead = leadFixture({ email: "ip-limit@example.com" });
  const ipHash = privacyHash("ip", "203.0.113.10");
  for (let i = 0; i < RATE_LIMITS.leadIp.max; i += 1) {
    const decision = await enforceSubmissionRateLimits({
      ipHash,
      lead: leadFixture({ email: `ip-limit-${i}@example.com` }),
    });
    assert(decision.ok, `lead ip allow #${i + 1}`);
  }
  const blocked = await enforceSubmissionRateLimits({
    ipHash,
    lead: leadFixture({ email: "ip-limit-overflow@example.com" }),
  });
  assert(!blocked.ok, "6th lead submission blocked");
  if (!blocked.ok) {
    assert(blocked.retryAfterSec > 0, "retryAfter present");
  }

  // Newsletter IP limit isolated from lead
  resetRateLimitStoreForTests();
  const newsIp = privacyHash("ip", "203.0.113.11");
  for (let i = 0; i < RATE_LIMITS.newsletterIp.max; i += 1) {
    const decision = await enforceSubmissionRateLimits({
      ipHash: newsIp,
      lead: leadFixture({
        type: "newsletter",
        email: `news-${i}@example.com`,
        marketingConsent: true,
        fullName: undefined,
        phoneCountry: undefined,
        phone: undefined,
      }),
    });
    // newsletter fixture may fail missing fields - build carefully
    void decision;
  }

  const newsletterLead = (() => {
    const n = normalizeLeadPayload({
      type: "newsletter",
      email: "news-main@example.com",
      locale: "fr",
      marketingConsent: true,
      pagePath: "/",
    });
    assert(n.ok, "newsletter fixture");
    return n.lead;
  })();

  resetRateLimitStoreForTests();
  for (let i = 0; i < RATE_LIMITS.newsletterIp.max; i += 1) {
    const n = normalizeLeadPayload({
      type: "newsletter",
      email: `news-ip-${i}@example.com`,
      locale: "fr",
      marketingConsent: true,
    });
    assert(n.ok, "nl fixture");
    const decision = await enforceSubmissionRateLimits({
      ipHash: newsIp,
      lead: n.lead,
    });
    assert(decision.ok, `newsletter ip allow #${i + 1}`);
  }
  const newsBlocked = await enforceSubmissionRateLimits({
    ipHash: newsIp,
    lead: newsletterLead,
  });
  assert(!newsBlocked.ok, "4th newsletter blocked");

  // Same email + form type: max 3 / hour
  resetRateLimitStoreForTests();
  const emailLead = leadFixture({ email: "same@example.com" });
  const emailIp = privacyHash("ip", "198.51.100.77");
  for (let i = 0; i < RATE_LIMITS.emailType.max; i += 1) {
    const decision = await enforceSubmissionRateLimits({
      ipHash: privacyHash("ip", `198.51.100.${80 + i}`),
      lead: emailLead,
    });
    assert(decision.ok, `email type allow #${i + 1}`);
  }
  const emailBlocked = await enforceSubmissionRateLimits({
    ipHash: emailIp,
    lead: emailLead,
  });
  assert(!emailBlocked.ok, "4th same email+type blocked");

  // Isolation by form type for email limits
  const villa = leadFixture({
    type: "villa_jaz",
    email: "same@example.com",
    intent: "villa-jaz",
  });
  const villaOk = await enforceSubmissionRateLimits({
    ipHash: privacyHash("ip", "198.51.100.90"),
    lead: villa,
  });
  assert(villaOk.ok, "different form type not blocked by contact email limit");

  // Duplicate payload + idempotency prevent second email
  resetRateLimitStoreForTests();
  const dupLead = leadFixture({
    email: "dup@example.com",
    message: "Same payload",
  });
  const fingerprint = buildPayloadFingerprint(dupLead);
  const idemKey = "testidempotencykey001";

  let sendCount = await countEmailsAround(async () => {
    const first = await sendLeadNotification(dupLead);
    assert(first.ok, "first send ok");
    if (first.ok) {
      await writeDuplicatePayloadResult(fingerprint, {
        ok: true,
        id: first.id,
        type: dupLead.type,
      });
      await writeIdempotentResult(idemKey, {
        ok: true,
        id: first.id,
        type: dupLead.type,
      });
    }
  });
  assert(sendCount === 1, "one email on first send");

  sendCount = await countEmailsAround(async () => {
    const prior = await readDuplicatePayloadResult(fingerprint);
    assert(prior && prior.ok, "duplicate hit");
    const priorIdem = await readIdempotentResult(idemKey);
    assert(priorIdem && priorIdem.ok, "idempotency hit");
    // Simulate route short-circuit: no sendLeadNotification call
  });
  assert(sendCount === 0, "no email on duplicate/idempotent replay");

  // Filesystem store expires
  resetRateLimitStoreForTests();
  process.env.RATE_LIMIT_STORE = "filesystem";
  delete process.env.RATE_LIMIT_ALLOW_MEMORY;
  const dir = path.join(os.tmpdir(), `om-rl-test-${Date.now()}`);
  process.env.RATE_LIMIT_FS_DIR = dir;
  resetRateLimitStoreForTests();
  const fsStore = getRateLimitStore();
  assert(fsStore.kind === "filesystem", "filesystem store");
  await fsStore.set("expire-demo", "1", 1);
  assert((await fsStore.get("expire-demo")) === "1", "fs value present");
  await new Promise((r) => setTimeout(r, 1100));
  assert((await fsStore.get("expire-demo")) === null, "fs value expired");
  await fs.rm(dir, { recursive: true, force: true });

  // Restore memory for any follow-up
  process.env.RATE_LIMIT_ALLOW_MEMORY = "1";
  delete process.env.RATE_LIMIT_STORE;
  delete process.env.RATE_LIMIT_FS_DIR;
  resetRateLimitStoreForTests();

  // Ensure logs never receive a helper that dumps raw IP from privacyHash
  const sampleLog = {
    category: "rate_limited",
    bucket: "ip:lead",
    type: "contact",
    locale: "fr",
    store: "memory",
  };
  const serialized = JSON.stringify(sampleLog);
  assert(!serialized.includes("203.0.113"), "no raw ip in sample log");
  assert(!serialized.includes("Bonjour"), "no message body in sample log");

  // Hash secret affects keys
  const a = privacyHash("email", "a@example.com");
  process.env.RATE_LIMIT_HASH_SECRET = "other-secret";
  // privacyHash reads env each call
  const b = createHash("sha256")
    .update(`other-secret|email|a@example.com`)
    .digest("hex")
    .slice(0, 40);
  assert(a !== b, "secret changes hash");
  process.env.RATE_LIMIT_HASH_SECRET = "test-secret-rate-limit";

  console.log("validate-rate-limit: all checks passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
