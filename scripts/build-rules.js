#!/usr/bin/env node

/**
 * 规则聚合脚本
 * 将 rules/ 目录下的所有规则文件聚合到 src/data/rules-bundle.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesDir = path.join(__dirname, '../rules');
const outputPath = path.join(__dirname, '../src/data/rules-bundle.json');

console.log('🔍 Building rules bundle...\n');

// 查找所有规则文件
const ruleFiles = glob.sync('**/*.json', {
  cwd: rulesDir,
  ignore: ['README.md', '_schema.json', '_styles.json', '**/node_modules/**'],
});

console.log(`Found ${ruleFiles.length} rule files:\n`);

const rules = [];
const errors = [];

// 读取并解析每个规则文件
ruleFiles.forEach(file => {
  const filePath = path.join(rulesDir, file);
  console.log(`  📄 ${file}`);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const rule = JSON.parse(content);
    rules.push(rule);
  } catch (error) {
    console.error(`  ❌ Error parsing ${file}:`, error.message);
    errors.push({ file, error: error.message });
  }
});

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} errors found. Please fix them before building.`);
  process.exit(1);
}

// 创建输出目录
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成bundle
const bundle = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  totalRules: rules.length,
  rules: rules,
};

// 写入文件
fs.writeFileSync(outputPath, JSON.stringify(bundle, null, 2));

console.log(`\n✅ Successfully built ${rules.length} rules!`);
console.log(`📦 Output: ${outputPath}\n`);
