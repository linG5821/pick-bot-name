/**
 * 生成器相关类型定义
 */

import { PlatformBotInfo } from './platform';
import { AvatarInfo } from './avatar';

/**
 * 机器人风格
 */
export enum BotStyle {
  PUNK = 'punk',               // 朋克（合并赛博朋克+蒸汽朋克）
  CUTE = 'cute',               // 可爱
  PROFESSIONAL = 'professional', // 专业
  GEEK = 'geek',               // 极客
  MINIMAL = 'minimal',         // 极简
  ANIME = 'anime',             // 卡通
  ACGN = 'acgn',               // 二次元
}

/**
 * 生成算法类型
 */
export enum GenerationAlgorithm {
  COMBINATION = 'combination',
  TEMPLATE = 'template',
  MARKOV = 'markov',
  SYLLABLE = 'syllable',
}

/**
 * 支持的语言
 */
export type LanguageCode = 'zh' | 'en';

/**
 * 多语言文本
 */
export type MultiLangText = {
  [K in LanguageCode]?: string;
};

/**
 * 生成的机器人完整信息
 */
export interface GeneratedBotInfo {
  // 基础信息
  id: string;
  timestamp: number;
  style: BotStyle;
  ruleId: string;
  algorithm: GenerationAlgorithm;

  // 多语言显示名称
  displayNames: {
    primary: string;
    translations: Record<string, string>;
  };

  // 各平台特定信息
  platforms: Record<string, PlatformBotInfo>;

  // 头像信息
  avatar: AvatarInfo;
}

/**
 * 生成选项
 */
export interface GenerationOptions {
  style: BotStyle;
  language: LanguageCode;
  includeAvatar?: boolean;
}

/**
 * 风格元数据
 */
export interface StyleMetadata {
  id: BotStyle;
  name: MultiLangText;
  description: MultiLangText;
  emoji: string;
  color: string;
  tags: string[];
  popularity: number;
  avatarStyle: string;
  examples: string[];
  isBuiltIn: boolean;
  author?: {
    name: string;
    github: string;
  };
}
