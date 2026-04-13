/**
 * 名称生成器测试
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { NameGenerator } from '../NameGenerator';
import { ruleLoader } from '../RuleLoader';
import { BotStyle, GenerationAlgorithm } from '@/types';

describe('NameGenerator', () => {
  beforeAll(() => {
    // 规则会自动从bundle加载
    // 验证规则已加载
    const rules = ruleLoader.getAllRules();
    if (rules.length === 0) {
      throw new Error('Rules not loaded');
    }
  });

  describe('generate', () => {
    it('should generate names for all styles', () => {
      const styles = Object.values(BotStyle);

      for (const style of styles) {
        const name = NameGenerator.generate(style, 'zh');
        expect(name).toBeTruthy();
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      }
    });

    it('should generate names in different languages', () => {
      const zhName = NameGenerator.generate(BotStyle.PUNK, 'zh');
      const enName = NameGenerator.generate(BotStyle.PUNK, 'en');

      expect(zhName).toBeTruthy();
      expect(enName).toBeTruthy();
      // 中英文名称通常不同（但不保证100%不同）
    });

    it('should generate different names on multiple calls', () => {
      const names = new Set<string>();
      const attempts = 20;

      for (let i = 0; i < attempts; i++) {
        names.add(NameGenerator.generate(BotStyle.CUTE, 'zh'));
      }

      // 应该生成多样化的名称（至少50%不重复）
      expect(names.size).toBeGreaterThan(attempts * 0.5);
    });

    it('should throw error for invalid style/language combination', () => {
      expect(() => {
        NameGenerator.generate('invalid' as BotStyle, 'zh');
      }).toThrow();
    });
  });

  describe('generateMultiple', () => {
    it('should generate requested number of names', () => {
      const count = 5;
      const names = NameGenerator.generateMultiple(BotStyle.PROFESSIONAL, 'en', count);

      expect(names).toBeInstanceOf(Array);
      expect(names.length).toBe(count);

      // 每个名称都应该有效
      names.forEach((name) => {
        expect(name).toBeTruthy();
        expect(typeof name).toBe('string');
      });
    });

    it('should generate diverse names', () => {
      const names = NameGenerator.generateMultiple(BotStyle.GEEK, 'zh', 10);
      const uniqueNames = new Set(names);

      // 至少70%应该是唯一的
      expect(uniqueNames.size).toBeGreaterThan(names.length * 0.7);
    });
  });

  describe('generateCandidates', () => {
    it('should generate candidate list', () => {
      const candidates = NameGenerator.generateCandidates(BotStyle.MINIMAL, 'zh', 5);

      expect(candidates).toBeInstanceOf(Array);
      expect(candidates.length).toBeGreaterThan(0);
      expect(candidates.length).toBeLessThanOrEqual(5);
    });

    it('should use multiple rules for diversity', () => {
      const candidates = NameGenerator.generateCandidates(BotStyle.PUNK, 'en', 10);
      const uniqueCandidates = new Set(candidates);

      // 候选名称应该高度多样化
      expect(uniqueCandidates.size).toBe(candidates.length);
    });
  });

  describe('generateFromRule', () => {
    it('should generate name from specific rule', () => {
      const rule = ruleLoader.getRandomRule(BotStyle.CUTE, 'zh');
      if (!rule) throw new Error('No rule found');

      const name = NameGenerator.generateFromRule(rule);
      expect(name).toBeTruthy();
      expect(typeof name).toBe('string');
    });

    it('should handle different algorithm types', () => {
      const algorithms = [
        GenerationAlgorithm.COMBINATION,
        GenerationAlgorithm.TEMPLATE,
        GenerationAlgorithm.MARKOV,
        GenerationAlgorithm.SYLLABLE,
      ];

      // 尝试为每种算法生成名称
      algorithms.forEach((algorithm) => {
        const allRules = ruleLoader.getAllRules();
        const rule = allRules.find((r) => r.algorithm === algorithm);

        if (rule) {
          const name = NameGenerator.generateFromRule(rule);
          expect(name).toBeTruthy();
        }
      });
    });
  });

  describe('validateRule', () => {
    it('should validate correct rules', () => {
      const rule = ruleLoader.getRandomRule(BotStyle.PUNK, 'zh');
      if (!rule) throw new Error('No rule found');

      const isValid = NameGenerator.validateRule(rule);
      expect(isValid).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty rule data gracefully', () => {
      // 测试错误处理
      expect(() => {
        NameGenerator.generate('nonexistent' as BotStyle, 'zh');
      }).toThrow(/No rule found/);
    });

    it('should be performant', () => {
      const startTime = Date.now();
      const iterations = 100;

      for (let i = 0; i < iterations; i++) {
        NameGenerator.generate(BotStyle.PUNK, 'zh');
      }

      const duration = Date.now() - startTime;

      // 100次生成应该在1秒内完成
      expect(duration).toBeLessThan(1000);
    });
  });
});
