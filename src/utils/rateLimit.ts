// Simple in-memory rate limiter (resets on cold start, which is fine for serverless)
const ipMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // per window per IP

export function rateLimit(ip: string): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { ok: true, retryAfterMs: 0 };
}
