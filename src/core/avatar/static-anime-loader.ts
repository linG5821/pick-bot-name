/**
 * 静态动漫头像加载器
 */

// 静态动漫头像列表
const ANIME_AVATARS = [
  'girl-01.svg',
  'boy-01.svg',
  'cat-girl-01.svg',
  'magical-girl-01.svg',
  'cool-boy-01.svg',
  'chibi-01.svg',
];

/**
 * 根据seed选择静态动漫头像
 */
export function getStaticAnimeAvatar(seed: string): string {
  // 使用seed生成确定性的索引
  const hashCode = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const index = Math.abs(hashCode) % ANIME_AVATARS.length;
  const avatarFile = ANIME_AVATARS[index];

  // 返回相对于public文件夹的路径
  return `/pick_bot_name/avatars/anime/${avatarFile}`;
}

/**
 * 加载静态头像SVG内容
 */
export async function loadStaticAnimeSvg(seed: string): Promise<string> {
  const avatarPath = getStaticAnimeAvatar(seed);

  try {
    const response = await fetch(avatarPath);
    if (!response.ok) {
      throw new Error(`Failed to load avatar: ${response.status}`);
    }
    const svgContent = await response.text();
    return svgContent;
  } catch (error) {
    console.error('Error loading static anime avatar:', error);
    // 返回一个简单的占位符SVG
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#FFE5F0"/>
      <text x="100" y="100" text-anchor="middle" font-size="20" fill="#FF69B4">Anime</text>
    </svg>`;
  }
}

/**
 * 获取所有可用的动漫头像
 */
export function getAvailableAnimeAvatars(): string[] {
  return ANIME_AVATARS.map(file => `/pick_bot_name/avatars/anime/${file}`);
}
