/**
 * 飞书平台配置
 */

import { PlatformConfig } from '@/types';

export const feishuConfig: PlatformConfig = {
  key: 'feishu',
  displayName: {
    en: 'Feishu/Lark',
    zh: '飞书',
  },
  icon: '🪁',
  officialUrl: 'https://www.feishu.cn',
  docsUrl: 'https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process',
  difficulty: 'medium',
  category: 'workspace',
  popularity: 85,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 64,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        emoji: true,
        spaces: true,
      },
      description: {
        en: 'Bot name can be 1-64 characters, supports Chinese and emoji',
        zh: '机器人名称1-64个字符，支持中文和emoji',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Open Feishu Open Platform',
        zh: '打开飞书开放平台',
      },
      description: {
        en: 'Go to https://open.feishu.cn/app',
        zh: '访问 https://open.feishu.cn/app',
      },
      url: 'https://open.feishu.cn/app',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Custom App',
        zh: '创建自建应用',
      },
      description: {
        en: 'Click "Create Custom App", select "Bot" type',
        zh: '点击"创建自建应用"，选择"机器人"类型',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Configure App Info',
        zh: '配置应用信息',
      },
      description: {
        en: 'Enter app name, description, and upload icon',
        zh: '输入应用名称、描述并上传图标',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 4,
      title: {
        en: 'Enable Bot Capability',
        zh: '启用机器人能力',
      },
      description: {
        en: 'Go to "Features" > "Bot", enable bot and configure permissions',
        zh: '进入"功能">"机器人"，启用机器人并配置权限',
      },
      type: 'configuration',
    },
    {
      order: 5,
      title: {
        en: 'Get Credentials',
        zh: '获取凭证',
      },
      description: {
        en: 'Copy App ID and App Secret from "Credentials & Basic Info"',
        zh: '从"凭证与基础信息"复制 App ID 和 App Secret',
      },
      type: 'credential',
    },
    {
      order: 6,
      title: {
        en: 'Publish Version',
        zh: '发布版本',
      },
      description: {
        en: 'Create and publish a version to make the bot available',
        zh: '创建并发布版本以使机器人可用',
      },
      type: 'action',
    },
  ],

  credentials: [
    {
      key: 'app_id',
      name: {
        en: 'App ID',
        zh: 'App ID',
      },
      description: {
        en: 'Application ID from Feishu Open Platform',
        zh: '飞书开放平台的应用ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'app_secret',
      name: {
        en: 'App Secret',
        zh: 'App Secret',
      },
      description: {
        en: 'Application secret from Feishu Open Platform',
        zh: '飞书开放平台的应用密钥',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
