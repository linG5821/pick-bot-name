# 🤝 贡献指南

感谢你对本项目的关注！本指南将帮助你开始贡献。

[English](CONTRIBUTING.md) | 简体中文

---

## 📋 目录

- [行为准则](#行为准则)
- [开始贡献](#开始贡献)
- [如何贡献](#如何贡献)
- [提交生成规则](#提交生成规则)
- [开发指南](#开发指南)
- [Pull Request 流程](#pull-request-流程)

## 📜 行为准则

- 尊重和包容
- 提供建设性的反馈
- 以社区最佳利益为重
- 对其他社区成员表示同理心

## 🚀 开始贡献

### 前置要求

- Node.js 18+ 和 npm
- Git
- TypeScript 和 React 基础知识

### 设置环境

```bash
# Fork 并克隆仓库
git clone https://github.com/YOUR_USERNAME/pick-bot-name.git
cd pick-bot-name

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行验证
npm run validate-rules
```

## 🎯 如何贡献

### 贡献类型

1. **🎲 生成规则** - 添加新的名称生成规则
2. **🎨 机器人风格** - 添加新的机器人风格（punk、cute 等）
3. **🌍 语言** - 添加新语言支持
4. **🖼️ 头像风格** - 集成新的头像生成库
5. **🐛 Bug 修复** - 修复问题和 bug
6. **✨ 新功能** - 提议和实现新功能
7. **📚 文档** - 改进文档
8. **🎨 UI/UX** - 增强用户界面和体验

## 🎲 提交生成规则

生成规则是本项目的核心！以下是添加新规则的方法：

### 规则结构

每个规则是 `rules/custom/` 目录中的 JSON 文件：

```json
{
  "id": "style-language-variant",
  "version": "1.0.0",
  "name": {
    "en": "Rule Name",
    "zh": "规则名称",
    "ja": "ルール名"
  },
  "description": {
    "en": "Rule description",
    "zh": "规则描述",
    "ja": "ルールの説明"
  },
  "style": "punk",
  "languages": ["en"],
  "algorithm": "combination",
  "author": {
    "name": "Your Name",
    "github": "your-github-username",
    "email": "your-email@example.com"
  },
  "data": {
    // 算法特定数据
  },
  "examples": [
    "ExampleName1",
    "ExampleName2",
    "ExampleName3"
  ]
}
```

### 命名约定

- **文件名**：`{style}-{language}-{variant}.json`
- **规则 ID**：必须与文件名匹配
- **示例**：
  - `punk-en-basic.json`
  - `cute-zh-animals.json`
  - `professional-ja-business.json`

### 支持的算法

#### 1. 组合算法 (Combination)

组合前缀、词根和后缀，带权重。**长度限制：中文 2-4 个字，英文 4-12 个字符**。

**最佳实践**：
- 为空后缀 `""` 使用高权重（5），避免过长名称
- 前缀保持在 1-2 个字（中文）或 1 个单词（英文）
- 词根保持在 2-3 个字（中文）或 1-2 个单词（英文）
- 避免超过 3 个字符的后缀
- 可爱风格推荐：叠词如"喵喵"、"兔兔"

```json
{
  "algorithm": "combination",
  "data": {
    "prefixes": [
      {"value": "Cyber", "weight": 2},
      {"value": "Nano", "weight": 2}
    ],
    "roots": [
      {"value": "Guard", "weight": 3},
      {"value": "Helper", "weight": 3}
    ],
    "suffixes": [
      {"value": "", "weight": 5},
      {"value": "Bot", "weight": 1},
      {"value": "AI", "weight": 1}
    ]
  }
}
```

#### 2. 模板算法 (Template)

使用占位符模板，从词汇表填充。

```json
{
  "algorithm": "template",
  "data": {
    "templates": [
      {"value": "{adjective}{animal}", "weight": 10},
      {"value": "{adjective}的{animal}", "weight": 8}
    ],
    "vocabulary": {
      "adjective": [
        {"value": "可爱", "weight": 10},
        {"value": "聪明", "weight": 8}
      ],
      "animal": [
        {"value": "猫咪", "weight": 10},
        {"value": "兔子", "weight": 8}
      ]
    }
  }
}
```

#### 3. 马尔可夫链算法 (Markov)

从样本名称中学习模式。

```json
{
  "algorithm": "markov",
  "data": {
    "samples": [
      "Alice",
      "Bob",
      "Charlie",
      "David"
    ],
    "order": 2,
    "minLength": 3,
    "maxLength": 12
  }
}
```

#### 4. 音节算法 (Syllable)

组合辅音、元音和结尾。

```json
{
  "algorithm": "syllable",
  "data": {
    "consonants": [
      {"value": "b", "weight": 10},
      {"value": "k", "weight": 8}
    ],
    "vowels": [
      {"value": "a", "weight": 10},
      {"value": "i", "weight": 8}
    ],
    "endings": [
      {"value": "n", "weight": 5},
      {"value": "t", "weight": 5}
    ],
    "minSyllables": 2,
    "maxSyllables": 4,
    "capitalize": true
  }
}
```

### 验证检查清单

提交前，确保你的规则：

- [ ] 有唯一的 ID，遵循命名约定
- [ ] 通过 JSON Schema 验证（`npm run validate-rules`）
- [ ] 包含所有必需语言的名称（en、zh、ja）
- [ ] 有完整的作者信息
- [ ] 提供至少 3 个示例输出
- [ ] 使用适当的权重（1-10）
- [ ] 遵循算法特定的数据结构
- [ ] 内容有意义且文化适当

### 测试你的规则

```bash
# 验证所有规则
npm run validate-rules

# 构建规则包
npm run build-rules

# 在开发中测试
npm run dev
```

## 💻 开发指南

### 代码风格

- 所有新代码使用 TypeScript
- 遵循现有代码风格（Prettier）
- 使用有意义的变量和函数名
- 为复杂逻辑添加注释
- 保持组件小而专注

### 组件指南

- 使用带 hooks 的函数式组件
- 实现正确的 TypeScript 类型
- 处理加载和错误状态
- 尽可能使组件可重用
- 遵循现有的文件夹结构

### 文件组织

```
src/
├── components/       # React 组件
│   ├── common/      # 可重用的 UI 组件
│   └── [Feature]/   # 功能特定组件
├── core/            # 核心业务逻辑
├── data/            # 静态数据和配置
├── store/           # 状态管理
└── types/           # TypeScript 类型
```

### 提交信息

使用约定式提交格式：

```
type(scope): description

示例：
- feat(rules): add punk Japanese rule
- fix(generator): resolve duplicate name issue
- docs(readme): update installation steps
- style(ui): improve button hover effect
```

类型：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`

## 🔄 Pull Request 流程

### 提交前

1. **Fork** 仓库
2. **创建分支**：`git checkout -b feature/your-feature-name`
3. **进行更改**，遵循上述指南
4. **彻底测试**：`npm run validate-rules && npm run build`
5. **提交**：使用约定式提交
6. **推送**：`git push origin feature/your-feature-name`

### PR 要求

- [ ] PR 模板完整填写
- [ ] 所有检查通过（验证、构建）
- [ ] 代码遵循项目风格指南
- [ ] 文档已更新（如需要）
- [ ] 与 main 分支无合并冲突

### 审查流程

1. 自动检查在你的 PR 上运行
2. 维护者审查你的代码
3. 处理任何反馈或请求的更改
4. 一旦批准，你的 PR 将被合并

### 合并后

- 你的贡献将包含在下一个版本中
- 你将被添加到贡献者列表
- 感谢你让项目变得更好！🎉

## 🌟 认可

贡献者将在以下地方得到认可：
- README.md 贡献者部分
- 发布说明
- 项目网站（即将推出）

## 📞 获取帮助

- **Issues**：为 bug 或问题创建 issue
- **Discussions**：使用 GitHub Discussions 进行一般问题
- **Discord**：加入我们的社区（链接即将推出）

## 🎨 添加新的机器人风格

想添加新的机器人风格？按照以下步骤操作：

> **注意**：下面的示例使用"fantasy"作为假设的新风格来演示过程。当前风格有：`punk`、`cute`、`professional`、`geek`、`minimal`、`anime`、`acgn`。

### 1. 更新 BotStyle 枚举

编辑 `src/types/generator.ts`：

```typescript
export enum BotStyle {
  // ... 现有风格
  FANTASY = 'fantasy',  // 添加你的新风格
}
```

### 2. 创建规则文件

在 `src/data/rules/` 中创建两个规则文件：

- `fantasy-zh-001.json` - 中文规则
- `fantasy-en-001.json` - 英文规则

遵循上面的[规则结构](#规则结构)指南。

### 3. 映射头像风格

编辑 `src/core/avatar/AvatarGenerator.ts`：

```typescript
const BOT_STYLE_TO_AVATAR: Record<BotStyle, AvatarStyle> = {
  // ... 现有映射
  [BotStyle.FANTASY]: 'lorelei',  // 选择适当的头像风格
};
```

### 4. 添加翻译

编辑 `src/data/locales/zh.json` 和 `en.json`：

```json
{
  "style": {
    "fantasy": "奇幻",
    "FANTASY": "奇幻"
  }
}
```

### 5. 添加风格表情符号

编辑 `src/components/StyleSelector/StyleSelector.tsx`：

```typescript
const STYLE_EMOJIS: Record<BotStyle, string> = {
  // ... 现有表情符号
  [BotStyle.FANTASY]: '🏰',
};
```

### 6. 重新构建并测试

```bash
npm run build-rules
npm run dev
```

## 🌍 添加新语言

想支持新语言（例如日语、韩语）？方法如下：

### 1. 更新语言类型

编辑 `src/types/generator.ts`：

```typescript
export type LanguageCode = 'zh' | 'en' | 'ja';  // 添加 'ja'
```

### 2. 创建翻译文件

创建 `src/data/locales/ja.json`：

```json
{
  "app": {
    "title": "ボット名ジェネレーター",
    "subtitle": "あなたのボットに完璧な名前を生成"
  },
  "style": {
    "punk": "パンク",
    "cute": "かわいい"
    // ... 翻译所有键
  }
}
```

### 3. 在 i18n 中注册

编辑 `src/core/i18n/i18n.ts`：

```typescript
import ja from '@/data/locales/ja.json';

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
    ja: { translation: ja },  // 添加新语言
  },
  fallbackLng: 'en',
});
```

### 4. 创建规则文件

为每个风格创建日语规则文件：

- `punk-ja-001.json`
- `cute-ja-001.json`
- 等等

### 5. 更新语言选择器

编辑 `src/components/LanguageSelector/LanguageSelector.tsx` 以包含新的语言选项。

## 🖼️ 添加新的头像风格

想集成新的头像生成库？流程如下：

### 选项 A：添加 DiceBear 风格

如果使用新的 DiceBear 风格：

1. 安装风格包：

```bash
npm install @dicebear/new-style-name
```

2. 在 `AvatarGenerator.ts` 中导入：

```typescript
import * as newStyle from '@dicebear/new-style-name';

const AVATAR_STYLES: Record<DiceBearStyle, any> = {
  // ... 现有风格
  newStyle: newStyle,
};
```

3. 更新 `src/types/avatar.ts` 中的 `AvatarStyle` 类型：

```typescript
export type AvatarStyle =
  | 'bottts'
  | 'funEmoji'
  // ... 现有风格
  | 'newStyle';
```

### 选项 B：添加外部 API

如果使用外部头像 API（如 waifu.pics）：

1. 在 `src/core/avatar/` 中创建新的加载器：

```typescript
// src/core/avatar/custom-api-loader.ts
export async function loadCustomAvatar(seed: string): Promise<string> {
  const response = await fetch('https://api.example.com/avatar');
  const data = await response.json();
  return data.imageUrl;
}
```

2. 更新 `AvatarGenerator.ts` 以处理新风格：

```typescript
static generate(seed?: string, style: AvatarStyle = 'bottts', botStyle?: BotStyle): AvatarInfo {
  if (botStyle === BotStyle.YOUR_STYLE) {
    // 使用你的自定义加载器
    return loadCustomAvatar(seed);
  }
  // ... 现有逻辑
}
```

3. 如果 API 有 CORS 问题，在 `vite.config.ts` 中添加代理：

```typescript
server: {
  proxy: {
    '/api/custom': {
      target: 'https://api.example.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/custom/, ''),
    },
  },
}
```

### 选项 C：使用本地静态资源

对于静态图片：

1. 将图片添加到 `public/avatars/your-style/`

2. 创建加载器：

```typescript
export function loadStaticAvatar(seed: string): string {
  const images = ['image1.png', 'image2.png', 'image3.png'];
  const index = parseInt(seed, 36) % images.length;
  return `/avatars/your-style/${images[index]}`;
}
```

## 📄 许可证

通过贡献，你同意你的贡献将采用 MIT 许可证。

---

感谢你的贡献！每一份贡献，无论大小，都是有价值和受欢迎的。💖
