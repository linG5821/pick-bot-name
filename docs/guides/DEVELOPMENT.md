# 🛠️ Development Guide

Complete guide for developers contributing to Bot Name Generator.

English | [简体中文](DEVELOPMENT_zh.md)

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: 2.x or higher
- **Editor**: VSCode recommended (see `.vscode/extensions.json`)

## 🚀 Getting Started

### Initial Setup

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

The app will open at `http://localhost:3000`.

### Project Structure

```
pick-bot-name/
├── .github/              # GitHub templates and workflows
├── .vscode/              # VSCode settings
├── docs/                 # Documentation
├── rules/                # Generation rules
│   ├── built-in/        # Core rules
│   └── custom/          # Community rules
├── scripts/             # Build and validation scripts
├── src/
│   ├── components/      # React components
│   ├── core/           # Business logic
│   ├── data/           # Static data
│   ├── store/          # State management
│   ├── test/           # Test utilities
│   └── types/          # TypeScript types
└── dist/               # Build output

## 📦 Available Scripts

### Development

```bash
npm run dev              # Start dev server (port 3000)
npm run build           # Build for production
npm run preview         # Preview production build
npm run type-check      # TypeScript type checking
```

### Testing

```bash
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:ui         # Open test UI
npm run test:coverage   # Generate coverage report
```

### Rules

```bash
npm run validate-rules  # Validate all rules
npm run build-rules     # Build rules bundle
```

### Code Quality

```bash
npm run lint            # Run ESLint
npx prettier --write .  # Format all files
```

## 🧪 Testing

### Running Tests

```bash
# Watch mode (recommended for development)
npm run test

# Run once (for CI)
npm run test:run

# With UI (great for debugging)
npm run test:ui

# With coverage
npm run test:coverage
```

### Writing Tests

#### Unit Tests

Create test files next to the code being tested:

```
src/core/generator/
├── BotIdGenerator.ts
└── __tests__/
    └── BotIdGenerator.test.ts
```

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { BotIdGenerator } from '../BotIdGenerator';

describe('BotIdGenerator', () => {
  it('should generate valid IDs', () => {
    const id = BotIdGenerator.generate({
      displayName: 'TestBot',
      platform: 'generic',
    });
    
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });
});
```

#### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Test Coverage

Aim for:
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

## 🎨 Code Style

### TypeScript

- Use strict mode
- Prefer `interface` over `type` for objects
- Use explicit return types for public functions
- Avoid `any`, use `unknown` if needed

```typescript
// Good
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null {
  // ...
}

// Avoid
function getUser(id) {
  // ...
}
```

### React

- Use functional components with hooks
- Destructure props
- Use proper TypeScript types
- Extract complex logic to custom hooks

```typescript
// Good
export const MyComponent: React.FC<Props> = ({ name, onSubmit }) => {
  const [state, setState] = useState<string>('');
  // ...
};

// Avoid
export function MyComponent(props) {
  // ...
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Create custom classes sparingly
- Follow mobile-first approach
- Use semantic color names from theme

```tsx
// Good
<button className="px-4 py-2 bg-cyber-cyan text-black hover:shadow-lg">
  Click me
</button>

// Use custom classes only when necessary
<div className="neon-text">Styled Text</div>
```

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Target: ES2020
- JSX: react-jsx

### Vite (`vite.config.ts`)

- React plugin
- Path aliases
- Code splitting
- Dev server on port 3000

### Vitest (`vitest.config.ts`)

- jsdom environment
- Setup file for test utilities
- Coverage with v8

### Prettier (`.prettierrc`)

- Single quotes
- 2 spaces
- 100 line width
- Trailing commas

## 🐛 Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Set breakpoints
4. Inspect state in React DevTools

### VSCode Debugging

Launch configuration in `.vscode/launch.json`:

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Debug in Chrome",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/src"
}
```

### Test Debugging

```bash
# Run tests in debug mode
npm run test -- --inspect-brk

# Use test.only to focus on one test
it.only('should work', () => {
  // ...
});
```

## 🔍 Performance

### Build Optimization

- Code splitting by vendor
- Tree shaking enabled
- Minification in production
- Lazy loading for routes (if applicable)

### Runtime Optimization

- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Debounce user input
- Optimize images

```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});

// Debounce input
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);
```

## 📝 Git Workflow

### Branch Naming

```
feature/add-new-algorithm
fix/validation-bug
docs/update-readme
rule/fantasy-german
```

### Commit Messages

Follow conventional commits:

```
feat: add German language support
fix: resolve ID generation for LINE
docs: update installation steps
test: add BotIdGenerator tests
style: format code with prettier
refactor: extract validation logic
chore: update dependencies
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Write/update tests
4. Run `npm run test:run`
5. Run `npm run build`
6. Commit with conventional format
7. Push and create PR
8. Fill out PR template
9. Wait for review
10. Address feedback
11. Merge!

## 🌐 Internationalization

### Adding Translations

1. Update `src/data/locales/en.json`
2. Update `src/data/locales/zh.json`
3. Update `src/data/locales/ja.json`

```json
{
  "newFeature": {
    "title": "Feature Title",
    "description": "Feature Description"
  }
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

return <h1>{t('newFeature.title')}</h1>;
```

## 🚨 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Tests Fail

```bash
# Update snapshots
npm run test -- -u

# Run specific test file
npm run test BotIdGenerator
```

### Type Errors

```bash
# Check types
npm run type-check

# Restart TypeScript server in VSCode
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## 💡 Tips

1. **Use TypeScript strict mode** - Catch errors early
2. **Write tests first** - TDD helps design better APIs
3. **Keep components small** - Easier to test and maintain
4. **Use the type system** - Let TypeScript help you
5. **Read existing code** - Learn from patterns already in use
6. **Ask questions** - Open issues or discussions

---

Happy coding! 🎉
