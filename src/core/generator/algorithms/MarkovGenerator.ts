/**
 * 马尔可夫链算法生成器
 * 基于训练样本构建转移概率矩阵，生成类似风格的名称
 */

import { MarkovData } from '@/types';

export class MarkovGenerator {
  /**
   * 构建转移概率表
   */
  private static buildTransitionTable(
    samples: string[],
    order: number
  ): Map<string, Map<string, number>> {
    const table = new Map<string, Map<string, number>>();

    for (const sample of samples) {
      // 添加开始和结束标记
      const text = '^'.repeat(order) + sample + '$';

      for (let i = 0; i < text.length - order; i++) {
        const state = text.slice(i, i + order);
        const next = text[i + order];

        if (!table.has(state)) {
          table.set(state, new Map());
        }

        const transitions = table.get(state)!;
        transitions.set(next, (transitions.get(next) || 0) + 1);
      }
    }

    return table;
  }

  /**
   * 根据转移概率选择下一个字符
   */
  private static selectNext(
    transitions: Map<string, number>
  ): string | null {
    const total = Array.from(transitions.values()).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;

    for (const [char, count] of transitions.entries()) {
      random -= count;
      if (random <= 0) {
        return char;
      }
    }

    return null;
  }

  /**
   * 生成单个名称
   */
  static generate(data: MarkovData): string {
    const order = data.order || 2;
    const minLength = data.minLength || 3;
    const maxLength = data.maxLength || 15;

    const table = this.buildTransitionTable(data.samples, order);

    // 从起始状态开始
    let state = '^'.repeat(order);
    let result = '';

    let iterations = 0;
    const maxIterations = maxLength * 2;

    while (iterations < maxIterations) {
      const transitions = table.get(state);
      if (!transitions) break;

      const next = this.selectNext(transitions);
      if (!next || next === '$') {
        // 遇到结束符
        if (result.length >= minLength) {
          break;
        }
        // 长度不够，继续生成
        state = '^'.repeat(order);
        result = '';
        iterations++;
        continue;
      }

      result += next;
      state = state.slice(1) + next;

      if (result.length >= maxLength) {
        break;
      }

      iterations++;
    }

    return result.length >= minLength ? result : '';
  }

  /**
   * 生成多个名称
   */
  static generateMultiple(data: MarkovData, count: number = 10): string[] {
    const names = new Set<string>();

    // 生成直到达到数量或尝试次数过多
    let attempts = 0;
    const maxAttempts = count * 20;

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
  static validate(data: MarkovData): boolean {
    // 必须有训练样本
    if (!data.samples || data.samples.length < 3) {
      return false;
    }

    // 验证参数范围
    const order = data.order || 2;
    const minLength = data.minLength || 3;
    const maxLength = data.maxLength || 15;

    if (order < 1 || order > 5) {
      return false;
    }

    if (minLength < 1 || maxLength < minLength || maxLength > 30) {
      return false;
    }

    // 验证所有样本都是非空字符串
    return data.samples.every((sample) => typeof sample === 'string' && sample.length > 0);
  }
}
