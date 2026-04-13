/**
 * UUID生成工具
 */

/**
 * 生成唯一ID
 * 使用crypto.randomUUID()或fallback到timestamp + random
 */
export function generateUniqueId(): string {
  // 优先使用crypto.randomUUID（现代浏览器支持）
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback: 使用timestamp + 随机数 + 计数器
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
}
