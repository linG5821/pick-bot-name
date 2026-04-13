# 🔧 项目修复计划

**日期**：2026-04-13  
**问题来源**：用户反馈 - 三个关键设计被忽略

---

## 📊 问题检查结果

### ❌ 问题1：名字长度严重超标

**要求**：中文名字2-4个字（理想2-3字），可使用叠词  
**实际**：7个中文规则文件，6个超长（5-7字）

| 规则文件 | 示例名字 | 字数 | 状态 |
|---------|---------|------|------|
| cute-zh-animals | 可爱的小猫助手 | 7字 | ❌ 严重超长 |
| cute-zh-animals | 聪明的兔子 | 5字 | ❌ 超长 |
| cute-zh-animals | 小熊猫宝宝 | 5字 | ❌ 超长 |
| acgn-zh-basic | 二次元偶像桑 | 6字 | ❌ 超长 |
| acgn-zh-basic | 宅女神大人 | 5字 | ❌ 超长 |
| acgn-zh-basic | 傲娇酱喵 | 4字 | ⚠️ 可接受 |
| anime-zh-basic | 小猫咪酱 | 4字 | ⚠️ 全部4字 |
| anime-zh-basic | 萌兔子喵 | 4字 | ⚠️ 全部4字 |
| geek-zh-basic | 编程助手Plus | 7字 | ❌ 严重超长 |
| geek-zh-basic | 代码大师2.0 | 6字 | ❌ 超长 |
| punk-zh-basic | 赛博机器人3000 | 7字 | ❌ 严重超长 |
| punk-zh-basic | 神经思维终极 | 6字 | ❌ 超长 |
| professional-zh-business | 智能商务顾问 | 6字 | ❌ 超长 |
| professional-zh-business | 专业集团管家 | 6字 | ❌ 超长 |
| minimal-zh-basic | 简助手 | 3字 | ✅ 符合 |
| minimal-zh-basic | 小工具 | 3字 | ✅ 符合 |

**统计**：
- 需要修改：6个文件（85.7%）
- 已符合要求：1个文件（14.3%）

---

### ❌ 问题2：API实现混乱

**要求**：
- 端点：`/api/pick-bot-name`
- Vite插件实现
- 返回完整`GeneratedBotInfo`结构
- 返回纯JSON

**实际检查**：
- ✅ `plugins/apiPlugin.ts`正确实现（端点正确，返回完整结构）
- ❌ `public/api/generate/index.html`存在（错误的静态HTML实现）
- ❌ HTML返回简化JSON：`{ success, data: { style, language, count, names: [...] } }`
- ❌ 端点路径错误：`/api/generate`（应该是`/api/pick-bot-name`）

**问题**：
1. 有两个API实现共存
2. 静态HTML实现是错误的
3. 可能造成混淆

---

### ❌ 问题3：动漫头像未连接

**要求**：
- ACGN风格使用waifu.pics API
- 真实的anime插画
- 代理路径：`/api/waifu/*`和`/proxy/waifu-img/*`

**实际检查**：
- ✅ `src/core/avatar/anime-api-loader.ts`存在并正确实现
- ✅ `vite.config.ts`正确配置代理
- ✅ `AvatarGenerator.ts`为ACGN返回占位符SVG
- ❌ **没有任何组件调用`getAnimeAvatarUrl`**（Grep结果为空）
- ❌ anime-api-loader实现了但未被使用

**根本原因**：
实现了API加载器，但组件层没有集成使用。

---

## 🎯 修复计划

### P0 - 紧急修复（名字长度）

**影响**：所有生成的中文名字都不符合要求  
**工作量**：中等（需要重新设计6个规则文件）

#### 任务清单

1. **修改cute-zh-animals.json**
   - 删除"的"字结构（"可爱的小猫"）
   - 删除角色后缀（"助手"、"管家"）
   - 添加叠词模板：`{animal}{animal}`
   - 目标示例：喵喵、团团、小兔、软软
   
2. **修改acgn-zh-basic.json**
   - 缩短到2-3字
   - 保留"酱"、"君"等后缀（1字）
   - 添加叠词
   - 目标示例：萌酱、宅君、元气喵

3. **修改anime-zh-basic.json**
   - 从4字缩短到2-3字
   - 简化模板
   - 目标示例：樱酱、星喵、梦子

4. **修改geek-zh-basic.json**
   - 删除英文后缀（Pro、Plus、2.0）
   - 缩短到2-3字
   - 目标示例：码神、算法君、技术猫

5. **修改punk-zh-basic.json**
   - 删除数字后缀（3000）和"机器人"
   - 缩短到2-3字
   - 目标示例：赛博X、量子核、神经网

6. **修改professional-zh-business.json**
   - 删除组合词（"智能商务顾问"）
   - 缩短到2-3字
   - 目标示例：商务助手→商助、企业顾问→企顾

**验证标准**：
- ✅ 所有examples中的名字≤3个汉字
- ✅ 至少50%的名字是2个字
- ✅ cute/anime/acgn至少有2个叠词示例

---

### P1 - 高优先级（API清理）

**影响**：API端点混乱，文档与实现不一致  
**工作量**：小（删除错误文件）

#### 任务清单

1. **删除错误的API实现**
   ```bash
   rm -rf public/api/generate/
   ```

2. **确认正确的API工作**
   ```bash
   npm run dev
   # 测试: curl "http://localhost:3000/api/pick-bot-name?style=punk&language=zh"
   ```

3. **验证返回结构**
   - ✅ 包含`displayNames`
   - ✅ 包含`platforms`（10个平台）
   - ✅ 包含`avatar`
   - ✅ 包含`id`, `timestamp`, `ruleId`, `algorithm`

---

### P2 - 中优先级（动漫头像集成）

**影响**：ACGN风格不够二次元  
**工作量**：中等（需要修改组件）

#### 任务清单

1. **查找AvatarDisplay组件**
   ```bash
   find src -name "*Avatar*.tsx" -type f
   ```

2. **在组件中集成anime-api-loader**
   - 检测ACGN风格的占位符SVG
   - 调用`getAnimeAvatarUrl(seed)`
   - 显示加载状态
   - 替换为真实anime图片

3. **添加预加载逻辑**
   - 在App.tsx启动时调用`preloadAnimeAvatars(5)`

4. **测试流程**
   - 选择ACGN风格
   - 生成名字
   - 应显示loading动画
   - 1-3秒后显示真实anime插画

**参考文档**：
- `docs/features/ANIME_AVATAR_IMPLEMENTATION.md`

---

## 📋 执行顺序

### 第一阶段：P0修复（2-3小时）
1. 逐个修改6个中文规则文件
2. 每修改1个文件后：
   - `npm run validate-rules`
   - `npm run build-rules`
   - `cp src/data/rules-bundle.json public/data/`
   - `npm run dev`测试生成结果
3. 全部完成后提交：
   ```bash
   git add rules/ src/data/rules-bundle.json public/data/rules-bundle.json
   git commit -m "fix: shorten Chinese names to 2-3 chars with reduplication"
   ```

### 第二阶段：P1修复（10分钟）
1. 删除`public/api/generate/`
2. 测试API端点
3. 提交：
   ```bash
   git rm -rf public/api/generate/
   git commit -m "fix: remove incorrect static HTML API implementation"
   ```

### 第三阶段：P2修复（1-2小时）
1. 查找并修改AvatarDisplay组件
2. 集成anime-api-loader
3. 测试ACGN风格
4. 提交：
   ```bash
   git add src/components/Avatar/
   git commit -m "fix: integrate waifu.pics API for ACGN avatar loading"
   ```

---

## ✅ 验收标准

### P0验收
- [ ] 所有7个中文规则的examples都是2-3字
- [ ] 实际生成测试100次，95%以上是2-3字
- [ ] cute/anime/acgn风格有明显的叠词出现

### P1验收
- [ ] `public/api/generate/`不存在
- [ ] `/api/pick-bot-name`正常工作
- [ ] 返回完整的GeneratedBotInfo结构

### P2验收
- [ ] 选择ACGN风格，显示真实anime插画
- [ ] 不同seed显示不同角色
- [ ] 失败时显示fallback占位符

---

## 📝 后续更新

完成修复后：

1. **更新memory**（已完成）
   - feedback_name_length.md
   - feedback_api_design.md  
   - project_anime_avatar.md

2. **更新CLAUDE.md**（已完成）
   - 添加名字长度要求
   - 更正API设计说明
   - 添加动漫头像集成说明

3. **更新文档**（已完成）
   - docs/guides/RULE_GUIDE.md - 添加名字长度章节
   - docs/QUICK_REFERENCE.md - 快速参考

---

**创建时间**：2026-04-13  
**预计完成**：P0+P1（优先）→ P2（后续）  
**负责人**：Claude Code
