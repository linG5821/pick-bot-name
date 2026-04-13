/**
 * Vite插件：API路由处理
 */

import type { Plugin } from 'vite';
import { rateLimitMiddleware, selectRateLimitConfig } from './rateLimiter';

export function apiPlugin(): Plugin {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 只处理API请求
        if (!req.url?.startsWith('/api/pick-bot-name')) {
          return next();
        }

        // 应用限流中间件
        const rateLimitConfig = selectRateLimitConfig(req.url);
        const rateLimitHandler = rateLimitMiddleware(rateLimitConfig);

        // 使用 Promise 处理限流检查
        await new Promise<void>((resolve) => {
          rateLimitHandler(req, res, () => {
            // 如果限流通过，继续处理
            resolve();
          });
        });

        // 如果限流中间件已经响应了（返回429），直接返回
        if (res.writableEnded) {
          return;
        }

        // 解析查询参数
        const url = new URL(req.url, `http://${req.headers.host}`);
        const style = url.searchParams.get('style');
        const language = url.searchParams.get('language') as 'zh' | 'en';

        // 验证参数
        if (!style || !language) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: false,
            error: 'Missing required parameters: style and language',
          }));
          return;
        }

        try {
          // 动态导入API模块
          const { pickBotName } = await server.ssrLoadModule('/src/api/pickBotName.ts');

          // 调用API函数
          const result = pickBotName({ style, language });

          // 返回JSON响应
          res.statusCode = result.success ? 200 : 400;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(result));
        } catch (error) {
          console.error('API Error:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
          }));
        }
      });
    },
  };
}
