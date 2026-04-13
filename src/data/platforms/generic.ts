/**
 * 通用平台配置
 */

import { PlatformConfig } from '@/types';

export const genericConfig: PlatformConfig = {
  key: 'generic',
  displayName: {
    en: 'Generic',
    zh: '通用',
  },
  icon: '🤖',
  officialUrl: '',
  docsUrl: '',
  difficulty: 'easy',
  category: 'generic',
  popularity: 100,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 100,
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
        en: 'Generic bot name with minimal restrictions',
        zh: '通用机器人名称，限制最少',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Choose Your Platform',
        zh: '选择你的平台',
      },
      description: {
        en: 'This is a generic bot name. Adapt it to your specific platform requirements.',
        zh: '这是一个通用的机器人名称。请根据具体平台要求进行调整。',
      },
      type: 'info',
    },
  ],

  credentials: [],

  usernameGeneratedBySystem: false,
  isGeneric: true,
};
