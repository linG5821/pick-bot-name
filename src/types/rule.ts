/**
 * 规则相关类型定义
 */

import { BotStyle, GenerationAlgorithm, MultiLangText } from './generator';
import { PlatformId } from './platform';

/**
 * 规则配置
 */
export interface Rule {
  id: string;
  version?: string;
  name: MultiLangText;
  description?: MultiLangText;
  style: BotStyle;
  languages: string[];
  algorithm: GenerationAlgorithm;
  platformOptimized?: PlatformId[];
  author: {
    name: string;
    github: string;
    email?: string;
  };
  license?: string;
  tags?: string[];
  data: RuleData;
  examples?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 规则数据类型（根据算法不同）
 */
export type RuleData = CombinationData | TemplateData | MarkovData | SyllableData;

/**
 * 组合算法数据
 */
export interface CombinationData {
  prefixes: WeightedItem[];
  roots: WeightedItem[];
  suffixes: WeightedItem[];
}

/**
 * 模板算法数据
 */
export interface TemplateData {
  templates: WeightedItem[];
  vocabulary: Record<string, WeightedItem[]>;
}

/**
 * 马尔可夫链算法数据
 */
export interface MarkovData {
  samples: string[];
  order?: number;
  minLength?: number;
  maxLength?: number;
}

/**
 * 音节算法数据
 */
export interface SyllableData {
  consonants?: WeightedItem[];
  vowels: WeightedItem[];
  endings?: WeightedItem[];
  minSyllables?: number;
  maxSyllables?: number;
  capitalize?: boolean;
}

/**
 * 带权重的项
 */
export interface WeightedItem {
  value: string;
  weight: number;
  en?: string;
}

/**
 * 规则包
 */
export interface RulesBundle {
  version: string;
  generatedAt: string;
  totalRules: number;
  rules: Rule[];
}
