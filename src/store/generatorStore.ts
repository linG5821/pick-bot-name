/**
 * 生成器状态管理
 */

import { create } from 'zustand';
import { BotStyle, GeneratedBotInfo, LanguageCode } from '@/types';

interface GeneratorState {
  // 选择的选项
  selectedStyle: BotStyle;
  selectedLanguage: LanguageCode;

  // 生成结果
  generatedInfo: GeneratedBotInfo | null;

  // 加载状态
  isGenerating: boolean;
  error: string | null;

  // Actions
  setStyle: (style: BotStyle) => void;
  setLanguage: (language: LanguageCode) => void;
  setGeneratedInfo: (info: GeneratedBotInfo | null) => void;
  setGenerating: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  selectedStyle: BotStyle.PUNK,
  selectedLanguage: 'zh' as LanguageCode,
  generatedInfo: null,
  isGenerating: false,
  error: null,
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  ...initialState,

  setStyle: (style) => set({ selectedStyle: style }),

  setLanguage: (language) => set({ selectedLanguage: language }),

  setGeneratedInfo: (info) => set({ generatedInfo: info, error: null }),

  setGenerating: (loading) => set({ isGenerating: loading }),

  setError: (error) => set({ error, isGenerating: false }),

  reset: () => set(initialState),
}));
