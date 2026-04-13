#!/usr/bin/env node

/**
 * 规则验证脚本
 * 验证rules/目录下的所有规则文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesDir = path.join(__dirname, '../rules');
const schemaPath = path.join(rulesDir, '_schema.json');
const stylesPath = path.join(rulesDir, '_styles.json');

console.log('🔍 Validating rule files...\n');

// 加载Schema
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// 加载风格定义
const stylesData = JSON.parse(fs.readFileSync(stylesPath, 'utf-8'));
const validStyles = new Set(stylesData.styles.map(s => s.id));

// 初始化验证器（禁用格式验证）
const ajv = new Ajv({ validateFormats: false });
const validate = ajv.compile(schema);

// 查找所有规则文件
const ruleFiles = glob.sync('**/*.json', {
  cwd: rulesDir,
  ignore: ['README.md', '_schema.json', '_styles.json', '**/node_modules/**'],
});

const errors = [];
const warnings = [];
const ruleIds = new Map();
let validCount = 0;

// 验证每个规则文件
ruleFiles.forEach(file => {
  const filePath = path.join(rulesDir, file);
  console.log(`📄 Validating: ${file}`);

  let rule;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    rule = JSON.parse(content);
  } catch (e) {
    errors.push({ file, error: `Invalid JSON: ${e.message}` });
    return;
  }

  // JSON Schema验证
  if (!validate(rule)) {
    errors.push({
      file,
      error: `Schema validation failed: ${ajv.errorsText(validate.errors)}`,
    });
    return;
  }

  // 验证风格
  if (!validStyles.has(rule.style)) {
    errors.push({
      file,
      error: `Invalid style "${rule.style}". Valid styles: ${Array.from(validStyles).join(', ')}`,
    });
    return;
  }

  // 验证规则ID格式
  const idPattern = /^[a-z0-9-]+$/;
  if (!idPattern.test(rule.id)) {
    errors.push({
      file,
      error: `Rule ID must only contain lowercase letters, numbers, and hyphens: ${rule.id}`,
    });
    return;
  }

  // 必须以风格开头
  if (!rule.id.startsWith(rule.style + '-')) {
    errors.push({
      file,
      error: `Rule ID must start with style name "${rule.style}-": ${rule.id}`,
    });
    return;
  }

  // 检查ID冲突
  if (ruleIds.has(rule.id)) {
    errors.push({
      file,
      error: `Duplicate rule ID "${rule.id}" found in:\n    ${ruleIds.get(rule.id)}\n    ${file}`,
    });
    return;
  }

  ruleIds.set(rule.id, file);
  validCount++;

  // 数据质量警告
  if (rule.algorithm === 'combination') {
    const minItems = 5;
    const data = rule.data;

    if (data.prefixes && data.prefixes.length < minItems) {
      warnings.push({
        file,
        warning: `Only ${data.prefixes.length} prefixes, recommend at least ${minItems}`,
      });
    }
    if (data.roots && data.roots.length < minItems) {
      warnings.push({
        file,
        warning: `Only ${data.roots.length} roots, recommend at least ${minItems}`,
      });
    }
    if (data.suffixes && data.suffixes.length < minItems) {
      warnings.push({
        file,
        warning: `Only ${data.suffixes.length} suffixes, recommend at least ${minItems}`,
      });
    }
  }
});

// 输出结果
console.log(`\n📊 Validation Results:\n`);
console.log(`  Total files:  ${ruleFiles.length}`);
console.log(`  Valid rules:  ${validCount}`);
console.log(`  Errors:       ${errors.length}`);
console.log(`  Warnings:     ${warnings.length}\n`);

// 输出错误
if (errors.length > 0) {
  console.log('❌ Errors:\n');
  errors.forEach(({ file, error }) => {
    console.log(`  ${file}:`);
    console.log(`    ${error}\n`);
  });
}

// 输出警告
if (warnings.length > 0) {
  console.log('⚠️  Warnings:\n');
  warnings.forEach(({ file, warning }) => {
    console.log(`  ${file}:`);
    console.log(`    ${warning}\n`);
  });
}

// 退出码
if (errors.length > 0) {
  console.log('❌ Validation failed!\n');
  process.exit(1);
} else {
  console.log('✅ All rules are valid!\n');
  process.exit(0);
}
