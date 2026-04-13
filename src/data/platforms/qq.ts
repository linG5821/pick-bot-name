/**
 * QQ 平台配置
 */

import { PlatformConfig } from '@/types';

export const qqConfig: PlatformConfig = {
  key: 'qq',
  displayName: {
    en: 'QQ',
    zh: 'QQ',
  },
  icon: '🐧',
  officialUrl: 'https://q.qq.com',
  docsUrl: 'https://q.qq.com/wiki/',
  difficulty: 'hard',
  category: 'social',
  popularity: 80,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 24,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        emoji: true,
        spaces: true,
      },
      description: {
        en: 'Bot display name 1-24 characters, supports Chinese',
        zh: '机器人显示名称1-24个字符，支持中文',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Apply for QQ Bot',
        zh: '申请 QQ 机器人',
      },
      description: {
        en: 'Go to https://q.qq.com and apply for bot creation',
        zh: '访问 https://q.qq.com 申请创建机器人',
      },
      url: 'https://q.qq.com',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Bot',
        zh: '创建机器人',
      },
      description: {
        en: 'Fill in bot information and submit for review',
        zh: '填写机器人信息并提交审核',
      },
      type: 'input',
      inputType: 'displayName',
    },
    {
      order: 3,
      title: {
        en: 'Wait for Approval',
        zh: '等待审核',
      },
      description: {
        en: 'QQ official team will review your application, which may take several days',
        zh: 'QQ官方团队会审核你的申请，可能需要几天时间',
      },
      type: 'info',
    },
    {
      order: 4,
      title: {
        en: 'Get Bot Credentials',
        zh: '获取机器人凭证',
      },
      description: {
        en: 'Once approved, you will receive bot QQ number and authentication info',
        zh: '审核通过后，你将收到机器人QQ号和认证信息',
      },
      type: 'credential',
    },
  ],

  credentials: [
    {
      key: 'bot_qq',
      name: {
        en: 'Bot QQ Number',
        zh: '机器人QQ号',
      },
      description: {
        en: 'QQ number assigned to your bot',
        zh: '分配给你的机器人的QQ号',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'app_id',
      name: {
        en: 'App ID',
        zh: 'App ID',
      },
      description: {
        en: 'Application ID from QQ open platform',
        zh: 'QQ开放平台的应用ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'token',
      name: {
        en: 'Bot Token',
        zh: 'Bot Token',
      },
      description: {
        en: 'Authentication token for bot',
        zh: '机器人的认证令牌',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
