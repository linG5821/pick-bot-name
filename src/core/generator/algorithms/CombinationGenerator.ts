/**
 * 组合算法生成器
 * 通过前缀+词根+后缀的组合方式生成名称
 */

import { CombinationData, WeightedItem } from '@/types';

export class CombinationGenerator {
  /**
   * 根据权重随机选择一个元素
   */
  private static selectByWeight<T extends WeightedItem>(items: T[]): T {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of items) {
      random -= item.weight;
      if (random <= 0) {
        return item;
      }
    }

    // 如果没有选中任何项（不应该发生），返回第一项
    return items[0];
  }

  /**
   * 将驼峰命名分割为单词数组
   * 例如: "CyberGuardBot" → ["Cyber", "Guard", "Bot"]
   */
  private static splitCamelCase(str: string): string[] {
    // 匹配驼峰命名的单词边界
    // 匹配：大写字母开头 + 小写字母，或者全大写的缩写
    return str.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]|\b)/g) || [];
  }

  /**
   * 计算字符串长度（中文按字数，英文按单词数）
   * 支持驼峰命名分割
   */
  private static getLength(str: string): number {
    // 移除空格
    const withoutSpaces = str.replace(/\s+/g, '');

    // 统计中文字符数
    const chineseChars = withoutSpaces.match(/[\u4e00-\u9fa5]/g) || [];
    const chineseCount = chineseChars.length;

    // 移除中文后的字符串
    const nonChinese = withoutSpaces.replace(/[\u4e00-\u9fa5]/g, '');

    // 对英文部分进行驼峰分割
    const camelWords = this.splitCamelCase(nonChinese);

    // 统计数字组（连续数字算1个单位）
    const numbers = nonChinese.replace(/[a-zA-Z]/g, '').match(/\d+/g) || [];

    return chineseCount + camelWords.length + numbers.length;
  }

  /**
   * 生成单个名称（带长度限制：2-6字/单词）
   */
  static generate(data: CombinationData): string {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const parts: string[] = [];

      // 先选择词根（必须）
      if (data.roots && data.roots.length > 0) {
        const root = this.selectByWeight(data.roots);
        parts.push(root.value);
      }

      // 60%概率添加前缀
      if (data.prefixes && data.prefixes.length > 0 && Math.random() < 0.6) {
        const prefix = this.selectByWeight(data.prefixes);
        parts.unshift(prefix.value);
      }

      // 40%概率添加后缀
      if (data.suffixes && data.suffixes.length > 0 && Math.random() < 0.4) {
        const suffix = this.selectByWeight(data.suffixes);
        if (suffix.value) { // 只有非空后缀才添加
          parts.push(suffix.value);
        }
      }

      const result = parts.join('');
      const length = this.getLength(result);

      // 长度必须在2-6之间
      if (length >= 2 && length <= 6) {
        return result;
      }

      attempts++;
    }

    // 如果多次尝试都失败，返回仅词根
    if (data.roots && data.roots.length > 0) {
      const root = this.selectByWeight(data.roots);
      return root.value;
    }

    return '';
  }

  /**
   * 生成多个名称
   */
  static generateMultiple(data: CombinationData, count: number = 10): string[] {
    const names = new Set<string>();

    // 生成直到达到数量或尝试次数过多
    let attempts = 0;
    const maxAttempts = count * 10;

    while (names.size < count && attempts < maxAttempts) {
      const name = this.generate(data);
      if (name.length > 0) {
        names.add(name);
      }
      attempts++;
    }

    return Array.from(names);
  }

  /**
   * 验证数据格式
   */
  static validate(data: CombinationData): boolean {
    // 至少需要有词根
    if (!data.roots || data.roots.length === 0) {
      return false;
    }

    // 验证所有项都有有效的权重
    const allItems = [
      ...(data.prefixes || []),
      ...data.roots,
      ...(data.suffixes || []),
    ];

    return allItems.every((item) => item.weight > 0 && item.value.length > 0);
  }
}
