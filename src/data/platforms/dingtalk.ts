/**
 * 钉钉平台配置
 */

import { PlatformConfig } from '@/types';

export const dingtalkConfig: PlatformConfig = {
  key: 'dingtalk',
  displayName: {
    en: 'DingTalk',
    zh: '钉钉',
  },
  icon: '📱',
  officialUrl: 'https://www.dingtalk.com',
  docsUrl: 'https://open.dingtalk.com/document/robots/robot-overview',
  difficulty: 'medium',
  category: 'workspace',
  popularity: 82,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 64,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        spaces: true,
      },
      description: {
        en: 'Bot name 1-64 characters, supports Chinese',
        zh: '机器人名称1-64个字符，支持中文',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Open DingTalk Developer Platform',
        zh: '打开钉钉开发者平台',
      },
      description: {
        en: 'Go to https://open-dev.dingtalk.com/',
        zh: '访问 https://open-dev.dingtalk.com/',
      },
      url: 'https://open-dev.dingtalk.com/',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Application',
        zh: '创建应用',
      },
      description: {
        en: 'Click "Application Development" > "Create Application"',
        zh: '点击"应用开发" > "创建应用"',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Configure Bot',
        zh: '配置机器人',
      },
      description: {
        en: 'Enable bot feature and configure name, description, and avatar',
        zh: '启用机器人功能并配置名称、描述和头像',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 4,
      title: {
        en: 'Get Credentials',
        zh: '获取凭证',
      },
      description: {
        en: 'Copy AppKey, AppSecret from application details',
        zh: '从应用详情复制 AppKey、AppSecret',
      },
      type: 'credential',
    },
    {
      order: 5,
      title: {
        en: 'Publish Application',
        zh: '发布应用',
      },
      description: {
        en: 'Submit for review and publish after approval',
        zh: '提交审核，审核通过后发布',
      },
      type: 'action',
    },
  ],

  credentials: [
    {
      key: 'app_key',
      name: {
        en: 'App Key',
        zh: 'App Key',
      },
      description: {
        en: 'Application key from DingTalk',
        zh: '钉钉应用的AppKey',
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
        en: 'Application secret from DingTalk',
        zh: '钉钉应用的AppSecret',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
