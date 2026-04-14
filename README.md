# 🤖 Bot Name Generator

<div align="center">

[![Deploy Status](https://github.com/ling5821/pick-bot-name/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/ling5821/pick-bot-name/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/guides/CONTRIBUTING.md)

**Multi-platform, multi-style, multi-language bot name generator with avatar generation**

[🌐 Live Demo](https://ling5821.github.io/pick-bot-name) | [📚 Documentation](docs/) | [🤝 Contributing](docs/guides/CONTRIBUTING.md) | [🐛 Report Bug](https://github.com/ling5821/pick-bot-name/issues)

English | [简体中文](README_zh.md)

</div>

---

## ✨ Features

### 🎯 Core Capabilities

- **🌍 11 Platform Support**
  - Telegram, Discord, Slack, Feishu, DingTalk
  - WeChat Work, Weixin, QQ, QQ Bot, LINE, Generic

- **🎨 7 Style Categories**
  - Punk (Cyberpunk/Steampunk), Cute, Professional
  - Geek, Minimal, Anime, ACGN (二次元)

- **🌐 Multi-language Support**
  - Chinese (中文)
  - English

- **🧠 4 Generation Algorithms**
  - **Combination**: Mix prefixes, roots, and suffixes
  - **Template**: Fill placeholders with vocabulary
  - **Markov Chain**: Learn patterns from samples
  - **Syllable**: Combine consonants and vowels

### 🖼️ Avatar Generation

- Hand-drawn style avatars using [DiceBear](https://dicebear.com/)
- Multiple avatar styles: bottts, croodles, pixelArt, lorelei, adventurer
- Style matching based on bot personality

### 🎯 Smart Features

- **Platform-specific ID Generation**: Generate usernames that comply with each platform's rules
- **Chinese Pinyin Support**: Convert Chinese names to valid platform IDs
- **Real-time Validation**: Instant feedback on name compliance
- **History & Favorites**: Save and manage your generated names
- **Dark/Light Mode**: Cyberpunk-themed UI with theme support

### 🔧 Extensibility

- **Community Rules**: Add custom generation rules via JSON files
- **Plugin System**: Extend with custom generators and validators
- **Open Schema**: Well-documented rule schema for contributions

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Modern browser with ES2020 support

### Installation

```bash
# Clone the repository
git clone https://github.com/ling5821/pick-bot-name.git
cd pick-bot-name

# Install dependencies
npm install

# Build rules bundle
npm run build-rules

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 Documentation

### For Users

- **[User Guide](docs/)** - How to use the generator
- **[API Reference](docs/guides/API_REFERENCE.md)** - API documentation
- **[Rule Guide](docs/guides/RULE_GUIDE.md)** - Understanding generation rules

### For Developers

- **[Development Guide](docs/guides/DEVELOPMENT.md)** - Setup and development workflow
- **[Contributing Guide](docs/guides/CONTRIBUTING.md)** - How to contribute
- **[Architecture](docs/architecture/ARCHITECTURE.md)** - System design and architecture
- **[Community Guide](docs/guides/COMMUNITY_GUIDE.md)** - Community guidelines

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS
- **Framer Motion** - Animations

### State Management

- **Zustand** - Lightweight state management
- **React i18next** - Internationalization

### Generation & Utilities

- **DiceBear** - Avatar generation
- **pinyin-pro** - Chinese pinyin conversion
- **DOMPurify** - XSS protection

### Testing & Quality

- **Vitest** - Unit testing
- **Testing Library** - Component testing
- **ESLint + Prettier** - Code quality
- **TypeScript strict mode** - Type checking

---

## 📊 Project Statistics

- **Files**: 62+ TypeScript/TSX files
- **Lines of Code**: ~5,000+ lines
- **Components**: 15+ React components
- **Platform Configs**: 11 platforms
- **Bot Styles**: 7 categories
- **Generation Rules**: 14 built-in rules (7 styles × 2 languages)
- **Supported Languages**: 2 (Chinese, English)
- **Build Size**: ~1.1 MB (gzipped: ~250 KB main bundle)

---

## 🗂️ Project Structure

```
pick-bot-name/
├── .github/              # GitHub templates and workflows
│   ├── workflows/       # CI/CD workflows
│   └── ISSUE_TEMPLATE/  # Issue templates
├── docs/                # Documentation
│   ├── architecture/    # Architecture docs
│   ├── features/        # Feature documentation
│   └── guides/          # User and developer guides
├── public/              # Static assets
├── rules/               # Generation rules
│   ├── built-in/       # Core rules
│   └── custom/         # Community rules
├── scripts/            # Build and validation scripts
├── src/
│   ├── components/     # React components
│   ├── core/          # Business logic
│   │   ├── generator/ # Name generation
│   │   ├── avatar/    # Avatar generation
│   │   └── validator/ # Validation logic
│   ├── data/          # Static data
│   │   ├── locales/   # Translations
│   │   └── platforms/ # Platform configs
│   ├── store/         # State management
│   ├── types/         # TypeScript types
│   └── App.tsx        # Main app component
├── tests/             # Test files
└── dist/              # Build output
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether you want to:

- 🎲 Add new generation rules
- 🎨 Create new bot styles
- 🌍 Add language support
- 🐛 Fix bugs
- ✨ Propose new features
- 📚 Improve documentation

Please read our **[Contributing Guide](docs/guides/CONTRIBUTING.md)** to get started.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Validate rules (`npm run validate-rules`)
6. Commit with conventional commits (`feat: add amazing feature`)
7. Push to your fork
8. Open a Pull Request

See [CONTRIBUTING.md](docs/guides/CONTRIBUTING.md) for detailed guidelines.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [DiceBear](https://dicebear.com/) - Avatar generation library
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) - Chinese pinyin conversion
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- All our [contributors](https://github.com/ling5821/pick-bot-name/graphs/contributors)

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/ling5821/pick-bot-name/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ling5821/pick-bot-name/discussions)
- **Email**: your-email@example.com

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/chart?repos=ling5821/pick-bot-name&type=date&legend=bottom-right)](https://www.star-history.com/?repos=ling5821%2Fpick-bot-name&type=date&legend=bottom-right)

---

<div align="center">

**Made with ❤️ by the Bot Name Generator Team**

[⬆ Back to Top](#-pick-bot-name)

</div>
