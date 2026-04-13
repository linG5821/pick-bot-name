/**
 * 统计数据管理
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BotStyle } from '@/types';

export interface NameStat {
  name: string;
  style: BotStyle;
  count: number;
  lastUsed: number;
}

interface StatsState {
  // 名称统计数据
  nameStats: Record<string, NameStat>;

  // Actions
  recordCopy: (name: string, style: BotStyle) => void;
  getTopNames: (limit?: number) => NameStat[];
  clearStats: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      nameStats: {},

      // 记录名称复制
      recordCopy: (name, style) => {
        set((state) => {
          const key = `${style}:${name}`;
          const existing = state.nameStats[key];

          return {
            nameStats: {
              ...state.nameStats,
              [key]: {
                name,
                style,
                count: (existing?.count || 0) + 1,
                lastUsed: Date.now(),
              },
            },
          };
        });
      },

      // 获取排名前N的名称
      getTopNames: (limit = 10) => {
        const { nameStats } = get();
        const stats = Object.values(nameStats);

        return stats
          .sort((a, b) => {
            // 先按复制次数排序
            if (b.count !== a.count) {
              return b.count - a.count;
            }
            // 次数相同则按最后使用时间排序
            return b.lastUsed - a.lastUsed;
          })
          .slice(0, limit);
      },

      // 清空统计数据
      clearStats: () => {
        set({ nameStats: {} });
      },
    }),
    {
      name: 'stats-storage',
    }
  )
);
