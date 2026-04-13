/**
 * UUID生成工具测试
 */

import { describe, it, expect } from 'vitest';
import { generateUniqueId } from '../uuid';

describe('generateUniqueId', () => {
  it('should generate a non-empty string', () => {
    const id = generateUniqueId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate unique IDs', () => {
    const ids = new Set<string>();
    const count = 1000;

    for (let i = 0; i < count; i++) {
      ids.add(generateUniqueId());
    }

    // 所有ID应该都是唯一的
    expect(ids.size).toBe(count);
  });

  it('should generate IDs with valid format', () => {
    const id = generateUniqueId();

    // 应该是UUID格式（如果crypto.randomUUID可用）或自定义格式
    // UUID格式: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    // 自定义格式: timestamp-random-random
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const isCustom = /^\d+-[a-z0-9]+-[a-z0-9]+$/.test(id);

    expect(isUUID || isCustom).toBe(true);
  });

  it('should handle high-frequency generation', () => {
    const startTime = Date.now();
    const ids: string[] = [];

    // 快速生成多个ID
    for (let i = 0; i < 100; i++) {
      ids.push(generateUniqueId());
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // 应该在合理时间内完成（<100ms）
    expect(duration).toBeLessThan(100);

    // 所有ID应该不同
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
