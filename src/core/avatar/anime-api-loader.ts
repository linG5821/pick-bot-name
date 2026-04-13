/**
 * Anime头像API加载器 - 集成多个免费API
 */

// 可用的anime头像API列表
// 使用代理路径避免CORS问题
const ANIME_APIS = [
  {
    name: 'waifu.pics',
    endpoint: '/api/waifu/sfw/waifu',
    type: 'json',
    getUrl: (data: any) => {
      const url = data.url;
      // 将外部图片URL转换为代理URL
      if (url && url.includes('i.waifu.pics')) {
        const fileName = url.split('/').pop();
        return `/proxy/waifu-img/${fileName}`;
      }
      return url;
    },
  },
  {
    name: 'waifu.im',
    endpoint: '/api/waifu-im/search/?included_tags=waifu&height=>=256',
    type: 'json',
    getUrl: (data: any) => data.images?.[0]?.url,
  },
];

// 本地缓存的anime头像URLs
const localAnimeCache: Map<string, string> = new Map();

/**
 * 从API获取anime头像URL
 */
async function fetchAnimeAvatarFromAPI(apiIndex: number = 0): Promise<string | null> {
  if (apiIndex >= ANIME_APIS.length) {
    console.error('All anime APIs failed');
    return null;
  }

  const api = ANIME_APIS[apiIndex];

  try {
    const response = await fetch(api.endpoint);

    if (!response.ok) {
      console.warn(`${api.name} API failed with status ${response.status}, trying next...`);
      return fetchAnimeAvatarFromAPI(apiIndex + 1);
    }

    const data = await response.json();
    const imageUrl = api.getUrl(data);

    if (!imageUrl) {
      console.warn(`${api.name} returned invalid data, trying next...`);
      return fetchAnimeAvatarFromAPI(apiIndex + 1);
    }

    return imageUrl;
  } catch (error) {
    console.warn(`${api.name} API error:`, error);
    return fetchAnimeAvatarFromAPI(apiIndex + 1);
  }
}

/**
 * 根据seed获取anime头像URL（带缓存）
 */
export async function getAnimeAvatarUrl(seed: string): Promise<string> {
  // 检查缓存
  if (localAnimeCache.has(seed)) {
    return localAnimeCache.get(seed)!;
  }

  // 从API获取新头像
  const imageUrl = await fetchAnimeAvatarFromAPI();

  if (imageUrl) {
    // 缓存URL
    localAnimeCache.set(seed, imageUrl);
    return imageUrl;
  }

  // 如果所有API都失败，返回占位符
  return '/pick_bot_name/avatars/anime/fallback.svg';
}

/**
 * 预加载多个anime头像到缓存
 */
export async function preloadAnimeAvatars(count: number = 10): Promise<void> {
  console.log(`Preloading ${count} anime avatars...`);

  const promises = Array.from({ length: count }, async (_, i) => {
    try {
      const url = await fetchAnimeAvatarFromAPI();
      if (url) {
        localAnimeCache.set(`preload-${i}`, url);
      }
    } catch (error) {
      console.warn(`Failed to preload avatar ${i}:`, error);
    }
  });

  await Promise.all(promises);
  console.log(`Preloaded ${localAnimeCache.size} anime avatars`);
}

/**
 * 清空缓存
 */
export function clearAnimeCache(): void {
  localAnimeCache.clear();
}

/**
 * 获取缓存统计
 */
export function getAnimeCacheStats() {
  return {
    size: localAnimeCache.size,
    seeds: Array.from(localAnimeCache.keys()),
  };
}
