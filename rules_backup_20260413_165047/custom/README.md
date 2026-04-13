# Custom Generation Rules

This directory contains community-contributed generation rules.

## 📁 Directory Structure

```
rules/
├── _schema.json          # JSON Schema for validation
├── _styles.json          # Style definitions
├── built-in/            # Built-in rules (maintained by core team)
└── custom/              # Community-contributed rules (you are here!)
```

## 🎲 Example Rules

This directory includes several example rules to help you get started:

### 1. fantasy-en-medieval.json
Medieval fantasy names with noble titles (Sir, Lord, Lady, etc.)
- **Style**: Fantasy
- **Language**: English
- **Algorithm**: Combination
- **Examples**: SirGalahad, LordMerlintheBrave

### 2. geek-en-scifi.json
Science fiction and technology names with version numbers
- **Style**: Geek
- **Language**: English
- **Algorithm**: Combination
- **Examples**: QuantumBot9000, NeuralAIX

### 3. nature-ja-forest.json
Japanese forest and nature-themed spiritual names
- **Style**: Nature
- **Language**: Japanese
- **Algorithm**: Template
- **Examples**: 森精霊, 木の守護者

### 4. professional-zh-business.json
Professional Chinese business and corporate names
- **Style**: Professional
- **Language**: Chinese
- **Algorithm**: Template
- **Examples**: 企业助手, 智能商务顾问

## ✨ Contributing Your Own Rule

Want to add your own generation rule? Great! Follow these steps:

### Step 1: Create Your Rule File

1. Copy an example rule as a template
2. Rename it following the pattern: `{style}-{language}-{variant}.json`
3. Update all fields with your content

### Step 2: Validate Your Rule

```bash
# Validate rule schema
npm run validate-rules

# Build rules bundle
npm run build-rules

# Test locally
npm run dev
```

### Step 3: Submit a Pull Request

1. Fork the repository
2. Add your rule to `rules/custom/`
3. Commit with a clear message: `feat(rules): add [your-rule-name]`
4. Open a Pull Request
5. Fill out the PR template

## 📋 Rule Requirements

Your rule must:
- ✅ Follow the JSON schema in `rules/_schema.json`
- ✅ Have a unique ID matching the filename
- ✅ Include names in all supported languages (en, zh, ja)
- ✅ Provide at least 3 example outputs
- ✅ Use appropriate style category
- ✅ Include complete author information
- ✅ Pass validation (`npm run validate-rules`)

## 🎨 Supported Styles

- `cyberpunk` - Futuristic, tech-heavy names
- `cute` - Adorable, friendly names
- `professional` - Business and corporate names
- `geek` - Tech and nerd culture names
- `fantasy` - Magical and mythical names
- `minimal` - Simple, clean names
- `steampunk` - Victorian-era tech names
- `anime` - Japanese animation style names
- `military` - Military and tactical names
- `nature` - Natural and organic names

## 🌍 Supported Languages

- `zh` - Chinese (中文)
- `en` - English
- `ja` - Japanese (日本語)

## 📚 Documentation

- [Rule Guide](../../docs/RULE_GUIDE.md) - Detailed guide for creating rules
- [Contributing Guide](../../CONTRIBUTING.md) - General contribution guidelines
- [JSON Schema](../_schema.json) - Technical schema specification

## 💡 Tips for Great Rules

1. **Test extensively** - Generate 50+ names to ensure quality
2. **Use appropriate weights** - Balance common and rare combinations
3. **Consider pronunciation** - Make names easy to say
4. **Cultural sensitivity** - Respect cultural contexts
5. **Length matters** - Aim for 4-20 characters
6. **Provide context** - Clear descriptions help users choose

## 🤝 Need Help?

- Check the [Rule Guide](../../docs/RULE_GUIDE.md)
- Look at example rules in this directory
- Open an issue for questions
- Submit a draft PR for feedback

## 📄 License

All rules in this directory are licensed under MIT unless otherwise specified.

---

Thank you for contributing to Bot Name Generator! 🎉
