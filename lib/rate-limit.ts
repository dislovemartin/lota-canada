import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!
});

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export async function rateLimit(
  identifier: string,
  limit = 100, // requests per window
  window = 60 * 60 // 1 hour in seconds
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`;
  const now = Math.floor(Date.now() / 1000);
  
  const pipeline = redis.pipeline();
  pipeline.incr(key);
  pipeline.expire(key, window);
  
  const [count] = await pipeline.exec();
  
  const remaining = limit - (count as number);
  const reset = now + window;
  
  return {
    success: remaining > 0,
    limit,
    remaining: Math.max(0, remaining),
    reset
  };
} 