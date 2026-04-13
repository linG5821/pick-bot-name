# 🤖 Bot Name Generator - API Reference

**Version**: 0.1.0  
**Last Updated**: 2026-04-12

This document provides comprehensive API documentation for both human developers and AI agents.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Core Modules](#core-modules)
- [Type Definitions](#type-definitions)
- [API Methods](#api-methods)
- [Usage Examples](#usage-examples)
- [For AI Agents](#for-ai-agents)

---

## 🚀 Quick Start

```typescript
import { NameGenerator, AvatarGenerator } from '@/core';
import { BotStyle } from '@/types';

// Generate a bot name
const name = NameGenerator.generate(BotStyle.PUNK, 'zh');
console.log(name); // "赛博守卫"

// Generate an avatar
const avatar = AvatarGenerator.generate(undefined, 'bottts');
console.log(avatar.svg); // SVG string
```

---

## 🧩 Core Modules

### 1. NameGenerator

**Path**: `src/core/generator/NameGenerator.ts`

Generates bot names based on style and language using rule-based algorithms.

**Methods**:
- `generate(style, language)` - Generate single name
- `generateMultiple(style, language, count)` - Generate multiple names
- `generateCandidates(style, language, count)` - Generate diverse candidates
- `generateFromRule(rule)` - Generate from specific rule
- `validateRule(rule)` - Validate rule format

### 2. AvatarGenerator

**Path**: `src/core/avatar/AvatarGenerator.ts`

Generates avatars using DiceBear library and external APIs.

**Methods**:
- `generate(seed, style, botStyle)` - Generate avatar
- `generateCandidates(count, style)` - Generate multiple candidates
- `getAvatarStyleForBotStyle(botStyle)` - Map bot style to avatar style
- `svgToDataUri(svg)` - Convert SVG to data URI
- `downloadAsPng(svg, filename)` - Download as PNG
- `downloadAsSvg(svg, filename)` - Download as SVG

### 3. BotIdGenerator

**Path**: `src/core/generator/BotIdGenerator.ts`

Generates platform-specific bot usernames/IDs.

**Methods**:
- `generate(options)` - Generate bot ID
- `transliterate(text)` - Convert to ASCII
- `sanitize(text)` - Remove special characters
- `validateBotId(id, platform)` - Validate against platform rules

### 4. PlatformValidator

**Path**: `src/core/platform/PlatformValidator.ts`

Validates bot names against platform-specific rules.

**Methods**:
- `validateDisplayName(name, platform, rules)` - Validate display name
- `validateUsername(username, platform, rules)` - Validate username
- `validate(value, rules)` - Generic validation

### 5. RuleLoader

**Path**: `src/core/generator/RuleLoader.ts`

Loads and manages generation rules.

**Methods**:
- `loadRules()` - Load all rules
- `getRule(id)` - Get rule by ID
- `getRulesByStyle(style)` - Get rules by style
- `getRulesByLanguage(language)` - Get rules by language
- `getRulesByStyleAndLanguage(style, language)` - Get specific rules
- `getRandomRule(style, language)` - Get random matching rule

---

## 📘 Type Definitions

### BotStyle

```typescript
enum BotStyle {
  PUNK = 'punk',           // 朋克 - Punk/Cyberpunk/Steampunk
  CUTE = 'cute',           // 可爱 - Cute/Kawaii
  PROFESSIONAL = 'professional', // 专业 - Professional/Business
  GEEK = 'geek',           // 极客 - Geek/Tech
  MINIMAL = 'minimal',     // 极简 - Minimal/Simple
  ANIME = 'anime',         // 卡通 - Cartoon/Anime
  ACGN = 'acgn',           // 二次元 - ACGN/Japanese Anime
}
```

### LanguageCode

```typescript
type LanguageCode = 'zh' | 'en';
// Extensible: Add 'ja', 'ko', 'es', etc.
```

### GenerationOptions

```typescript
interface GenerationOptions {
  style: BotStyle;
  language: LanguageCode;
  includeAvatar?: boolean;
}
```

### GeneratedBotInfo

```typescript
interface GeneratedBotInfo {
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
```

### AvatarInfo

```typescript
interface AvatarInfo {
  svg: string;         // SVG string or image URL
  style: AvatarStyle;  // Avatar style used
  seed: string;        // Random seed for reproducibility
}
```

### Rule

```typescript
interface Rule {
  id: string;                    // Unique identifier (e.g., "punk-zh-001")
  name: string;                  // Human-readable name
  description: string;           // Description
  style: BotStyle;               // Bot style
  language: LanguageCode;        // Language code
  algorithm: GenerationAlgorithm; // Algorithm type
  data: CombinationData | TemplateData | MarkovData | SyllableData;
  examples: string[];            // Example outputs
  languages: LanguageCode[];     // Supported languages
}
```

### CombinationData

```typescript
interface CombinationData {
  prefixes: WeightedItem[];   // Prefix pool
  roots: WeightedItem[];      // Root pool (required)
  suffixes: WeightedItem[];   // Suffix pool
}

interface WeightedItem {
  value: string;   // The text value
  weight: number;  // Selection weight (higher = more likely)
}
```

### PlatformBotInfo

```typescript
interface PlatformBotInfo {
  platform: PlatformId;
  displayName: string;
  username: string | null;
  needsUsername: boolean;
  isValid: boolean;
  validationErrors?: string[];
  metadata: {
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    isGeneric: boolean;
    usernameGeneratedBySystem: boolean;
  };
}
```

---

## 🔧 API Methods

### NameGenerator.generate()

**Signature**:
```typescript
static generate(style: BotStyle, language: LanguageCode): string
```

**Parameters**:
- `style` - Bot style enum value
- `language` - Language code ('zh' or 'en')

**Returns**: Generated bot name string

**Throws**: Error if no matching rule found

**Example**:
```typescript
const name = NameGenerator.generate(BotStyle.CUTE, 'zh');
// Returns: "小喵喵", "萌团团", "软兔兔", etc.
```

**Length**: 2-6 characters (Chinese) or 2-6 words (English)

---

### NameGenerator.generateMultiple()

**Signature**:
```typescript
static generateMultiple(
  style: BotStyle,
  language: LanguageCode,
  count: number = 10
): string[]
```

**Parameters**:
- `style` - Bot style
- `language` - Language code
- `count` - Number of names to generate (default: 10)

**Returns**: Array of unique generated names

**Example**:
```typescript
const names = NameGenerator.generateMultiple(BotStyle.PUNK, 'en', 5);
// Returns: ["CyberGuard", "SteamHelper", "GearMaster", ...]
```

---

### AvatarGenerator.generate()

**Signature**:
```typescript
static generate(
  seed?: string,
  style: AvatarStyle = 'bottts',
  botStyle?: BotStyle
): AvatarInfo
```

**Parameters**:
- `seed` - Random seed for reproducibility (optional, auto-generated if omitted)
- `style` - Avatar style (DiceBear style name)
- `botStyle` - Bot style for automatic avatar mapping (optional)

**Returns**: AvatarInfo object containing SVG/URL and metadata

**Special Behavior**:
- If `botStyle === BotStyle.ACGN`, loads anime avatar from API
- Otherwise, generates SVG using DiceBear

**Example**:
```typescript
const avatar = AvatarGenerator.generate('my-seed', 'funEmoji');
console.log(avatar.svg); // SVG string
console.log(avatar.seed); // "my-seed"

// With auto-mapping
const avatar2 = AvatarGenerator.generate(undefined, undefined, BotStyle.CUTE);
// Automatically uses 'funEmoji' style
```

---

### BotIdGenerator.generate()

**Signature**:
```typescript
static generate(options: {
  displayName: string;
  platform?: PlatformId;
  addRandomSuffix?: boolean;
  maxLength?: number;
}): string
```

**Parameters**:
- `displayName` - The display name to convert
- `platform` - Target platform (optional, for platform-specific rules)
- `addRandomSuffix` - Whether to add random suffix (default: false)
- `maxLength` - Maximum length (default: 32)

**Returns**: Generated username/bot ID

**Example**:
```typescript
const botId = BotIdGenerator.generate({
  displayName: "赛博守卫",
  platform: 'telegram',
  addRandomSuffix: false
});
// Returns: "saiboshouwei"
```

**Behavior**:
1. Transliterates non-ASCII characters to ASCII
2. Removes spaces and special characters
3. Converts to lowercase (or platform-specific case)
4. Truncates to maxLength
5. Optionally adds random suffix

---

### PlatformValidator.validateDisplayName()

**Signature**:
```typescript
static validateDisplayName(
  name: string,
  platform: PlatformId,
  rules: NamingRules
): ValidationResult
```

**Parameters**:
- `name` - Name to validate
- `platform` - Platform ID
- `rules` - Naming rules object

**Returns**:
```typescript
{
  valid: boolean;
  errors: string[];
}
```

**Example**:
```typescript
const result = PlatformValidator.validateDisplayName(
  "赛博守卫",
  'telegram',
  telegramRules.namingRules.displayName
);
console.log(result.valid); // true or false
console.log(result.errors); // ["Too long", "Contains invalid characters", ...]
```

---

### RuleLoader.getRulesByStyleAndLanguage()

**Signature**:
```typescript
getRulesByStyleAndLanguage(
  style: BotStyle,
  language: LanguageCode
): Rule[]
```

**Parameters**:
- `style` - Bot style
- `language` - Language code

**Returns**: Array of matching rules

**Example**:
```typescript
import { ruleLoader } from '@/core/generator';

const rules = ruleLoader.getRulesByStyleAndLanguage(BotStyle.PUNK, 'zh');
console.log(rules.length); // 1 (punk-zh-001)
console.log(rules[0].data.prefixes); // ["赛博", "量子", ...]
```

---

## 💡 Usage Examples

### Example 1: Generate Bot with Avatar

```typescript
import { NameGenerator, AvatarGenerator } from '@/core';
import { BotStyle } from '@/types';

function generateBot(style: BotStyle, language: LanguageCode) {
  // Generate name
  const name = NameGenerator.generate(style, language);
  
  // Generate avatar (auto-mapped to appropriate style)
  const avatar = AvatarGenerator.generate(undefined, undefined, style);
  
  return {
    name,
    avatar: avatar.svg,
    seed: avatar.seed,
  };
}

const bot = generateBot(BotStyle.CUTE, 'zh');
console.log(bot.name); // "小喵喵"
console.log(bot.seed); // "abc123def456"
```

### Example 2: Generate for Multiple Platforms

```typescript
import { NameGenerator, BotIdGenerator, platformConfigs } from '@/core';

function generateForAllPlatforms(style: BotStyle, language: LanguageCode) {
  const displayName = NameGenerator.generate(style, language);
  const platforms: Record<string, any> = {};
  
  for (const [platformId, config] of Object.entries(platformConfigs)) {
    platforms[platformId] = {
      displayName,
      username: config.needsUsername
        ? BotIdGenerator.generate({ displayName, platform: platformId as PlatformId })
        : null,
    };
  }
  
  return platforms;
}

const result = generateForAllPlatforms(BotStyle.PROFESSIONAL, 'zh');
console.log(result.telegram); // { displayName: "智能助理", username: "zhinengzhuli" }
console.log(result.discord);  // { displayName: "智能助理", username: "zhinengzhuli" }
```

### Example 3: Custom Rule Validation

```typescript
import { NameGenerator } from '@/core';
import type { Rule } from '@/types';

const customRule: Rule = {
  id: "custom-zh-001",
  name: "自定义规则",
  description: "测试规则",
  style: BotStyle.CUSTOM,
  language: "zh",
  algorithm: GenerationAlgorithm.COMBINATION,
  data: {
    prefixes: [{ value: "智能", weight: 1 }],
    roots: [{ value: "助手", weight: 1 }],
    suffixes: [{ value: "", weight: 2 }],
  },
  examples: ["智能助手"],
  languages: ["zh"],
};

// Validate before using
const isValid = NameGenerator.validateRule(customRule);
if (isValid) {
  const name = NameGenerator.generateFromRule(customRule);
  console.log(name); // "智能助手"
}
```

### Example 4: Download Avatar

```typescript
import { AvatarGenerator } from '@/core';

async function downloadBotAvatar(botStyle: BotStyle) {
  const avatar = AvatarGenerator.generate(undefined, undefined, botStyle);
  
  // Download as PNG
  await AvatarGenerator.downloadAsPng(avatar.svg, 'my-bot-avatar.png');
  
  // Download as SVG
  AvatarGenerator.downloadAsSvg(avatar.svg, 'my-bot-avatar.svg');
}

downloadBotAvatar(BotStyle.PUNK);
```

---

## 🤖 For AI Agents

### Quick Integration Guide

If you are an AI agent integrating with this system, follow these steps:

#### Step 1: Import Core Modules

```typescript
import { NameGenerator, AvatarGenerator, BotIdGenerator } from '@/core';
import { BotStyle } from '@/types';
```

#### Step 2: Generate Name

```typescript
const name = NameGenerator.generate(BotStyle.PUNK, 'zh');
```

#### Step 3: Generate Avatar

```typescript
const avatar = AvatarGenerator.generate(undefined, undefined, BotStyle.PUNK);
```

#### Step 4: Generate Platform IDs

```typescript
const telegramId = BotIdGenerator.generate({
  displayName: name,
  platform: 'telegram'
});
```

### Supported Bot Styles

| Style | Code | Description | Example Names (中文) | Example Names (EN) |
|-------|------|-------------|---------------------|-------------------|
| 朋克 | `BotStyle.PUNK` | Cyberpunk/Steampunk | 赛博守卫, 蒸汽管家 | CyberGuard, SteamHelper |
| 可爱 | `BotStyle.CUTE` | Cute/Kawaii | 小喵喵, 萌团团 | Fluffy, Sweetie |
| 专业 | `BotStyle.PROFESSIONAL` | Professional/Business | 智能助理, 专业顾问 | SmartAssistant, ProAdvisor |
| 极客 | `BotStyle.GEEK` | Geek/Tech | 代码大师, 算法专家 | CodeMaster, AlgoExpert |
| 极简 | `BotStyle.MINIMAL` | Minimal/Simple | 简助手, 轻工具 | SimpleHelper, LightTool |
| 卡通 | `BotStyle.ANIME` | Cartoon | 萌酱, 元气君 | CuteChan, EnergyKun |
| 二次元 | `BotStyle.ACGN` | ACGN/Anime | 傲娇猫娘, 魔法少女 | TsundereNeko, MagicMaiden |

### Naming Constraints

- **Length**: 2-6 characters (Chinese) or 2-6 words (English)
- **Characters**: Alphanumeric, Chinese characters, limited special chars
- **Platform-specific**: Each platform has unique requirements (see `platformConfigs`)

### Algorithm Types

1. **combination** - Prefix + Root + Suffix (most common)
2. **template** - Template-based with placeholders
3. **markov** - Markov chain from samples
4. **syllable** - Syllable-based generation

### Error Handling

All methods may throw errors. Wrap in try-catch:

```typescript
try {
  const name = NameGenerator.generate(BotStyle.PUNK, 'zh');
} catch (error) {
  console.error('Generation failed:', error.message);
  // Fallback logic
}
```

### Rate Limits

- **Name Generation**: No limit (local computation)
- **Avatar Generation (DiceBear)**: No limit (local SVG generation)
- **Avatar Generation (ACGN API)**: ~5 requests preloaded, then on-demand
- **Platform Validation**: No limit (local validation)

### Caching Strategy

- **Rule Files**: Loaded once at startup, cached in memory
- **ACGN Avatars**: Cached per seed in Map (memory only, cleared on refresh)
- **Platform Configs**: Static, loaded at import

---

## 📞 Support

- **Issues**: https://github.com/your-repo/bot-name-generator/issues
- **Discussions**: https://github.com/your-repo/bot-name-generator/discussions
- **Documentation**: See PROJECT_SUMMARY.md, CONTRIBUTING.md

---

**Last Updated**: 2026-04-12  
**API Version**: 0.1.0  
**Maintained by**: Bot Name Generator Team
