/**
 * BotIdGenerator 单元测试
 */

import { describe, it, expect } from 'vitest';
import { BotIdGenerator } from '../BotIdGenerator';

describe('BotIdGenerator', () => {
  describe('generate', () => {
    it('should generate a valid ID for generic platform', () => {
      const id = BotIdGenerator.generate({
        displayName: '测试机器人',
        platform: 'generic',
      });

      expect(id).toBeTruthy();
      expect(typeof id).toBe('string');
    });

    it('should convert Chinese to pinyin', () => {
      const id = BotIdGenerator.generate({
        displayName: '智能助手',
        platform: 'generic',
      });

      // Should contain pinyin, not Chinese characters
      expect(/[\u4e00-\u9fa5]/.test(id)).toBe(false);
      expect(id.length).toBeGreaterThan(0);
    });

    it('should enforce Telegram bot suffix', () => {
      const id = BotIdGenerator.generate({
        displayName: 'MyBot',
        platform: 'telegram',
      });

      expect(id).toMatch(/bot$/i);
    });

    it('should enforce LINE @ prefix', () => {
      const id = BotIdGenerator.generate({
        displayName: 'MyBot',
        platform: 'line',
      });

      expect(id).toMatch(/^@/);
    });

    it('should sanitize special characters', () => {
      const id = BotIdGenerator.generate({
        displayName: 'Test@Bot#123!',
        platform: 'generic',
      });

      // Should only contain alphanumeric and underscore
      expect(/^[a-z0-9_-]+$/i.test(id)).toBe(true);
    });

    it('should add random suffix when requested', () => {
      const id1 = BotIdGenerator.generate({
        displayName: 'TestBot',
        platform: 'generic',
        addRandomSuffix: true,
      });

      const id2 = BotIdGenerator.generate({
        displayName: 'TestBot',
        platform: 'generic',
        addRandomSuffix: true,
      });

      expect(id1).not.toBe(id2);
    });

    it('should respect platform length limits', () => {
      const telegramId = BotIdGenerator.generate({
        displayName: 'VeryLongBotNameThatExceedsTheLimitForTelegram',
        platform: 'telegram',
      });

      expect(telegramId.length).toBeLessThanOrEqual(32);
    });
  });

  describe('generateCandidates', () => {
    it('should generate multiple unique candidates', () => {
      const candidates = BotIdGenerator.generateCandidates('TestBot', 'generic', 3);

      expect(candidates).toHaveLength(3);
      expect(new Set(candidates).size).toBe(3);
    });

    it('should include one without suffix', () => {
      const candidates = BotIdGenerator.generateCandidates('TestBot', 'generic', 3);

      // At least one should not have random suffix pattern
      const hasSimple = candidates.some((id) => !/_\d+/.test(id));
      expect(hasSimple).toBe(true);
    });
  });

  describe('validate', () => {
    it('should validate correct Telegram ID', () => {
      const result = BotIdGenerator.validate('mytestbot', 'telegram');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject Telegram ID without bot suffix', () => {
      const result = BotIdGenerator.validate('mytest', 'telegram');
      expect(result.valid).toBe(false);
    });

    it('should reject Telegram ID that is too short', () => {
      const result = BotIdGenerator.validate('bot', 'telegram');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('5-32'))).toBe(true);
    });

    it('should reject Telegram ID that starts with number', () => {
      const result = BotIdGenerator.validate('123bot', 'telegram');
      expect(result.valid).toBe(false);
    });

    it('should validate correct LINE ID', () => {
      const result = BotIdGenerator.validate('@testbot', 'line');
      expect(result.valid).toBe(true);
    });

    it('should reject LINE ID without @ prefix', () => {
      const result = BotIdGenerator.validate('testbot', 'line');
      expect(result.valid).toBe(false);
    });
  });
});
