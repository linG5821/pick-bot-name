/**
 * React Kawaii 头像生成辅助函数
 */

import {
  Cat,
  Ghost,
  IceCream,
  Planet,
  Mug,
  Browser,
  File,
  Folder,
  SpeechBubble,
  type KawaiiProps,
} from 'react-kawaii';

// 可用的Kawaii角色
const KAWAII_CHARACTERS = [
  Cat,
  Ghost,
  IceCream,
  Planet,
  Mug,
  Browser,
  File,
  Folder,
  SpeechBubble,
] as const;

// 可用的表情
const KAWAII_MOODS: Array<KawaiiProps['mood']> = [
  'sad',
  'shocked',
  'happy',
  'blissful',
  'lovestruck',
  'excited',
];

// 可爱的颜色方案
const KAWAII_COLORS = [
  '#FFD882', // 默认黄色
  '#FFB6C1', // 粉色
  '#87CEEB', // 天蓝色
  '#98FB98', // 淡绿色
  '#DDA0DD', // 紫色
  '#F0E68C', // 卡其色
  '#FFA07A', // 浅鲑鱼色
  '#FFE4E1', // 薄雾玫瑰色
];

/**
 * 根据seed获取Kawaii配置
 */
export function getKawaiiConfig(seed: string) {
  // 使用seed生成确定性的随机选择
  const hashCode = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // 选择角色、表情和颜色
  const characterIndex = Math.abs(hashCode) % KAWAII_CHARACTERS.length;
  const moodIndex = Math.abs(hashCode >> 8) % KAWAII_MOODS.length;
  const colorIndex = Math.abs(hashCode >> 16) % KAWAII_COLORS.length;

  return {
    Character: KAWAII_CHARACTERS[characterIndex],
    mood: KAWAII_MOODS[moodIndex],
    color: KAWAII_COLORS[colorIndex],
  };
}

/**
 * 生成Kawaii头像占位符SVG（用于存储）
 */
export function generateKawaiiPlaceholder(seed: string): string {
  const config = getKawaiiConfig(seed);
  // 返回简单的SVG占位符，包含配置信息
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" data-kawaii-seed="${seed}"><rect width="256" height="256" fill="${config.color}"/></svg>`;
}

/**
 * 获取随机Kawaii角色列表（用于展示）
 */
export function getKawaiiCharacters() {
  return KAWAII_CHARACTERS.map((Component, index) => ({
    id: index,
    name: Component.name,
    component: Component,
  }));
}
