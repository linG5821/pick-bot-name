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

### Static API Endpoint

A client-side JSON API at `public/api/generate/index.html`:

```
GET /pick-bot-name/api/generate?style=punk&language=zh&count=5
```

- Loads `public/data/rules-bundle.json` via relative path
- Executes generation logic in browser
- Returns JSON with generated names

This works on GitHub Pages without server-side processing.

### Platform ID Generation

`src/core/generator/BotIdGenerator.ts` generates platform-specific usernames:

- Validates against platform rules (length, allowed chars)
- Converts Chinese names to pinyin
- Handles platform-specific constraints (e.g., Telegram's 5-32 chars, a-z0-9_)

Platform configs in `src/data/platforms/`.

## Important Constraints

### Rules System
- Rule ID must match pattern: `{style}-{language}-{variant}` (lowercase, hyphens only)
- Template algorithm requires `vocabulary` object with weighted items
- Combination algorithm requires `prefixes`, `roots`, `suffixes` arrays with weights
- Minimum 5 items recommended for each array (enforced as warning)

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

2. Validate: `npm run validate-rules`
3. Build bundle: `npm run build-rules`
4. Copy to public: `cp src/data/rules-bundle.json public/data/`
5. Test in dev: `npm run dev`
6. Commit all three files: rule file + both bundle copies

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
