# 🔌 Bot Name Generator - API 参考

**版本**: 0.1.0  
**最后更新**: 2026-04-14  
**基础 URL (开发)**: `http://localhost:3000`

本文档为人类开发者和 AI 代理提供全面的 API 文档，涵盖 HTTP API 端点和 TypeScript/JavaScript 模块。

[English](API_REFERENCE.md) | 简体中文

---

## 📋 目录

- [HTTP API](#http-api)
  - [生成机器人名称](#生成机器人名称)
  - [速率限制](#速率限制)
  - [错误处理](#错误处理)
- [TypeScript/JavaScript API](#typescriptjavascript-api)
  - [NameGenerator](#namegenerator)
  - [AvatarGenerator](#avatargenerator)
  - [BotIdGenerator](#botidgenerator)
  - [PlatformValidator](#platformvalidator)
- [类型定义](#类型定义)
- [使用示例](#使用示例)
- [为 AI 代理准备](#为-ai-代理准备)

---

## 🌐 HTTP API

HTTP API 在开发和生产环境中都可用，但实现方式不同。

### 基础 URL

- **开发环境**: `http://localhost:3000`
  - 作为 Vite 插件实现
  - 返回纯 JSON (`Content-Type: application/json`)
  - 动态生成（每次都是随机的）
  - 速率限制：30 请求/分钟
  
- **生产环境 (GitHub Pages)**: `https://ling5821.github.io/pick-bot-name`
  - 提供静态 HTML 文件，body 中包含 JSON
  - 返回 HTML (`Content-Type: text/html`)
  - 预生成内容（缓存的）
  - 无速率限制

### 认证

无需认证。

---

## 📍 生成机器人名称

为所有支持的平台生成唯一的机器人名称和头像。

### 端点

```
GET /api/pick-bot-name
```

**注意**: 在 GitHub Pages 上，此端点返回 HTML，JSON 内容在 body 中 (Content-Type: text/html)。使用 `response.text()` 然后 `JSON.parse()` 提取数据。

#### 为什么是 HTML？理解 GitHub Pages 限制

GitHub Pages 以 `Content-Type: text/html` 头提供 `index.html` 文件。虽然文件 body 包含纯 JSON（没有 HTML 标签），但 Content-Type 头使浏览器和 HTTP 客户端将其视为 HTML。

**解决方案**: 使用 `response.text()` 解析以获取原始 JSON 字符串，然后使用 `JSON.parse()`。

#### 开发环境 vs 生产环境对比

| 功能 | 开发环境 | 生产环境 (GitHub Pages) |
|------|----------|-------------------------|
| **端点** | `http://localhost:3000/api/pick-bot-name` | `https://ling5821.github.io/pick-bot-name/api/pick-bot-name/` |
| **响应类型** | 纯 JSON | HTML，body 中包含 JSON |
| **Content-Type** | `application/json` | `text/html` |
| **解析** | `response.json()` | `response.text()` → `JSON.parse()` |
| **生成** | 动态（每次随机） | 预生成（缓存的） |
| **速率限制** | 是 (30 req/min) | 否（静态文件） |
| **CORS** | 已配置 | 开放（静态文件） |

### 查询参数

| 参数 | 类型 | 必需 | 描述 | 有效值 |
|------|------|------|------|--------|
| `style` | string | ✅ 是 | 机器人风格类别 | `punk`, `cute`, `professional`, `geek`, `minimal`, `anime`, `acgn` |
| `language` | string | ✅ 是 | 生成语言 | `zh` (中文), `en` (英文) |

### 响应格式

#### 成功响应 (200 OK)

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
      // ... 另外 8 个平台
    },
    "avatar": {
      "svg": "<svg>...</svg>",
      "style": "bottts",
      "seed": "abc123def456"
    }
  }
}
```

#### 错误响应 (400 Bad Request)

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

#### 错误响应 (429 Too Many Requests)

```json
{
  "success": false,
  "error": "Too many requests, please try again later",
  "retryAfter": 45
}
```

**响应头** (429):
- `Retry-After`: 速率限制重置前的秒数
- `X-RateLimit-Limit`: 每个窗口的最大请求数
- `X-RateLimit-Remaining`: 剩余请求数
- `X-RateLimit-Reset`: 限制重置时的 Unix 时间戳

#### 错误响应 (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

### 请求示例

#### cURL

```bash
# 生成中文可爱风格的机器人
curl "http://localhost:3000/api/pick-bot-name?style=cute&language=zh"

# 生成英文专业风格的机器人
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
  
  // 在 GitHub Pages 上，响应是 HTML，body 中包含 JSON
  const text = await response.text();
  const data = JSON.parse(text);
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.error);
  }
}

// 使用
try {
  const bot = await generateBotName('punk', 'zh');
  console.log('机器人名称:', bot.displayNames.primary);
  console.log('Telegram 用户名:', bot.platforms.telegram.username);
} catch (error) {
  console.error('生成机器人失败:', error.message);
}
```

#### Python (requests)

```python
import requests
import json

def generate_bot_name(style: str, language: str, use_production: bool = False) -> dict:
    """使用 API 生成机器人名称。"""
    if use_production:
        # GitHub Pages: HTML，body 中包含 JSON
        url = f"https://ling5821.github.io/pick-bot-name/api/pick-bot-name/"
        response = requests.get(url, params={"style": style, "language": language})
        response.raise_for_status()
        # 先解析为文本，然后解析 JSON
        data = json.loads(response.text)
    else:
        # 开发环境: 纯 JSON
        url = "http://localhost:3000/api/pick-bot-name"
        response = requests.get(url, params={"style": style, "language": language})
        response.raise_for_status()
        data = response.json()
    
    if data["success"]:
        return data["data"]
    else:
        raise Exception(data["error"])

# 使用
try:
    # 开发环境
    bot = generate_bot_name("cute", "zh")
    
    # 或使用生产环境 (GitHub Pages)
    # bot = generate_bot_name("cute", "zh", use_production=True)
    
    print(f"机器人名称: {bot['displayNames']['primary']}")
    print(f"Telegram: @{bot['platforms']['telegram']['username']}")
except Exception as e:
    print(f"错误: {e}")
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

// 使用
const bot = await generateBotName('professional', 'en');
console.log(bot.displayNames.primary);
```

---

## ⏱️ 速率限制（仅开发环境）

⚠️ **注意**: 速率限制仅适用于开发服务器。GitHub Pages 提供静态文件，无速率限制。

开发 API 实现滑动窗口速率限制以防止滥用：

### 限制

| 端点 | 限制 | 窗口 | 头 |
|------|------|------|-----|
| `/api/pick-bot-name` | 30 请求 | 60 秒 | `X-RateLimit-Limit: 30` |
| `/api/waifu/*` (仅开发) | 10 请求 | 60 秒 | `X-RateLimit-Limit: 10` |
| `/proxy/waifu-img/*` (仅开发) | 15 请求 | 60 秒 | `X-RateLimit-Limit: 15` |

### 速率限制头

每个成功响应都包含速率限制信息：

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 27
X-RateLimit-Reset: 1713001260000
```

### 处理速率限制

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
        console.log(`速率限制。等待 ${waitSeconds}秒...`);
        await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
        continue;
      }
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
  
  throw new Error('超过最大重试次数');
}
```

---

## ❌ 错误处理

### 错误响应格式

所有错误都遵循一致的格式：

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  retryAfter?: number; // 仅用于 429 错误
}
```

### 常见错误

| 状态 | 错误消息 | 原因 | 解决方案 |
|------|---------|------|---------|
| 400 | `Missing required parameters: style and language` | 缺少查询参数 | 包含 `style` 和 `language` |
| 400 | `Invalid style: xxx` | 无效的风格值 | 使用有效风格: `punk`, `cute`, `professional`, `geek`, `minimal`, `anime`, `acgn` |
| 400 | `Invalid language: xxx` | 无效的语言代码 | 使用 `zh` 或 `en` |
| 400 | `No rule found for style: xxx, language: yyy` | 没有匹配的规则 | 使用不同的风格/语言组合 |
| 429 | `Too many requests, please try again later` | 超过速率限制 | 等待 `Retry-After` 秒 |
| 500 | `Internal server error` | 服务器错误 | 在 GitHub 上报告问题 |

---

## 💻 TypeScript/JavaScript API

对于在 Node.js 或浏览器应用中的直接集成，使用 TypeScript 模块。

### NameGenerator

以编程方式生成机器人名称。

**导入**:
```typescript
import { NameGenerator } from '@/core/generator';
import { BotStyle } from '@/types';
```

#### 方法

##### `generate(style, language)`

生成单个机器人名称。

```typescript
static generate(style: BotStyle, language: LanguageCode): string
```

**示例**:
```typescript
const name = NameGenerator.generate(BotStyle.PUNK, 'zh');
// 返回: "赛博守卫", "量子卫士" 等
```

##### `generateMultiple(style, language, count)`

生成多个唯一名称。

```typescript
static generateMultiple(
  style: BotStyle,
  language: LanguageCode,
  count: number = 10
): string[]
```

**示例**:
```typescript
const names = NameGenerator.generateMultiple(BotStyle.CUTE, 'zh', 5);
// 返回: ["小喵喵", "萌团团", "软兔兔", "甜心酱", "可爱宝"]
```

---

### AvatarGenerator

使用 DiceBear 或外部 API 生成头像。

**导入**:
```typescript
import { AvatarGenerator } from '@/core/avatar';
```

#### 方法

##### `generate(seed?, style?, botStyle?)`

生成头像。

```typescript
static generate(
  seed?: string,
  style?: AvatarStyle,
  botStyle?: BotStyle
): AvatarInfo
```

**参数**:
- `seed`: 用于可重现性的随机种子（可选）
- `style`: 头像风格（DiceBear 风格名称）
- `botStyle`: 从机器人风格自动映射头像风格（可选）

**返回**:
```typescript
{
  svg: string;         // SVG 标记或图像 URL
  style: AvatarStyle;  // 使用的风格
  seed: string;        // 用于可重现性的种子
}
```

**示例**:
```typescript
// 从机器人风格自动映射
const avatar = AvatarGenerator.generate(undefined, undefined, BotStyle.CUTE);
console.log(avatar.svg); // "<svg>...</svg>"
console.log(avatar.seed); // "a1b2c3d4e5"

// 特定风格
const avatar2 = AvatarGenerator.generate('my-seed', 'bottts');
```

**头像风格映射**:

| 机器人风格 | 头像风格 |
|-----------|---------|
| `punk` | `bottts` |
| `cute` | `funEmoji` |
| `professional` | `identicon` |
| `geek` | `botttsNeutral` |
| `minimal` | `identicon` |
| `anime` | `lorelei` |
| `acgn` | 外部 API (waifu.pics) |

##### `downloadAsPng(svg, filename)`

将头像下载为 PNG（仅浏览器）。

```typescript
static async downloadAsPng(svg: string, filename: string): Promise<void>
```

##### `downloadAsSvg(svg, filename)`

将头像下载为 SVG（仅浏览器）。

```typescript
static downloadAsSvg(svg: string, filename: string): void
```

---

### BotIdGenerator

生成特定于平台的用户名/ID。

**导入**:
```typescript
import { BotIdGenerator } from '@/core/generator';
```

#### 方法

##### `generate(options)`

生成机器人用户名/ID。

```typescript
static generate(options: {
  displayName: string;
  platform?: PlatformId;
  addRandomSuffix?: boolean;
  maxLength?: number;
}): string
```

**行为**:
1. 将中文转换为拼音
2. 将非 ASCII 音译为 ASCII
3. 删除特殊字符
4. 转换为小写
5. 截断到 `maxLength`
6. 可选地添加随机后缀

**示例**:
```typescript
const username = BotIdGenerator.generate({
  displayName: "赛博守卫",
  platform: 'telegram',
  addRandomSuffix: false,
});
// 返回: "saiboshouwei"

const username2 = BotIdGenerator.generate({
  displayName: "赛博守卫",
  platform: 'telegram',
  addRandomSuffix: true,
});
// 返回: "saiboshouwei_a8f3"
```

---

### PlatformValidator

根据平台特定规则验证名称。

**导入**:
```typescript
import { PlatformValidator } from '@/core/platform';
```

#### 方法

##### `validateDisplayName(name, platform, rules)`

验证显示名称。

```typescript
static validateDisplayName(
  name: string,
  platform: PlatformId,
  rules: NamingRules
): ValidationResult
```

**返回**:
```typescript
{
  valid: boolean;
  errors: string[];
}
```

**示例**:
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

---

## 📘 类型定义

### 核心类型

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

包括名称、平台和头像的完整机器人信息。

```typescript
interface GeneratedBotInfo {
  id: string;                    // 唯一标识符
  timestamp: number;             // 生成时间戳
  style: BotStyle;               // 使用的机器人风格
  ruleId: string;                // 使用的规则 ID
  algorithm: GenerationAlgorithm; // 使用的算法
  
  displayNames: {
    primary: string;             // 主显示名称
    translations: Record<string, string>; // 翻译的名称
  };
  
  platforms: Record<string, PlatformBotInfo>; // 特定于平台的信息
  
  avatar: AvatarInfo;            // 头像数据
}
```

#### PlatformBotInfo

特定于平台的机器人信息。

```typescript
interface PlatformBotInfo {
  platform: PlatformId;
  displayName: string;
  username: string | null;       // 如果不需要则为 null
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

头像数据。

```typescript
interface AvatarInfo {
  svg: string;         // SVG 字符串或图像 URL
  style: AvatarStyle;  // 使用的头像风格
  seed: string;        // 用于可重现性的随机种子
}
```

### 支持的平台

| 平台 ID | 显示名称 | 需要用户名 | 难度 |
|---------|----------|-----------|------|
| `telegram` | Telegram | ✅ 是 | 简单 |
| `discord` | Discord | ✅ 是 | 中等 |
| `slack` | Slack | ❌ 否 | 中等 |
| `feishu` | Feishu (飞书) | ❌ 否 | 简单 |
| `dingtalk` | DingTalk (钉钉) | ❌ 否 | 简单 |
| `wecom` | WeChat Work (企业微信) | ❌ 否 | 中等 |
| `weixin` | Weixin (微信) | ❌ 否 | 困难 |
| `qq` | QQ | ❌ 否 | 中等 |
| `qqbot` | QQ Bot | ❌ 否 | 中等 |
| `line` | LINE | ✅ 是 | 中等 |

---

## 💡 使用示例

### 示例 1: 完整的机器人生成管道

```typescript
import { pickBotName } from '@/api/pickBotName';

// 生成完整的机器人信息
const result = pickBotName({
  style: 'punk',
  language: 'zh'
});

if (result.success && result.data) {
  const bot = result.data;
  
  console.log('显示名称:', bot.displayNames.primary);
  console.log('头像 SVG:', bot.avatar.svg);
  console.log('Telegram:', bot.platforms.telegram.username);
  console.log('Discord:', bot.platforms.discord.username);
}
```

### 示例 2: 生成多个候选

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
// 返回 5 个机器人名称 + 头像组合
```

### 示例 3: 自定义验证

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
      addRandomSuffix: i > 0, // 第一次尝试后添加后缀
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

## 🤖 为 AI 代理准备

### 快速集成检查清单

- [x] **HTTP API**: 使用 `GET /api/pick-bot-name?style=xxx&language=xxx`
- [x] **速率限制**: 最大 30 请求/分钟，遵守 `Retry-After` 头
- [x] **错误处理**: 检查 `success` 字段，处理 400/429/500 错误
- [x] **响应格式**: 解析 JSON，提取 `data.displayNames.primary`

### 支持的风格和示例

| 风格代码 | 中文示例 | 英文示例 |
|---------|---------|---------|
| `punk` | 赛博守卫, 量子卫士, 蒸汽管家 | CyberGuard, QuantumDefender, SteamButler |
| `cute` | 小喵喵, 萌团团, 软兔兔 | Fluffy, Sweetie, CuteBunny |
| `professional` | 智能助理, 专业顾问, 效率专家 | SmartAssistant, ProAdvisor, EfficiencyExpert |
| `geek` | 代码大师, 算法专家, 黑客助手 | CodeMaster, AlgoExpert, HackerHelper |
| `minimal` | 简助手, 轻工具, 纯净版 | SimpleHelper, LightTool, PureVersion |
| `anime` | 萌酱, 元气君, 可爱喵 | CuteChan, EnergyKun, KawaiiNeko |
| `acgn` | 傲娇猫娘, 魔法少女, 治愈天使 | TsundereNeko, MagicalGirl, HealingAngel |

### AI 友好的 cURL 示例

```bash
# 生成中文朋克风格的机器人
curl -X GET "http://localhost:3000/api/pick-bot-name?style=punk&language=zh" \
  -H "Accept: application/json"

# 预期响应结构:
# {
#   "success": true,
#   "data": {
#     "displayNames": { "primary": "赛博守卫" },
#     "platforms": { "telegram": { "username": "saiboshouwei" } },
#     "avatar": { "svg": "<svg>...</svg>" }
#   }
# }
```

### AI 集成提示

1. **始终检查 `success` 字段**，然后再访问 `data`
2. **优雅地处理速率限制**，使用指数退避
3. **尽可能缓存结果**（使用 `data.id` 作为键）
4. **在调用 API 前验证输入**（有效的风格/语言）
5. **如果可用，使用 TypeScript 类型**以确保类型安全

---

## 🔗 相关文档

- [贡献指南](CONTRIBUTING_zh.md) - 如何添加新规则和功能
- [规则指南](RULE_GUIDE.md) - 理解生成规则
- [开发指南](DEVELOPMENT_zh.md) - 设置和开发工作流
- [架构](../architecture/ARCHITECTURE.md) - 系统设计

---

## 📞 支持

- **Issues**: [GitHub Issues](https://github.com/ling5821/pick-bot-name/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ling5821/pick-bot-name/discussions)
- **API 问题**: 使用 `api` 标签

---

**最后更新**: 2026-04-14  
**API 版本**: 0.1.0  
**维护**: Bot Name Generator Team
