/**
 * 风格选择器组件
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { BotStyle } from '@/types';
import { Card } from '@/components/common';

const STYLE_EMOJIS: Record<BotStyle, string> = {
  [BotStyle.PUNK]: '🤖',          // 朋克（机器人）
  [BotStyle.CUTE]: '🥰',          // 可爱
  [BotStyle.PROFESSIONAL]: '💼',  // 专业
  [BotStyle.GEEK]: '🤓',          // 极客
  [BotStyle.MINIMAL]: '◽',        // 极简
  [BotStyle.ANIME]: '🎨',          // 卡通
  [BotStyle.ACGN]: '🌸',          // 二次元
  [BotStyle.GUOFENG]: '🎋',       // 国风
};

export interface StyleSelectorProps {
  selectedStyle: BotStyle;
  onStyleChange: (style: BotStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
}) => {
  const { t } = useTranslation();

  const styles = Object.values(BotStyle);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
      {styles.map((style) => {
        const isSelected = style === selectedStyle;
        return (
          <Card
            key={style}
            className={`
              text-center cursor-pointer transition-all duration-200 min-w-0
              ${isSelected
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400 scale-105 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'}
            `}
            onClick={() => onStyleChange(style)}
            hoverable
          >
            <div className="text-2xl md:text-4xl mb-1 md:mb-2">{STYLE_EMOJIS[style]}</div>
            <div className={`text-xs md:text-sm font-medium truncate ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
              {t(`style.${style}`)}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
