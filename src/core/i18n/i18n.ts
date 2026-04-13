/**
 * 国际化配置
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from '@/data/locales/zh.json';
import en from '@/data/locales/en.json';

// 获取浏览器语言
const getBrowserLanguage = (): string => {
  if (typeof navigator === 'undefined') return 'zh';
  const lang = navigator.language.split('-')[0];
  return ['zh', 'en'].includes(lang) ? lang : 'zh';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
    },
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
