/**
 * API: 生成机器人名称
 * 供其他服务调用的API接口
 */

import { BotStyle, LanguageCode, GeneratedBotInfo, PlatformId, PlatformBotInfo } from '@/types';
import { NameGenerator, ruleLoader } from '@/core/generator';
import { BotIdGenerator } from '@/core/generator';
import { AvatarGenerator } from '@/core/avatar';
import { platformConfigs } from '@/data/platforms';
import { PlatformValidator } from '@/core/platform';
import { generateUniqueId } from '@/utils/uuid';

export interface PickBotNameRequest {
  style: BotStyle;
  language: LanguageCode;
}

export interface PickBotNameResponse {
  success: boolean;
  data?: GeneratedBotInfo;
  error?: string;
}

/**
 * 生成所有平台的Bot信息
 */
function generateAllPlatforms(displayName: string): Record<string, PlatformBotInfo> {
  const platforms: Record<string, PlatformBotInfo> = {};
  const platformIds = Object.keys(platformConfigs) as PlatformId[];

  for (const platformId of platformIds) {
    const config = platformConfigs[platformId];
    const needsUsername = !!config.namingRules.username && !config.usernameGeneratedBySystem;

    let username: string | null = null;
    const validationErrors: string[] = [];

    // 验证显示名称
    const displayNameValidation = PlatformValidator.validateDisplayName(
      displayName,
      platformId,
      config.namingRules.displayName
    );

    if (!displayNameValidation.valid) {
      validationErrors.push(...displayNameValidation.errors);
    }

    // 生成并验证用户名
    if (needsUsername) {
      username = BotIdGenerator.generate({
        displayName,
        platform: platformId,
        addRandomSuffix: false,
      });

      if (config.namingRules.username) {
        const usernameValidation = PlatformValidator.validateUsername(
          username,
          platformId,
          config.namingRules.username
        );

        if (!usernameValidation.valid) {
          validationErrors.push(...usernameValidation.errors);
        }
      }
    }

    platforms[platformId] = {
      platform: platformId,
      displayName,
      username,
      needsUsername,
      isValid: validationErrors.length === 0,
      validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
      metadata: {
        difficulty: config.difficulty,
        estimatedTime: config.difficulty === 'easy' ? '5-10 min' : config.difficulty === 'medium' ? '15-30 min' : '30-60 min',
        isGeneric: config.isGeneric,
        usernameGeneratedBySystem: config.usernameGeneratedBySystem,
      },
    };
  }

  return platforms;
}

/**
 * API处理函数
 */
export function pickBotName(request: PickBotNameRequest): PickBotNameResponse {
  try {
    const { style, language } = request;

    // 验证参数 - 将输入转为小写以匹配enum值
    const normalizedStyle = (typeof style === 'string' ? style.toLowerCase() : style) as BotStyle;
    if (!Object.values(BotStyle).includes(normalizedStyle)) {
      return {
        success: false,
        error: `Invalid style: ${style}. Valid styles: ${Object.values(BotStyle).join(', ')}`,
      };
    }

    if (!['zh', 'en'].includes(language)) {
      return {
        success: false,
        error: `Invalid language: ${language}. Valid languages: zh, en`,
      };
    }

    // 获取使用的规则
    const rule = ruleLoader.getRandomRule(normalizedStyle, language);
    if (!rule) {
      return {
        success: false,
        error: `No rule found for style: ${normalizedStyle}, language: ${language}`,
      };
    }

    // 生成主显示名称
    const primaryName = NameGenerator.generate(normalizedStyle, language);

    // 根据选择的风格生成对应风格的头像
    const avatarStyle = AvatarGenerator.getAvatarStyleForBotStyle(normalizedStyle);
    const avatar = AvatarGenerator.generate(undefined, avatarStyle, normalizedStyle);

    // 生成所有平台的信息
    const platforms = generateAllPlatforms(primaryName);

    // 生成翻译
    const translations: Record<string, string> = {
      en: primaryName,
      zh: primaryName,
    };

    const botInfo: GeneratedBotInfo = {
      id: generateUniqueId(),
      timestamp: Date.now(),
      style: normalizedStyle,
      ruleId: rule.id,
      algorithm: rule.algorithm,
      displayNames: {
        primary: primaryName,
        translations,
      },
      platforms,
      avatar,
    };

    return {
      success: true,
      data: botInfo,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
