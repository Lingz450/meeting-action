/**
 * Simple in-memory rate limiter
 * For production, use Redis or a proper rate limiting service
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if request is within rate limit
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 60, windowMs: 60000 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  // Clean up expired entries
  if (store[key] && store[key].resetAt < now) {
    delete store[key];
  }

  // Initialize or get current state
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetAt: now + config.windowMs,
    };
  }

  const current = store[key];

  // Check if limit exceeded
  if (current.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: current.resetAt,
    };
  }

  // Increment count
  current.count++;

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - current.count,
    reset: current.resetAt,
  };
}

/**
 * Clean up old rate limit entries (run periodically)
 */
export function cleanupRateLimits() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}

// Cleanup every 10 minutes
setInterval(cleanupRateLimits, 10 * 60 * 1000);

