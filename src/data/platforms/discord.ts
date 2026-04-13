/**
 * Discord 平台配置
 */

import { PlatformConfig } from '@/types';

export const discordConfig: PlatformConfig = {
  key: 'discord',
  displayName: {
    en: 'Discord',
    zh: 'Discord',
  },
  icon: '💬',
  officialUrl: 'https://discord.com',
  docsUrl: 'https://discord.com/developers/docs/intro',
  difficulty: 'medium',
  category: 'messaging',
  popularity: 90,

  namingRules: {
    displayName: {
      minLength: 2,
      maxLength: 32,
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
        en: 'Bot display name can be 2-32 characters, supports Unicode',
        zh: '显示名称可以是2-32个字符，支持Unicode',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Open Discord Developer Portal',
        zh: '打开 Discord 开发者门户',
      },
      description: {
        en: 'Go to https://discord.com/developers/applications',
        zh: '访问 https://discord.com/developers/applications',
      },
      url: 'https://discord.com/developers/applications',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create New Application',
        zh: '创建新应用',
      },
      description: {
        en: 'Click "New Application" button and enter a name',
        zh: '点击"New Application"按钮并输入名称',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Add Bot',
        zh: '添加机器人',
      },
      description: {
        en: 'Go to "Bot" tab and click "Add Bot"',
        zh: '进入"Bot"标签页并点击"Add Bot"',
      },
      type: 'action',
    },
    {
      order: 4,
      title: {
        en: 'Configure Bot Settings',
        zh: '配置机器人设置',
      },
      description: {
        en: 'Set bot display name, avatar, and enable required intents',
        zh: '设置机器人显示名称、头像并启用所需的intents',
      },
      type: 'configuration',
    },
    {
      order: 5,
      title: {
        en: 'Get Bot Token',
        zh: '获取 Bot Token',
      },
      description: {
        en: 'Click "Reset Token" to get your bot token. Save it securely!',
        zh: '点击"Reset Token"获取你的bot token。请妥善保存！',
      },
      type: 'credential',
    },
    {
      order: 6,
      title: {
        en: 'Invite Bot to Server',
        zh: '邀请机器人到服务器',
      },
      description: {
        en: 'Go to OAuth2 > URL Generator, select scopes and permissions, then use the generated URL',
        zh: '进入OAuth2 > URL Generator，选择作用域和权限，然后使用生成的URL',
      },
      type: 'action',
    },
  ],

  credentials: [
    {
      key: 'bot_token',
      name: {
        en: 'Bot Token',
        zh: 'Bot Token',
      },
      description: {
        en: 'Bot token from Developer Portal',
        zh: '从开发者门户获取的Bot Token',
      },
      required: true,
      sensitive: true,
    },
    {
      key: 'application_id',
      name: {
        en: 'Application ID',
        zh: '应用ID',
      },
      description: {
        en: 'Application ID from General Information',
        zh: '从常规信息获取的应用ID',
      },
      required: true,
      sensitive: false,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
