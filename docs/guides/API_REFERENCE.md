# 🔌 Bot Name Generator - API Reference

**Version**: 0.1.0  
**Last Updated**: 2026-04-13  
**Base URL (Dev)**: `http://localhost:3000`

This document provides comprehensive API documentation for both human developers and AI agents, covering HTTP API endpoints and TypeScript/JavaScript modules.

---

## 📋 Table of Contents

- [HTTP API](#http-api)
  - [Generate Bot Name](#generate-bot-name)
  - [Rate Limiting](#rate-limiting)
  - [Error Handling](#error-handling)
- [TypeScript/JavaScript API](#typescriptjavascript-api)
  - [NameGenerator](#namegenerator)
  - [AvatarGenerator](#avatargenerator)
  - [BotIdGenerator](#botidgenerator)
  - [PlatformValidator](#platformvalidator)
- [Type Definitions](#type-definitions)
- [Usage Examples](#usage-examples)
- [For AI Agents](#for-ai-agents)

---

## 🌐 HTTP API

The HTTP API is available in both development and production environments, but with different implementations.

### Base URL

- **Development**: `http://localhost:3000`
  - Implemented as a Vite plugin
  - Returns pure JSON (`Content-Type: application/json`)
  - Dynamic generation (random each time)
  - Rate limiting: 30 requests/minute
  
- **Production (GitHub Pages)**: `https://ling5821.github.io/pick-bot-name`
  - Serves static HTML files with JSON in body
  - Returns HTML (`Content-Type: text/html`)
  - Pre-generated content (cached)
  - No rate limiting

### Authentication

No authentication required.

---

## 📍 Generate Bot Name

Generate a unique bot name with avatar for all supported platforms.

### Endpoint

```
GET /api/pick-bot-name
```

**Note**: On GitHub Pages, this endpoint returns HTML with JSON content in the body (Content-Type: text/html). Use `response.text()` then `JSON.parse()` to extract the data.

#### Why HTML? Understanding GitHub Pages Limitations

GitHub Pages serves `index.html` files with `Content-Type: text/html` header. While the file body contains pure JSON (no HTML tags), the Content-Type header makes browsers and HTTP clients treat it as HTML. 

**Solution**: Parse with `response.text()` to get the raw JSON string, then use `JSON.parse()`.

#### Development vs Production Comparison

| Feature | Development | Production (GitHub Pages) |
|---------|-------------|---------------------------|
| **Endpoint** | `http://localhost:3000/api/pick-bot-name` | `https://ling5821.github.io/pick-bot-name/api/pick-bot-name/` |
| **Response Type** | Pure JSON | HTML with JSON in body |
| **Content-Type** | `application/json` | `text/html` |
| **Parsing** | `response.json()` | `response.text()` → `JSON.parse()` |
| **Generation** | Dynamic (random each time) | Pre-generated (cached) |
| **Rate Limiting** | Yes (30 req/min) | No (static files) |
| **CORS** | Configured | Open (static files) |

### Query Parameters

| Parameter | Type | Required | Description | Valid Values |
|-----------|------|----------|-------------|--------------|
| `style` | string | ✅ Yes | Bot style category | `punk`, `cute`, `professional`, `geek`, `minimal`, `anime`, `acgn` |
| `language` | string | ✅ Yes | Generation language | `zh` (Chinese), `en` (English) |

### Response Format

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": 1713001200000,
    "style": "punk",
    "ruleId": "punk-zh-001",
    "algorithm": "combination",
    "displayNames": {
      "primary": "赛博守卫",
      "translations": {
        "zh": "赛博守卫",
        "en": "赛博守卫"
      }
    },
    "platforms": {
      "telegram": {
        "platform": "telegram",
        "displayName": "赛博守卫",
        "username": "saiboshouwei",
        "needsUsername": true,
        "isValid": true,
        "metadata": {
          "difficulty": "easy",
          "estimatedTime": "5-10 min",
          "isGeneric": false,
          "usernameGeneratedBySystem": false
        }
      },
      "discord": {
        "platform": "discord",
        "displayName": "赛博守卫",
        "username": "saiboshouwei",
        "needsUsername": true,
        "isValid": true,
        "metadata": {
          "difficulty": "medium",
          "estimatedTime": "15-30 min",
          "isGeneric": false,
          "usernameGeneratedBySystem": false
        }
      }
      // ... 8 more platforms
    },
    "avatar": {
      "svg": "<svg>...</svg>",
      "style": "bottts",
      "seed": "abc123def456"
    }
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "error": "Invalid style: cyberpunk. Valid styles: punk, cute, professional, geek, minimal, anime, acgn"
}
```

```json
{
  "success": false,
  "error": "Missing required parameters: style and language"
}
```

#### Error Response (429 Too Many Requests)

```json
{
  "success": false,
  "error": "Too many requests, please try again later",
  "retryAfter": 45
}
```

**Response Headers** (429):
- `Retry-After`: Seconds until rate limit resets
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Unix timestamp when limit resets

#### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

### Request Examples

#### cURL

```bash
# Generate a cute bot in Chinese
curl "http://localhost:3000/api/pick-bot-name?style=cute&language=zh"

# Generate a professional bot in English
curl "http://localhost:3000/api/pick-bot-name?style=professional&language=en"
```

#### JavaScript (Fetch)

```javascript
async function generateBotName(style, language) {
  const response = await fetch(
    `/pick-bot-name/api/pick-bot-name?style=${style}&language=${language}`
  );
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // On GitHub Pages, response is HTML with JSON in body
  const text = await response.text();
  const data = JSON.parse(text);
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.error);
  }
}

// Usage
try {
  const bot = await generateBotName('punk', 'zh');
  console.log('Bot name:', bot.displayNames.primary);
  console.log('Telegram username:', bot.platforms.telegram.username);
} catch (error) {
  console.error('Failed to generate bot:', error.message);
}
```

#### Python (requests)

```python
import requests
import json

def generate_bot_name(style: str, language: str, use_production: bool = False) -> dict:
    """Generate a bot name using the API."""
    if use_production:
        # GitHub Pages: HTML with JSON in body
        url = f"https://ling5821.github.io/pick-bot-name/api/pick-bot-name/"
        response = requests.get(url, params={"style": style, "language": language})
        response.raise_for_status()
        # Parse as text first, then JSON
        data = json.loads(response.text)
    else:
        # Development: Pure JSON
        url = "http://localhost:3000/api/pick-bot-name"
        response = requests.get(url, params={"style": style, "language": language})
        response.raise_for_status()
        data = response.json()
    
    if data["success"]:
        return data["data"]
    else:
        raise Exception(data["error"])

# Usage
try:
    # Development
    bot = generate_bot_name("cute", "zh")
    
    # Or use production (GitHub Pages)
    # bot = generate_bot_name("cute", "zh", use_production=True)
    
    print(f"Bot name: {bot['displayNames']['primary']}")
    print(f"Telegram: @{bot['platforms']['telegram']['username']}")
except Exception as e:
    print(f"Error: {e}")
```

#### TypeScript (axios)

```typescript
import axios from 'axios';

interface BotNameResponse {
  success: boolean;
  data?: GeneratedBotInfo;
  error?: string;
}

async function generateBotName(
  style: string,
  language: string
): Promise<GeneratedBotInfo> {
  const response = await axios.get<BotNameResponse>(
    'http://localhost:3000/api/pick-bot-name',
    { params: { style, language } }
  );
  
  if (response.data.success && response.data.data) {
    return response.data.data;
  } else {
    throw new Error(response.data.error || 'Unknown error');
  }
}

// Usage
const bot = await generateBotName('professional', 'en');
console.log(bot.displayNames.primary);
```

---

## ⏱️ Rate Limiting (Development Only)

⚠️ **Note**: Rate limiting only applies to the development server. GitHub Pages serves static files with no rate limits.

The development API implements sliding window rate limiting to prevent abuse:

### Limits

| Endpoint | Limit | Window | Header |
|----------|-------|--------|--------|
| `/api/pick-bot-name` | 30 requests | 60 seconds | `X-RateLimit-Limit: 30` |
| `/api/waifu/*` (Dev only) | 10 requests | 60 seconds | `X-RateLimit-Limit: 10` |
| `/proxy/waifu-img/*` (Dev only) | 15 requests | 60 seconds | `X-RateLimit-Limit: 15` |

### Rate Limit Headers

Every successful response includes rate limit information:

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 27
X-RateLimit-Reset: 1713001260000
```

### Handling Rate Limits

```javascript
async function generateWithRetry(style, language, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/pick-bot-name?style=${style}&language=${language}`
      );
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitSeconds = parseInt(retryAfter || '60', 10);
        console.log(`Rate limited. Waiting ${waitSeconds}s...`);
        await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}
```

---

## ❌ Error Handling

### Error Response Format

All errors follow a consistent format:

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  retryAfter?: number; // Only for 429 errors
}
```

### Common Errors

| Status | Error Message | Cause | Solution |
|--------|--------------|-------|----------|
| 400 | `Missing required parameters: style and language` | Missing query params | Include both `style` and `language` |
| 400 | `Invalid style: xxx` | Invalid style value | Use valid style: `punk`, `cute`, `professional`, `geek`, `minimal`, `anime`, `acgn` |
| 400 | `Invalid language: xxx` | Invalid language code | Use `zh` or `en` |
| 400 | `No rule found for style: xxx, language: yyy` | No matching rule | Use a different style/language combination |
| 429 | `Too many requests, please try again later` | Rate limit exceeded | Wait for `Retry-After` seconds |
| 500 | `Internal server error` | Server error | Report issue on GitHub |

---

## 💻 TypeScript/JavaScript API

For direct integration in Node.js or browser applications, use the TypeScript modules.

### NameGenerator

Generate bot names programmatically.

**Import**:
```typescript
import { NameGenerator } from '@/core/generator';
import { BotStyle } from '@/types';
```

#### Methods

##### `generate(style, language)`

Generate a single bot name.

```typescript
static generate(style: BotStyle, language: LanguageCode): string
```

**Example**:
```typescript
const name = NameGenerator.generate(BotStyle.PUNK, 'zh');
// Returns: "赛博守卫", "量子卫士", etc.
```

##### `generateMultiple(style, language, count)`

Generate multiple unique names.

```typescript
static generateMultiple(
  style: BotStyle,
  language: LanguageCode,
  count: number = 10
): string[]
```

**Example**:
```typescript
const names = NameGenerator.generateMultiple(BotStyle.CUTE, 'zh', 5);
// Returns: ["小喵喵", "萌团团", "软兔兔", "甜心酱", "可爱宝"]
```

---

### AvatarGenerator

Generate avatars using DiceBear or external APIs.

**Import**:
```typescript
import { AvatarGenerator } from '@/core/avatar';
```

#### Methods

##### `generate(seed?, style?, botStyle?)`

Generate an avatar.

```typescript
static generate(
  seed?: string,
  style?: AvatarStyle,
  botStyle?: BotStyle
): AvatarInfo
```

**Parameters**:
- `seed`: Random seed for reproducibility (optional)
- `style`: Avatar style (DiceBear style name)
- `botStyle`: Auto-map avatar style from bot style (optional)

**Returns**:
```typescript
{
  svg: string;         // SVG markup or image URL
  style: AvatarStyle;  // Style used
  seed: string;        // Seed for reproducibility
}
```

**Example**:
```typescript
// Auto-mapped from bot style
const avatar = AvatarGenerator.generate(undefined, undefined, BotStyle.CUTE);
console.log(avatar.svg); // "<svg>...</svg>"
console.log(avatar.seed); // "a1b2c3d4e5"

// Specific style
const avatar2 = AvatarGenerator.generate('my-seed', 'bottts');
```

**Avatar Style Mapping**:

| Bot Style | Avatar Style |
|-----------|--------------|
| `punk` | `bottts` |
| `cute` | `funEmoji` |
| `professional` | `identicon` |
| `geek` | `botttsNeutral` |
| `minimal` | `identicon` |
| `anime` | `lorelei` |
| `acgn` | External API (waifu.pics) |

##### `getAvatarStyleForBotStyle(botStyle)`

Get the mapped avatar style for a bot style.

```typescript
static getAvatarStyleForBotStyle(botStyle: BotStyle): AvatarStyle
```

##### `downloadAsPng(svg, filename)`

Download avatar as PNG (browser only).

```typescript
static async downloadAsPng(svg: string, filename: string): Promise<void>
```

##### `downloadAsSvg(svg, filename)`

Download avatar as SVG (browser only).

```typescript
static downloadAsSvg(svg: string, filename: string): void
```

---

### BotIdGenerator

Generate platform-specific usernames/IDs.

**Import**:
```typescript
import { BotIdGenerator } from '@/core/generator';
```

#### Methods

##### `generate(options)`

Generate a bot username/ID.

```typescript
static generate(options: {
  displayName: string;
  platform?: PlatformId;
  addRandomSuffix?: boolean;
  maxLength?: number;
}): string
```

**Behavior**:
1. Converts Chinese to pinyin
2. Transliterates non-ASCII to ASCII
3. Removes special characters
4. Converts to lowercase
5. Truncates to `maxLength`
6. Optionally adds random suffix

**Example**:
```typescript
const username = BotIdGenerator.generate({
  displayName: "赛博守卫",
  platform: 'telegram',
  addRandomSuffix: false,
});
// Returns: "saiboshouwei"

const username2 = BotIdGenerator.generate({
  displayName: "赛博守卫",
  platform: 'telegram',
  addRandomSuffix: true,
});
// Returns: "saiboshouwei_a8f3"
```

---

### PlatformValidator

Validate names against platform-specific rules.

**Import**:
```typescript
import { PlatformValidator } from '@/core/platform';
```

#### Methods

##### `validateDisplayName(name, platform, rules)`

Validate a display name.

```typescript
static validateDisplayName(
  name: string,
  platform: PlatformId,
  rules: NamingRules
): ValidationResult
```

**Returns**:
```typescript
{
  valid: boolean;
  errors: string[];
}
```

**Example**:
```typescript
import { platformConfigs } from '@/data/platforms';

const result = PlatformValidator.validateDisplayName(
  "赛博守卫",
  'telegram',
  platformConfigs.telegram.namingRules.displayName
);

console.log(result.valid); // true
console.log(result.errors); // []
```

##### `validateUsername(username, platform, rules)`

Validate a username.

```typescript
static validateUsername(
  username: string,
  platform: PlatformId,
  rules: NamingRules
): ValidationResult
```

---

## 📘 Type Definitions

### Core Types

#### BotStyle

```typescript
enum BotStyle {
  PUNK = 'punk',               // 朋克/赛博/蒸汽
  CUTE = 'cute',               // 可爱/萌
  PROFESSIONAL = 'professional', // 专业/商务
  GEEK = 'geek',               // 极客/技术
  MINIMAL = 'minimal',         // 极简/简约
  ANIME = 'anime',             // 卡通/动漫
  ACGN = 'acgn',               // 二次元
}
```

#### LanguageCode

```typescript
type LanguageCode = 'zh' | 'en';
```

#### GeneratedBotInfo

Complete bot information including names, platforms, and avatar.

```typescript
interface GeneratedBotInfo {
  id: string;                    // Unique identifier
  timestamp: number;             // Generation timestamp
  style: BotStyle;               // Bot style used
  ruleId: string;                // Rule ID used
  algorithm: GenerationAlgorithm; // Algorithm used
  
  displayNames: {
    primary: string;             // Primary display name
    translations: Record<string, string>; // Translated names
  };
  
  platforms: Record<string, PlatformBotInfo>; // Platform-specific info
  
  avatar: AvatarInfo;            // Avatar data
}
```

#### PlatformBotInfo

Platform-specific bot information.

```typescript
interface PlatformBotInfo {
  platform: PlatformId;
  displayName: string;
  username: string | null;       // null if not needed
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

#### AvatarInfo

Avatar data.

```typescript
interface AvatarInfo {
  svg: string;         // SVG string or image URL
  style: AvatarStyle;  // Avatar style used
  seed: string;        // Random seed for reproducibility
}
```

### Supported Platforms

| Platform ID | Display Name | Username Required | Difficulty |
|-------------|--------------|-------------------|------------|
| `telegram` | Telegram | ✅ Yes | Easy |
| `discord` | Discord | ✅ Yes | Medium |
| `slack` | Slack | ❌ No | Medium |
| `feishu` | Feishu (Lark) | ❌ No | Easy |
| `dingtalk` | DingTalk | ❌ No | Easy |
| `wecom` | WeChat Work | ❌ No | Medium |
| `weixin` | Weixin (WeChat) | ❌ No | Hard |
| `qq` | QQ | ❌ No | Medium |
| `qqbot` | QQ Bot | ❌ No | Medium |
| `line` | LINE | ✅ Yes | Medium |

---

## 💡 Usage Examples

### Example 1: Full Bot Generation Pipeline

```typescript
import { pickBotName } from '@/api/pickBotName';

// Generate complete bot info
const result = pickBotName({
  style: 'punk',
  language: 'zh'
});

if (result.success && result.data) {
  const bot = result.data;
  
  console.log('Display Name:', bot.displayNames.primary);
  console.log('Avatar SVG:', bot.avatar.svg);
  console.log('Telegram:', bot.platforms.telegram.username);
  console.log('Discord:', bot.platforms.discord.username);
}
```

### Example 2: Generate Multiple Candidates

```typescript
import { NameGenerator, AvatarGenerator } from '@/core';
import { BotStyle } from '@/types';

function generateCandidates(style: BotStyle, language: LanguageCode, count: number) {
  const names = NameGenerator.generateMultiple(style, language, count);
  
  return names.map(name => ({
    name,
    avatar: AvatarGenerator.generate(undefined, undefined, style),
  }));
}

const candidates = generateCandidates(BotStyle.CUTE, 'zh', 5);
// Returns 5 bot name + avatar combinations
```

### Example 3: Custom Validation

```typescript
import { BotIdGenerator, PlatformValidator, platformConfigs } from '@/core';

function generateValidUsername(
  displayName: string,
  platform: PlatformId,
  maxAttempts: number = 10
): string | null {
  const config = platformConfigs[platform];
  
  for (let i = 0; i < maxAttempts; i++) {
    const username = BotIdGenerator.generate({
      displayName,
      platform,
      addRandomSuffix: i > 0, // Add suffix after first attempt
    });
    
    const result = PlatformValidator.validateUsername(
      username,
      platform,
      config.namingRules.username!
    );
    
    if (result.valid) {
      return username;
    }
  }
  
  return null;
}

const username = generateValidUsername("赛博守卫", 'telegram');
console.log(username); // "saiboshouwei"
```

---

## 🤖 For AI Agents

### Quick Integration Checklist

- [x] **HTTP API**: Use `GET /api/pick-bot-name?style=xxx&language=xxx`
- [x] **Rate Limiting**: Max 30 requests/minute, respect `Retry-After` header
- [x] **Error Handling**: Check `success` field, handle 400/429/500 errors
- [x] **Response Format**: Parse JSON, extract `data.displayNames.primary`

### Supported Styles & Examples

| Style Code | Chinese Examples | English Examples |
|------------|------------------|------------------|
| `punk` | 赛博守卫, 量子卫士, 蒸汽管家 | CyberGuard, QuantumDefender, SteamButler |
| `cute` | 小喵喵, 萌团团, 软兔兔 | Fluffy, Sweetie, CuteBunny |
| `professional` | 智能助理, 专业顾问, 效率专家 | SmartAssistant, ProAdvisor, EfficiencyExpert |
| `geek` | 代码大师, 算法专家, 黑客助手 | CodeMaster, AlgoExpert, HackerHelper |
| `minimal` | 简助手, 轻工具, 纯净版 | SimpleHelper, LightTool, PureVersion |
| `anime` | 萌酱, 元气君, 可爱喵 | CuteChan, EnergyKun, KawaiiNeko |
| `acgn` | 傲娇猫娘, 魔法少女, 治愈天使 | TsundereNeko, MagicalGirl, HealingAngel |

### AI-Friendly cURL Example

```bash
# Generate a punk-style bot in Chinese
curl -X GET "http://localhost:3000/api/pick-bot-name?style=punk&language=zh" \
  -H "Accept: application/json"

# Expected response structure:
# {
#   "success": true,
#   "data": {
#     "displayNames": { "primary": "赛博守卫" },
#     "platforms": { "telegram": { "username": "saiboshouwei" } },
#     "avatar": { "svg": "<svg>...</svg>" }
#   }
# }
```

### Integration Tips for AI

1. **Always check `success` field** before accessing `data`
2. **Handle rate limits gracefully** with exponential backoff
3. **Cache results** when possible (use `data.id` as key)
4. **Validate input** before calling API (valid styles/languages)
5. **Use TypeScript types** for type safety if available

---

## 🔗 Related Documentation

- [Contributing Guide](CONTRIBUTING.md) - How to add new rules and features
- [Rule Guide](RULE_GUIDE.md) - Understanding generation rules
- [Development Guide](DEVELOPMENT.md) - Setup and development workflow
- [Architecture](../architecture/ARCHITECTURE.md) - System design

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ling5821/pick-bot-name/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ling5821/pick-bot-name/discussions)
- **API Questions**: Tag with `api` label

---

**Last Updated**: 2026-04-13  
**API Version**: 0.1.0  
**Maintained by**: Bot Name Generator Team
