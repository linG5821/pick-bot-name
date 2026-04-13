# 🏗️ Bot Name Generator - 详细架构设计

> 基于用户补充需求的完整架构设计文档

## 📊 核心数据结构

### 1. 生成结果数据结构

```typescript
/**
 * 机器人信息
 * 包含多语言名称和各平台特定信息
 */
interface GeneratedBotInfo {
  // 基础信息
  id: string;                    // 生成记录ID
  timestamp: number;             // 生成时间戳
  style: string;                 // 风格标识（cyberpunk, cute, professional等）
  ruleId: string;                // 使用的规则ID
  algorithm: string;             // 生成算法
  
  // 多语言显示名称
  displayNames: {
    primary: string;             // 主要名称（根据用户选择的语言）
    translations: {
      en?: string;               // 英文名
      zh?: string;               // 中文名
      ja?: string;               // 日文名
      ko?: string;               // 韩文名
      [key: string]: string | undefined;
    };
  };
  
  // 各平台特定信息
  platforms: {
    [platformKey: string]: PlatformBotInfo;
  };
  
  // ✅ 新增：头像信息
  avatar: AvatarInfo;            // 手绘风格头像
}

/**
 * 单个平台的机器人信息
 */
interface PlatformBotInfo {
  platform: string;              // 平台标识
  displayName: string;           // 该平台使用的显示名称
  username: string | null;       // 机器人ID/用户名（符合平台规则）
  needsUsername: boolean;        // 是否需要username
  isValid: boolean;              // 是否符合平台规则
  validationErrors?: string[];   // 验证错误信息
  metadata: {                    // 平台特定元数据
    needsToken?: boolean;        // 是否需要Token
    needsAppId?: boolean;        // 是否需要App ID
    needsSecret?: boolean;       // 是否需要Secret
    difficulty: 'easy' | 'medium' | 'hard';  // 创建难度
    estimatedTime: string;       // 预计创建时间
    isGeneric?: boolean;         // 是否是通用平台
    usernameGeneratedBySystem?: boolean;  // username是否由系统生成
    [key: string]: any;
  };
}

/**
 * ✅ 头像信息
 */
interface AvatarInfo {
  svg: string;                   // SVG内容
  style: AvatarStyleId;          // 头像风格
  seed: string;                  // 生成种子（可复现）
  dataUri?: string;              // Data URI格式（可选，用于img src）
}

/**
 * 头像风格类型
 */
type AvatarStyleId = 'bottts' | 'croodles' | 'pixelArt' | 'lorelei' | 'adventurer';
```

### 2. 平台配置数据结构

```typescript
/**
 * 平台完整配置
 */
interface PlatformConfig {
  // 基础信息
  key: string;                   // 平台唯一标识
  displayName: {
    en: string;
    zh: string;
    ja: string;
  };
  icon: string;                  // 图标名称或URL
  officialUrl: string;           // 官方网站
  docsUrl: string;               // 文档链接
  difficulty: 'easy' | 'medium' | 'hard';
  
  // 命名规则
  namingRules: {
    displayName: DisplayNameRules;
    username: UsernameRules;
  };
  
  // 创建步骤
  creationSteps: CreationStep[];
  
  // 需要的凭证
  credentials: CredentialRequirement[];
}

/**
 * 显示名称规则
 */
interface DisplayNameRules {
  minLength: number;
  maxLength: number;
  allowedCharacters: {
    letters: boolean;            // 字母
    numbers: boolean;            // 数字
    chinese: boolean;            // 中文
    japanese: boolean;           // 日文
    korean: boolean;             // 韩文
    emoji: boolean;              // Emoji
    spaces: boolean;             // 空格
    specialChars?: string[];     // 允许的特殊字符
  };
  pattern?: string;              // 正则表达式
  examples: {
    valid: string[];
    invalid: string[];
  };
  description: {
    en: string;
    zh: string;
    ja: string;
  };
}

/**
 * 用户名/ID规则
 */
interface UsernameRules {
  minLength: number;
  maxLength: number;
  allowedCharacters: {
    uppercaseLetters: boolean;   // 大写字母
    lowercaseLetters: boolean;   // 小写字母
    numbers: boolean;            // 数字
    underscore: boolean;         // 下划线 _
    hyphen: boolean;             // 连字符 -
    dot: boolean;                // 点 .
    specialChars?: string[];     // 其他允许的特殊字符
  };
  caseSensitive: boolean;        // 是否区分大小写
  requiredPrefix?: string;       // 必需的前缀
  requiredSuffix?: string;       // 必需的后缀
  pattern?: string;              // 正则表达式
  reservedWords?: string[];      // 保留字
  examples: {
    valid: string[];
    invalid: string[];
  };
  description: {
    en: string;
    zh: string;
    ja: string;
  };
}

/**
 * 创建步骤
 */
interface CreationStep {
  order: number;
  title: MultiLangText;
  description: MultiLangText;
  // 使用占位符，如 {{displayName}}, {{username}}
  template?: string;             // 模板字符串，支持占位符
  command?: string;              // 需要执行的命令
  image?: string;                // 步骤截图
  warning?: MultiLangText;       // 警告信息
  tips?: MultiLangText;          // 提示信息
  externalLink?: {
    url: string;
    text: MultiLangText;
  };
}

/**
 * 凭证要求
 */
interface CredentialRequirement {
  type: 'token' | 'app_id' | 'app_secret' | 'client_id' | 'client_secret';
  displayName: MultiLangText;
  description: MultiLangText;
  format?: string;               // 格式说明
  example?: string;              // 示例（脱敏）
  howToObtain: MultiLangText;    // 如何获取
}

type MultiLangText = {
  en: string;
  zh: string;
  ja: string;
};
```

### 3. 风格系统数据结构

```typescript
/**
 * 风格定义
 */
interface StyleDefinition {
  id: string;                    // 风格唯一标识
  name: MultiLangText;
  description: MultiLangText;
  icon: string;                  // 风格图标
  color: string;                 // 主题色
  tags: string[];                // 标签
  examples: string[];            // 示例名称
  popularity: number;            // 流行度 (1-10)
  
  // 风格特征（用于UI展示）
  characteristics: {
    formality: number;           // 正式程度 (1-10)
    creativity: number;          // 创意程度 (1-10)
    techiness: number;           // 技术感 (1-10)
    cuteness: number;            // 可爱度 (1-10)
  };
}

/**
 * 生成规则
 * 每个规则文件都必须包含风格标识
 */
interface GenerationRule {
  // 元数据
  id: string;                    // 规则唯一标识
  version: string;               // 版本号
  name: MultiLangText;
  description: MultiLangText;
  
  // 风格信息（必需）
  style: string;                 // 所属风格ID
  subStyle?: string;             // 子风格（可选）
  
  // 作者信息
  author: {
    name: string;
    github?: string;
    website?: string;
    email?: string;
  };
  
  // 适用范围
  languages: string[];           // 支持的语言
  platforms?: string[];          // 特别优化的平台（可选）
  
  // 生成算法
  algorithm: 'combination' | 'template' | 'markov' | 'syllable' | 'neural';
  
  // 算法配置
  config: {
    generateMultiLang: boolean;  // 是否生成多语言
    preferredLength?: {
      min: number;
      max: number;
    };
    complexity?: 'simple' | 'medium' | 'complex';
  };
  
  // 生成数据（根据算法不同而不同）
  data: CombinationData | TemplateData | MarkovData | SyllableData;
  
  // 统计信息（自动计算）
  stats?: {
    totalCombinations?: number;  // 可能的组合数
    avgLength?: number;          // 平均长度
    usageCount?: number;         // 使用次数
  };
}

// 组合算法数据
interface CombinationData {
  prefixes: WeightedItem[];
  roots: WeightedItem[];
  suffixes: WeightedItem[];
  separators?: WeightedItem[];   // 分隔符（可选）
}

// 模板算法数据
interface TemplateData {
  templates: string[];           // 模板字符串
  variables: {
    [key: string]: WeightedItem[];
  };
}

// 马尔可夫链数据
interface MarkovData {
  corpus: string[];              // 训练语料
  order: number;                 // 阶数（通常为2或3）
}

// 音节算法数据
interface SyllableData {
  syllables: {
    onset: string[];             // 声母
    nucleus: string[];           // 韵母
    coda?: string[];             // 韵尾（可选）
  };
  rules?: SyllableRule[];        // 音节组合规则
}

interface SyllableRule {
  condition: string;
  action: string;
}

interface WeightedItem {
  value: string;
  weight: number;                // 权重 (1-10)
  translations?: {               // 多语言翻译（可选）
    [lang: string]: string;
  };
}
```

---

## 🤖 各平台详细规则

### Telegram

```typescript
const telegramConfig: PlatformConfig = {
  key: 'telegram',
  displayName: {
    en: 'Telegram',
    zh: 'Telegram',
    ja: 'Telegram'
  },
  icon: 'telegram',
  officialUrl: 'https://telegram.org',
  docsUrl: 'https://core.telegram.org/bots',
  difficulty: 'easy',
  
  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 255,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        japanese: true,
        korean: true,
        emoji: true,
        spaces: true,
        specialChars: ['_', '-', '.', '@']
      },
      examples: {
        valid: ['My Cool Bot', '我的机器人', 'ボット君', '🤖 Helper'],
        invalid: []
      },
      description: {
        en: 'Display name can be any Unicode text',
        zh: '显示名称可以是任意Unicode文本',
        ja: '表示名は任意のUnicodeテキスト'
      }
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
        dot: false
      },
      caseSensitive: false,
      requiredSuffix: 'bot',      // 🔥 关键：必须以bot结尾
      pattern: '^[A-Za-z0-9_]+bot$',
      examples: {
        valid: ['my_cool_bot', 'helper_bot', 'AI_Assistant_bot'],
        invalid: ['mycoolbot', 'my-bot', 'bot123']  // 第一个缺少bot后缀
      },
      description: {
        en: 'Must end with "bot", only letters, numbers and underscores',
        zh: '必须以"bot"结尾，只能包含字母、数字和下划线',
        ja: '"bot"で終わる必要があり、文字、数字、アンダースコアのみ'
      }
    }
  },
  
  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Find BotFather',
        zh: '找到 BotFather',
        ja: 'BotFather を探す'
      },
      description: {
        en: 'Open Telegram and search for @BotFather',
        zh: '打开 Telegram 并搜索 @BotFather',
        ja: 'Telegram を開いて @BotFather を検索'
      },
      image: '/guides/telegram/step1.png'
    },
    {
      order: 2,
      title: {
        en: 'Start BotFather',
        zh: '启动 BotFather',
        ja: 'BotFather を開始'
      },
      description: {
        en: 'Send /start command to BotFather',
        zh: '向 BotFather 发送 /start 命令',
        ja: 'BotFather に /start コマンドを送信'
      },
      command: '/start'
    },
    {
      order: 3,
      title: {
        en: 'Create New Bot',
        zh: '创建新机器人',
        ja: '新しいボットを作成'
      },
      description: {
        en: 'Send /newbot command',
        zh: '发送 /newbot 命令',
        ja: '/newbot コマンドを送信'
      },
      command: '/newbot'
    },
    {
      order: 4,
      title: {
        en: 'Set Display Name',
        zh: '设置显示名称',
        ja: '表示名を設定'
      },
      description: {
        en: 'Enter your bot display name: {{displayName}}',
        zh: '输入机器人显示名称：{{displayName}}',
        ja: 'ボット表示名を入力：{{displayName}}'
      },
      tips: {
        en: 'This is the name users will see',
        zh: '这是用户将看到的名称',
        ja: 'これはユーザーに表示される名前です'
      }
    },
    {
      order: 5,
      title: {
        en: 'Set Username',
        zh: '设置用户名',
        ja: 'ユーザー名を設定'
      },
      description: {
        en: 'Enter username (must end with bot): {{username}}',
        zh: '输入用户名（必须以bot结尾）：{{username}}',
        ja: 'ユーザー名を入力（bot で終わる必要があります）：{{username}}'
      },
      warning: {
        en: 'Username must end with "bot" and be globally unique',
        zh: '用户名必须以"bot"结尾且全局唯一',
        ja: 'ユーザー名は"bot"で終わり、グローバルに一意である必要があります'
      }
    },
    {
      order: 6,
      title: {
        en: 'Save Token',
        zh: '保存 Token',
        ja: 'トークンを保存'
      },
      description: {
        en: 'BotFather will give you a token. Keep it secret!',
        zh: 'BotFather 会给你一个 Token，请妥善保管！',
        ja: 'BotFather がトークンを提供します。秘密にしてください！'
      },
      warning: {
        en: '⚠️ Never share your token publicly!',
        zh: '⚠️ 绝不要公开分享你的 Token！',
        ja: '⚠️ トークンを公開しないでください！'
      }
    }
  ],
  
  credentials: [
    {
      type: 'token',
      displayName: {
        en: 'Bot Token',
        zh: '机器人 Token',
        ja: 'ボット トークン'
      },
      description: {
        en: 'Unique token to access Telegram Bot API',
        zh: '用于访问 Telegram Bot API 的唯一令牌',
        ja: 'Telegram Bot API にアクセスするための一意のトークン'
      },
      format: '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz',
      howToObtain: {
        en: 'Provided by @BotFather after creating bot',
        zh: '创建机器人后由 @BotFather 提供',
        ja: 'ボット作成後に @BotFather から提供'
      }
    }
  ]
};
```

### Discord

```typescript
const discordConfig: PlatformConfig = {
  key: 'discord',
  displayName: {
    en: 'Discord',
    zh: 'Discord',
    ja: 'Discord'
  },
  icon: 'discord',
  officialUrl: 'https://discord.com',
  docsUrl: 'https://discord.com/developers/docs',
  difficulty: 'medium',
  
  namingRules: {
    displayName: {
      minLength: 2,
      maxLength: 32,
      allowedCharacters: {
        letters: true,
        numbers: true,
        chinese: true,
        japanese: true,
        korean: true,
        emoji: true,
        spaces: true,
        specialChars: ['_', '-', '.', "'"]
      },
      examples: {
        valid: ['My Bot', 'AI Helper', '助手机器人', 'ヘルパー'],
        invalid: ['A', 'ThisIsAReallyLongBotNameThatExceedsLimit']
      },
      description: {
        en: '2-32 characters, supports Unicode',
        zh: '2-32个字符，支持Unicode',
        ja: '2-32文字、Unicode対応'
      }
    },
    username: {
      minLength: 2,
      maxLength: 32,
      allowedCharacters: {
        uppercaseLetters: true,
        lowercaseLetters: true,
        numbers: true,
        underscore: true,
        hyphen: true,
        dot: true
      },
      caseSensitive: false,
      // Discord 不要求特定后缀
      pattern: '^[A-Za-z0-9._-]+$',
      examples: {
        valid: ['my-bot', 'ai_helper', 'bot.assistant', 'MyBot123'],
        invalid: ['my bot', 'bot@helper', 'bot#123']
      },
      description: {
        en: 'Letters, numbers, dots, hyphens and underscores',
        zh: '字母、数字、点、连字符和下划线',
        ja: '文字、数字、ドット、ハイフン、アンダースコア'
      }
    }
  },
  
  creationSteps: [
    {
      order: 1,
      title: {
        en: 'Go to Developer Portal',
        zh: '访问开发者门户',
        ja: 'デベロッパーポータルへ'
      },
      description: {
        en: 'Visit Discord Developer Portal',
        zh: '访问 Discord 开发者门户',
        ja: 'Discord デベロッパーポータルにアクセス'
      },
      externalLink: {
        url: 'https://discord.com/developers/applications',
        text: {
          en: 'Open Developer Portal',
          zh: '打开开发者门户',
          ja: 'デベロッパーポータルを開く'
        }
      }
    },
    {
      order: 2,
      title: {
        en: 'Create New Application',
        zh: '创建新应用',
        ja: '新しいアプリケーションを作成'
      },
      description: {
        en: 'Click "New Application" button',
        zh: '点击"New Application"按钮',
        ja: '「New Application」ボタンをクリック'
      }
    },
    {
      order: 3,
      title: {
        en: 'Name Your Application',
        zh: '命名应用',
        ja: 'アプリケーション名を入力'
      },
      description: {
        en: 'Enter application name: {{displayName}}',
        zh: '输入应用名称：{{displayName}}',
        ja: 'アプリケーション名を入力：{{displayName}}'
      }
    },
    {
      order: 4,
      title: {
        en: 'Go to Bot Section',
        zh: '进入Bot部分',
        ja: 'Botセクションへ'
      },
      description: {
        en: 'Click "Bot" in the left sidebar',
        zh: '点击左侧边栏的"Bot"',
        ja: '左サイドバーの「Bot」をクリック'
      }
    },
    {
      order: 5,
      title: {
        en: 'Add Bot',
        zh: '添加Bot',
        ja: 'Botを追加'
      },
      description: {
        en: 'Click "Add Bot" and confirm',
        zh: '点击"Add Bot"并确认',
        ja: '「Add Bot」をクリックして確認'
      }
    },
    {
      order: 6,
      title: {
        en: 'Configure Bot',
        zh: '配置Bot',
        ja: 'Botを設定'
      },
      description: {
        en: 'Set bot username: {{username}}',
        zh: '设置机器人用户名：{{username}}',
        ja: 'ボットのユーザー名を設定：{{username}}'
      },
      tips: {
        en: 'You can change this later',
        zh: '你可以稍后修改',
        ja: '後で変更できます'
      }
    },
    {
      order: 7,
      title: {
        en: 'Enable Privileged Intents',
        zh: '启用特权意图',
        ja: '特権インテントを有効化'
      },
      description: {
        en: 'Enable "Message Content Intent" (required for reading messages)',
        zh: '启用"Message Content Intent"（读取消息所需）',
        ja: '「Message Content Intent」を有効化（メッセージ読取に必要）'
      },
      warning: {
        en: 'Required for bot functionality',
        zh: '机器人功能所必需',
        ja: 'ボット機能に必要'
      }
    },
    {
      order: 8,
      title: {
        en: 'Get Bot Token',
        zh: '获取Bot Token',
        ja: 'Bot トークンを取得'
      },
      description: {
        en: 'Click "Reset Token" to get your bot token',
        zh: '点击"Reset Token"获取机器人Token',
        ja: '「Reset Token」をクリックしてトークンを取得'
      },
      warning: {
        en: '⚠️ Token is shown only once, save it immediately!',
        zh: '⚠️ Token只显示一次，请立即保存！',
        ja: '⚠️ トークンは一度だけ表示されます。すぐに保存してください！'
      }
    }
  ],
  
  credentials: [
    {
      type: 'token',
      displayName: {
        en: 'Bot Token',
        zh: '机器人 Token',
        ja: 'ボット トークン'
      },
      format: 'MTk4NjIy...(long string)',
      howToObtain: {
        en: 'From Bot section in Developer Portal',
        zh: '从开发者门户的Bot部分获取',
        ja: 'デベロッパーポータルのBotセクションから'
      }
    }
  ]
};
```

### 其他平台简要配置

```typescript
// Slack - 推荐用下划线，专业风格
const slackConfig: PlatformConfig = {
  key: 'slack',
  // username示例: ai_helper, data_bot, code_assistant
  namingRules: {
    username: {
      minLength: 1,
      maxLength: 21,
      allowedCharacters: {
        lowercaseLetters: true,
        numbers: true,
        underscore: true,
        hyphen: true,
        dot: true
      },
      caseSensitive: false,
      pattern: '^[a-z0-9._-]+$',
      // 推荐风格：使用下划线分隔
      examples: {
        valid: ['ai_helper', 'code_bot', 'data.assistant'],
        invalid: ['AI_HELPER', 'code bot', 'bot@work']
      }
    }
  }
};

// Feishu/Lark - 支持中文，企业内唯一
const feishuConfig: PlatformConfig = {
  key: 'feishu',
  namingRules: {
    displayName: {
      allowedCharacters: {
        chinese: true,
        letters: true,
        numbers: true,
        emoji: true,
        spaces: true
      },
      examples: {
        valid: ['智能助手', 'AI Bot', '数据机器人', '🤖 帮手']
      }
    },
    username: {
      // Feishu使用App ID，由系统生成
      // 用户只需关注显示名称
      description: {
        zh: 'App ID由系统自动生成',
        en: 'App ID is auto-generated by system'
      }
    }
  }
};

// DingTalk - 支持中文，企业内唯一
const dingtalkConfig: PlatformConfig = {
  key: 'dingtalk',
  // 类似Feishu
};

// WeChat Work - 支持中文
const wecomConfig: PlatformConfig = {
  key: 'wecom',
  namingRules: {
    displayName: {
      allowedCharacters: {
        chinese: true,
        letters: true,
        numbers: true,
        emoji: true
      }
    },
    username: {
      // Bot ID由系统生成
      description: {
        zh: 'Bot ID由系统自动生成'
      }
    }
  }
};

// Weixin - 微信号规则
const weixinConfig: PlatformConfig = {
  key: 'weixin',
  namingRules: {
    username: {
      minLength: 6,
      maxLength: 20,
      allowedCharacters: {
        lowercaseLetters: true,
        numbers: true,
        underscore: true,
        hyphen: true
      },
      pattern: '^[a-z][a-z0-9_-]{5,19}$',
      description: {
        zh: '6-20位，字母开头，可包含字母、数字、下划线、减号',
        en: '6-20 chars, start with letter, letters/numbers/underscore/hyphen'
      },
      examples: {
        valid: ['aihelper', 'bot_assistant', 'my-bot-2024'],
        invalid: ['1bot', 'bot', 'Bot_Helper']
      }
    }
  }
};

// QQ - 数字或字母数字
const qqConfig: PlatformConfig = {
  key: 'qq',
  namingRules: {
    username: {
      minLength: 5,
      maxLength: 16,
      allowedCharacters: {
        lowercaseLetters: true,
        numbers: true,
        underscore: true
      },
      pattern: '^[a-z0-9_]{5,16}$',
      examples: {
        valid: ['bot123', 'ai_helper', 'mybot2024'],
        invalid: ['Bot', '123', 'my-bot']
      }
    }
  }
};

// QQ Bot (官方)- 支持中文
const qqbotConfig: PlatformConfig = {
  key: 'qqbot',
  namingRules: {
    displayName: {
      allowedCharacters: {
        chinese: true,
        letters: true,
        numbers: true,
        emoji: true
      }
    },
    username: {
      // App ID由系统生成
      description: {
        zh: 'App ID由官方分配'
      }
    }
  }
};

// LINE - 灵活
const lineConfig: PlatformConfig = {
  key: 'line',
  namingRules: {
    displayName: {
      minLength: 1,
      maxLength: 20,
      allowedCharacters: {
        letters: true,
        numbers: true,
        japanese: true,
        emoji: true,
        spaces: true
      }
    },
    username: {
      minLength: 1,
      maxLength: 20,
      allowedCharacters: {
        letters: true,
        numbers: true,
        underscore: true,
        hyphen: true,
        dot: true
      },
      pattern: '^[A-Za-z0-9._-]+$'
    }
  }
};
```

---

## 🔧 ID生成器设计

### 核心功能

```typescript
/**
 * 智能ID生成器
 * 根据显示名称和平台规则生成符合要求的username/bot_id
 */
class BotIdGenerator {
  /**
   * 生成符合平台规则的Bot ID
   */
  static generateId(
    displayName: string,
    platform: string,
    language: string = 'en'
  ): string {
    const platformConfig = getPlatformConfig(platform);
    const rules = platformConfig.namingRules.username;
    
    // 步骤1: 转换为基础拉丁字符
    let baseId = this.convertToLatin(displayName, language);
    
    // 步骤2: 清理不允许的字符
    baseId = this.cleanCharacters(baseId, rules);
    
    // 步骤3: 处理长度
    baseId = this.adjustLength(baseId, rules);
    
    // 步骤4: 添加必需的前缀/后缀
    baseId = this.addAffixes(baseId, rules);
    
    // 步骤5: 处理大小写
    baseId = this.adjustCase(baseId, rules);
    
    // 步骤6: 验证并调整
    baseId = this.validateAndAdjust(baseId, rules);
    
    return baseId;
  }
  
  /**
   * 转换为拉丁字符
   */
  private static convertToLatin(text: string, language: string): string {
    // 移除emoji
    text = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    
    // 根据语言转换
    switch (language) {
      case 'zh':
        // 中文转拼音
        return this.chineseToPinyin(text);
      
      case 'ja':
        // 日文转罗马音
        return this.japaneseToRomaji(text);
      
      case 'ko':
        // 韩文转罗马音
        return this.koreanToRoman(text);
      
      case 'en':
      default:
        return text;
    }
  }
  
  /**
   * 中文转拼音
   */
  private static chineseToPinyin(text: string): string {
    // 简化版实现，实际应使用专业库如 pinyin-pro
    const pinyinMap: { [key: string]: string } = {
      '智能': 'zhineng',
      '助手': 'zhushou',
      '机器人': 'jiqiren',
      '小': 'xiao',
      '猫': 'mao',
      '狗': 'gou',
      '熊猫': 'xiongmao',
      // ... 更多映射或使用库
    };
    
    // 尝试整词匹配
    for (const [cn, pinyin] of Object.entries(pinyinMap)) {
      text = text.replace(new RegExp(cn, 'g'), pinyin);
    }
    
    // 如果还有中文字符，生成通用名称
    if (/[\u4e00-\u9fa5]/.test(text)) {
      return 'bot_' + Date.now().toString(36).slice(-6);
    }
    
    return text;
  }
  
  /**
   * 日文转罗马音
   */
  private static japaneseToRomaji(text: string): string {
    // 使用 wanakana 或类似库
    // 简化实现
    const romajiMap: { [key: string]: string } = {
      'ボット': 'bot',
      'ヘルパー': 'helper',
      'アシスタント': 'assistant',
      // ...
    };
    
    for (const [ja, romaji] of Object.entries(romajiMap)) {
      text = text.replace(new RegExp(ja, 'g'), romaji);
    }
    
    return text;
  }
  
  /**
   * 清理不允许的字符
   */
  private static cleanCharacters(text: string, rules: UsernameRules): string {
    let allowed = '';
    
    if (rules.allowedCharacters.uppercaseLetters) allowed += 'A-Z';
    if (rules.allowedCharacters.lowercaseLetters) allowed += 'a-z';
    if (rules.allowedCharacters.numbers) allowed += '0-9';
    if (rules.allowedCharacters.underscore) allowed += '_';
    if (rules.allowedCharacters.hyphen) allowed += '-';
    if (rules.allowedCharacters.dot) allowed += '.';
    
    const pattern = new RegExp(`[^${allowed}]`, 'g');
    
    // 替换空格为下划线或连字符
    if (rules.allowedCharacters.underscore) {
      text = text.replace(/\s+/g, '_');
    } else if (rules.allowedCharacters.hyphen) {
      text = text.replace(/\s+/g, '-');
    } else {
      text = text.replace(/\s+/g, '');
    }
    
    // 移除不允许的字符
    text = text.replace(pattern, '');
    
    // 移除连续的特殊字符
    text = text.replace(/[_-]{2,}/g, '_');
    
    return text;
  }
  
  /**
   * 调整长度
   */
  private static adjustLength(text: string, rules: UsernameRules): string {
    const { minLength, maxLength, requiredSuffix = '' } = rules;
    
    // 计算可用长度（减去后缀）
    const availableLength = maxLength - requiredSuffix.length;
    
    // 如果太长，截断
    if (text.length > availableLength) {
      text = text.slice(0, availableLength);
      // 确保不以特殊字符结尾
      text = text.replace(/[_.-]+$/, '');
    }
    
    // 如果太短，添加填充
    if (text.length < minLength - requiredSuffix.length) {
      const needed = minLength - requiredSuffix.length - text.length;
      // 添加随机数字
      text += Math.random().toString(36).slice(2, 2 + needed);
    }
    
    return text;
  }
  
  /**
   * 添加前缀/后缀
   */
  private static addAffixes(text: string, rules: UsernameRules): string {
    if (rules.requiredPrefix && !text.startsWith(rules.requiredPrefix)) {
      text = rules.requiredPrefix + text;
    }
    
    if (rules.requiredSuffix && !text.endsWith(rules.requiredSuffix)) {
      // 确保与现有文本有分隔
      if (text && rules.allowedCharacters.underscore) {
        text += '_';
      }
      text += rules.requiredSuffix;
    }
    
    return text;
  }
  
  /**
   * 调整大小写
   */
  private static adjustCase(text: string, rules: UsernameRules): string {
    if (!rules.caseSensitive) {
      // 大多数平台不区分大小写，转为小写
      text = text.toLowerCase();
    }
    
    return text;
  }
  
  /**
   * 验证并调整
   */
  private static validateAndAdjust(text: string, rules: UsernameRules): string {
    // 正则验证
    if (rules.pattern) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(text)) {
        // 如果不匹配，尝试简单修复
        // 否则生成默认值
        text = this.generateFallback(rules);
      }
    }
    
    // 检查保留字
    if (rules.reservedWords && rules.reservedWords.includes(text.toLowerCase())) {
      text += '_' + Math.random().toString(36).slice(2, 6);
    }
    
    return text;
  }
  
  /**
   * 生成后备方案
   */
  private static generateFallback(rules: UsernameRules): string {
    const { requiredPrefix = '', requiredSuffix = '' } = rules;
    const randomPart = 'bot_' + Math.random().toString(36).slice(2, 8);
    return requiredPrefix + randomPart + requiredSuffix;
  }
  
  /**
   * 生成多个候选ID
   */
  static generateCandidates(
    displayName: string,
    platform: string,
    count: number = 3
  ): string[] {
    const candidates: string[] = [];
    
    // 主要ID
    candidates.push(this.generateId(displayName, platform));
    
    // 变体
    for (let i = 1; i < count; i++) {
      const variant = this.generateId(displayName + i, platform);
      if (!candidates.includes(variant)) {
        candidates.push(variant);
      }
    }
    
    return candidates;
  }
}
```

### 使用示例

```typescript
// 示例1: 中文名称 -> Telegram
const name1 = '智能助手';
const id1 = BotIdGenerator.generateId(name1, 'telegram', 'zh');
// 结果: zhineng_zhushou_bot

// 示例2: 英文名称 -> Discord
const name2 = 'AI Helper';
const id2 = BotIdGenerator.generateId(name2, 'discord', 'en');
// 结果: ai_helper

// 示例3: 日文名称 -> Slack
const name3 = 'ヘルパーボット';
const id3 = BotIdGenerator.generateId(name3, 'slack', 'ja');
// 结果: helper_bot

// 示例4: Emoji名称 -> Weixin
const name4 = '🤖 Cool Bot';
const id4 = BotIdGenerator.generateId(name4, 'weixin', 'en');
// 结果: cool_bot (移除emoji，符合微信规则)
```

---

## 🎨 风格扩展系统设计

### 目录结构

```
rules/
├── README.md                    # 贡献指南
├── _schema.json                 # JSON Schema定义
├── _styles.json                 # 风格定义和元数据
├── cyberpunk/                   # 赛博朋克风格
│   ├── en-basic.json           # 英文基础规则
│   ├── en-advanced.json        # 英文高级规则
│   ├── zh-simple.json          # 中文简单规则
│   └── zh-tech.json            # 中文科技规则
├── cute/                        # 可爱风格
│   ├── en-animals.json
│   ├── zh-moe.json
│   ├── ja-kawaii.json
│   └── emoji-mix.json
├── professional/                # 专业风格
│   ├── en-corporate.json
│   ├── zh-business.json
│   └── formal.json
├── geek/                        # 极客风格
│   ├── programming.json
│   ├── gaming.json
│   └── tech-slang.json
├── fantasy/                     # 幻想风格
│   ├── en-medieval.json
│   ├── zh-xianxia.json
│   └── ja-fantasy.json
└── community/                   # 社区贡献
    ├── cyberpunk/              # 扩展现有风格
    │   └── user1-matrix.json
    ├── steampunk/              # 新风格
    │   └── user2-victorian.json
    └── pixel-art/              # 新风格
        └── user3-retro.json
```

### 风格定义文件

**rules/_styles.json**:

```json
{
  "version": "1.0.0",
  "styles": [
    {
      "id": "cyberpunk",
      "name": {
        "en": "Cyberpunk",
        "zh": "赛博朋克",
        "ja": "サイバーパンク"
      },
      "description": {
        "en": "Futuristic, neon-lit, tech-inspired names",
        "zh": "未来感、霓虹灯、科技风格的名称",
        "ja": "未来的、ネオン、テクノロジーにインスパイアされた名前"
      },
      "icon": "🌃",
      "color": "#00ffff",
      "tags": ["futuristic", "tech", "neon", "sci-fi"],
      "examples": ["CyberBot3000", "NeuralCore", "QuantumMind"],
      "popularity": 9,
      "characteristics": {
        "formality": 5,
        "creativity": 9,
        "techiness": 10,
        "cuteness": 2
      }
    },
    {
      "id": "cute",
      "name": {
        "en": "Cute",
        "zh": "可爱",
        "ja": "かわいい"
      },
      "description": {
        "en": "Adorable, friendly, approachable names",
        "zh": "可爱、友好、亲近的名称",
        "ja": "愛らしく、フレンドリーで、親しみやすい名前"
      },
      "icon": "🐱",
      "color": "#ffb3d9",
      "tags": ["cute", "friendly", "animals", "kawaii"],
      "examples": ["BuddyBot", "小猫助手", "もふもふ君"],
      "popularity": 10,
      "characteristics": {
        "formality": 2,
        "creativity": 7,
        "techiness": 3,
        "cuteness": 10
      }
    },
    {
      "id": "professional",
      "name": {
        "en": "Professional",
        "zh": "专业",
        "ja": "プロフェッショナル"
      },
      "description": {
        "en": "Business-appropriate, formal, corporate names",
        "zh": "适合商务、正式、企业的名称",
        "ja": "ビジネスに適した、フォーマルで、企業向けの名前"
      },
      "icon": "💼",
      "color": "#4a5568",
      "tags": ["business", "formal", "corporate", "serious"],
      "examples": ["AssistantPro", "BusinessBot", "企業助手"],
      "popularity": 8,
      "characteristics": {
        "formality": 10,
        "creativity": 4,
        "techiness": 6,
        "cuteness": 1
      }
    },
    {
      "id": "geek",
      "name": {
        "en": "Geek",
        "zh": "极客",
        "ja": "ギーク"
      },
      "description": {
        "en": "Programming, gaming, tech culture references",
        "zh": "编程、游戏、技术文化相关",
        "ja": "プログラミング、ゲーム、テック文化の引用"
      },
      "icon": "🤓",
      "color": "#48bb78",
      "tags": ["programming", "gaming", "tech", "nerdy"],
      "examples": ["GitBot", "sudo_helper", "NullPointer"],
      "popularity": 7,
      "characteristics": {
        "formality": 4,
        "creativity": 8,
        "techiness": 10,
        "cuteness": 3
      }
    },
    {
      "id": "fantasy",
      "name": {
        "en": "Fantasy",
        "zh": "幻想",
        "ja": "ファンタジー"
      },
      "description": {
        "en": "Magical, mythical, epic fantasy-inspired names",
        "zh": "魔法、神话、史诗幻想风格",
        "ja": "魔法的、神話的、叙事詩ファンタジーにインスパイアされた名前"
      },
      "icon": "🐉",
      "color": "#9f7aea",
      "tags": ["fantasy", "magic", "medieval", "mythical"],
      "examples": ["DragonHelper", "仙灵助手", "魔法のボット"],
      "popularity": 6,
      "characteristics": {
        "formality": 3,
        "creativity": 10,
        "techiness": 2,
        "cuteness": 5
      }
    }
  ]
}
```

### 规则文件示例

**rules/cyberpunk/zh-tech.json**:

```json
{
  "id": "cyberpunk-zh-tech",
  "version": "1.0.0",
  "name": {
    "en": "Chinese Cyberpunk Tech",
    "zh": "中文赛博朋克科技风",
    "ja": "中国語サイバーパンクテック"
  },
  "description": {
    "en": "Chinese cyberpunk names with tech flavor",
    "zh": "带有科技感的中文赛博朋克名称",
    "ja": "テック風の中国語サイバーパンク名"
  },
  "style": "cyberpunk",
  "subStyle": "tech",
  "author": {
    "name": "Bot Name Generator Team",
    "github": "pick-bot-name"
  },
  "languages": ["zh"],
  "platforms": ["feishu", "dingtalk", "wecom", "qqbot"],
  "algorithm": "combination",
  "config": {
    "generateMultiLang": true,
    "preferredLength": {
      "min": 4,
      "max": 8
    },
    "complexity": "medium"
  },
  "data": {
    "prefixes": [
      { "value": "赛博", "weight": 10, "translations": { "en": "Cyber" } },
      { "value": "量子", "weight": 8, "translations": { "en": "Quantum" } },
      { "value": "神经", "weight": 9, "translations": { "en": "Neural" } },
      { "value": "数字", "weight": 7, "translations": { "en": "Digital" } },
      { "value": "智能", "weight": 10, "translations": { "en": "Smart" } },
      { "value": "虚拟", "weight": 6, "translations": { "en": "Virtual" } },
      { "value": "矩阵", "weight": 8, "translations": { "en": "Matrix" } }
    ],
    "roots": [
      { "value": "机器人", "weight": 10, "translations": { "en": "Bot" } },
      { "value": "助手", "weight": 9, "translations": { "en": "Assistant" } },
      { "value": "核心", "weight": 8, "translations": { "en": "Core" } },
      { "value": "节点", "weight": 7, "translations": { "en": "Node" } },
      { "value": "网格", "weight": 6, "translations": { "en": "Mesh" } }
    ],
    "suffixes": [
      { "value": "3000", "weight": 8 },
      { "value": "X", "weight": 9 },
      { "value": "Pro", "weight": 7 },
      { "value": "AI", "weight": 10 },
      { "value": "α", "weight": 6 },
      { "value": "Ω", "weight": 5 }
    ]
  }
}
```

### 社区贡献规则示例

**rules/community/steampunk/victorian-bot.json** (新风格):

```json
{
  "id": "steampunk-victorian",
  "version": "1.0.0",
  "name": {
    "en": "Victorian Steampunk",
    "zh": "维多利亚蒸汽朋克",
    "ja": "ヴィクトリアンスチームパンク"
  },
  "description": {
    "en": "Victorian era meets steam-powered machinery",
    "zh": "维多利亚时代遇见蒸汽动力机械",
    "ja": "ヴィクトリア時代と蒸気機関の出会い"
  },
  "style": "steampunk",           // 🔥 新风格
  "author": {
    "name": "CommunityUser123",
    "github": "user123"
  },
  "languages": ["en"],
  "algorithm": "combination",
  "config": {
    "generateMultiLang": false,
    "preferredLength": { "min": 6, "max": 15 },
    "complexity": "complex"
  },
  "data": {
    "prefixes": [
      { "value": "Steam", "weight": 10 },
      { "value": "Brass", "weight": 8 },
      { "value": "Clock", "weight": 7 },
      { "value": "Gear", "weight": 9 },
      { "value": "Copper", "weight": 6 }
    ],
    "roots": [
      { "value": "Work", "weight": 10 },
      { "value": "Engine", "weight": 9 },
      { "value": "Mech", "weight": 8 },
      { "value": "Automaton", "weight": 7 }
    ],
    "suffixes": [
      { "value": "IX", "weight": 8 },
      { "value": "VII", "weight": 7 },
      { "value": "Mark II", "weight": 9 },
      { "value": "Mk3", "weight": 6 }
    ]
  }
}
```

---

## 🖥️ 页面布局设计

### 主界面结构

```
┌─────────────────────────────────────────────────────────────┐
│  🤖 Bot Name Generator              [🌓Theme] [🌍Language]  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────── Generator Controls ──────────┐                 │
│  │                                        │                 │
│  │  Style: [Cyberpunk ▼]  Language: [EN ▼] │                 │
│  │                                        │                 │
│  │  [⟳ Generate Name]                    │                 │
│  └────────────────────────────────────────┘                 │
│                                                              │
│  ┌────────── Generated Name ──────────┐                     │
│  │                                    │                     │
│  │     ✨ CyberBot3000 ✨            │                     │
│  │                                    │                     │
│  │     Style: Cyberpunk               │                     │
│  │     Languages: EN, ZH, JA          │                     │
│  │                                    │                     │
│  │     [📋 Copy] [⭐ Favorite] [↺ Regenerate] │             │
│  └────────────────────────────────────┘                     │
│                                                              │
│  ┌────────── Platform Info ──────────────────────────┐      │
│  │                                                    │      │
│  │  [Telegram] [Discord] [Slack] [Feishu] [More...] │      │
│  │  ─────────                                        │      │
│  │                                                    │      │
│  │  📱 Telegram Bot                                  │      │
│  │                                                    │      │
│  │  Display Name: CyberBot3000                       │      │
│  │  Username: cyberbot3000_bot                       │      │
│  │  Status: ✅ Valid                                 │      │
│  │                                                    │      │
│  │  ┌─ How to Create ──────────────────────────┐    │      │
│  │  │                                           │    │      │
│  │  │  1. Find @BotFather in Telegram          │    │      │
│  │  │  2. Send /newbot                         │    │      │
│  │  │  3. Enter name: CyberBot3000             │    │      │
│  │  │  4. Enter username: cyberbot3000_bot     │    │      │
│  │  │  5. Save your token                      │    │      │
│  │  │                                           │    │      │
│  │  │  [📖 Detailed Guide] [📄 Copy Info]      │    │      │
│  │  └───────────────────────────────────────────┘    │      │
│  │                                                    │      │
│  │  Required Credentials:                            │      │
│  │  • Bot Token (from @BotFather)                    │      │
│  │                                                    │      │
│  │  Difficulty: ⭐ Easy | Time: ~3 minutes          │      │
│  │                                                    │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 平台Tab交互

```typescript
// Platform Tab组件
interface PlatformTabProps {
  generatedInfo: GeneratedBotInfo;
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
}

const PlatformTab: React.FC<PlatformTabProps> = ({
  generatedInfo,
  activePlatform,
  onPlatformChange
}) => {
  const platformInfo = generatedInfo.platforms[activePlatform];
  const platformConfig = getPlatformConfig(activePlatform);
  
  // 替换占位符
  const renderStep = (step: CreationStep) => {
    let description = step.description[currentLanguage];
    
    // 替换 {{displayName}}
    description = description.replace(
      /\{\{displayName\}\}/g,
      platformInfo.displayName
    );
    
    // 替换 {{username}}
    description = description.replace(
      /\{\{username\}\}/g,
      platformInfo.username
    );
    
    return description;
  };
  
  return (
    <div className="platform-tabs">
      {/* Tab Headers */}
      <div className="tab-headers">
        {Object.keys(generatedInfo.platforms).map(platform => (
          <button
            key={platform}
            className={`tab-header ${platform === activePlatform ? 'active' : ''}`}
            onClick={() => onPlatformChange(platform)}
          >
            <PlatformIcon platform={platform} />
            {platformConfig.displayName[currentLanguage]}
            {platformInfo.isValid ? '✅' : '⚠️'}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        <div className="bot-info-section">
          <h3>Bot Information</h3>
          
          <div className="info-row">
            <label>Display Name:</label>
            <div className="value">
              {platformInfo.displayName}
              <CopyButton value={platformInfo.displayName} />
            </div>
          </div>
          
          <div className="info-row">
            <label>Username/ID:</label>
            <div className="value">
              {platformInfo.username}
              <CopyButton value={platformInfo.username} />
              {platformInfo.isValid ? (
                <span className="status valid">✅ Valid</span>
              ) : (
                <span className="status invalid">
                  ⚠️ {platformInfo.validationErrors?.join(', ')}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="creation-steps-section">
          <h3>How to Create on {platformConfig.displayName[currentLanguage]}</h3>
          
          <div className="steps-list">
            {platformConfig.creationSteps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{step.order}</div>
                <div className="step-content">
                  <h4>{step.title[currentLanguage]}</h4>
                  <p>{renderStep(step)}</p>
                  
                  {step.command && (
                    <code className="command">{step.command}</code>
                  )}
                  
                  {step.warning && (
                    <div className="warning">
                      {step.warning[currentLanguage]}
                    </div>
                  )}
                  
                  {step.tips && (
                    <div className="tips">
                      💡 {step.tips[currentLanguage]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="credentials-section">
          <h3>Required Credentials</h3>
          {platformConfig.credentials.map((cred, index) => (
            <div key={index} className="credential-item">
              <h4>{cred.displayName[currentLanguage]}</h4>
              <p>{cred.description[currentLanguage]}</p>
              {cred.example && (
                <code className="example">{cred.example}</code>
              )}
              <p className="how-to">{cred.howToObtain[currentLanguage]}</p>
            </div>
          ))}
        </div>
        
        <div className="metadata-section">
          <div className="meta-item">
            <span className="label">Difficulty:</span>
            <span className="value">
              {getDifficultyStars(platformInfo.metadata.difficulty)}
              {platformInfo.metadata.difficulty}
            </span>
          </div>
          
          <div className="meta-item">
            <span className="label">Estimated Time:</span>
            <span className="value">{platformInfo.metadata.estimatedTime}</span>
          </div>
        </div>
        
        <div className="actions-section">
          <button className="btn-primary">
            📖 View Detailed Guide
          </button>
          <button className="btn-secondary">
            📄 Copy All Info
          </button>
          <button className="btn-secondary">
            🔗 Official Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 🔄 完整生成流程

```typescript
/**
 * 名称生成完整流程
 */
async function generateBotName(
  style: string,
  language: string,
  platforms: string[]
): Promise<GeneratedBotInfo> {
  // 步骤1: 选择规则
  const availableRules = RuleLoader.getRulesByStyle(style)
    .filter(rule => rule.languages.includes(language));
  
  if (availableRules.length === 0) {
    throw new Error(`No rules found for style: ${style}, language: ${language}`);
  }
  
  const rule = selectRandomRule(availableRules);
  
  // 步骤2: 生成基础名称
  const generator = new NameGenerator(rule);
  const primaryName = generator.generate();
  
  // 步骤3: 生成多语言名称
  const translations: { [lang: string]: string } = {
    [language]: primaryName
  };
  
  if (rule.config.generateMultiLang) {
    // 如果规则支持多语言生成
    for (const lang of rule.languages) {
      if (lang !== language) {
        translations[lang] = generator.generate({ language: lang });
      }
    }
  } else {
    // 否则只翻译（如果数据中有翻译）
    translations.en = translateToEnglish(primaryName, rule);
  }
  
  // 步骤4: 为每个平台生成信息
  const platformsInfo: { [key: string]: PlatformBotInfo } = {};
  
  for (const platform of platforms) {
    const platformConfig = getPlatformConfig(platform);
    
    // 选择合适的显示名称
    let displayName = primaryName;
    if (platformConfig.namingRules.displayName.allowedCharacters.chinese && language === 'zh') {
      displayName = translations.zh || primaryName;
    } else if (!platformConfig.namingRules.displayName.allowedCharacters.chinese) {
      displayName = translations.en || primaryName;
    }
    
    // 生成符合平台规则的username
    const username = BotIdGenerator.generateId(displayName, platform, language);
    
    // 验证
    const validation = validateNameForPlatform(username, platform);
    
    platformsInfo[platform] = {
      platform,
      displayName,
      username,
      isValid: validation.valid,
      validationErrors: validation.valid ? undefined : [validation.reason!],
      metadata: {
        difficulty: platformConfig.difficulty,
        estimatedTime: getEstimatedTime(platformConfig.difficulty),
        needsToken: platformConfig.credentials.some(c => c.type === 'token'),
        needsAppId: platformConfig.credentials.some(c => c.type === 'app_id')
      }
    };
  }
  
  // 步骤5: 组装结果
  const result: GeneratedBotInfo = {
    id: generateUniqueId(),
    timestamp: Date.now(),
    style,
    ruleId: rule.id,
    algorithm: rule.algorithm,
    displayNames: {
      primary: primaryName,
      translations
    },
    platforms: platformsInfo
  };
  
  return result;
}
```

---

## 📝 总结

### 关键改进点

1. **名字与ID分离** ✅
   - 显示名称可以是多语言（中文、日文、Emoji等）
   - ID/username自动生成，符合各平台规则

2. **平台Tab布局** ✅
   - 生成后显示平台切换Tab
   - 每个平台显示定制化的创建信息
   - 创建步骤中动态显示生成的名称和ID

3. **智能ID生成** ✅
   - 中文转拼音、日文转罗马音
   - 自动处理特殊字符、长度、大小写
   - 添加平台要求的前后缀（如Telegram的bot后缀）

4. **风格分类系统** ✅
   - 规则文件必须指定所属风格
   - 支持扩展现有风格（添加新规则）
   - 支持创建全新风格
   - 社区贡献通过PR方式

5. **占位符替换** ✅
   - 创建步骤支持 `{{displayName}}` 和 `{{username}}` 占位符
   - 动态替换为实际生成的值

### 下一步

这个架构现在已经非常完整了！你可以：

1. **开始实施** - 我可以开始创建项目文件
2. **调整细节** - 如果某些设计需要修改
3. **查看代码实现** - 看具体组件的实现

你想怎么进行？
