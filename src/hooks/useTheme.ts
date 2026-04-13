/**
 * 主题 Hook
 */

import { useEffect } from 'react';
import { useUIStore } from '@/store';

export const useTheme = () => {
  const { theme, toggleTheme } = useUIStore();

  useEffect(() => {
    // 更新 HTML dark class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
};
