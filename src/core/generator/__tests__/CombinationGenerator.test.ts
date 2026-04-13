/**
 * CombinationGenerator 单元测试
 */

import { describe, it, expect } from 'vitest';
import { CombinationGenerator } from '../algorithms/CombinationGenerator';
import { CombinationData } from '@/types';

describe('CombinationGenerator', () => {
  const mockData: CombinationData = {
    prefixes: [
      { value: 'Cyber', weight: 10 },
      { value: 'Nano', weight: 5 },
    ],
    roots: [
      { value: 'Bot', weight: 10 },
      { value: 'AI', weight: 8 },
    ],
    suffixes: [
      { value: '3000', weight: 5 },
      { value: 'Pro', weight: 8 },
    ],
  };

  describe('generate', () => {
    it('should generate a non-empty name', () => {
      const name = CombinationGenerator.generate(mockData);
      expect(name).toBeTruthy();
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    });

    it('should include a root component', () => {
      const names = Array.from({ length: 10 }, () =>
        CombinationGenerator.generate(mockData)
      );

      const hasRoot = names.some(
        (name) => name.includes('Bot') || name.includes('AI')
      );
      expect(hasRoot).toBe(true);
    });

    it('should generate different names on multiple calls', () => {
      const names = new Set(
        Array.from({ length: 20 }, () => CombinationGenerator.generate(mockData))
      );
      
      // Should generate at least a few different names
      expect(names.size).toBeGreaterThan(1);
    });
  });

  describe('generateMultiple', () => {
    it('should generate requested number of names', () => {
      const count = 5;
      const names = CombinationGenerator.generateMultiple(mockData, count);
      
      expect(names).toHaveLength(count);
      expect(names.every((name) => name.length > 0)).toBe(true);
    });

    it('should generate unique names', () => {
      const names = CombinationGenerator.generateMultiple(mockData, 10);
      const uniqueNames = new Set(names);
      
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe('validate', () => {
    it('should validate correct data structure', () => {
      const isValid = CombinationGenerator.validate(mockData);
      expect(isValid).toBe(true);
    });

    it('should reject data without roots', () => {
      const invalidData: CombinationData = {
        prefixes: [{ value: 'Test', weight: 10 }],
        roots: [],
        suffixes: [{ value: 'Test', weight: 10 }],
      };
      
      const isValid = CombinationGenerator.validate(invalidData);
      expect(isValid).toBe(false);
    });

    it('should reject items with zero or negative weight', () => {
      const invalidData: CombinationData = {
        prefixes: [],
        roots: [
          { value: 'Bot', weight: 10 },
          { value: 'AI', weight: 0 },
        ],
        suffixes: [],
      };
      
      const isValid = CombinationGenerator.validate(invalidData);
      expect(isValid).toBe(false);
    });

    it('should reject items with empty value', () => {
      const invalidData: CombinationData = {
        prefixes: [],
        roots: [
          { value: 'Bot', weight: 10 },
          { value: '', weight: 10 },
        ],
        suffixes: [],
      };
      
      const isValid = CombinationGenerator.validate(invalidData);
      expect(isValid).toBe(false);
    });
  });
});
