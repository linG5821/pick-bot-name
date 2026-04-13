/**
 * 企业微信平台配置
 */

import { PlatformConfig } from '@/types';

export const wecomConfig: PlatformConfig = {
  key: 'wecom',
  displayName: {
    en: 'WeChat Work',
    zh: '企业微信',
  },
  icon: '💼',
  officialUrl: 'https://work.weixin.qq.com',
  docsUrl: 'https://developer.work.weixin.qq.com/document/path/90664',
  difficulty: 'medium',
  category: 'workspace',
  popularity: 85,

  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 32,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        spaces: true,
      },
      description: {
        en: 'Application name 1-32 characters',
        zh: '应用名称1-32个字符',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Access Admin Console',
        zh: '访问管理后台',
      },
      description: {
        en: 'Login to WeChat Work admin console',
        zh: '登录企业微信管理后台',
      },
      url: 'https://work.weixin.qq.com/wework_admin/',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Create Application',
        zh: '创建应用',
      },
      description: {
        en: 'Go to "Applications & Mini Programs" > "Create Application"',
        zh: '进入"应用与小程序" > "创建应用"',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Configure Application',
        zh: '配置应用',
      },
      description: {
        en: 'Fill in application name, logo, and description',
        zh: '填写应用名称、logo和描述',
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
        en: 'Note down Corp ID, Agent ID, and Secret from application details',
        zh: '从应用详情记下 Corp ID、Agent ID 和 Secret',
      },
      type: 'credential',
    },
  ],

  credentials: [
    {
      key: 'corp_id',
      name: {
        en: 'Corp ID',
        zh: '企业ID',
      },
      description: {
        en: 'Enterprise corp ID',
        zh: '企业的Corp ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'agent_id',
      name: {
        en: 'Agent ID',
        zh: '应用ID',
      },
      description: {
        en: 'Application agent ID',
        zh: '应用的Agent ID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'secret',
      name: {
        en: 'Secret',
        zh: 'Secret',
      },
      description: {
        en: 'Application secret',
        zh: '应用的Secret',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
