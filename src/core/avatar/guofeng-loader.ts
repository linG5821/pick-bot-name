/**
 * 国风头像加载器 - 从本地图片池随机选择
 */

// 国风头像总数
const GUOFENG_AVATAR_COUNT = 14;

// 本地缓存的国风头像路径
const localGuofengCache: Map<string, string> = new Map();

/**
 * 根据 seed 获取国风头像路径
 * @param seed 种子值（用于生成固定的随机选择）
 * @returns 图片路径
 */
export function getGuofengAvatarUrl(seed: string): string {
  // 检查缓存
  if (localGuofengCache.has(seed)) {
    return localGuofengCache.get(seed)!;
  }

  // 根据 seed 生成确定性的索引（相同 seed 总是返回相同图片）
  const index = hashStringToIndex(seed, GUOFENG_AVATAR_COUNT);
  const avatarPath = `/pick-bot-name/avatars/guofeng/guofeng-${String(index + 1).padStart(2, '0')}.png`;

  // 缓存路径
  localGuofengCache.set(seed, avatarPath);

  return avatarPath;
}

/**
 * 将字符串哈希为索引（确定性）
 * @param str 字符串
 * @param maxIndex 最大索引
 * @returns 0 到 maxIndex-1 的索引
 */
function hashStringToIndex(str: string, maxIndex: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % maxIndex;
}

/**
 * 预加载国风头像（可选，用于性能优化）
 */
export async function preloadGuofengAvatars(): Promise<void> {
  console.log('Guofeng avatars are served from local files, no preload needed');
}

/**
 * 清空缓存
 */
export function clearGuofengCache(): void {
  localGuofengCache.clear();
}

/**
 * 获取缓存统计
 */
export function getGuofengCacheStats() {
  return {
    size: localGuofengCache.size,
    totalAvatars: GUOFENG_AVATAR_COUNT,
    seeds: Array.from(localGuofengCache.keys()),
  };
}
