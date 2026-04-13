/**
 * 卡片组件
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  onClick,
  hoverable = false,
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm';
  const glowClasses = glow ? 'shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30' : '';
  const hoverClasses = hoverable || onClick
    ? 'cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300'
    : '';

  return (
    <div
      className={`${baseClasses} ${glowClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
