/**
 * LINE 平台配置
 */

import { PlatformConfig } from '@/types';

export const lineConfig: PlatformConfig = {
  key: 'line',
  displayName: {
    en: 'LINE',
    zh: 'LINE',
  },
  icon: '💚',
  officialUrl: 'https://line.me',
  docsUrl: 'https://developers.line.biz/en/docs/messaging-api/',
  difficulty: 'medium',
  category: 'messaging',
  popularity: 70,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 20,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        japanese: true,
        korean: true,
        emoji: true,
        spaces: true,
      },
      description: {
        en: 'Bot display name 1-20 characters',
        zh: '机器人显示名称1-20个字符',
      },
    },
    username: {
      minLength: 1,
      maxLength: 20,
      pattern: '^@[a-zA-Z0-9._]+$',
      patternDescription: 'Must start with @, only letters, numbers, dots, and underscores',
      mustStartWith: '@',
      allowedCharacters: {
        letters: true,
        numbers: true,
        dot: true,
        underscore: true,
      },
      description: {
        en: 'LINE ID must start with @, 1-20 characters, letters, numbers, dots, and underscores',
        zh: 'LINE ID 必须以@开头，1-20个字符，字母、数字、点和下划线',
      },
      examples: {
        valid: ['@mybot', '@test_bot', '@bot.123'],
        invalid: ['mybot', '@', '@my-bot'],
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Access LINE Developers Console',
        zh: '访问 LINE 开发者控制台',
      },
      description: {
        en: 'Go to https://developers.line.biz/console/',
        zh: '访问 https://developers.line.biz/console/',
      },
      url: 'https://developers.line.biz/console/',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Provider',
        zh: '创建提供商',
      },
      description: {
        en: 'Create a new provider or select existing one',
        zh: '创建新的提供商或选择现有提供商',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Create Messaging API Channel',
        zh: '创建 Messaging API 频道',
      },
      description: {
        en: 'Click "Create a Messaging API channel"',
        zh: '点击"创建 Messaging API 频道"',
      },
      type: 'action',
    },
    {
      order: 4,
      title: {
        en: 'Configure Channel',
        zh: '配置频道',
      },
      description: {
        en: 'Fill in channel name, description, and other information',
        zh: '填写频道名称、描述等信息',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 5,
      title: {
        en: 'Get Channel Access Token',
        zh: '获取频道访问令牌',
      },
      description: {
        en: 'Go to "Messaging API" tab and issue channel access token',
        zh: '进入"Messaging API"标签页并发行频道访问令牌',
      },
      type: 'credential',
    },
  ],

  credentials: [
    {
      key: 'channel_id',
      name: {
        en: 'Channel ID',
        zh: 'Channel ID',
      },
      description: {
        en: 'LINE Messaging API channel ID',
        zh: 'LINE Messaging API 频道ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'channel_secret',
      name: {
        en: 'Channel Secret',
        zh: 'Channel Secret',
      },
      description: {
        en: 'Channel secret key',
        zh: '频道密钥',
      },
      required: true,
      sensitive: true,
    },
    {
      key: 'channel_access_token',
      name: {
        en: 'Channel Access Token',
        zh: 'Channel Access Token',
      },
      description: {
        en: 'Long-lived channel access token',
        zh: '长期有效的频道访问令牌',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: false,
  isGeneric: false,
};
