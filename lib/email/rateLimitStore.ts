import { createHash, randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

export type RateLimitStoreKind = "upstash" | "filesystem" | "memory";

export type RateLimitStore = {
  kind: RateLimitStoreKind;
  /** True when shared across instances / restarts (Upstash) or process-durable (filesystem). */
  durable: boolean;
  incr(key: string, windowSec: number): Promise<{ count: number; ttlSec: number }>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSec: number): Promise<void>;
};

type MemoryEntry = { value: string; expiresAt: number };

type UpstashRedis = {
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<unknown>;
  ttl(key: string): Promise<number>;
  get<T = string>(key: string): Promise<T | null>;
  set(key: string, value: string, opts: { ex: number }): Promise<unknown>;
};

const memory = new Map<string, MemoryEntry>();
let warnedEphemeral = false;
let warnedMissingUpstash = false;
let storeSingleton: RateLimitStore | null = null;

function pruneMemory(now: number) {
  for (const [key, entry] of memory) {
    if (entry.expiresAt <= now) memory.delete(key);
  }
}

function createMemoryStore(): RateLimitStore {
  if (!warnedEphemeral) {
    warnedEphemeral = true;
    console.warn(
      "[rate-limit] Using ephemeral in-memory store. Not shared across instances and resets on restart. Configure UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN for production.",
    );
  }

  return {
    kind: "memory",
    durable: false,
    async incr(key, windowSec) {
      const now = Date.now();
      pruneMemory(now);
      const existing = memory.get(key);
      if (!existing || existing.expiresAt <= now) {
        memory.set(key, { value: "1", expiresAt: now + windowSec * 1000 });
        return { count: 1, ttlSec: windowSec };
      }
      const count = Number(existing.value || "0") + 1;
      existing.value = String(count);
      const ttlSec = Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
      return { count, ttlSec };
    },
    async get(key) {
      const now = Date.now();
      pruneMemory(now);
      const entry = memory.get(key);
      if (!entry || entry.expiresAt <= now) return null;
      return entry.value;
    },
    async set(key, value, ttlSec) {
      memory.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
    },
  };
}

function fsRoot(): string {
  const configured = process.env.RATE_LIMIT_FS_DIR?.trim();
  if (configured) return configured;
  return path.join(os.tmpdir(), "offmarket-rate-limit");
}

function safeFsName(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

function createFilesystemStore(): RateLimitStore {
  const root = fsRoot();
  console.info("[rate-limit] Using filesystem store", { durable: true, shared: false });

  async function ensureRoot() {
    await fs.mkdir(root, { recursive: true });
  }

  async function readEntry(key: string): Promise<{ value: string; expiresAt: number } | null> {
    const file = path.join(root, `${safeFsName(key)}.json`);
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(raw) as { value?: string; expiresAt?: number };
      if (!parsed || typeof parsed.value !== "string" || typeof parsed.expiresAt !== "number") {
        return null;
      }
      if (parsed.expiresAt <= Date.now()) {
        await fs.unlink(file).catch(() => undefined);
        return null;
      }
      return { value: parsed.value, expiresAt: parsed.expiresAt };
    } catch {
      return null;
    }
  }

  async function writeEntry(key: string, value: string, expiresAt: number) {
    await ensureRoot();
    const file = path.join(root, `${safeFsName(key)}.json`);
    const tmp = `${file}.${randomBytes(4).toString("hex")}.tmp`;
    await fs.writeFile(tmp, JSON.stringify({ value, expiresAt }), "utf8");
    await fs.rename(tmp, file);
  }

  return {
    kind: "filesystem",
    durable: true,
    async incr(key, windowSec) {
      const now = Date.now();
      const existing = await readEntry(key);
      if (!existing) {
        await writeEntry(key, "1", now + windowSec * 1000);
        return { count: 1, ttlSec: windowSec };
      }
      const count = Number(existing.value || "0") + 1;
      await writeEntry(key, String(count), existing.expiresAt);
      const ttlSec = Math.max(1, Math.ceil((existing.expiresAt - now) / 1000));
      return { count, ttlSec };
    },
    async get(key) {
      const entry = await readEntry(key);
      return entry?.value ?? null;
    },
    async set(key, value, ttlSec) {
      await writeEntry(key, value, Date.now() + ttlSec * 1000);
    },
  };
}

function loadUpstashRedis(url: string, token: string): UpstashRedis | null {
  try {
    // Lazy load so a missing local install does not break Next.js module
    // resolution at compile time. The package remains in package.json —
    // run `npm install` to enable the Upstash backend.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(/* webpackIgnore: true */ "@upstash/redis") as {
      Redis: new (opts: { url: string; token: string }) => UpstashRedis;
    };
    return new mod.Redis({ url, token });
  } catch {
    if (!warnedMissingUpstash && process.env.NODE_ENV !== "production") {
      warnedMissingUpstash = true;
      console.warn(
        "[rate-limit] @upstash/redis is not installed. Run `npm install`, then restart. Falling back to filesystem store.",
      );
    }
    return null;
  }
}

function createUpstashStore(redis: UpstashRedis): RateLimitStore {
  console.info("[rate-limit] Using Upstash Redis store", { durable: true, shared: true });

  return {
    kind: "upstash",
    durable: true,
    async incr(key, windowSec) {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSec);
        return { count, ttlSec: windowSec };
      }
      const ttl = await redis.ttl(key);
      const ttlSec = ttl > 0 ? ttl : windowSec;
      if (ttl < 0) {
        await redis.expire(key, windowSec);
      }
      return { count, ttlSec };
    },
    async get(key) {
      const value = await redis.get<string>(key);
      if (value == null) return null;
      return typeof value === "string" ? value : String(value);
    },
    async set(key, value, ttlSec) {
      await redis.set(key, value, { ex: ttlSec });
    },
  };
}

/**
 * Resolves the rate-limit store.
 *
 * Priority:
 * 1. Upstash Redis when URL + token are set (best for multi-instance)
 * 2. Explicit memory store (local/dev only — RATE_LIMIT_ALLOW_MEMORY=1)
 * 3. Filesystem store (default for single-node Hostinger production)
 */
export function getRateLimitStore(): RateLimitStore {
  if (storeSingleton) return storeSingleton;

  const allowMemory = process.env.RATE_LIMIT_ALLOW_MEMORY === "1";
  const mode = (process.env.RATE_LIMIT_STORE || "").trim().toLowerCase();
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token) {
    const redis = loadUpstashRedis(url, token);
    if (redis) {
      storeSingleton = createUpstashStore(redis);
      return storeSingleton;
    }
    console.warn(
      "[rate-limit] Upstash credentials present but client failed to load; falling back",
    );
  }

  if (mode === "memory" || allowMemory) {
    storeSingleton = createMemoryStore();
    return storeSingleton;
  }

  // Hostinger / single Node: durable local counters without Redis.
  if (!warnedMissingUpstash && process.env.NODE_ENV === "production" && !url) {
    warnedMissingUpstash = true;
    console.warn(
      "[rate-limit] Upstash unset — using filesystem store. Add UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN for multi-instance deployments.",
    );
  }

  storeSingleton = createFilesystemStore();
  return storeSingleton;
}

/** Test helper — reset singleton between cases. */
export function resetRateLimitStoreForTests(): void {
  storeSingleton = null;
  memory.clear();
  warnedEphemeral = false;
  warnedMissingUpstash = false;
}
