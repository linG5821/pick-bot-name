# 🎲 Generation Rule Guide

Complete guide for creating generation rules for Bot Name Generator.

## 📋 Table of Contents

- [Overview](#overview)
- [Rule Schema](#rule-schema)
- [Algorithms](#algorithms)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Testing](#testing)

## 🎯 Overview

Generation rules define how bot names are created. Each rule specifies:
- **Style**: The aesthetic category (cyberpunk, cute, etc.)
- **Language**: Target language(s) for the names
- **Algorithm**: The generation method
- **Data**: Algorithm-specific configuration

## 📏 Name Length Requirements

**CRITICAL**: Generated names must follow these length constraints:

### Chinese Names (zh)
- **Length**: 2-4 characters （两到四个字）
- **Ideal**: 2-3 characters
- **Recommended**: Use reduplication (叠词) for cute/anime styles
  - Examples: 喵喵, 团团, 软软, 小兔, 甜甜

### English Names (en)
- **Ideal length**: 4-12 characters
- **Easy to pronounce and remember**
- Examples: Fluffy, Sweetie, BotPal

### Japanese Names (ja)
- **Ideal length**: 2-4 characters
- Examples: にゃんにゃん, ぴよぴよ

### ❌ Bad Examples (Too Long)
```
"可爱的小猫助手"  (7 chars - TOO LONG)
"聪明的兔子管家"  (7 chars - TOO LONG)
"萌萌的熊猫宝宝"  (7 chars - TOO LONG)
```

### ✅ Good Examples
```
"喵喵"    (2 chars, reduplication)
"小兔"    (2 chars)
"团团"    (2 chars, reduplication)
"软软"    (2 chars, reduplication)
"小狐"    (2 chars)
"甜心"    (2 chars)
```

## 📐 Rule Schema

### Required Fields

```json
{
  "id": "string",              // Unique identifier: {style}-{language}-{variant}
  "name": {                    // Multi-language name
    "en": "string",
    "zh": "string",
    "ja": "string"
  },
  "description": {             // Multi-language description (optional)
    "en": "string",
    "zh": "string",
    "ja": "string"
  },
  "style": "string",           // One of: cyberpunk, cute, professional, geek, fantasy, minimal, steampunk, anime, military, nature
  "languages": ["string"],     // Supported languages: ["zh", "en", "ja"]
  "algorithm": "string",       // One of: combination, template, markov, syllable
  "author": {
    "name": "string",          // Your name
    "github": "string",        // GitHub username
    "email": "string"          // Optional
  },
  "data": {},                  // Algorithm-specific data
  "examples": ["string"]       // At least 3 example outputs
}
```

### Optional Fields

```json
{
  "version": "1.0.0",          // Semantic version
  "license": "MIT",            // License type
  "tags": ["tag1", "tag2"],    // Search tags
  "platformOptimized": ["telegram", "discord"],  // Optimized platforms
  "createdAt": "2024-01-01",   // Creation date
  "updatedAt": "2024-01-01"    // Last update date
}
```

## 🔧 Algorithms

### 1. Combination Algorithm

**Best for**: Modular names with clear structure

**How it works**: Randomly combines weighted prefixes, roots, and suffixes.

**Data Structure**:
```json
{
  "algorithm": "combination",
  "data": {
    "prefixes": [
      {"value": "Cyber", "weight": 10},
      {"value": "Nano", "weight": 8},
      {"value": "Mega", "weight": 6}
    ],
    "roots": [
      {"value": "Bot", "weight": 10},
      {"value": "AI", "weight": 8}
    ],
    "suffixes": [
      {"value": "3000", "weight": 5},
      {"value": "Pro", "weight": 8},
      {"value": "X", "weight": 6}
    ]
  }
}
```

**Parameters**:
- `prefixes`: Optional prefix components (70% chance)
- `roots`: Required core components
- `suffixes`: Optional suffix components (60% chance)
- `weight`: Relative probability (1-10)

**Output Examples**:
- "CyberBot3000"
- "NanoAIPro"
- "MegaBotX"

**Tips**:
- Use higher weights for more common combinations
- Ensure roots work well standalone
- Prefixes/suffixes should complement roots

---

### 2. Template Algorithm

**Best for**: Fixed patterns with variable content

**How it works**: Fills placeholders in templates with vocabulary items.

**Data Structure**:
```json
{
  "algorithm": "template",
  "data": {
    "templates": [
      {"value": "{adjective}{animal}", "weight": 10},
      {"value": "{adjective}的{animal}", "weight": 8},
      {"value": "{animal}{suffix}", "weight": 6}
    ],
    "vocabulary": {
      "adjective": [
        {"value": "可爱", "weight": 10},
        {"value": "聪明", "weight": 8}
      ],
      "animal": [
        {"value": "猫咪", "weight": 10},
        {"value": "兔子", "weight": 8}
      ],
      "suffix": [
        {"value": "助手", "weight": 10},
        {"value": "管家", "weight": 6}
      ]
    }
  }
}
```

**Parameters**:
- `templates`: Template strings with `{placeholder}` format
- `vocabulary`: Dictionary of word lists for each placeholder
- All placeholders in templates must exist in vocabulary

**Output Examples**:
- "可爱猫咪"
- "聪明的兔子"
- "猫咪助手"

**Tips**:
- Use descriptive placeholder names
- Ensure all combinations make sense
- Test various template/vocabulary combinations

---

### 3. Markov Chain Algorithm

**Best for**: Learning from existing name patterns

**How it works**: Builds transition probabilities from samples and generates similar names.

**Data Structure**:
```json
{
  "algorithm": "markov",
  "data": {
    "samples": [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Emma",
      "Frank"
    ],
    "order": 2,
    "minLength": 3,
    "maxLength": 12
  }
}
```

**Parameters**:
- `samples`: Training data (at least 10 recommended)
- `order`: N-gram order (1-5, default: 2)
  - Higher = more similar to samples
  - Lower = more creative/random
- `minLength`: Minimum name length (default: 3)
- `maxLength`: Maximum name length (default: 15)

**Output Examples**:
- "Alob" (from Alice + Bob)
- "Charle" (from Charlie)
- "Daven" (from David + Emma)

**Tips**:
- Provide diverse samples (20-50 ideal)
- Higher order for consistent style
- Lower order for creative variations
- Test with different order values

---

### 4. Syllable Algorithm

**Best for**: Pronounceable made-up names

**How it works**: Combines consonants, vowels, and endings into syllables.

**Data Structure**:
```json
{
  "algorithm": "syllable",
  "data": {
    "consonants": [
      {"value": "b", "weight": 10},
      {"value": "k", "weight": 8},
      {"value": "t", "weight": 8}
    ],
    "vowels": [
      {"value": "a", "weight": 10},
      {"value": "i", "weight": 8},
      {"value": "o", "weight": 6}
    ],
    "endings": [
      {"value": "n", "weight": 5},
      {"value": "x", "weight": 3}
    ],
    "minSyllables": 2,
    "maxSyllables": 4,
    "capitalize": true
  }
}
```

**Parameters**:
- `consonants`: Optional syllable starters (80% chance)
- `vowels`: Required vowel sounds
- `endings`: Optional syllable endings (30% chance)
- `minSyllables`: Minimum syllables (default: 2)
- `maxSyllables`: Maximum syllables (default: 4)
- `capitalize`: Capitalize first letter (default: true)

**Output Examples**:
- "Kiban"
- "Bitox"
- "Takin"

**Tips**:
- Mix consonants for variety
- Include multiple vowel sounds
- Keep endings light
- Test pronunciation

---

## ✅ Best Practices

### Content Guidelines

1. **Cultural Sensitivity**
   - Avoid offensive or inappropriate words
   - Respect cultural differences
   - Consider international audiences

2. **Name Quality**
   - Easy to pronounce
   - Easy to remember
   - Appropriate length (4-20 characters)
   - Unique and distinctive

3. **Weights**
   - Use 1-10 range
   - Higher weight = more frequent
   - Balance common and rare combinations

### Technical Guidelines

1. **JSON Formatting**
   - Use proper indentation (2 spaces)
   - Validate JSON syntax
   - Use UTF-8 encoding

2. **Testing**
   - Generate 50+ examples
   - Check for duplicates
   - Verify name quality
   - Test across platforms

3. **Documentation**
   - Provide clear descriptions
   - Include usage context
   - Document special considerations

## 📚 Examples

### Example 1: Fantasy Names (English)

```json
{
  "id": "fantasy-en-medieval",
  "name": {
    "en": "Medieval Fantasy",
    "zh": "中世纪奇幻",
    "ja": "中世ファンタジー"
  },
  "description": {
    "en": "Medieval-inspired fantasy bot names",
    "zh": "中世纪风格的奇幻机器人名称",
    "ja": "中世をテーマにしたファンタジーボット名"
  },
  "style": "fantasy",
  "languages": ["en"],
  "algorithm": "combination",
  "author": {
    "name": "Example Author",
    "github": "exampleuser"
  },
  "data": {
    "prefixes": [
      {"value": "Sir", "weight": 8},
      {"value": "Lord", "weight": 6},
      {"value": "Lady", "weight": 6}
    ],
    "roots": [
      {"value": "Galahad", "weight": 10},
      {"value": "Merlin", "weight": 9},
      {"value": "Arthur", "weight": 8}
    ],
    "suffixes": [
      {"value": "the Wise", "weight": 7},
      {"value": "the Brave", "weight": 8}
    ]
  },
  "examples": [
    "SirGalahad",
    "LordMerlintheWise",
    "LadyArthurtheBrave"
  ]
}
```

### Example 2: Cute Animals (Chinese) - Correct Length

```json
{
  "id": "cute-zh-animals",
  "name": {
    "en": "Cute Animals",
    "zh": "可爱动物",
    "ja": "かわいい動物"
  },
  "style": "cute",
  "languages": ["zh"],
  "algorithm": "template",
  "author": {
    "name": "Example Author",
    "github": "exampleuser"
  },
  "data": {
    "templates": [
      {"value": "{animal}{reduplication}", "weight": 10},
      {"value": "小{animal}", "weight": 9},
      {"value": "{adjective}{animal}", "weight": 8}
    ],
    "vocabulary": {
      "adjective": [
        {"value": "萌", "weight": 10},
        {"value": "软", "weight": 9}
      ],
      "animal": [
        {"value": "喵", "weight": 10},
        {"value": "兔", "weight": 9},
        {"value": "团", "weight": 8}
      ],
      "reduplication": [
        {"value": "喵", "weight": 10},
        {"value": "兔", "weight": 9}
      ]
    }
  },
  "examples": [
    "喵喵",
    "小兔",
    "团团",
    "萌喵",
    "软兔"
  ]
}
```

**Note**: This example follows the 2-3 character requirement with reduplication patterns.

## 🧪 Testing

### Validation

```bash
# Validate rule schema
npm run validate-rules

# Should output:
# ✅ Validating rules...
# ✅ cute-zh-animals.json is valid
# ✅ All rules validated successfully!
```

### Manual Testing

```bash
# Build and test
npm run build-rules
npm run dev

# Generate names using your rule
# 1. Select the style
# 2. Select the language
# 3. Click "Generate"
```

### Quality Checklist

- [ ] Generates diverse names
- [ ] No offensive content
- [ ] Appropriate length (4-20 chars)
- [ ] Pronounceable
- [ ] Culturally appropriate
- [ ] No duplicates in 100 generations
- [ ] Works well across platforms

## 📞 Need Help?

- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Open an issue for questions
- Submit a draft PR for feedback

---

Happy rule creating! 🎲✨
