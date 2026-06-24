/**
 * Sliding-window rate limiter.
 *
 * Backed by an in-memory Map — sufficient for a single-instance deployment.
 * To scale horizontally, replace the Map operations with:
 *   Redis ZADD / ZREMRANGEBYSCORE / ZCARD
 * using a client like Upstash Redis (@upstash/redis) with no changes to callers.
 */

type Window = number[]; // UTC timestamps of requests in the window

const store = new Map<string, Window>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number; // epoch ms when the oldest request leaves the window
};

export type RateLimitConfig = {
  /** Max requests allowed within windowMs. */
  limit: number;
  /** Rolling window duration in milliseconds. */
  windowMs: number;
};

const MUTATION_LIMIT: RateLimitConfig = { limit: 30, windowMs: 60_000 };
const AUTH_LIMIT: RateLimitConfig = { limit: 10, windowMs: 60_000 };

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = MUTATION_LIMIT,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - config.windowMs;
  const window = (store.get(key) ?? []).filter((t) => t > cutoff);

  const allowed = window.length < config.limit;
  if (allowed) {
    window.push(now);
    store.set(key, window);
  }

  return {
    allowed,
    remaining: Math.max(0, config.limit - window.length),
    resetAt: (window[0] ?? now) + config.windowMs,
  };
}

export { MUTATION_LIMIT, AUTH_LIMIT };
