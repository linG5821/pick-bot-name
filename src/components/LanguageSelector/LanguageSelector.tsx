/**
 * 语言选择器组件
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '@/types';
import { Select, SelectOption } from '@/components/common';

const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
};

export interface LanguageSelectorProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation();

  const languages: LanguageCode[] = ['zh', 'en'];

  const options: SelectOption[] = languages.map((lang) => ({
    value: lang,
    label: t(`language.${lang}`),
    icon: <span className="text-xl">{LANGUAGE_FLAGS[lang]}</span>,
  }));

  return (
    <Select
      options={options}
      value={selectedLanguage}
      onChange={(value) => onLanguageChange(value as LanguageCode)}
    />
  );
};
