/**
 * Vite插件：为代理API添加限流
 */

import type { Plugin } from 'vite';
import { rateLimitMiddleware, selectRateLimitConfig } from './rateLimiter';

export function proxyRateLimitPlugin(): Plugin {
  return {
    name: 'proxy-rate-limit-plugin',
    configureServer(server) {
      // 在代理之前应用限流中间件
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // 检查是否是需要限流的代理路径
        const shouldRateLimit =
          url.startsWith('/api/waifu') ||
          url.startsWith('/proxy/waifu-img') ||
          url.startsWith('/api/waifu-im');

        if (!shouldRateLimit) {
          return next();
        }

        // 选择对应的限流配置
        const rateLimitConfig = selectRateLimitConfig(url);
        const rateLimitHandler = rateLimitMiddleware(rateLimitConfig);

        // 应用限流
        rateLimitHandler(req, res, next);
      });
    },
  };
}
