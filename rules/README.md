# 📚 规则贡献指南

欢迎贡献新的机器人名称生成规则！

## 🎯 规则文件要求

每个规则文件必须包含：

1. **id**（必需）：格式 `{style}-{language}-{variant}`
   - 示例：`cyberpunk-zh-basic`、`cute-en-animals`

2. **style**（必需）：风格标识
   - 必须是已定义的风格：cyberpunk, cute, professional, geek, fantasy, minimal, steampunk, anime, military, nature

3. **languages**（必需）：支持的语言列表
   - 至少支持一种：zh, en, ja
   - 示例：`["zh", "en"]`

4. **algorithm**（必需）：生成算法
   - 可选：combination, template, markov, syllable

5. **data**（必需）：生成数据
   - 根据算法不同而不同

6. **author**（必需）：作者信息
   ```json
   {
     "name": "Your Name",
     "github": "your-github-username"
   }
   ```

## 📝 规则文件模板

请参考 `_TEMPLATE.json` 文件。

## 🚀 提交流程

1. Fork 本项目
2. 在 `rules/community/` 目录创建你的规则文件
3. 确保文件符合 `_schema.json` 定义
4. 提交 Pull Request
5. 等待自动验证和审核

## ✅ 验证

PR 提交后会自动运行验证：
- JSON Schema 验证
- 规则ID格式检查
- ID冲突检测
- 风格存在性验证

## 💡 示例

查看 `built-in/` 目录下的内置规则作为参考。

---

感谢你的贡献！🎉
