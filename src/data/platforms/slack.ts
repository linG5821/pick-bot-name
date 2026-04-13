/**
 * Slack 平台配置
 */

import { PlatformConfig } from '@/types';

export const slackConfig: PlatformConfig = {
  key: 'slack',
  displayName: {
    en: 'Slack',
    zh: 'Slack',
  },
  icon: '💼',
  officialUrl: 'https://slack.com',
  docsUrl: 'https://api.slack.com/bot-users',
  difficulty: 'medium',
  category: 'workspace',
  popularity: 88,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 80,
      allowedCharacters: {
        letters: true,
        numbers: true,
        spaces: true,
        emoji: true,
      },
      description: {
        en: 'App name can be 1-80 characters',
        zh: '应用名称可以是1-80个字符',
      },
    },
    username: {
      minLength: 1,
      maxLength: 21,
      pattern: '^[a-z0-9._-]+$',
      patternDescription: 'Only lowercase letters, numbers, dots, dashes, and underscores',
      caseRequirement: 'lowercase',
      allowedCharacters: {
        lowercaseLetters: true,
        numbers: true,
        dot: true,
        hyphen: true,
        underscore: true,
      },
      description: {
        en: 'Bot username must be 1-21 characters, lowercase, letters, numbers, dots, dashes, and underscores only',
        zh: '机器人用户名必须1-21个字符，小写，只能包含字母、数字、点、短横线和下划线',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Go to Slack API',
        zh: '访问 Slack API',
      },
      description: {
        en: 'Visit https://api.slack.com/apps and sign in',
        zh: '访问 https://api.slack.com/apps 并登录',
      },
      url: 'https://api.slack.com/apps',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create New App',
        zh: '创建新应用',
      },
      description: {
        en: 'Click "Create New App" and choose "From scratch"',
        zh: '点击"Create New App"并选择"From scratch"',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Configure App',
        zh: '配置应用',
      },
      description: {
        en: 'Enter app name and select workspace',
        zh: '输入应用名称并选择工作区',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 4,
      title: {
        en: 'Add Bot User',
        zh: '添加机器人用户',
      },
      description: {
        en: 'Go to "App Home" > "Bot Users" and add a bot user',
        zh: '进入"App Home" > "Bot Users"并添加机器人用户',
      },
      type: 'action',
    },
    {
      order: 5,
      title: {
        en: 'Install App',
        zh: '安装应用',
      },
      description: {
        en: 'Go to "OAuth & Permissions", add scopes, and install to workspace',
        zh: '进入"OAuth & Permissions"，添加作用域并安装到工作区',
      },
      type: 'action',
    },
    {
      order: 6,
      title: {
        en: 'Get Bot Token',
        zh: '获取 Bot Token',
      },
      description: {
        en: 'Copy "Bot User OAuth Token" from OAuth & Permissions',
        zh: '从 OAuth & Permissions 复制"Bot User OAuth Token"',
      },
      type: 'credential',
    },
  ],

  credentials: [
    {
      key: 'bot_token',
      name: {
        en: 'Bot User OAuth Token',
        zh: 'Bot User OAuth Token',
      },
      description: {
        en: 'OAuth token starting with "xoxb-"',
        zh: '以"xoxb-"开头的OAuth token',
      },
      required: true,
      sensitive: true,
      example: 'xoxb-1234567890-1234567890-abcdefghijklmnopqrstuvwx',
    },
  ],

  usernameGeneratedBySystem: false,
  isGeneric: false,
};
