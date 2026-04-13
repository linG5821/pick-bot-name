# 🚀 Quick Reference

快速参考指南 - 项目核心信息

## 📏 名字生成规则

### 中文名字（最重要）
```
✅ 2-4个字（两到四个字）
✅ 理想：2-3个字
✅ 使用叠词：喵喵、团团、软软
❌ 避免超过4个字
❌ 避免"的"字结构（可爱的小猫）
```

**示例**：
- ✅ 喵喵, 团团, 小兔 (2字), 算法君 (3字), 二次元娘 (4字)
- ❌ 可爱的小猫助手, 聪明的兔子管家 (7字，太长)

### 英文名字
```
✅ 4-12个字符
✅ 易于发音和记忆
```

## 🔌 API端点

### 统一端点（开发和生产）
```
GET /api/pick-bot-name?style=punk&language=zh
```

**开发环境**：Vite插件，返回纯JSON  
**生产环境**：静态HTML，body内容为JSON  
**注意**：GitHub Pages返回Content-Type: text/html，需用 `response.text()` 解析

**返回结构**：
```json
{
  "success": true,
  "data": {
    "displayNames": { "primary": "名字" },
    "platforms": { "telegram": {...}, "discord": {...} },
    "avatar": { "svg": "...", "style": "...", "seed": "..." }
  }
}
```

**不是**：
- ❌ 静态HTML文件
- ❌ `/api/generate` 端点
- ❌ 简化的 `{ names: [...] }` 结构

## 🌸 动漫头像

### ACGN风格使用真实API
```typescript
// 使用 waifu.pics API
// 代理路径：/api/waifu/* 和 /proxy/waifu-img/*
// 实现：src/core/avatar/anime-api-loader.ts
```

**特性**：
- ✅ 真实的anime插画（高质量）
- ✅ 智能缓存（每个seed对应唯一头像）
- ✅ 预加载机制（启动时加载5张）
- ✅ 自动降级（多个API备份）

## 📝 规则文件

### 目录结构
```
rules/
├── built-in/     # 14个核心规则（7风格 × 2语言）
└── custom/       # 社区贡献规则
```

### 风格列表
```
punk, cute, professional, geek, minimal, anime, acgn
```

### 修改规则后必须执行
```bash
npm run validate-rules  # 验证
npm run build-rules     # 构建
cp src/data/rules-bundle.json public/data/  # 复制
```

## 🔧 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build           # 构建生产版本
npm run preview         # 预览生产构建

# 规则系统
npm run build-rules     # 构建规则bundle
npm run validate-rules  # 验证规则文件

# 测试
npm run test            # 运行测试
npm run lint            # 代码检查
```

## 📚 完整文档

- [API Reference](guides/API_REFERENCE.md) - 完整API文档
- [Rule Guide](guides/RULE_GUIDE.md) - 规则创建指南
- [Development Guide](guides/DEVELOPMENT.md) - 开发指南
- [Anime Avatar Implementation](features/ANIME_AVATAR_IMPLEMENTATION.md) - 动漫头像实现
- [Architecture](architecture/ARCHITECTURE.md) - 系统架构

---

**最后更新**：2026-04-13  
**维护**：Bot Name Generator Team
