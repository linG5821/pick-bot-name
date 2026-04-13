/**
 * 平台配置导出
 */

import { PlatformConfig, PlatformId } from '@/types';
import { genericConfig } from './generic';
import { telegramConfig } from './telegram';
import { discordConfig } from './discord';
import { slackConfig } from './slack';
import { feishuConfig } from './feishu';
import { dingtalkConfig } from './dingtalk';
import { wecomConfig } from './wecom';
import { weixinConfig } from './weixin';
import { qqConfig } from './qq';
import { qqbotConfig } from './qqbot';
import { lineConfig } from './line';

/**
 * 所有平台配置
 */
export const platformConfigs: Record<PlatformId, PlatformConfig> = {
  generic: genericConfig,
  telegram: telegramConfig,
  discord: discordConfig,
  slack: slackConfig,
  feishu: feishuConfig,
  dingtalk: dingtalkConfig,
  wecom: wecomConfig,
  weixin: weixinConfig,
  qq: qqConfig,
  qqbot: qqbotConfig,
  line: lineConfig,
};

/**
 * 获取平台配置
 */
export function getPlatformConfig(platformId: PlatformId): PlatformConfig {
  return platformConfigs[platformId];
}

/**
 * 获取所有平台配置列表
 */
export function getAllPlatformConfigs(): PlatformConfig[] {
  return Object.values(platformConfigs);
}

/**
 * 获取按分类排序的平台列表
 */
export function getPlatformsByCategory(): Record<string, PlatformConfig[]> {
  const result: Record<string, PlatformConfig[]> = {};

  for (const config of Object.values(platformConfigs)) {
    const category = config.category || 'generic';
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(config);
  }

  // 按 popularity 排序
  for (const category in result) {
    result[category].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  return result;
}

/**
 * 获取按 popularity 排序的平台列表
 */
export function getPlatformsByPopularity(): PlatformConfig[] {
  return Object.values(platformConfigs).sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );
}
