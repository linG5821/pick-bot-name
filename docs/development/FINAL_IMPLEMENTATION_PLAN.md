# 🚀 Bot Name Generator - 开发实施计划

> Implementation Plan | v1.0 | 2026-04-11

---

## 📋 项目信息

### 项目概况

| 项目 | 信息 |
|------|------|
| **项目名称** | Bot Name Generator |
| **技术栈** | React 18 + TypeScript + Vite |
| **预计工期** | 17-23天（3-4周） |
| **团队规模** | 1-2人 |
| **优先级** | P0（MVP） → P1（增强） → P2（优化） |

### 技术选型

| 技术类别 | 选择 | 理由 |
|---------|------|------|
| **前端框架** | React 18 | 生态成熟、组件化、TypeScript支持好 |
| **语言** | TypeScript | 类型安全、开发体验好 |
| **构建工具** | Vite 5 | 极速HMR、开箱即用 |
| **状态管理** | Zustand | 轻量、简单、性能好 |
| **样式方案** | CSS Modules + Tailwind | 模块化 + 快速开发 |
| **多语言** | i18next + react-i18next | 业界标准、功能完整 |
| **路由** | React Router v6 | 标准路由方案 |
| **动画** | Framer Motion | 声明式、流畅 |
| **头像生成** | DiceBear | 纯前端、风格多样 |
| **中文转拼音** | pinyin-pro | 准确、性能好 |
| **测试** | Vitest + Testing Library | 快速、兼容性好 |
| **部署** | GitHub Pages + Actions | 免费、自动化 |

---

## 📂 项目结构

```
bot-name-generator/
├── public/
│   ├── fonts/                    # 像素字体
│   │   └── PressStart2P.ttf
│   └── images/                   # 静态图片
│       └── logo.svg
├── src/
│   ├── assets/                   # 项目资源
│   │   └── styles/
│   │       ├── themes.css        # CSS变量定义
│   │       ├── cyberpunk.css     # 赛博朋克样式
│   │       └── animations.css    # 动画定义
│   ├── components/               # React组件
│   │   ├── common/               # 通用组件
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── ThemeToggle/
│   │   │   └── LanguageSwitch/
│   │   ├── generator/            # 生成器组件
│   │   │   ├── GeneratorPanel/
│   │   │   ├── StyleSelector/
│   │   │   ├── NameCard/         # 名称展示卡片（含抽卡动画）
│   │   │   └── ResultDisplay/
│   │   ├── platform/             # 平台组件
│   │   │   ├── PlatformTabs/
│   │   │   ├── PlatformTabContent/
│   │   │   ├── PlatformGuide/
│   │   │   └── CreationSteps/
│   │   └── avatar/               # 头像组件
│   │       ├── AvatarDisplay/
│   │       └── AvatarDownload/
│   ├── core/                     # 核心业务逻辑
│   │   ├── generator/            # 生成引擎
│   │   │   ├── NameGenerator.ts  # 主生成器
│   │   │   ├── BotIdGenerator.ts # ID生成器
│   │   │   ├── algorithms/       # 生成算法
│   │   │   │   ├── combination.ts
│   │   │   │   ├── template.ts
│   │   │   │   ├── markov.ts
│   │   │   │   └── syllable.ts
│   │   │   └── validators/
│   │   │       └── platformValidator.ts
│   │   ├── rules/                # 规则系统
│   │   │   ├── RuleLoader.ts
│   │   │   ├── RuleValidator.ts
│   │   │   └── StyleRegistry.ts
│   │   ├── platforms/            # 平台配置
│   │   │   ├── platformConfig.ts
│   │   │   ├── platformCategories.ts
│   │   │   └── configs/          # 各平台配置
│   │   │       ├── generic.ts
│   │   │       ├── telegram.ts
│   │   │       ├── discord.ts
│   │   │       └── ...
│   │   ├── avatar/               # 头像生成
│   │   │   ├── AvatarGenerator.ts
│   │   │   ├── styles.ts
│   │   │   └── utils.ts
│   │   └── i18n/                 # 国际化
│   │       ├── i18n.ts
│   │       └── languages.ts
│   ├── data/                     # 数据文件
│   │   ├── rules-bundle.json     # 聚合后的规则（构建生成）
│   │   ├── styles.json           # 风格定义
│   │   └── locales/              # 多语言文件
│   │       ├── en.json
│   │       ├── zh.json
│   │       └── ja.json
│   ├── hooks/                    # 自定义Hooks
│   │   ├── useGenerator.ts
│   │   ├── useTheme.ts
│   │   ├── useLanguage.ts
│   │   └── useLocalStorage.ts
│   ├── store/                    # Zustand状态管理
│   │   ├── generatorStore.ts
│   │   ├── uiStore.ts
│   │   └── historyStore.ts
│   ├── types/                    # TypeScript类型
│   │   ├── generator.ts
│   │   ├── platform.ts
│   │   ├── rule.ts
│   │   └── avatar.ts
│   ├── utils/                    # 工具函数
│   │   ├── clipboard.ts
│   │   ├── storage.ts
│   │   ├── validators.ts
│   │   └── chineseConverter.ts
│   ├── pages/                    # 页面
│   │   ├── Home/
│   │   ├── Generator/
│   │   ├── Contribute/
│   │   └── About/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── rules/                        # 🔥 规则库（社区贡献）
│   ├── README.md                 # 规则贡献指南
│   ├── _schema.json              # JSON Schema
│   ├── _styles.json              # 风格定义
│   ├── _TEMPLATE.json            # 贡献模板
│   ├── built-in/                 # 内置规则
│   │   ├── cyberpunk-zh.json
│   │   ├── cyberpunk-en.json
│   │   ├── cute-zh.json
│   │   ├── cute-en.json
│   │   ├── professional-en.json
│   │   └── ...
│   └── community/                # 社区贡献规则
│       └── .gitkeep
├── scripts/                      # 构建脚本
│   ├── build-rules.js            # 聚合规则
│   ├── validate-rules.js         # 验证规则
│   └── generate-types.js         # 生成类型定义
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml            # 部署工作流
│   │   ├── validate-rules.yml    # 规则验证
│   │   └── tests.yml             # 测试工作流
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       ├── feature_request.md
│       └── new_rule.md
├── tests/                        # 测试文件
│   ├── unit/                     # 单元测试
│   ├── integration/              # 集成测试
│   └── e2e/                      # E2E测试（可选）
├── docs/                         # 文档
│   ├── images/                   # 文档图片
│   ├── CONTRIBUTING.md
│   └── STYLE_GUIDE.md
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
├── README.zh.md
├── README.ja.md
└── LICENSE
```

---

## 📅 开发阶段

### 阶段划分

| 阶段 | 时间 | 内容 | 优先级 |
|------|------|------|--------|
| **阶段0** | 1天 | 环境搭建 | P0 |
| **阶段1** | 3-4天 | 基础架构 | P0 |
| **阶段2** | 4-5天 | 生成器核心 | P0 |
| **阶段3** | 3-4天 | 多平台集成 | P0 |
| **阶段4** | 3-4天 | UI/UX实现 | P0 |
| **阶段5** | 2-3天 | 头像系统 | P0 |
| **阶段6** | 2-3天 | 社区扩展 | P0 |
| **阶段7** | 2-3天 | 测试部署 | P0 |

**总计：17-23天（3-4周）**

---

## 🔧 阶段0：环境搭建（1天）

### 0.1 项目初始化

```bash
# 创建Vite项目
npm create vite@latest bot-name-generator -- --template react-ts

cd bot-name-generator

# 安装核心依赖
npm install

# 安装额外依赖
npm install zustand \
  i18next react-i18next \
  react-router-dom \
  framer-motion \
  @dicebear/core @dicebear/collection \
  pinyin-pro

# 安装开发依赖
npm install -D \
  @types/node \
  tailwindcss postcss autoprefixer \
  eslint-config-prettier \
  prettier \
  vitest @testing-library/react @testing-library/jest-dom \
  ajv glob
```

### 0.2 配置文件设置

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/bot-name-generator/', // GitHub Pages路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
          'avatar': ['@dicebear/core', '@dicebear/collection'],
        },
      },
    },
  },
});
```

**tailwind.config.js**:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          yellow: '#ffff00',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 0.3 Git初始化

```bash
git init
git add .
git commit -m "Initial commit: project setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bot-name-generator.git
```

**验收标准**：
- ✅ 项目可正常启动（npm run dev）
- ✅ TypeScript无错误
- ✅ Tailwind样式生效
- ✅ Git仓库初始化完成

---

## 🏗️ 阶段1：基础架构（3-4天）

### 1.1 类型系统（1天）

**创建核心类型定义**：

**src/types/generator.ts**:
```typescript
export enum BotStyle {
  CYBERPUNK = 'cyberpunk',
  CUTE = 'cute',
  PROFESSIONAL = 'professional',
  // ... 其他风格
}

export enum GenerationAlgorithm {
  COMBINATION = 'combination',
  TEMPLATE = 'template',
  MARKOV = 'markov',
  SYLLABLE = 'syllable',
}

export interface GeneratedBotInfo {
  id: string;
  timestamp: number;
  style: BotStyle;
  ruleId: string;
  algorithm: GenerationAlgorithm;
  displayNames: {
    primary: string;
    translations: Record<string, string>;
  };
  platforms: Record<string, PlatformBotInfo>;
  avatar: AvatarInfo;
}

// ... 其他接口
```

**src/types/platform.ts**:
```typescript
export interface PlatformConfig {
  key: string;
  displayName: Record<string, string>;
  icon: string;
  namingRules: {
    displayName: NamingRule;
    username: NamingRule;
  };
  creationSteps: PlatformStep[];
  credentials: Credential[];
  usernameGeneratedBySystem?: boolean;
  isGeneric?: boolean;
  // ...
}

// ... 其他接口
```

**src/types/rule.ts**:
```typescript
export interface Rule {
  id: string;
  version: string;
  name: Record<string, string>;
  description: Record<string, string>;
  style: BotStyle;
  languages: string[];
  algorithm: GenerationAlgorithm;
  data: any; // 根据算法不同而不同
  author: {
    name: string;
    github: string;
  };
  // ...
}
```

### 1.2 状态管理（1天）

**src/store/generatorStore.ts**:
```typescript
import { create } from 'zustand';
import { GeneratedBotInfo, BotStyle } from '@/types/generator';

interface GeneratorState {
  selectedStyle: BotStyle;
  selectedLanguage: string;
  generatedInfo: GeneratedBotInfo | null;
  isGenerating: boolean;
  error: string | null;
  
  setStyle: (style: BotStyle) => void;
  setLanguage: (lang: string) => void;
  setGeneratedInfo: (info: GeneratedBotInfo | null) => void;
  setGenerating: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  selectedStyle: BotStyle.CYBERPUNK,
  selectedLanguage: 'zh',
  generatedInfo: null,
  isGenerating: false,
  error: null,
  
  setStyle: (style) => set({ selectedStyle: style }),
  setLanguage: (lang) => set({ selectedLanguage: lang }),
  setGeneratedInfo: (info) => set({ generatedInfo: info }),
  setGenerating: (loading) => set({ isGenerating: loading }),
  setError: (error) => set({ error }),
}));
```

**src/store/uiStore.ts**:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  language: string;
  activePlatform: string;
  
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
  setActivePlatform: (platform: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'zh',
      activePlatform: 'generic',
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setLanguage: (lang) => set({ language: lang }),
      setActivePlatform: (platform) => set({ activePlatform: platform }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
```

### 1.3 主题系统（1天）

**src/assets/styles/themes.css**:
```css
:root {
  /* 明亮主题 */
  --primary: #00ffff;
  --secondary: #ff00ff;
  --accent: #ffff00;
  --background: #f0f0f0;
  --surface: #ffffff;
  --text: #1a1a1a;
  --border: #00ffff80;
  --glow: 0 0 10px var(--primary);
}

:root[data-theme="dark"] {
  /* 暗黑主题 */
  --primary: #00ffff;
  --secondary: #ff00ff;
  --accent: #ffff00;
  --background: #0a0a0a;
  --surface: #1a1a1a;
  --text: #f0f0f0;
  --border: #00ffff80;
  --glow: 0 0 20px var(--primary), 0 0 40px var(--primary);
}

* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**src/assets/styles/cyberpunk.css**:
```css
/* 赛博朋克按钮 */
.cyber-button {
  background: var(--surface);
  border: 2px solid var(--primary);
  color: var(--text);
  font-family: 'Press Start 2P', monospace;
  text-transform: uppercase;
  padding: 12px 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--primary)40, transparent);
  transition: left 0.5s ease;
}

.cyber-button:hover {
  box-shadow: var(--glow);
  transform: translateY(-2px);
}

.cyber-button:hover::before {
  left: 100%;
}

/* 霓虹文字 */
.neon-text {
  color: var(--primary);
  text-shadow: 
    0 0 5px var(--primary),
    0 0 10px var(--primary),
    0 0 20px var(--primary),
    0 0 40px var(--primary);
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 5px var(--primary),
      0 0 10px var(--primary),
      0 0 20px var(--primary),
      0 0 40px var(--primary);
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

/* 扫描线效果 */
.scanlines {
  position: relative;
}

.scanlines::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 255, 255, 0.05) 0px,
    transparent 1px,
    transparent 2px,
    rgba(0, 255, 255, 0.05) 3px
  );
  pointer-events: none;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(10px); }
}
```

### 1.4 国际化（1天）

**src/core/i18n/i18n.ts**:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/data/locales/en.json';
import zh from '@/data/locales/zh.json';
import ja from '@/data/locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

**src/data/locales/zh.json**:
```json
{
  "app": {
    "title": "机器人名称生成器",
    "subtitle": "为你的Bot生成完美的名字"
  },
  "generator": {
    "selectStyle": "选择风格",
    "selectLanguage": "选择语言",
    "generate": "生成名称",
    "regenerate": "重新生成",
    "generating": "生成中..."
  },
  "styles": {
    "cyberpunk": "赛博朋克",
    "cute": "可爱",
    "professional": "专业"
  },
  "platforms": {
    "generic": "通用",
    "telegram": "Telegram",
    "discord": "Discord"
  }
}
```

**验收标准**：
- ✅ 类型定义完整无错误
- ✅ 状态管理正常工作
- ✅ 主题切换流畅
- ✅ 多语言切换正常

---

## ⚙️ 阶段2：生成器核心（4-5天）

### 2.1 规则系统（2天）

**src/core/rules/RuleLoader.ts**:
```typescript
import rulesBundle from '@/data/rules-bundle.json';
import { Rule } from '@/types/rule';

export class RuleLoader {
  private static rules = new Map<string, Rule>();
  private static initialized = false;
  
  static init() {
    if (this.initialized) return;
    
    rulesBundle.rules.forEach((rule: Rule) => {
      this.rules.set(rule.id, rule);
    });
    
    this.initialized = true;
    console.log(`✅ Loaded ${this.rules.size} rules`);
  }
  
  static getRule(id: string): Rule | undefined {
    return this.rules.get(id);
  }
  
  static getRulesByStyle(style: string): Rule[] {
    return Array.from(this.rules.values())
      .filter(rule => rule.style === style);
  }
  
  static getRulesByLanguage(language: string): Rule[] {
    return Array.from(this.rules.values())
      .filter(rule => rule.languages.includes(language));
  }
  
  static getRulesByStyleAndLanguage(style: string, language: string): Rule[] {
    return Array.from(this.rules.values())
      .filter(rule => 
        rule.style === style && 
        rule.languages.includes(language)
      );
  }
}
```

### 2.2 生成算法（2天）

**src/core/generator/algorithms/combination.ts**:
```typescript
import { Rule } from '@/types/rule';

interface CombinationData {
  prefixes: Array<{ value: string; weight: number }>;
  roots: Array<{ value: string; weight: number }>;
  suffixes: Array<{ value: string; weight: number }>;
}

export class CombinationAlgorithm {
  generate(rule: Rule): string {
    const data = rule.data as CombinationData;
    
    const prefix = this.weightedRandom(data.prefixes);
    const root = this.weightedRandom(data.roots);
    const suffix = this.weightedRandom(data.suffixes);
    
    return prefix + root + suffix;
  }
  
  private weightedRandom<T extends { value: string; weight: number }>(
    items: T[]
  ): string {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      random -= item.weight;
      if (random <= 0) {
        return item.value;
      }
    }
    
    return items[0].value;
  }
}
```

**src/core/generator/algorithms/template.ts**:
```typescript
export class TemplateAlgorithm {
  generate(rule: Rule): string {
    const data = rule.data;
    const template = this.randomChoice(data.templates);
    
    // 替换模板变量
    let result = template;
    const placeholders = template.match(/\{(\w+)\}/g);
    
    if (placeholders) {
      placeholders.forEach((placeholder: string) => {
        const key = placeholder.slice(1, -1); // 移除{}
        const value = this.randomChoice(data[key]);
        result = result.replace(placeholder, value);
      });
    }
    
    return result;
  }
  
  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
```

### 2.3 主生成器（1-2天）

**src/core/generator/NameGenerator.ts**:
```typescript
import { Rule, GeneratedBotInfo, BotStyle } from '@/types';
import { RuleLoader } from '@/core/rules/RuleLoader';
import { CombinationAlgorithm } from './algorithms/combination';
import { TemplateAlgorithm } from './algorithms/template';
import { BotIdGenerator } from './BotIdGenerator';
import { ALL_PLATFORMS } from '@/core/platforms/platformCategories';
import { getPlatformConfig } from '@/core/platforms/platformConfig';

export class NameGenerator {
  private algorithms = {
    combination: new CombinationAlgorithm(),
    template: new TemplateAlgorithm(),
    // markov: new MarkovAlgorithm(),
    // syllable: new SyllableAlgorithm(),
  };
  
  async generate(style: BotStyle, language: string): Promise<GeneratedBotInfo> {
    // 1. 选择规则
    const rules = RuleLoader.getRulesByStyleAndLanguage(style, language);
    if (rules.length === 0) {
      throw new Error(`No rules found for style=${style}, language=${language}`);
    }
    
    const rule = rules[Math.floor(Math.random() * rules.length)];
    
    // 2. 生成名称
    const algorithm = this.algorithms[rule.algorithm];
    if (!algorithm) {
      throw new Error(`Algorithm ${rule.algorithm} not implemented`);
    }
    
    const primaryName = algorithm.generate(rule);
    
    // 3. 生成多语言翻译
    const translations: Record<string, string> = {
      [language]: primaryName,
    };
    
    // 简化：如果规则有translation字段就用，否则只有主语言
    if (rule.translations) {
      Object.assign(translations, rule.translations[primaryName] || {});
    }
    
    // 4. 为所有平台生成信息
    const platforms: Record<string, any> = {};
    
    for (const platformId of ALL_PLATFORMS) {
      const config = getPlatformConfig(platformId);
      
      // 选择合适的显示名称
      let displayName = primaryName;
      if (!config.namingRules.displayName.allowedCharacters.chinese && language === 'zh') {
        displayName = translations.en || primaryName;
      }
      
      // 生成username（如果需要）
      let username: string | null = null;
      let needsUsername = false;
      
      if (config.isGeneric) {
        needsUsername = false;
      } else if (config.usernameGeneratedBySystem) {
        needsUsername = false;
      } else if (config.namingRules.username) {
        needsUsername = true;
        username = BotIdGenerator.generateId(displayName, platformId, language);
      }
      
      platforms[platformId] = {
        platform: platformId,
        displayName,
        username,
        needsUsername,
        isValid: true,
        validationErrors: [],
        metadata: {
          difficulty: config.difficulty,
          estimatedTime: this.getEstimatedTime(config.difficulty),
          isGeneric: config.isGeneric,
          usernameGeneratedBySystem: config.usernameGeneratedBySystem,
        },
      };
    }
    
    // 5. 组装结果（头像在下一阶段实现）
    return {
      id: this.generateId(),
      timestamp: Date.now(),
      style,
      ruleId: rule.id,
      algorithm: rule.algorithm,
      displayNames: {
        primary: primaryName,
        translations,
      },
      platforms,
      avatar: null as any, // 临时null，下一阶段实现
    };
  }
  
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private getEstimatedTime(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '5分钟';
      case 'medium': return '10分钟';
      case 'hard': return '30分钟';
      default: return '10分钟';
    }
  }
}
```

**src/core/generator/BotIdGenerator.ts**:
```typescript
import { getPlatformConfig } from '@/core/platforms/platformConfig';
import { ChineseConverter } from '@/utils/chineseConverter';

export class BotIdGenerator {
  static generateId(
    displayName: string,
    platformId: string,
    language: string
  ): string | null {
    const config = getPlatformConfig(platformId);
    
    if (!config.namingRules.username) {
      return null;
    }
    
    const rules = config.namingRules.username;
    let username = displayName;
    
    // 1. 语言转换
    if (language === 'zh' && /[\u4e00-\u9fa5]/.test(displayName)) {
      username = ChineseConverter.toPinyin(displayName, { separator: '' });
    }
    
    // 2. 转小写
    if (!rules.caseSensitive) {
      username = username.toLowerCase();
    }
    
    // 3. 移除不允许的字符
    const allowedChars = this.getAllowedCharsPattern(rules.allowedCharacters);
    username = username.replace(new RegExp(`[^${allowedChars}]`, 'g'), '');
    
    // 4. 处理空格和连续符号
    username = username
      .replace(/\s+/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/-{2,}/g, '-');
    
    // 5. 添加后缀/前缀
    if (rules.suffix && !username.endsWith(rules.suffix)) {
      username += rules.suffix;
    }
    if (rules.prefix && !username.startsWith(rules.prefix)) {
      username = rules.prefix + username;
    }
    
    // 6. 长度截断
    if (username.length > rules.maxLength) {
      const maxBodyLength = rules.maxLength - (rules.suffix?.length || 0);
      username = username.substring(0, maxBodyLength);
      if (rules.suffix) {
        username += rules.suffix;
      }
    }
    
    // 7. 长度补充
    if (username.length < rules.minLength) {
      username += Math.floor(Math.random() * 1000);
    }
    
    return username;
  }
  
  private static getAllowedCharsPattern(allowed: any): string {
    let pattern = 'a-zA-Z0-9';
    if (allowed.underscore) pattern += '_';
    if (allowed.hyphen) pattern += '-';
    if (allowed.dot) pattern += '.';
    return pattern;
  }
}
```

**验收标准**：
- ✅ 规则加载正常
- ✅ 生成算法工作正常
- ✅ 生成的名称符合预期
- ✅ 所有平台信息正确生成
- ✅ ID生成符合平台规则
- ✅ 单元测试通过（覆盖率>80%）

---

## 🌐 阶段3：多平台集成（3-4天）

### 3.1 平台配置（2天）

**创建10个平台配置文件**

**src/core/platforms/configs/generic.ts**:
```typescript
import { PlatformConfig } from '@/types/platform';

export const genericConfig: PlatformConfig = {
  key: 'generic',
  displayName: {
    en: 'Generic Bot Name',
    zh: '通用机器人名称',
    ja: '汎用ボット名',
  },
  icon: '🤖',
  officialUrl: '',
  docsUrl: '',
  difficulty: 'easy',
  isGeneric: true,
  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 100,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        japanese: true,
        emoji: true,
        spaces: true,
        specialChars: ['_', '-', '.', '@'],
      },
      pattern: undefined,
      examples: {
        valid: ['CyberBot3000', '智能助手', 'かわいいボット'],
        invalid: [],
      },
      description: {
        en: 'Any characters allowed',
        zh: '允许任意字符',
        ja: 'あらゆる文字が許可',
      },
    },
    username: undefined,
  },
  creationSteps: [],
  credentials: [],
};
```

**src/core/platforms/configs/telegram.ts**（完整示例）:
```typescript
export const telegramConfig: PlatformConfig = {
  key: 'telegram',
  displayName: {
    en: 'Telegram',
    zh: 'Telegram',
    ja: 'Telegram',
  },
  icon: 'telegram',
  officialUrl: 'https://telegram.org',
  docsUrl: 'https://core.telegram.org/bots',
  difficulty: 'easy',
  
  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 64,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        japanese: true,
        emoji: true,
        spaces: true,
        specialChars: [],
      },
      pattern: undefined,
      examples: {
        valid: ['My Awesome Bot', '我的机器人', 'ボット君'],
        invalid: [],
      },
      description: {
        en: 'Display name can contain any Unicode characters',
        zh: '显示名称可以包含任意Unicode字符',
        ja: '表示名には任意のUnicode文字を含めることができます',
      },
    },
    username: {
      minLength: 5,
      maxLength: 32,
      allowedCharacters: {
        uppercaseLetters: true,
        lowercaseLetters: true,
        numbers: true,
        underscore: true,
        hyphen: false,
        dot: false,
      },
      caseSensitive: false,
      pattern: '^[A-Za-z0-9_]+bot$',
      suffix: 'bot',
      examples: {
        valid: ['my_awesome_bot', 'CoolBot', 'helper123_bot'],
        invalid: ['mybot', 'Bot', 'my-bot', 'bot_name'],
      },
      description: {
        en: 'Must end with "bot", 5-32 characters, only letters, numbers, and underscores',
        zh: '必须以"bot"结尾，5-32字符，仅支持字母、数字和下划线',
        ja: '"bot"で終わる必要があり、5-32文字、文字、数字、アンダースコアのみ',
      },
    },
  },
  
  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Find BotFather',
        zh: '找到 BotFather',
        ja: 'BotFather を探す',
      },
      description: {
        en: 'Search for @BotFather in Telegram',
        zh: '在 Telegram 中搜索 @BotFather',
        ja: 'Telegram で @BotFather を検索',
      },
      externalLink: {
        url: 'https://t.me/botfather',
        text: {
          en: 'Open BotFather',
          zh: '打开 BotFather',
          ja: 'BotFather を開く',
        },
      },
    },
    {
      order: 2,
      title: {
        en: 'Create New Bot',
        zh: '创建新机器人',
        ja: '新しいボットを作成',
      },
      description: {
        en: 'Send command: /newbot',
        zh: '发送命令：/newbot',
        ja: 'コマンドを送信：/newbot',
      },
      command: '/newbot',
    },
    {
      order: 3,
      title: {
        en: 'Set Display Name',
        zh: '设置显示名称',
        ja: '表示名を設定',
      },
      description: {
        en: 'Enter bot display name: {{displayName}}',
        zh: '输入机器人显示名称：{{displayName}}',
        ja: 'ボットの表示名を入力：{{displayName}}',
      },
      highlightField: 'displayName',
    },
    {
      order: 4,
      title: {
        en: 'Set Username',
        zh: '设置用户名',
        ja: 'ユーザー名を設定',
      },
      description: {
        en: 'Enter username (must end with "bot"): {{username}}',
        zh: '输入用户名（必须以"bot"结尾）：{{username}}',
        ja: 'ユーザー名を入力（"bot"で終わる必要があります）：{{username}}',
      },
      highlightField: 'username',
      warning: {
        en: 'Username must end with "bot"',
        zh: '用户名必须以"bot"结尾',
        ja: 'ユーザー名は"bot"で終わる必要があります',
      },
    },
    {
      order: 5,
      title: {
        en: 'Get Bot Token',
        zh: '获取机器人 Token',
        ja: 'ボットトークンを取得',
      },
      description: {
        en: 'Save the bot token securely',
        zh: '安全保存机器人 Token',
        ja: 'ボットトークンを安全に保存',
      },
      tips: {
        en: 'Never share your bot token publicly!',
        zh: '切勿公开分享你的机器人 Token！',
        ja: 'ボットトークンを公開しないでください！',
      },
    },
  ],
  
  credentials: [
    {
      type: 'token',
      displayName: {
        en: 'Bot Token',
        zh: '机器人 Token',
        ja: 'ボットトークン',
      },
      description: {
        en: 'Authentication token for the bot',
        zh: '机器人的认证令牌',
        ja: 'ボットの認証トークン',
      },
      format: '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz',
      howToObtain: {
        en: 'Provided by BotFather after creation',
        zh: '创建后由 BotFather 提供',
        ja: '作成後に BotFather から提供',
      },
    },
  ],
};
```

**类似创建其他9个平台的配置文件...**

### 3.2 平台指南UI（1-2天）

**components/platform/PlatformTabs.tsx**（见前面设计）

**components/platform/CreationSteps.tsx**:
```typescript
import { PlatformStep, PlatformBotInfo } from '@/types/platform';
import { useTranslation } from 'react-i18next';

interface CreationStepsProps {
  steps: PlatformStep[];
  botInfo: PlatformBotInfo;
}

export const CreationSteps: React.FC<CreationStepsProps> = ({ steps, botInfo }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  return (
    <div className="creation-steps">
      {steps.map((step, index) => (
        <div key={step.order} className="step-item">
          <div className="step-number">{step.order}</div>
          <div className="step-content">
            <h4 className="step-title">{step.title[lang]}</h4>
            <p className="step-description">
              {this.interpolate(step.description[lang], botInfo)}
            </p>
            
            {step.command && (
              <code className="step-command">{step.command}</code>
            )}
            
            {step.warning && (
              <div className="step-warning">
                ⚠️ {step.warning[lang]}
              </div>
            )}
            
            {step.tips && (
              <div className="step-tips">
                💡 {step.tips[lang]}
              </div>
            )}
            
            {step.externalLink && (
              <a 
                href={step.externalLink.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="step-link"
              >
                {step.externalLink.text[lang]} →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
  // 插值替换 {{displayName}} {{username}}
  private interpolate(template: string, botInfo: PlatformBotInfo): string {
    return template
      .replace('{{displayName}}', botInfo.displayName)
      .replace('{{username}}', botInfo.username || '');
  }
};
```

**验收标准**：
- ✅ 10个平台配置完整
- ✅ 平台Tab切换正常
- ✅ 创建步骤正确显示
- ✅ 动态内容正确替换

---

## 🎨 阶段4：UI/UX实现（3-4天）

### 4.1 核心组件（2天）

**components/generator/NameCard.tsx**（带抽卡动画）

**components/generator/StyleSelector.tsx**

**components/common/Button.tsx**

**components/common/ThemeToggle.tsx**

### 4.2 页面布局（1天）

**pages/Generator/Generator.tsx**（主页面）

### 4.3 动画优化（1天）

**使用Framer Motion实现：**
- 抽卡翻转动画
- Tab切换过渡
- 按钮交互

**验收标准**：
- ✅ UI美观，符合赛博朋克风格
- ✅ 动画流畅（60fps）
- ✅ 响应式布局正常
- ✅ 主题切换无闪烁

---

## 🖼️ 阶段5：头像系统（2-3天）

### 5.1 头像生成（1天）

**src/core/avatar/AvatarGenerator.ts**（使用DiceBear）

### 5.2 头像UI（1天）

**components/avatar/AvatarDisplay.tsx**

**components/avatar/AvatarDownload.tsx**

### 5.3 集成到生成器（1天）

**更新NameGenerator.ts，添加头像生成**

**验收标准**：
- ✅ 头像即时生成
- ✅ 风格自动匹配
- ✅ PNG下载正常
- ✅ 基于种子可复现

---

## 🔌 阶段6：社区扩展（2-3天）

### 6.1 规则文件和脚本（2天）

**创建10个内置规则文件**

**scripts/validate-rules.js**（规则验证脚本）

**scripts/build-rules.js**（规则聚合脚本）

### 6.2 GitHub Actions（1天）

**.github/workflows/validate-rules.yml**

**.github/workflows/deploy.yml**

**验收标准**：
- ✅ 规则验证正常
- ✅ PR触发自动验证
- ✅ 合并后自动部署

---

## 🧪 阶段7：测试和部署（2-3天）

### 7.1 测试（1天）

**单元测试、集成测试、E2E测试**

### 7.2 文档（1天）

**README.md、CONTRIBUTING.md、规则指南**

### 7.3 部署（1天）

**配置GitHub Pages、测试生产环境**

**验收标准**：
- ✅ 测试覆盖率>80%
- ✅ Lighthouse评分>90
- ✅ 文档完整
- ✅ 成功部署到GitHub Pages

---

## ✅ 验收标准总结

### 功能验收

- [ ] 能生成3种风格的名称
- [ ] 支持中英文语言
- [ ] 自动生成10个平台信息
- [ ] Tab切换查看平台指南
- [ ] 生成配套头像
- [ ] 主题切换正常
- [ ] 响应式布局

### 技术验收

- [ ] TypeScript无错误
- [ ] 测试覆盖率>80%
- [ ] Lighthouse评分>90
- [ ] 首屏加载<2s
- [ ] 生成响应<200ms

### 社区验收

- [ ] 规则文件格式规范
- [ ] GitHub Actions验证正常
- [ ] 贡献文档完整
- [ ] PR模板清晰

---

**文档版本**：v1.0  
**创建日期**：2026-04-11  
**状态**：✅ 最终版
