/**
 * 模板算法生成器
 * 使用预定义的模板字符串，填充占位符生成名称
 */

import { TemplateData, WeightedItem } from '@/types';

export class TemplateGenerator {
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
   * 从词库中随机选择
   */
  private static selectFromVocabulary(
    vocabulary: Record<string, WeightedItem[]>,
    key: string
  ): string {
    const items = vocabulary[key];
    if (!items || items.length === 0) {
      return `{${key}}`;
    }

    const selected = this.selectByWeight(items);
    return selected.value;
  }

  /**
   * 填充模板
   */
  private static fillTemplate(
    template: string,
    vocabulary: Record<string, WeightedItem[]>
  ): string {
    // 匹配 {key} 格式的占位符
    return template.replace(/\{(\w+)\}/g, (_match, key) => {
      return this.selectFromVocabulary(vocabulary, key);
    });
  }

  /**
   * 生成单个名称
   */
  static generate(data: TemplateData): string {
    // 随机选择一个模板
    const template = this.selectByWeight(data.templates);

    // 填充模板
    return this.fillTemplate(template.value, data.vocabulary);
  }

  /**
   * 生成多个名称
   */
  static generateMultiple(data: TemplateData, count: number = 10): string[] {
    const names = new Set<string>();

    // 生成直到达到数量或尝试次数过多
    let attempts = 0;
    const maxAttempts = count * 10;

    while (names.size < count && attempts < maxAttempts) {
      const name = this.generate(data);
      if (name.length > 0 && !name.includes('{')) {
        // 确保所有占位符都已替换
        names.add(name);
      }
      attempts++;
    }

    return Array.from(names);
  }

  /**
   * 验证数据格式
   */
  static validate(data: TemplateData): boolean {
    // 必须有模板
    if (!data.templates || data.templates.length === 0) {
      return false;
    }

    // 必须有词库
    if (!data.vocabulary || Object.keys(data.vocabulary).length === 0) {
      return false;
    }

    // 验证所有模板中的占位符都在词库中
    const vocabularyKeys = new Set(Object.keys(data.vocabulary));

    for (const template of data.templates) {
      const placeholders = template.value.match(/\{(\w+)\}/g) || [];
      for (const placeholder of placeholders) {
        const key = placeholder.slice(1, -1); // 移除 { 和 }
        if (!vocabularyKeys.has(key)) {
          return false;
        }
      }
    }

    // 验证所有词库项都有有效的权重
    for (const items of Object.values(data.vocabulary)) {
      if (!Array.isArray(items) || items.length === 0) {
        return false;
      }
      if (!items.every((item) => item.weight > 0 && item.value.length > 0)) {
        return false;
      }
    }

    return true;
  }
}
