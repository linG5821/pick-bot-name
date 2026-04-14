# 🛠️ 开发指南

为 Bot Name Generator 贡献的开发者完整指南。

[English](DEVELOPMENT.md) | 简体中文

---

## 📋 前置要求

- **Node.js**: 18.x 或更高
- **npm**: 9.x 或更高
- **Git**: 2.x 或更高
- **编辑器**: 推荐 VSCode（参见 `.vscode/extensions.json`）

## 🚀 开始

### 初始设置

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

应用将在 `http://localhost:3000` 打开。

### 项目结构

```
pick-bot-name/
├── .github/              # GitHub 模板和工作流
├── .vscode/              # VSCode 设置
├── docs/                 # 文档
├── rules/                # 生成规则
│   ├── built-in/        # 核心规则
│   └── custom/          # 社区规则
├── scripts/             # 构建和验证脚本
├── src/
│   ├── components/      # React 组件
│   ├── core/           # 业务逻辑
│   ├── data/           # 静态数据
│   ├── store/          # 状态管理
│   ├── test/           # 测试工具
│   └── types/          # TypeScript 类型
└── dist/               # 构建输出
```

## 📦 可用脚本

### 开发

```bash
npm run dev              # 启动开发服务器（端口 3000）
npm run build           # 构建生产版本
npm run preview         # 预览生产构建
npm run type-check      # TypeScript 类型检查
```

### 测试

```bash
npm run test            # 在监视模式下运行测试
npm run test:run        # 运行一次测试
npm run test:ui         # 打开测试 UI
npm run test:coverage   # 生成覆盖率报告
```

### 规则

```bash
npm run validate-rules  # 验证所有规则
npm run build-rules     # 构建规则包
```

### 代码质量

```bash
npm run lint            # 运行 ESLint
npx prettier --write .  # 格式化所有文件
```

## 🧪 测试

### 运行测试

```bash
# 监视模式（推荐用于开发）
npm run test

# 运行一次（用于 CI）
npm run test:run

# 带 UI（非常适合调试）
npm run test:ui

# 带覆盖率
npm run test:coverage
```

### 编写测试

#### 单元测试

在被测试代码旁边创建测试文件：

```
src/core/generator/
├── BotIdGenerator.ts
└── __tests__/
    └── BotIdGenerator.test.ts
```

测试示例：

```typescript
import { describe, it, expect } from 'vitest';
import { BotIdGenerator } from '../BotIdGenerator';

describe('BotIdGenerator', () => {
  it('应该生成有效的 ID', () => {
    const id = BotIdGenerator.generate({
      displayName: 'TestBot',
      platform: 'generic',
    });
    
    expect(id).toBeTruthy();
    expect(typeof id).toBe('string');
  });
});
```

#### 组件测试

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('应该正确渲染', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 测试覆盖率

目标：
- **语句**: >80%
- **分支**: >75%
- **函数**: >80%
- **行**: >80%

## 🎨 代码风格

### TypeScript

- 使用严格模式
- 对象优先使用 `interface` 而不是 `type`
- 为公共函数使用显式返回类型
- 避免 `any`，如需要使用 `unknown`

```typescript
// 好的
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null {
  // ...
}

// 避免
function getUser(id) {
  // ...
}
```

### React

- 使用带 hooks 的函数式组件
- 解构 props
- 使用正确的 TypeScript 类型
- 将复杂逻辑提取到自定义 hooks

```typescript
// 好的
export const MyComponent: React.FC<Props> = ({ name, onSubmit }) => {
  const [state, setState] = useState<string>('');
  // ...
};

// 避免
export function MyComponent(props) {
  // ...
}
```

### CSS/Tailwind

- 使用 Tailwind 实用类
- 谨慎创建自定义类
- 遵循移动优先方法
- 使用主题中的语义化颜色名称

```tsx
// 好的
<button className="px-4 py-2 bg-cyber-cyan text-black hover:shadow-lg">
  点击我
</button>

// 仅在必要时使用自定义类
<div className="neon-text">样式文本</div>
```

## 🔧 配置文件

### TypeScript (`tsconfig.json`)

- 启用严格模式
- 路径别名：`@/*` → `./src/*`
- 目标：ES2020
- JSX：react-jsx

### Vite (`vite.config.ts`)

- React 插件
- 路径别名
- 代码分割
- 开发服务器端口 3000

### Vitest (`vitest.config.ts`)

- jsdom 环境
- 测试工具设置文件
- 使用 v8 的覆盖率

### Prettier (`.prettierrc`)

- 单引号
- 2 个空格
- 100 行宽
- 尾随逗号

## 🐛 调试

### 浏览器 DevTools

1. 打开 Chrome DevTools (F12)
2. 转到 Sources 标签
3. 设置断点
4. 在 React DevTools 中检查状态

### VSCode 调试

在 `.vscode/launch.json` 中的启动配置：

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "在 Chrome 中调试",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/src"
}
```

### 测试调试

```bash
# 在调试模式下运行测试
npm run test -- --inspect-brk

# 使用 test.only 专注于一个测试
it.only('应该工作', () => {
  // ...
});
```

## 🔍 性能

### 构建优化

- 按供应商进行代码分割
- 启用 tree shaking
- 生产环境压缩
- 路由懒加载（如适用）

### 运行时优化

- 为昂贵的组件使用 React.memo
- 为长列表实现虚拟滚动
- 对用户输入进行防抖
- 优化图片

```typescript
// 记忆化昂贵的组件
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* ... */}</div>;
});

// 防抖输入
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);
```

## 📝 Git 工作流

### 分支命名

```
feature/add-new-algorithm
fix/validation-bug
docs/update-readme
rule/fantasy-german
```

### 提交信息

遵循约定式提交：

```
feat: add German language support
fix: resolve ID generation for LINE
docs: update installation steps
test: add BotIdGenerator tests
style: format code with prettier
refactor: extract validation logic
chore: update dependencies
```

### Pull Request 流程

1. 创建功能分支
2. 进行更改
3. 编写/更新测试
4. 运行 `npm run test:run`
5. 运行 `npm run build`
6. 使用约定式格式提交
7. 推送并创建 PR
8. 填写 PR 模板
9. 等待审查
10. 处理反馈
11. 合并！

## 🌐 国际化

### 添加翻译

1. 更新 `src/data/locales/en.json`
2. 更新 `src/data/locales/zh.json`
3. 更新 `src/data/locales/ja.json`

```json
{
  "newFeature": {
    "title": "功能标题",
    "description": "功能描述"
  }
}
```

### 使用翻译

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

return <h1>{t('newFeature.title')}</h1>;
```

## 🚨 故障排除

### 构建失败

```bash
# 清除缓存并重新安装
rm -rf node_modules dist
npm install
npm run build
```

### 测试失败

```bash
# 更新快照
npm run test -- -u

# 运行特定测试文件
npm run test BotIdGenerator
```

### 类型错误

```bash
# 检查类型
npm run type-check

# 在 VSCode 中重启 TypeScript 服务器
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## 📚 其他资源

- [React 文档](https://react.dev)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Vitest 指南](https://vitest.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## 💡 提示

1. **使用 TypeScript 严格模式** - 尽早捕获错误
2. **先编写测试** - TDD 有助于设计更好的 API
3. **保持组件小** - 更容易测试和维护
4. **使用类型系统** - 让 TypeScript 帮助你
5. **阅读现有代码** - 从已使用的模式中学习
6. **提出问题** - 打开 issues 或讨论

---

编码愉快！🎉
