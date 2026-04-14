# 🤖 机器人名称生成器

<div align="center">

[![部署状态](https://github.com/ling5821/pick-bot-name/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/ling5821/pick-bot-name/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/guides/CONTRIBUTING.md)

**多平台、多风格、多语言的机器人名称生成器，支持头像生成**

[🌐 在线演示](https://ling5821.github.io/pick-bot-name) | [📚 文档](docs/) | [🤝 贡献指南](docs/guides/CONTRIBUTING.md) | [🐛 报告问题](https://github.com/ling5821/pick-bot-name/issues)

[English](README.md) | 简体中文

</div>

---

## ✨ 功能特性

### 🎯 核心能力

- **🌍 支持 11 个平台**
  - Telegram、Discord、Slack、飞书、钉钉
  - 企业微信、微信、QQ、QQ 机器人、LINE、通用

- **🎨 7 种风格分类**
  - 朋克（赛博朋克/蒸汽朋克）、可爱、专业
  - 极客、极简、动漫、二次元 (ACGN)

- **🌐 多语言支持**
  - 中文
  - English

- **🧠 4 种生成算法**
  - **组合算法**：混合前缀、词根和后缀
  - **模板算法**：用词汇填充占位符
  - **马尔可夫链**：从样本中学习模式
  - **音节算法**：组合辅音和元音

### 🖼️ 头像生成

- 使用 [DiceBear](https://dicebear.com/) 生成手绘风格头像
- 多种头像风格：bottts、croodles、pixelArt、lorelei、adventurer
- 基于机器人风格自动匹配头像
- **二次元风格特别支持**：使用 waifu.pics API 加载真实的二次元插画

### 🎯 智能功能

- **平台专属 ID 生成**：生成符合各平台规则的用户名
- **中文拼音支持**：将中文名称转换为有效的平台 ID
- **实时验证**：即时反馈名称合规性
- **历史与收藏**：保存和管理生成的名称
- **暗色/亮色模式**：赛博朋克主题 UI，支持主题切换

### 🔧 可扩展性

- **社区规则**：通过 JSON 文件添加自定义生成规则
- **插件系统**：使用自定义生成器和验证器扩展功能
- **开放架构**：详细的规则架构文档，方便贡献

---

## 🚀 快速开始

### 环境要求

- Node.js 18+ 和 npm 9+
- 支持 ES2020 的现代浏览器

### 安装

```bash
# 克隆仓库
git clone https://github.com/ling5821/pick-bot-name.git
cd pick-bot-name

# 安装依赖
npm install

# 构建规则包
npm run build-rules

# 启动开发服务器
npm run dev
```

应用将在 `http://localhost:3000` 运行

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📖 文档

### 用户文档

- **[用户指南](docs/)** - 如何使用生成器
- **[API 参考](docs/guides/API_REFERENCE.md)** - API 文档
- **[快速参考](docs/QUICK_REFERENCE.md)** - 快速参考指南
- **[规则指南](docs/guides/RULE_GUIDE.md)** - 理解生成规则

### 开发者文档

- **[开发指南](docs/guides/DEVELOPMENT.md)** - 设置和开发工作流
- **[贡献指南](docs/guides/CONTRIBUTING.md)** - 如何贡献
- **[系统架构](docs/architecture/ARCHITECTURE.md)** - 系统设计和架构
- **[社区指南](docs/guides/COMMUNITY_GUIDE.md)** - 社区准则

---

## 🛠️ 技术栈

### 前端

- **React 18** - UI 框架
- **TypeScript 5** - 类型安全
- **Vite 5** - 构建工具和开发服务器
- **Tailwind CSS 3** - 实用优先的 CSS
- **Framer Motion** - 动画

### 状态管理

- **Zustand** - 轻量级状态管理
- **React i18next** - 国际化

### 生成与工具

- **DiceBear** - 头像生成
- **pinyin-pro** - 中文拼音转换
- **DOMPurify** - XSS 防护

### 测试与质量

- **Vitest** - 单元测试
- **Testing Library** - 组件测试
- **ESLint + Prettier** - 代码质量
- **TypeScript strict mode** - 类型检查

---

## 📊 项目统计

- **文件数**：62+ TypeScript/TSX 文件
- **代码行数**：~5,000+ 行
- **组件数**：15+ React 组件
- **平台配置**：11 个平台
- **机器人风格**：7 种分类
- **生成规则**：14 个内置规则（7 种风格 × 2 种语言）
- **支持语言**：2 种（中文、英文）
- **构建大小**：~1.1 MB（gzip 压缩：~250 KB 主包）

---

## 🗂️ 项目结构

```
pick-bot-name/
├── .github/              # GitHub 模板和工作流
│   ├── workflows/       # CI/CD 工作流
│   └── ISSUE_TEMPLATE/  # Issue 模板
├── docs/                # 文档
│   ├── architecture/    # 架构文档
│   ├── features/        # 功能文档
│   └── guides/          # 用户和开发者指南
├── public/              # 静态资源
├── rules/               # 生成规则
│   ├── built-in/       # 核心规则
│   └── custom/         # 社区规则
├── scripts/            # 构建和验证脚本
├── src/
│   ├── components/     # React 组件
│   ├── core/          # 业务逻辑
│   │   ├── generator/ # 名称生成
│   │   ├── avatar/    # 头像生成
│   │   └── validator/ # 验证逻辑
│   ├── data/          # 静态数据
│   │   ├── locales/   # 翻译
│   │   └── platforms/ # 平台配置
│   ├── store/         # 状态管理
│   ├── types/         # TypeScript 类型
│   └── App.tsx        # 主应用组件
├── tests/             # 测试文件
└── dist/              # 构建输出
```

---

## 🤝 贡献

我们欢迎社区贡献！无论你想要：

- 🎲 添加新的生成规则
- 🎨 创建新的机器人风格
- 🌍 添加语言支持
- 🐛 修复 bug
- ✨ 提议新功能
- 📚 改进文档

请阅读我们的 **[贡献指南](docs/guides/CONTRIBUTING.md)** 开始贡献。

### 快速贡献指南

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 进行更改
4. 运行测试（`npm run test`）
5. 验证规则（`npm run validate-rules`）
6. 使用约定式提交（`feat: add amazing feature`）
7. 推送到你的 fork
8. 提交 Pull Request

详细指南请参阅 [CONTRIBUTING.md](docs/guides/CONTRIBUTING.md)。

---

## 💡 名称生成规范

### 中文名称要求

- **长度**：2-4 个汉字（理想长度 2-3 字）
- **推荐使用叠词**：喵喵、团团、软软（可爱风格）
- **避免**：超过 4 个字的名称、使用"的"字结构的长名称

**示例**：
- ✅ 好的：喵喵、团团、小兔（2字）、算法君（3字）、二次元娘（4字）
- ❌ 不好：可爱的小猫助手（7字，太长）

### 英文名称要求

- **长度**：4-12 个字符
- **易于发音和记忆**

---

## 📜 许可证

本项目采用 **MIT 许可证** - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- [DiceBear](https://dicebear.com/) - 头像生成库
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) - 中文拼音转换
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- 所有 [贡献者](https://github.com/ling5821/pick-bot-name/graphs/contributors)

---

## 📞 联系与支持

- **问题反馈**：[GitHub Issues](https://github.com/ling5821/pick-bot-name/issues)
- **讨论交流**：[GitHub Discussions](https://github.com/ling5821/pick-bot-name/discussions)

---

## 🌟 Star 历史

如果这个项目对你有帮助，请考虑给它一个 star ⭐

[![Star History Chart](https://api.star-history.com/chart?repos=ling5821/pick-bot-name&type=date&legend=bottom-right)](https://www.star-history.com/?repos=ling5821%2Fpick-bot-name&type=date&legend=bottom-right)

---

<div align="center">

**用 ❤️ 制作 by Bot Name Generator Team**

[⬆ 回到顶部](#-机器人名称生成器)

</div>
