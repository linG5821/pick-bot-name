/**
 * Telegram 平台配置
 */

import { PlatformConfig } from '@/types';

export const telegramConfig: PlatformConfig = {
  key: 'telegram',
  displayName: {
    en: 'Telegram',
    zh: 'Telegram',
  },
  icon: '✈️',
  officialUrl: 'https://telegram.org',
  docsUrl: 'https://core.telegram.org/bots',
  difficulty: 'easy',
  category: 'messaging',
  popularity: 95,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 128,
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
        en: 'Bot display name can be any characters, 1-128 characters',
        zh: '显示名称可以是任意字符，1-128个字符',
      },
    },
    username: {
      minLength: 5,
      maxLength: 32,
      pattern: '^[a-zA-Z][a-zA-Z0-9_]*$',
      patternDescription: 'Must start with a letter, only letters, numbers, and underscores',
      mustEndWith: 'bot',
      caseRequirement: 'any',
      allowedCharacters: {
        letters: true,
        numbers: true,
        underscore: true,
      },
      description: {
        en: 'Username must be 5-32 characters, start with a letter, end with "bot", only letters, numbers, and underscores',
        zh: '用户名必须5-32个字符，以字母开头，以"bot"结尾，只能包含字母、数字和下划线',
      },
      examples: {
        valid: ['mybot', 'test_bot', 'CoolBot123'],
        invalid: ['bot', '123bot', 'my-bot', 'mybot!'],
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Open BotFather',
        zh: '打开 BotFather',
      },
      description: {
        en: 'Search for @BotFather in Telegram and start a conversation',
        zh: '在Telegram中搜索 @BotFather 并开始对话',
      },
      type: 'action',
    },
    {
      order: 2,
      title: {
        en: 'Create new bot',
        zh: '创建新机器人',
      },
      description: {
        en: 'Send /newbot command to BotFather',
        zh: '向 BotFather 发送 /newbot 命令',
      },
      command: '/newbot',
      type: 'command',
    },
    {
      order: 3,
      title: {
        en: 'Set display name',
        zh: '设置显示名称',
      },
      description: {
        en: 'Enter the bot display name when prompted',
        zh: '在提示时输入机器人显示名称',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 4,
      title: {
        en: 'Set username',
        zh: '设置用户名',
      },
      description: {
        en: 'Enter the bot username (must end with "bot")',
        zh: '输入机器人用户名（必须以"bot"结尾）',
      },
      type: 'input',
      inputType: 'username',
    },
    {
      order: 5,
      title: {
        en: 'Save API token',
        zh: '保存 API Token',
      },
      description: {
        en: 'BotFather will provide an API token. Save it securely!',
        zh: 'BotFather 会提供一个 API Token，请妥善保存！',
      },
      type: 'credential',
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
        en: 'API token provided by BotFather',
        zh: 'BotFather 提供的 API Token',
      },
      required: true,
      sensitive: true,
      example: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz',
    },
  ],

  usernameGeneratedBySystem: false,
  isGeneric: false,
};
