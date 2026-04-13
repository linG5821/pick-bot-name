/**
 * 主名称生成器
 * 根据规则和算法生成Bot名称
 */

import {
  Rule,
  GenerationAlgorithm,
  BotStyle,
  LanguageCode,
  CombinationData,
  TemplateData,
  MarkovData,
  SyllableData,
} from '@/types';
import { ruleLoader } from './RuleLoader';
import {
  CombinationGenerator,
  TemplateGenerator,
  MarkovGenerator,
  SyllableGenerator,
} from './algorithms';

export class NameGenerator {
  /**
   * 根据规则生成名称
   */
  static generateFromRule(rule: Rule): string {
    switch (rule.algorithm) {
      case GenerationAlgorithm.COMBINATION:
        return CombinationGenerator.generate(rule.data as CombinationData);

      case GenerationAlgorithm.TEMPLATE:
        return TemplateGenerator.generate(rule.data as TemplateData);

      case GenerationAlgorithm.MARKOV:
        return MarkovGenerator.generate(rule.data as MarkovData);

      case GenerationAlgorithm.SYLLABLE:
        return SyllableGenerator.generate(rule.data as SyllableData);

      default:
        throw new Error(`Unknown algorithm: ${rule.algorithm}`);
    }
  }

  /**
   * 根据规则生成多个名称
   */
  static generateMultipleFromRule(rule: Rule, count: number = 10): string[] {
    switch (rule.algorithm) {
      case GenerationAlgorithm.COMBINATION:
        return CombinationGenerator.generateMultiple(rule.data as CombinationData, count);

      case GenerationAlgorithm.TEMPLATE:
        return TemplateGenerator.generateMultiple(rule.data as TemplateData, count);

      case GenerationAlgorithm.MARKOV:
        return MarkovGenerator.generateMultiple(rule.data as MarkovData, count);

      case GenerationAlgorithm.SYLLABLE:
        return SyllableGenerator.generateMultiple(rule.data as SyllableData, count);

      default:
        throw new Error(`Unknown algorithm: ${rule.algorithm}`);
    }
  }

  /**
   * 根据风格和语言生成名称
   */
  static generate(style: BotStyle, language: LanguageCode): string {
    // 随机选择一个匹配的规则
    const rule = ruleLoader.getRandomRule(style, language);

    if (!rule) {
      throw new Error(
        `No rule found for style: ${style}, language: ${language}`
      );
    }

    return this.generateFromRule(rule);
  }

  /**
   * 根据风格和语言生成多个名称
   */
  static generateMultiple(
    style: BotStyle,
    language: LanguageCode,
    count: number = 10
  ): string[] {
    // 随机选择一个匹配的规则
    const rule = ruleLoader.getRandomRule(style, language);

    if (!rule) {
      throw new Error(
        `No rule found for style: ${style}, language: ${language}`
      );
    }

    return this.generateMultipleFromRule(rule, count);
  }

  /**
   * 生成名称并返回候选列表供用户选择
   */
  static generateCandidates(
    style: BotStyle,
    language: LanguageCode,
    count: number = 5
  ): string[] {
    const rules = ruleLoader.getRulesByStyleAndLanguage(style, language);

    if (rules.length === 0) {
      throw new Error(
        `No rule found for style: ${style}, language: ${language}`
      );
    }

    const candidates = new Set<string>();

    // 从不同规则中生成名称以增加多样性
    let ruleIndex = 0;
    let attempts = 0;
    const maxAttempts = count * 10;

    while (candidates.size < count && attempts < maxAttempts) {
      const rule = rules[ruleIndex % rules.length];
      const name = this.generateFromRule(rule);

      if (name.length > 0) {
        candidates.add(name);
      }

      ruleIndex++;
      attempts++;
    }

    return Array.from(candidates);
  }

  /**
   * 验证规则数据
   */
  static validateRule(rule: Rule): boolean {
    switch (rule.algorithm) {
      case GenerationAlgorithm.COMBINATION:
        return CombinationGenerator.validate(rule.data as CombinationData);

      case GenerationAlgorithm.TEMPLATE:
        return TemplateGenerator.validate(rule.data as TemplateData);

      case GenerationAlgorithm.MARKOV:
        return MarkovGenerator.validate(rule.data as MarkovData);

      case GenerationAlgorithm.SYLLABLE:
        return SyllableGenerator.validate(rule.data as SyllableData);

      default:
        return false;
    }
  }
}
