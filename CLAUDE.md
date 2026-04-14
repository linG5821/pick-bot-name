# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bot Name Generator - A multi-platform, multi-style, multi-language bot name generator with avatar generation. Built with React + TypeScript + Vite, deployed to GitHub Pages.

## Essential Commands

### Development
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build           # TypeScript compile + Vite build
npm run preview         # Preview production build locally
```

### Rules System
```bash
npm run build-rules     # Build rules-bundle.json from rules/ directory
npm run validate-rules  # Validate all rule files against schema
```

### Testing & Quality
```bash
npm run test           # Run tests in watch mode
npm run test:run       # Run tests once
npm run test:coverage  # Run with coverage report
npm run lint           # ESLint check
npm run type-check     # TypeScript type checking only
```

## Architecture

### Rules System (Core Concept)

The entire name generation system is driven by JSON rule files in `rules/`:

```
rules/
├── _schema.json          # JSON Schema for validation
├── _styles.json          # Style definitions (7 styles)
├── built-in/            # Core rules (14 files: 7 styles × 2 languages)
└── custom/              # Community-contributed rules
```

**Rule Structure**: Each rule file defines:
- `id`: Unique identifier (format: `{style}-{language}-{variant}`)
- `style`: One of 7 styles (punk, cute, professional, geek, minimal, anime, acgn)
- `languages`: Array of supported languages (en, zh, ja, ko, fr, de)
- `algorithm`: Generation algorithm (combination, template, markov, syllable)
- `data`: Algorithm-specific data structure

**Critical**: After modifying rules, ALWAYS run:
1. `npm run validate-rules` - Ensures schema compliance
2. `npm run build-rules` - Rebuilds `src/data/rules-bundle.json`
3. Copy to public: `cp src/data/rules-bundle.json public/data/`

### Generation Algorithms

Four pluggable algorithms in `src/core/generator/algorithms/`:

1. **Combination**: Mix prefixes + roots + suffixes with weights
2. **Template**: Fill `{placeholder}` patterns from vocabulary
3. **Markov**: Learn patterns from training data (not widely used)
4. **Syllable**: Combine consonants + vowels (experimental)

Most rules use **combination** or **template**.

### Core Data Flow

```
User Input (style + language)
    ↓
RuleLoader.getRandomRule(style, language)  # Filters and randomly selects rule
    ↓
NameGenerator.generateFromRule(rule)        # Dispatches to algorithm
    ↓
Algorithm.generate(rule.data)               # Generates name with weights
    ↓
Generated Name
```

**Key Classes**:
- `RuleLoader` (`src/core/generator/RuleLoader.ts`): Singleton that indexes rules by style/language
- `NameGenerator` (`src/core/generator/NameGenerator.ts`): Algorithm dispatcher
- Algorithm implementations (`src/core/generator/algorithms/`): Stateless generators

### Development API Endpoint ⚠️

**Development-only** Vite plugin API (NOT a static HTML file):

```
GET /api/pick-bot-name?style=punk&language=zh
```

**Implementation**:
- Vite plugin middleware in dev server
- Returns complete `GeneratedBotInfo` structure (not minimal response)
- Includes all platforms, avatar, and metadata
- See `docs/guides/API_REFERENCE.md` for full specification

**Response Format**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "displayNames": { "primary": "赛博守卫", "translations": {...} },
    "platforms": { "telegram": {...}, "discord": {...}, ... },
    "avatar": { "svg": "...", "style": "bottts", "seed": "..." }
  }
}
```

**NOT available in production** (GitHub Pages is static)

### Avatar Generation

**DiceBear Avatars** (most styles):
- Punk, Cute, Professional, Geek, Minimal, Anime styles
- Generated using DiceBear library
- Styles: bottts, funEmoji, identicon, botttsNeutral, lorelei

**ACGN Style (二次元) ⚠️**:
- Uses **waifu.pics API** for real anime illustrations
- Implementation: `src/core/avatar/anime-api-loader.ts`
- Dev and production: Direct API calls to `https://api.waifu.pics` (no proxy)
- Features: caching, preloading, automatic fallback
- Fallback: `public/avatars/anime/fallback.svg` when all APIs fail
- DO NOT break this integration - it's a key differentiator
- See `docs/features/ANIME_AVATAR_IMPLEMENTATION.md`

### Platform ID Generation

`src/core/generator/BotIdGenerator.ts` generates platform-specific usernames:

- Validates against platform rules (length, allowed chars)
- Converts Chinese names to pinyin
- Handles platform-specific constraints (e.g., Telegram's 5-32 chars, a-z0-9_)

Platform configs in `src/data/platforms/`.

## Important Constraints

### Name Generation Requirements ⚠️ CRITICAL

**Chinese Names (zh)**:
- **Length**: 2-4 characters (两到四个字)
- **Ideal**: 2-3 characters
- **Reduplication**: Use for cute/anime styles (喵喵, 团团, 软软)
- **Avoid**: 
  - Long phrases with "的" (可爱的小猫)
  - Role suffixes creating 5+ char names
  - Names longer than 4 characters

**Examples**:
- ✅ Good: 喵喵, 团团, 小兔 (2 chars), 算法君 (3 chars), 二次元娘 (4 chars)
- ❌ Bad: 可爱的小猫助手 (7 chars - TOO LONG)

**English Names (en)**:
- Length: 4-12 characters
- Easy to pronounce and remember

### Rules System
- Rule ID must match pattern: `{style}-{language}-{variant}` (lowercase, hyphens only)
- **Template algorithm**: BOTH `templates` and `vocabulary` must use WeightedItem format `{ value, weight }`
  - ❌ Wrong: `"templates": ["{name}"]`
  - ✅ Correct: `"templates": [{ "value": "{name}", "weight": 10 }]`
- **Combination algorithm**: `prefixes`, `roots`, `suffixes` must use WeightedItem format
- Minimum 5 items recommended for each array (enforced as warning)
- **All Chinese rules must generate 2-3 character names** (see Name Generation Requirements above)
- **ALWAYS check TypeScript types** (`src/types/rule.ts`) before creating/modifying rules

### Build System
- `rules-bundle.json` is built at compile time and must be in both:
  - `src/data/rules-bundle.json` (imported by React app)
  - `public/data/rules-bundle.json` (for static API)
- Vite base path is `/pick-bot-name/` (GitHub Pages deployment path)
- Node.js 22+ required (specified in package.json engines)

### GitHub Actions
Three workflows validate rules on push/PR:
1. `validate-rules.yml` - Schema validation
2. `rule-validation.yml` - Duplicate ID checks + build test
3. `deploy.yml` - Build and deploy to GitHub Pages

## Common Workflows

### Adding a New Rule

1. Create file in `rules/built-in/` or `rules/custom/`:
   ```json
   {
     "id": "style-language-variant",
     "name": { "en": "...", "zh": "..." },
     "style": "punk",
     "languages": ["en"],
     "algorithm": "combination",
     "data": {
       "prefixes": [{ "value": "Cyber", "weight": 10 }],
       "roots": [{ "value": "Bot", "weight": 10 }],
       "suffixes": [{ "value": "3000", "weight": 8 }]
     },
     "author": { "name": "...", "github": "..." }
   }
   ```

2. **For Chinese rules**: Verify examples are 2-3 characters
   - Bad: "可爱的小猫助手" (7 chars)
   - Good: "喵喵", "小兔", "团团" (2 chars)

3. Validate: `npm run validate-rules`
4. Build bundle: `npm run build-rules`
5. Copy to public: `cp src/data/rules-bundle.json public/data/`
6. Test in dev: `npm run dev`
7. Commit all three files: rule file + both bundle copies

### Debugging Generation Issues

1. Check browser console for errors
2. Verify rule exists: `RuleLoader.getInstance().getRulesByStyleAndLanguage(style, lang)`
3. Test algorithm directly: `NameGenerator.generateFromRule(rule)`
4. For template errors, ensure vocabulary keys match template placeholders
5. For combination errors, check that arrays have weighted items

### Fixing Build Failures

- **Schema validation errors**: Fix rule structure to match `rules/_schema.json`
- **Duplicate ID errors**: Ensure each rule has unique ID
- **TypeScript errors**: Run `npm run type-check` locally first
- **Bundle size warnings**: Check `stats.html` after build (visualizer plugin)

## Type System

Core types in `src/types/`:
- `generator.ts`: BotStyle enum, GenerationAlgorithm enum, Rule interface
- `platform.ts`: Platform configs and validation rules
- `avatar.ts`: Avatar generation types

The `Rule` interface is the single source of truth - it matches `_schema.json`.

## State Management

Zustand stores in `src/store/`:
- `generatorStore.ts`: Generation state (current style, language, history)
- `platformStore.ts`: Platform selection state
- `settingsStore.ts`: App settings (theme, locale)

All stores are lightweight and use immer for immutability.

## Critical Design Requirements

Before making changes, review these key constraints:

1. **Name Length** (`memory/feedback_name_length.md`)
   - Chinese: 2-3 characters, use reduplication
   - Avoid long phrases like "可爱的小猫助手"

2. **API Design** (`memory/feedback_api_design.md`)
   - Endpoint: `/api/pick-bot-name` (Vite plugin)
   - Returns full `GeneratedBotInfo`, not minimal response
   - See `docs/guides/API_REFERENCE.md`

3. **Anime Avatars** (`memory/project_anime_avatar.md`)
   - ACGN uses waifu.pics API for real anime illustrations
   - Implementation: `src/core/avatar/anime-api-loader.ts`
   - Dev and production both directly call external API (no proxy)
   - Don't break this integration

For detailed context, see memory files in `.claude/projects/.../memory/`
