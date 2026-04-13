/**
 * 页面语言切换组件
 */

import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
      onClick={toggleLanguage}
      aria-label={currentLanguage === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      {currentLanguage === 'zh' ? (
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <text x="2" y="14" fontSize="12" fontWeight="bold">中</text>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <text x="2" y="14" fontSize="12" fontWeight="bold">EN</text>
        </svg>
      )}
    </button>
  );
};
