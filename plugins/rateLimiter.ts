/**
 * 限流中间件 - 防止API滥用
 * 使用滑动窗口算法进行精确限流
 */

import type { IncomingMessage, ServerResponse } from 'http';

interface RateLimitConfig {
  windowMs: number; // 时间窗口（毫秒）
  maxRequests: number; // 窗口内最大请求数
  message?: string; // 超限提示信息
}

interface RequestRecord {
  timestamps: number[];
}

// 存储每个 IP 的请求记录
const requestStore = new Map<string, RequestRecord>();

// 预定义的限流规则
export const RATE_LIMIT_RULES = {
  // 开发API：每分钟 30 次
  default: {
    windowMs: 60 * 1000,
    maxRequests: 30,
    message: 'Too many requests, please try again later',
  },
} as const;

/**
 * 获取客户端 IP 地址
 */
function getClientIp(req: IncomingMessage): string {
  // 尝试从各种代理头获取真实 IP
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ips = typeof forwarded === 'string' ? forwarded.split(',') : forwarded;
    return ips[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (realIp && typeof realIp === 'string') {
    return realIp.trim();
  }

  return req.socket.remoteAddress || 'unknown';
}

/**
 * 清理过期的请求记录
 */
function cleanupExpiredRecords(
  record: RequestRecord,
  config: RateLimitConfig,
  now: number
): void {
  const cutoffTime = now - config.windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > cutoffTime);
}

/**
 * 检查是否超出限流
 */
function isRateLimited(
  ip: string,
  config: RateLimitConfig,
  now: number = Date.now()
): boolean {
  let record = requestStore.get(ip);

  if (!record) {
    record = { timestamps: [] };
    requestStore.set(ip, record);
  }

  // 清理过期记录
  cleanupExpiredRecords(record, config, now);

  // 检查是否超限
  return record.timestamps.length >= config.maxRequests;
}

/**
 * 记录请求
 */
function recordRequest(ip: string, now: number = Date.now()): void {
  const record = requestStore.get(ip);
  if (record) {
    record.timestamps.push(now);
  }
}

/**
 * 获取剩余请求次数和重置时间
 */
function getRateLimitInfo(
  ip: string,
  config: RateLimitConfig,
  now: number = Date.now()
): { remaining: number; resetTime: number } {
  const record = requestStore.get(ip);

  if (!record || record.timestamps.length === 0) {
    return {
      remaining: config.maxRequests,
      resetTime: now + config.windowMs,
    };
  }

  cleanupExpiredRecords(record, config, now);

  const remaining = Math.max(0, config.maxRequests - record.timestamps.length);
  const oldestTimestamp = record.timestamps[0] || now;
  const resetTime = oldestTimestamp + config.windowMs;

  return { remaining, resetTime };
}

/**
 * 定期清理内存中的过期数据（防止内存泄漏）
 */
function startCleanupTask(): void {
  // 在生产构建时不启动清理任务，避免阻止进程退出
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    const maxWindowMs = Math.max(
      ...Object.values(RATE_LIMIT_RULES).map((rule) => rule.windowMs)
    );

    const originalSize = requestStore.size;

    for (const [ip, record] of requestStore.entries()) {
      // 清理所有过期记录
      record.timestamps = record.timestamps.filter((ts) => ts > now - maxWindowMs);

      // 如果该 IP 没有任何记录了，删除整个条目
      if (record.timestamps.length === 0) {
        requestStore.delete(ip);
      }
    }

    // 只在有实际清理动作时才记录日志
    if (originalSize > requestStore.size) {
      console.log(`[Rate Limiter] Cleanup complete. Active IPs: ${requestStore.size} (cleaned ${originalSize - requestStore.size})`);
    }
  }, 5 * 60 * 1000); // 每 5 分钟清理一次

  // 优雅关闭：清理定时器
  process.on('SIGTERM', () => {
    clearInterval(cleanupInterval);
  });

  process.on('SIGINT', () => {
    clearInterval(cleanupInterval);
  });
}

// 启动清理任务
startCleanupTask();

/**
 * 限流中间件工厂函数
 */
export function rateLimitMiddleware(
  config: RateLimitConfig
): (req: IncomingMessage, res: ServerResponse, next: () => void) => void {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const ip = getClientIp(req);
    const now = Date.now();

    // 检查是否超限
    if (isRateLimited(ip, config, now)) {
      const { resetTime } = getRateLimitInfo(ip, config, now);
      const retryAfter = Math.ceil((resetTime - now) / 1000);

      res.statusCode = 429;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Retry-After', retryAfter.toString());
      res.setHeader('X-RateLimit-Limit', config.maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', resetTime.toString());

      res.end(
        JSON.stringify({
          success: false,
          error: config.message || 'Too many requests',
          retryAfter,
        })
      );

      console.log(`[Rate Limiter] Blocked request from ${ip} (429)`);
      return;
    }

    // 记录请求并添加限流响应头
    recordRequest(ip, now);
    const { remaining, resetTime } = getRateLimitInfo(ip, config, now);

    res.setHeader('X-RateLimit-Limit', config.maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', resetTime.toString());

    next();
  };
}

/**
 * 获取限流规则配置
 * 目前所有开发API端点使用统一限流规则
 */
export function selectRateLimitConfig(): RateLimitConfig {
  return RATE_LIMIT_RULES.default;
}

/**
 * 获取限流统计信息（用于调试）
 */
export function getRateLimitStats(): {
  totalIPs: number;
  records: Array<{ ip: string; requestCount: number }>;
} {
  const records = Array.from(requestStore.entries()).map(([ip, record]) => ({
    ip,
    requestCount: record.timestamps.length,
  }));

  return {
    totalIPs: requestStore.size,
    records: records.sort((a, b) => b.requestCount - a.requestCount).slice(0, 10),
  };
}
