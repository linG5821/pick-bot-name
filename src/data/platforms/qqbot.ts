/**
 * QQ Bot 平台配置（QQ频道机器人）
 */

import { PlatformConfig } from '@/types';

export const qqbotConfig: PlatformConfig = {
  key: 'qqbot',
  displayName: {
    en: 'QQ Bot',
    zh: 'QQ Bot',
  },
  icon: '🎮',
  officialUrl: 'https://bot.q.qq.com',
  docsUrl: 'https://bot.q.qq.com/wiki/',
  difficulty: 'medium',
  category: 'social',
  popularity: 75,

  namingRules: {
    displayName: {
      minLength: 2,
      maxLength: 32,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        spaces: true,
      },
      description: {
        en: 'Bot name 2-32 characters',
        zh: '机器人名称2-32个字符',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Visit QQ Bot Platform',
        zh: '访问 QQ Bot 平台',
      },
      description: {
        en: 'Go to https://bot.q.qq.com/open',
        zh: '访问 https://bot.q.qq.com/open',
      },
      url: 'https://bot.q.qq.com/open',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Bot',
        zh: '创建机器人',
      },
      description: {
        en: 'Click "Create Bot" and fill in information',
        zh: '点击"创建机器人"并填写信息',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 3,
      title: {
        en: 'Configure Permissions',
        zh: '配置权限',
      },
      description: {
        en: 'Set bot permissions and intents',
        zh: '设置机器人权限和意图',
      },
      type: 'configuration',
    },
    {
      order: 4,
      title: {
        en: 'Get Credentials',
        zh: '获取凭证',
      },
      description: {
        en: 'Copy BotAppID and BotToken from bot details',
        zh: '从机器人详情复制 BotAppID 和 BotToken',
      },
      type: 'credential',
    },
    {
      order: 5,
      title: {
        en: 'Publish Bot',
        zh: '发布机器人',
      },
      description: {
        en: 'Submit for review and add to QQ channel after approval',
        zh: '提交审核，审核通过后添加到QQ频道',
      },
      type: 'action',
    },
  ],

  credentials: [
    {
      key: 'bot_appid',
      name: {
        en: 'BotAppID',
        zh: 'BotAppID',
      },
      description: {
        en: 'Bot application ID',
        zh: '机器人应用ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'bot_token',
      name: {
        en: 'BotToken',
        zh: 'BotToken',
      },
      description: {
        en: 'Bot authentication token',
        zh: '机器人认证令牌',
      },
      required: true,
      sensitive: true,
    },
    {
      key: 'bot_secret',
      name: {
        en: 'BotSecret',
        zh: 'BotSecret',
      },
      description: {
        en: 'Bot secret key',
        zh: '机器人密钥',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
