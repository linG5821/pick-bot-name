/**
 * 平台相关类型定义
 */

import { MultiLangText } from './generator';

/**
 * 平台ID类型
 */
export type PlatformId =
  | 'generic'
  | 'telegram'
  | 'discord'
  | 'slack'
  | 'feishu'
  | 'dingtalk'
  | 'wecom'
  | 'weixin'
  | 'qq'
  | 'qqbot'
  | 'line';

/**
 * 平台分类
 */
export type PlatformCategory = 'generic' | 'messaging' | 'workspace' | 'social';

/**
 * 创建难度
 */
export type CreationDifficulty = 'easy' | 'medium' | 'hard';

/**
 * 命名规则
 */
export interface NamingRule {
  minLength: number;
  maxLength: number;
  allowedCharacters: {
    letters?: boolean;
    numbers?: boolean;
    chinese?: boolean;
    japanese?: boolean;
    korean?: boolean;
    emoji?: boolean;
    spaces?: boolean;
    uppercaseLetters?: boolean;
    lowercaseLetters?: boolean;
    underscore?: boolean;
    hyphen?: boolean;
    dot?: boolean;
    specialChars?: string[];
  };
  caseSensitive?: boolean;
  pattern?: string;
  patternDescription?: string;
  suffix?: string;
  prefix?: string;
  examples?: {
    valid: string[];
    invalid?: string[];
  };
  description: MultiLangText;
  // 简化的验证规则
  allowedChars?: string;
  forbiddenChars?: string;
  mustStartWith?: string;
  mustEndWith?: string;
  caseRequirement?: 'lowercase' | 'uppercase' | 'any';
}

/**
 * 平台配置
 */
export interface PlatformConfig {
  key: PlatformId;
  displayName: MultiLangText;
  icon: string;
  officialUrl: string;
  docsUrl: string;
  difficulty: CreationDifficulty;

  // 命名规则
  namingRules: {
    displayName: NamingRule;
    username?: NamingRule;
  };

  // 创建步骤
  creationSteps: PlatformStep[];

  // 凭证信息
  credentials: Credential[];

  // 特殊标志
  usernameGeneratedBySystem?: boolean;
  isGeneric?: boolean;
  requiresPublicIP?: boolean;

  // 分类和排序
  category?: PlatformCategory;
  popularity?: number;
}

/**
 * 创建步骤类型
 */
export type StepType = 'navigation' | 'action' | 'command' | 'input' | 'configuration' | 'credential' | 'info';

/**
 * 创建步骤
 */
export interface PlatformStep {
  order: number;
  title: MultiLangText;
  description: MultiLangText;
  type?: StepType;
  image?: string;
  command?: string;
  url?: string;
  inputType?: 'displayName' | 'username';
  externalLink?: {
    url: string;
    text: MultiLangText;
  };
  warning?: MultiLangText;
  tips?: MultiLangText;
  highlightField?: 'displayName' | 'username';
}

/**
 * 凭证类型
 */
export type CredentialType = 'token' | 'app_id' | 'app_secret' | 'api_key';

/**
 * 凭证信息
 */
export interface Credential {
  key?: string;
  type?: CredentialType;
  name?: MultiLangText;
  displayName?: MultiLangText;
  description: MultiLangText;
  format?: string;
  howToObtain?: MultiLangText;
  required?: boolean;
  sensitive?: boolean;
  example?: string;
}

/**
 * 单个平台的机器人信息
 */
export interface PlatformBotInfo {
  platform: PlatformId;
  displayName: string;
  username: string | null;
  needsUsername: boolean;
  isValid: boolean;
  validationErrors?: string[];
  metadata: {
    difficulty: CreationDifficulty;
    estimatedTime: string;
    needsToken?: boolean;
    needsAppId?: boolean;
    needsSecret?: boolean;
    isGeneric?: boolean;
    usernameGeneratedBySystem?: boolean;
    [key: string]: any;
  };
}

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}
