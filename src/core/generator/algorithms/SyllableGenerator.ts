/**
 * 音节算法生成器
 * 通过组合声母、韵母等音节单元生成名称
 */

import { SyllableData, WeightedItem } from '@/types';

export class SyllableGenerator {
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

    return items[0];
  }

  /**
   * 生成单个音节
   */
  private static generateSyllable(data: SyllableData): string {
    const parts: string[] = [];

    // 可选的声母（consonant）
    if (data.consonants && data.consonants.length > 0 && Math.random() < 0.8) {
      const consonant = this.selectByWeight(data.consonants);
      parts.push(consonant.value);
    }

    // 必选的韵母（vowel）
    if (data.vowels && data.vowels.length > 0) {
      const vowel = this.selectByWeight(data.vowels);
      parts.push(vowel.value);
    }

    // 可选的尾音（ending）
    if (data.endings && data.endings.length > 0 && Math.random() < 0.3) {
      const ending = this.selectByWeight(data.endings);
      parts.push(ending.value);
    }

    return parts.join('');
  }

  /**
   * 首字母大写
   */
  private static capitalize(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  /**
   * 生成单个名称
   */
  static generate(data: SyllableData): string {
    const minSyllables = data.minSyllables || 2;
    const maxSyllables = data.maxSyllables || 4;
    const capitalize = data.capitalize !== false; // 默认首字母大写

    // 随机决定音节数量
    const syllableCount =
      minSyllables +
      Math.floor(Math.random() * (maxSyllables - minSyllables + 1));

    const syllables: string[] = [];
    for (let i = 0; i < syllableCount; i++) {
      const syllable = this.generateSyllable(data);
      if (syllable) {
        syllables.push(syllable);
      }
    }

    let result = syllables.join('');

    // 首字母大写处理
    if (capitalize && result) {
      result = this.capitalize(result);
    }

    return result;
  }

  /**
   * 生成多个名称
   */
  static generateMultiple(data: SyllableData, count: number = 10): string[] {
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
  static validate(data: SyllableData): boolean {
    // 必须有韵母
    if (!data.vowels || data.vowels.length === 0) {
      return false;
    }

    // 验证音节数量范围
    const minSyllables = data.minSyllables || 2;
    const maxSyllables = data.maxSyllables || 4;

    if (minSyllables < 1 || maxSyllables < minSyllables || maxSyllables > 10) {
      return false;
    }

    // 验证所有项都有有效的权重
    const allItems = [
      ...(data.consonants || []),
      ...data.vowels,
      ...(data.endings || []),
    ];

    return allItems.every((item) => item.weight > 0 && item.value.length > 0);
  }
}
