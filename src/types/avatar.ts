/**
 * 头像相关类型定义
 */

/**
 * 头像风格
 */
export type AvatarStyle =
  | 'bottts'        // 机器人
  | 'botttsNeutral' // 机器人（中性色）
  | 'funEmoji'      // 有趣表情
  | 'avataaars'     // Avataaars卡通人物
  | 'identicon'     // Identicon几何标识
  | 'toonHead'      // Toon Head卡通头像
  | 'kawaii'        // Kawaii可爱角色
  | 'lorelei'       // Lorelei风格（测试中）
  | 'notionists';   // Notionists风格（测试中）

/**
 * 头像信息
 */
export interface AvatarInfo {
  svg: string;
  style: AvatarStyle;
  seed: string;
  dataUri?: string;
}

/**
 * 头像生成选项
 */
export interface AvatarGenerationOptions {
  seed: string;
  style: AvatarStyle;
  size?: number;
  backgroundColor?: string[];
  radius?: number;
}

/**
 * 头像风格配置
 */
export interface AvatarStyleConfig {
  id: AvatarStyle;
  name: {
    en: string;
    zh: string;
    ja: string;
  };
  description: {
    en: string;
    zh: string;
    ja: string;
  };
  icon: string;
  tags: string[];
}
