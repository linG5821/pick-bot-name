/**
 * Bot ID/Username 生成器
 * 根据显示名称和平台规则生成合法的用户名
 */

import { pinyin } from 'pinyin-pro';
import { PlatformId } from '@/types';

export interface IdGenerationOptions {
  /** 显示名称 */
  displayName: string;
  /** 平台ID */
  platform: PlatformId;
  /** 是否添加随机后缀 */
  addRandomSuffix?: boolean;
  /** 随机后缀长度 */
  suffixLength?: number;
}

export class BotIdGenerator {
  /**
   * 将中文转换为拼音
   */
  private static toPinyin(text: string): string {
    // 提取中文字符
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
    if (!chineseChars) return text;

    // 转换为拼音（不带音调，连续输出）
    const pinyinText = pinyin(text, {
      toneType: 'none',
      separator: '',
    });

    return pinyinText;
  }

  /**
   * 清理字符串，只保留字母数字和下划线
   */
  private static sanitize(text: string, allowDash: boolean = false): string {
    const pattern = allowDash ? /[^a-zA-Z0-9_-]/g : /[^a-zA-Z0-9_]/g;
    return text.replace(pattern, '');
  }

  /**
   * 生成随机后缀
   */
  private static generateRandomSuffix(length: number = 4): string {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  /**
   * 根据平台规则调整ID
   */
  private static adjustForPlatform(
    id: string,
    platform: PlatformId
  ): string {
    switch (platform) {
      case 'telegram':
        // Telegram: 5-32字符，字母数字下划线，必须以字母开头，必须以_bot结尾
        if (!/^[a-zA-Z]/.test(id)) {
          id = 'b' + id;
        }
        // 确保以_bot结尾
        if (!id.toLowerCase().endsWith('_bot')) {
          // 如果已经以bot结尾，替换为_bot
          if (id.toLowerCase().endsWith('bot')) {
            id = id.slice(0, -3) + '_bot';
          } else {
            id = id + '_bot';
          }
        }
        // 截断到32字符
        if (id.length > 32) {
          id = id.slice(0, 32);
          // 确保截断后仍以_bot结尾
          if (!id.toLowerCase().endsWith('_bot')) {
            id = id.slice(0, -4) + '_bot';
          }
        }
        // 最小长度检查
        if (id.length < 5) {
          id = 'bot' + id;
        }
        break;

      case 'discord':
        // Discord: 2-32字符，不允许连续的点或下划线
        id = id.replace(/[._]{2,}/g, '_');
        id = id.slice(0, 32);
        if (id.length < 2) {
          id = id + 'bot';
        }
        break;

      case 'slack':
        // Slack: 1-21字符，小写字母数字和特殊字符
        id = id.toLowerCase();
        id = id.replace(/[^a-z0-9._-]/g, '');
        id = id.slice(0, 21);
        break;

      case 'feishu':
      case 'dingtalk':
      case 'wecom':
        // 企业IM平台通常对username要求较宽松
        id = id.toLowerCase();
        id = id.slice(0, 32);
        break;

      case 'qq':
      case 'qqbot':
        // QQ系统自动生成，这里返回建议的显示名
        break;

      case 'line':
        // LINE: @开头，字母数字下划线点，最长20字符
        id = '@' + id.replace(/^@/, '');
        id = id.slice(0, 20);
        break;

      default:
        // 通用规则：字母数字下划线，最长32字符
        id = id.slice(0, 32);
        break;
    }

    return id;
  }

  /**
   * 生成Bot ID
   */
  static generate(options: IdGenerationOptions): string {
    const {
      displayName,
      platform,
      addRandomSuffix = false,
      suffixLength = 4,
    } = options;

    // 1. 转换中文为拼音
    let id = this.toPinyin(displayName);

    // 2. 清理特殊字符
    id = this.sanitize(id, true);

    // 3. 转换为小写
    id = id.toLowerCase();

    // 4. 添加随机后缀（如果需要）
    if (addRandomSuffix) {
      const suffix = this.generateRandomSuffix(suffixLength);
      id = id + '_' + suffix;
    }

    // 5. 根据平台规则调整
    id = this.adjustForPlatform(id, platform);

    // 6. 确保非空
    if (!id || id.length === 0) {
      id = 'bot_' + this.generateRandomSuffix(6);
    }

    return id;
  }

  /**
   * 生成多个候选ID
   */
  static generateCandidates(
    displayName: string,
    platform: PlatformId,
    count: number = 3
  ): string[] {
    const candidates = new Set<string>();

    // 第一个候选：不带后缀
    candidates.add(
      this.generate({
        displayName,
        platform,
        addRandomSuffix: false,
      })
    );

    // 其他候选：带随机后缀
    let attempts = 0;
    const maxAttempts = count * 5;

    while (candidates.size < count && attempts < maxAttempts) {
      const id = this.generate({
        displayName,
        platform,
        addRandomSuffix: true,
        suffixLength: 4,
      });
      candidates.add(id);
      attempts++;
    }

    return Array.from(candidates);
  }

  /**
   * 验证ID是否符合平台规则
   */
  static validate(id: string, platform: PlatformId): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    switch (platform) {
      case 'telegram':
        if (id.length < 5 || id.length > 32) {
          errors.push('Length must be 5-32 characters');
        }
        if (!/^[a-zA-Z]/.test(id)) {
          errors.push('Must start with a letter');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(id)) {
          errors.push('Only letters, numbers, and underscores allowed');
        }
        if (!id.toLowerCase().endsWith('_bot')) {
          errors.push('Must end with "_bot"');
        }
        break;

      case 'discord':
        if (id.length < 2 || id.length > 32) {
          errors.push('Length must be 2-32 characters');
        }
        if (/[._]{2,}/.test(id)) {
          errors.push('Cannot have consecutive dots or underscores');
        }
        break;

      case 'slack':
        if (id.length < 1 || id.length > 21) {
          errors.push('Length must be 1-21 characters');
        }
        if (!/^[a-z0-9._-]+$/.test(id)) {
          errors.push('Only lowercase letters, numbers, dots, dashes, and underscores allowed');
        }
        break;

      case 'line':
        if (!id.startsWith('@')) {
          errors.push('Must start with @');
        }
        if (id.length < 2 || id.length > 20) {
          errors.push('Length must be 2-20 characters (including @)');
        }
        break;

      default:
        // 通用验证
        if (id.length === 0 || id.length > 32) {
          errors.push('Length must be 1-32 characters');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
