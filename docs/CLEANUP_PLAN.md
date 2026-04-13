# 文档整理计划

## 当前状态
- 总文档数：37个
- 总大小：572K
- 问题：大量重复的总结文档、过时的修复记录

## 整理方案

### 📌 保留（核心文档）

#### guides/ - 用户和开发者指南
- ✅ **API_REFERENCE.md** - API参考文档（需更新）
- ✅ **RULE_GUIDE.md** - 规则创建指南（需更新：添加名字长度要求）
- ✅ **CONTRIBUTING.md** - 贡献指南
- ✅ **DEVELOPMENT.md** - 开发指南
- ✅ **COMMUNITY_GUIDE.md** - 社区指南

#### architecture/ - 架构设计
- ✅ **ARCHITECTURE.md** - 系统架构文档
- ✅ **FINAL_PRD.md** - 产品需求文档（需检查并更新）
- ❌ **PROJECT_PLAN.md** - 删除（过时的计划）

#### features/ - 功能文档
- ✅ **ANIME_AVATAR_IMPLEMENTATION.md** - 动漫头像实现（重要）
- ✅ **AVATAR_FEATURE.md** - 头像功能概述
- ✅ **AVATAR_STYLES.md** - 头像风格说明

#### 根目录
- ✅ **README.md** - 文档导航

### 🗑️ 删除（过时内容）

#### development/ - 全部删除
- ❌ FINAL_IMPLEMENTATION_PLAN.md
- ❌ FINAL_TEST_CHECKLIST.md
- ❌ ISSUES_FOUND.md
- ❌ REVIEW.md
- ❌ RULES_VERIFICATION.md

#### fixes/ - 全部删除
- ❌ CORS_FIX.md
- ❌ CREATION_STEPS_FIX.md
- ❌ FIXES_COMPLETED.md
- ❌ FIXES_SUMMARY.md
- ❌ ICON_FIX.md
- ❌ P0_FIXES.md

#### optimization/ - 全部删除
- ❌ FINAL_ISSUES_AND_OPTIMIZATIONS.md
- ❌ OPTIMIZATION_SUMMARY.md
- ❌ RATE_LIMITING.md
- ❌ RATE_LIMIT_SUMMARY.md
- ❌ RATE_LIMIT_TEST.md
- ❌ UPGRADE_GUIDE.md
- ❌ UPGRADE_SUMMARY.md

#### reports/ - 全部删除
- ❌ PROJECT_COMPLETION_REPORT.md
- ❌ PROJECT_SUMMARY.md
- ❌ STAGE6_SUMMARY.md
- ❌ STYLE_REDESIGN_SUMMARY.md
- ❌ TRANSLATION_FIX_SUMMARY.md
- ❌ UPDATES_SUMMARY.md

#### guides/ - 删除过时总结
- ❌ STAGE7_SUMMARY.md

### 📝 更新内容

#### 1. RULE_GUIDE.md
**添加关键要求**：
```markdown
## 名字长度要求

### 中文名字
- **理想长度**：2-3个汉字
- **推荐使用叠词**：喵喵、团团、小兔
- **避免过长名字**：超过4个字的名字不易记忆

### 英文名字
- **理想长度**：4-12个字符
- **易于发音和记忆**

### 示例对比

❌ 不推荐：
- "可爱的小猫助手" （7个字，太长）
- "聪明的兔子管家" （7个字，太长）

✅ 推荐：
- "喵喵" （2个字，叠词）
- "小兔" （2个字）
- "团团" （2个字，叠词）
- "软软" （2个字，叠词）
```

#### 2. API_REFERENCE.md
**更正API示例**：
- 端点：`/api/pick-bot-name` （不是 `/api/generate`）
- 返回完整的GeneratedBotInfo结构
- Vite插件实现，不是静态HTML

#### 3. ARCHITECTURE.md
**补充名字生成约束**：
```markdown
## 名字生成约束

### 长度限制
- 中文：2-3个汉字（最多4个字）
- 英文：4-12个字符
- 日文：2-4个字符

### 风格建议
- cute风格：建议使用叠词（喵喵、软软）
- anime/acgn风格：可使用"酱"、"君"等后缀
- professional风格：避免过于可爱的叠词
```

## 执行步骤

1. 删除development、fixes、optimization、reports文件夹
2. 删除guides/STAGE7_SUMMARY.md
3. 删除architecture/PROJECT_PLAN.md
4. 更新RULE_GUIDE.md添加名字长度要求
5. 检查并更新API_REFERENCE.md
6. 检查并更新ARCHITECTURE.md
7. 更新README.md的文档列表

## 预期结果

- 文档数量：37 → 13个（减少65%）
- 保留核心价值文档
- 删除过时的修复记录和总结
- 补充缺失的关键设计要求
