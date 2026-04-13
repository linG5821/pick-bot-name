/**
 * 平台验证器
 * 验证Bot名称和用户名是否符合各平台规则
 */

import { PlatformId, NamingRule } from '@/types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class PlatformValidator {
  /**
   * 验证长度
   */
  private static validateLength(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];
    const length = value.length;

    if (rule.minLength && length < rule.minLength) {
      errors.push(`Minimum length is ${rule.minLength} characters`);
    }

    if (rule.maxLength && length > rule.maxLength) {
      errors.push(`Maximum length is ${rule.maxLength} characters`);
    }

    return errors;
  }

  /**
   * 验证正则模式
   */
  private static validatePattern(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.pattern) {
      const regex = new RegExp(rule.pattern);
      if (!regex.test(value)) {
        errors.push(rule.patternDescription || 'Invalid format');
      }
    }

    return errors;
  }

  /**
   * 验证允许的字符
   */
  private static validateAllowedChars(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.allowedChars) {
      const allowedRegex = new RegExp(`^[${rule.allowedChars}]+$`);
      if (!allowedRegex.test(value)) {
        errors.push(`Only these characters are allowed: ${rule.allowedChars}`);
      }
    }

    return errors;
  }

  /**
   * 验证禁止的字符
   */
  private static validateForbiddenChars(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.forbiddenChars) {
      const forbiddenRegex = new RegExp(`[${rule.forbiddenChars}]`);
      if (forbiddenRegex.test(value)) {
        errors.push(
          `These characters are not allowed: ${rule.forbiddenChars}`
        );
      }
    }

    return errors;
  }

  /**
   * 验证必须以指定字符开头
   */
  private static validateMustStartWith(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.mustStartWith) {
      if (!value.startsWith(rule.mustStartWith)) {
        errors.push(`Must start with "${rule.mustStartWith}"`);
      }
    }

    return errors;
  }

  /**
   * 验证必须以指定字符结尾
   */
  private static validateMustEndWith(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.mustEndWith) {
      if (!value.endsWith(rule.mustEndWith)) {
        errors.push(`Must end with "${rule.mustEndWith}"`);
      }
    }

    return errors;
  }

  /**
   * 验证大小写要求
   */
  private static validateCaseRequirement(
    value: string,
    rule: NamingRule
  ): string[] {
    const errors: string[] = [];

    if (rule.caseRequirement === 'lowercase') {
      if (value !== value.toLowerCase()) {
        errors.push('Must be lowercase');
      }
    } else if (rule.caseRequirement === 'uppercase') {
      if (value !== value.toUpperCase()) {
        errors.push('Must be uppercase');
      }
    }

    return errors;
  }

  /**
   * 根据规则验证值
   */
  static validateByRule(value: string, rule: NamingRule): ValidationResult {
    const errors: string[] = [];

    // 长度验证
    errors.push(...this.validateLength(value, rule));

    // 正则模式验证
    errors.push(...this.validatePattern(value, rule));

    // 允许的字符验证
    errors.push(...this.validateAllowedChars(value, rule));

    // 禁止的字符验证
    errors.push(...this.validateForbiddenChars(value, rule));

    // 必须以指定字符开头
    errors.push(...this.validateMustStartWith(value, rule));

    // 必须以指定字符结尾
    errors.push(...this.validateMustEndWith(value, rule));

    // 大小写要求
    errors.push(...this.validateCaseRequirement(value, rule));

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * 验证显示名称
   */
  static validateDisplayName(
    displayName: string,
    _platform: PlatformId,
    rule: NamingRule
  ): ValidationResult {
    return this.validateByRule(displayName, rule);
  }

  /**
   * 验证用户名
   */
  static validateUsername(
    username: string,
    _platform: PlatformId,
    rule: NamingRule
  ): ValidationResult {
    return this.validateByRule(username, rule);
  }
}
