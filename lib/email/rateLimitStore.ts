import { createHash, randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import { Redis } from "@upstash/redis";

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

const memory = new Map<string, MemoryEntry>();
let warnedEphemeral = false;
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

function createUpstashStore(url: string, token: string): RateLimitStore {
  const redis = new Redis({ url, token });
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
 * Prefer Upstash when configured. Otherwise filesystem (single-node durable),
 * then memory only when explicitly allowed for local/dev.
 */
export function getRateLimitStore(): RateLimitStore {
  if (storeSingleton) return storeSingleton;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (url && token) {
    storeSingleton = createUpstashStore(url, token);
    return storeSingleton;
  }

  const mode = (process.env.RATE_LIMIT_STORE || "").trim().toLowerCase();
  if (mode === "memory" || process.env.RATE_LIMIT_ALLOW_MEMORY === "1") {
    storeSingleton = createMemoryStore();
    return storeSingleton;
  }

  // Default for Hostinger single Node instance: filesystem-backed counters.
  storeSingleton = createFilesystemStore();
  return storeSingleton;
}

/** Test helper — reset singleton between cases. */
export function resetRateLimitStoreForTests(): void {
  storeSingleton = null;
  memory.clear();
  warnedEphemeral = false;
}
