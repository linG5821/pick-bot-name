/**
 * 微信平台配置
 */

import { PlatformConfig } from '@/types';

export const weixinConfig: PlatformConfig = {
  key: 'weixin',
  displayName: {
    en: 'Weixin',
    zh: '微信',
  },
  icon: '💚',
  officialUrl: 'https://weixin.qq.com',
  docsUrl: 'https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html',
  difficulty: 'hard',
  category: 'social',
  popularity: 90,

  namingRules: {
    displayName: {
      minLength: 2,
      maxLength: 30,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        spaces: true,
      },
      description: {
        en: 'Official account name 2-30 characters',
        zh: '公众号名称2-30个字符',
      },
    },
  },

  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Register Official Account',
        zh: '注册公众号',
      },
      description: {
        en: 'Go to WeChat Official Accounts Platform and register',
        zh: '访问微信公众平台并注册',
      },
      url: 'https://mp.weixin.qq.com',
      type: 'navigation',
    },
    {
      order: 2,
      title: {
        en: 'Choose Account Type',
        zh: '选择账号类型',
      },
      description: {
        en: 'Select "Service Account" for bot features',
        zh: '选择"服务号"以获得机器人功能',
      },
      type: 'action',
    },
    {
      order: 3,
      title: {
        en: 'Submit Verification',
        zh: '提交认证',
      },
      description: {
        en: 'Complete enterprise verification (requires business license)',
        zh: '完成企业认证（需要营业执照）',
      },
      type: 'action',
    },
    {
      order: 4,
      title: {
        en: 'Configure Bot Features',
        zh: '配置机器人功能',
      },
      description: {
        en: 'Enable custom menu, auto-reply, and other bot features',
        zh: '启用自定义菜单、自动回复等机器人功能',
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
        en: 'Copy AppID and AppSecret from "Development" > "Basic Configuration"',
        zh: '从"开发" > "基本配置"复制 AppID 和 AppSecret',
      },
      type: 'credential',
    },
  ],

  credentials: [
    {
      key: 'app_id',
      name: {
        en: 'AppID',
        zh: 'AppID',
      },
      description: {
        en: 'WeChat official account AppID',
        zh: '微信公众号AppID',
      },
      required: true,
      sensitive: false,
    },
    {
      key: 'app_secret',
      name: {
        en: 'AppSecret',
        zh: 'AppSecret',
      },
      description: {
        en: 'WeChat official account AppSecret',
        zh: '微信公众号AppSecret',
      },
      required: true,
      sensitive: true,
    },
  ],

  usernameGeneratedBySystem: true,
  isGeneric: false,
};
