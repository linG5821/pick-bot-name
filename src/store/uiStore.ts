/**
 * UI状态管理
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageCode, PlatformId } from '@/types';

type Theme = 'light' | 'dark';

interface UIState {
  // 主题
  theme: Theme;

  // 界面语言
  language: LanguageCode;

  // 当前选中的平台Tab
  activePlatform: PlatformId;

  // 侧边栏状态
  sidebarOpen: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: LanguageCode) => void;
  setActivePlatform: (platform: PlatformId) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

// 获取系统主题偏好
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      language: 'zh',
      activePlatform: 'generic',
      sidebarOpen: false,

      setTheme: (theme) => {
        set({ theme });
        // 更新HTML dark class
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // 更新HTML dark class
          if (typeof document !== 'undefined') {
            if (newTheme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
          return { theme: newTheme };
        }),

      setLanguage: (language) => set({ language }),

      setActivePlatform: (platform) => set({ activePlatform: platform }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

// 初始化主题
if (typeof document !== 'undefined') {
  const { theme } = useUIStore.getState();
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
