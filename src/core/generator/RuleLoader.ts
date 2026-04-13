/**
 * 规则加载器
 */

import { Rule, BotStyle } from '@/types';
import rulesBundle from '@/data/rules-bundle.json';

export class RuleLoader {
  private static instance: RuleLoader;
  private rules: Map<string, Rule> = new Map();
  private rulesByStyle: Map<BotStyle, Rule[]> = new Map();
  private rulesByLanguage: Map<string, Rule[]> = new Map();

  private constructor() {
    this.loadRules();
  }

  static getInstance(): RuleLoader {
    if (!RuleLoader.instance) {
      RuleLoader.instance = new RuleLoader();
    }
    return RuleLoader.instance;
  }

  private loadRules(): void {
    // 加载打包的规则
    // @ts-ignore - Rules bundle may have optional fields
    const rules: Rule[] = Array.isArray(rulesBundle.rules) ? rulesBundle.rules : [];

    rules.forEach((rule) => {
      this.rules.set(rule.id, rule);

      // 按风格索引
      if (!this.rulesByStyle.has(rule.style)) {
        this.rulesByStyle.set(rule.style, []);
      }
      this.rulesByStyle.get(rule.style)!.push(rule);

      // 按语言索引
      rule.languages.forEach((lang) => {
        if (!this.rulesByLanguage.has(lang)) {
          this.rulesByLanguage.set(lang, []);
        }
        this.rulesByLanguage.get(lang)!.push(rule);
      });
    });
  }

  /**
   * 根据ID获取规则
   */
  getRule(id: string): Rule | undefined {
    return this.rules.get(id);
  }

  /**
   * 获取所有规则
   */
  getAllRules(): Rule[] {
    return Array.from(this.rules.values());
  }

  /**
   * 根据风格获取规则
   */
  getRulesByStyle(style: BotStyle): Rule[] {
    return this.rulesByStyle.get(style) || [];
  }

  /**
   * 根据语言获取规则
   */
  getRulesByLanguage(language: string): Rule[] {
    return this.rulesByLanguage.get(language) || [];
  }

  /**
   * 根据风格和语言获取规则
   */
  getRulesByStyleAndLanguage(style: BotStyle, language: string): Rule[] {
    const styleRules = this.getRulesByStyle(style);
    return styleRules.filter((rule) => rule.languages.includes(language));
  }

  /**
   * 随机选择一个匹配的规则
   */
  getRandomRule(style: BotStyle, language: string): Rule | undefined {
    const rules = this.getRulesByStyleAndLanguage(style, language);
    if (rules.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * rules.length);
    return rules[randomIndex];
  }

  /**
   * 获取支持的风格列表
   */
  getSupportedStyles(): BotStyle[] {
    return Array.from(this.rulesByStyle.keys());
  }

  /**
   * 获取支持的语言列表
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.rulesByLanguage.keys());
  }

  /**
   * 检查是否支持指定的风格和语言组合
   */
  isSupported(style: BotStyle, language: string): boolean {
    return this.getRulesByStyleAndLanguage(style, language).length > 0;
  }
}

// 导出单例
export const ruleLoader = RuleLoader.getInstance();
