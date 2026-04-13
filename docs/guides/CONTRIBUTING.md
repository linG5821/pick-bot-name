# 🤝 Contributing to Bot Name Generator

Thank you for your interest in contributing! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Submitting Generation Rules](#submitting-generation-rules)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of TypeScript and React

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/bot-name-generator.git
cd bot-name-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Run validation
npm run validate-rules
```

## 🎯 How to Contribute

### Types of Contributions

1. **🎲 Generation Rules** - Add new name generation rules
2. **🎨 Bot Styles** - Add new bot styles (punk, cute, etc.)
3. **🌍 Languages** - Add support for new languages
4. **🖼️ Avatar Styles** - Integrate new avatar generation libraries
5. **🐛 Bug Fixes** - Fix issues and bugs
6. **✨ New Features** - Propose and implement new features
7. **📚 Documentation** - Improve documentation
8. **🎨 UI/UX** - Enhance user interface and experience

## 🎲 Submitting Generation Rules

Generation rules are the heart of this project! Here's how to add a new rule:

### Rule Structure

Each rule is a JSON file in the `rules/custom/` directory:

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
  "style": "cyberpunk",
  "languages": ["en"],
  "algorithm": "combination",
  "author": {
    "name": "Your Name",
    "github": "your-github-username",
    "email": "your-email@example.com"
  },
  "data": {
    // Algorithm-specific data
  },
  "examples": [
    "ExampleName1",
    "ExampleName2",
    "ExampleName3"
  ]
}
```

### Naming Convention

- **File name**: `{style}-{language}-{variant}.json`
- **Rule ID**: Must match file name
- **Examples**: 
  - `cyberpunk-en-basic.json`
  - `cute-zh-animals.json`
  - `professional-ja-business.json`

### Supported Algorithms

#### 1. Combination Algorithm

Combines prefixes, roots, and suffixes with weights. **Length limit: 2-6 characters/words**.

**Best Practices**:
- Use high weight (5) for empty suffix `""` to avoid overly long names
- Keep prefixes to 1-2 characters (Chinese) or 1 word (English)  
- Keep roots to 2-3 characters (Chinese) or 1-2 words (English)
- Avoid suffixes longer than 3 characters
- Add repetitive words (叠词) like "喵喵", "兔兔" for cute styles

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

#### 2. Template Algorithm

Uses templates with placeholders filled from vocabulary.

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

#### 3. Markov Chain Algorithm

Learns patterns from sample names.

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

#### 4. Syllable Algorithm

Combines consonants, vowels, and endings.

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

### Validation Checklist

Before submitting, ensure your rule:

- [ ] Has a unique ID following the naming convention
- [ ] Passes JSON Schema validation (`npm run validate-rules`)
- [ ] Includes names in all required languages (en, zh, ja)
- [ ] Has complete author information
- [ ] Provides at least 3 example outputs
- [ ] Uses appropriate weights (1-10)
- [ ] Follows the algorithm-specific data structure
- [ ] Has meaningful and culturally appropriate content

### Testing Your Rule

```bash
# Validate all rules
npm run validate-rules

# Build rules bundle
npm run build-rules

# Test in development
npm run dev
```

## 💻 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code style (Prettier)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript types
- Handle loading and error states
- Make components reusable when possible
- Follow the existing folder structure

### File Organization

```
src/
├── components/       # React components
│   ├── common/      # Reusable UI components
│   └── [Feature]/   # Feature-specific components
├── core/            # Core business logic
├── data/            # Static data and configs
├── store/           # State management
└── types/           # TypeScript types
```

### Commit Messages

Use conventional commits format:

```
type(scope): description

Examples:
- feat(rules): add cyberpunk Japanese rule
- fix(generator): resolve duplicate name issue
- docs(readme): update installation steps
- style(ui): improve button hover effect
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🔄 Pull Request Process

### Before Submitting

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make changes** following the guidelines above
4. **Test thoroughly**: `npm run validate-rules && npm run build`
5. **Commit**: Use conventional commits
6. **Push**: `git push origin feature/your-feature-name`

### PR Requirements

- [ ] PR template is filled out completely
- [ ] All checks pass (validation, build)
- [ ] Code follows project style guidelines
- [ ] Documentation is updated if needed
- [ ] No merge conflicts with main branch

### Review Process

1. Automated checks run on your PR
2. Maintainers review your code
3. Address any feedback or requested changes
4. Once approved, your PR will be merged

### After Merge

- Your contribution will be included in the next release
- You'll be added to the contributors list
- Thank you for making the project better! 🎉

## 🌟 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Project website (when available)

## 📞 Getting Help

- **Issues**: Create an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Discord**: Join our community (link coming soon)

## 🎨 Adding New Bot Styles

Want to add a new bot style (e.g., "Fantasy", "Corporate", "Gaming")? Follow these steps:

### 1. Update the BotStyle Enum

Edit `src/types/generator.ts`:

```typescript
export enum BotStyle {
  // ... existing styles
  FANTASY = 'fantasy',  // Add your new style
}
```

### 2. Create Rule Files

Create two rule files in `src/data/rules/`:

- `fantasy-zh-001.json` - Chinese rules
- `fantasy-en-001.json` - English rules

Follow the [Rule Structure](#rule-structure) guidelines above.

### 3. Map Avatar Style

Edit `src/core/avatar/AvatarGenerator.ts`:

```typescript
const BOT_STYLE_TO_AVATAR: Record<BotStyle, AvatarStyle> = {
  // ... existing mappings
  [BotStyle.FANTASY]: 'lorelei',  // Choose appropriate avatar style
};
```

### 4. Add Translations

Edit `src/data/locales/zh.json` and `en.json`:

```json
{
  "style": {
    "fantasy": "奇幻",
    "FANTASY": "奇幻"
  }
}
```

### 5. Add Style Emoji

Edit `src/components/StyleSelector/StyleSelector.tsx`:

```typescript
const STYLE_EMOJIS: Record<BotStyle, string> = {
  // ... existing emojis
  [BotStyle.FANTASY]: '🏰',
};
```

### 6. Rebuild and Test

```bash
npm run build-rules
npm run dev
```

## 🌍 Adding New Languages

Want to support a new language (e.g., Japanese, Korean)? Here's how:

### 1. Update Language Type

Edit `src/types/generator.ts`:

```typescript
export type LanguageCode = 'zh' | 'en' | 'ja';  // Add 'ja'
```

### 2. Create Translation File

Create `src/data/locales/ja.json`:

```json
{
  "app": {
    "title": "ボット名ジェネレーター",
    "subtitle": "あなたのボットに完璧な名前を生成"
  },
  "style": {
    "punk": "パンク",
    "cute": "かわいい"
    // ... translate all keys
  }
}
```

### 3. Register in i18n

Edit `src/core/i18n/i18n.ts`:

```typescript
import ja from '@/data/locales/ja.json';

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
    ja: { translation: ja },  // Add new language
  },
  fallbackLng: 'en',
});
```

### 4. Create Rule Files

For each style, create Japanese rule files:

- `punk-ja-001.json`
- `cute-ja-001.json`
- etc.

### 5. Update Language Selector

Edit `src/components/LanguageSelector/LanguageSelector.tsx` to include the new language option.

## 🖼️ Adding New Avatar Styles

Want to integrate a new avatar generation library? Here's the process:

### Option A: Add DiceBear Style

If using a new DiceBear style:

1. Install the style package:

```bash
npm install @dicebear/new-style-name
```

2. Import in `AvatarGenerator.ts`:

```typescript
import * as newStyle from '@dicebear/new-style-name';

const AVATAR_STYLES: Record<DiceBearStyle, any> = {
  // ... existing styles
  newStyle: newStyle,
};
```

3. Update the `AvatarStyle` type in `src/types/avatar.ts`:

```typescript
export type AvatarStyle =
  | 'bottts'
  | 'funEmoji'
  // ... existing styles
  | 'newStyle';
```

### Option B: Add External API

If using an external avatar API (like waifu.pics):

1. Create a new loader in `src/core/avatar/`:

```typescript
// src/core/avatar/custom-api-loader.ts
export async function loadCustomAvatar(seed: string): Promise<string> {
  const response = await fetch('https://api.example.com/avatar');
  const data = await response.json();
  return data.imageUrl;
}
```

2. Update `AvatarGenerator.ts` to handle the new style:

```typescript
static generate(seed?: string, style: AvatarStyle = 'bottts', botStyle?: BotStyle): AvatarInfo {
  if (botStyle === BotStyle.YOUR_STYLE) {
    // Use your custom loader
    return loadCustomAvatar(seed);
  }
  // ... existing logic
}
```

3. If the API has CORS issues, add proxy in `vite.config.ts`:

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

### Option C: Use Local Static Assets

For static images:

1. Add images to `public/avatars/your-style/`

2. Create a loader:

```typescript
export function loadStaticAvatar(seed: string): string {
  const images = ['image1.png', 'image2.png', 'image3.png'];
  const index = parseInt(seed, 36) % images.length;
  return `/avatars/your-style/${images[index]}`;
}
```

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! Every contribution, no matter how small, is valuable and appreciated. 💖
