/**
 * 平台图标组件 - 使用本地图标数据
 */

import React from 'react';
import DOMPurify from 'dompurify';
import { PlatformId } from '@/types';
import { PLATFORM_ICONS } from '@/data/icons';

export interface PlatformIconProps {
  platform: PlatformId;
  size?: number;
  className?: string;
}

// 平台ID到图标名称的映射
const ICON_MAPPING: Record<PlatformId, string> = {
  telegram: 'telegram',
  discord: 'discord',
  slack: 'slack',
  feishu: 'feishu',
  dingtalk: 'dingtalk',
  wecom: 'wecom',
  weixin: 'wechat',
  qq: 'qq',
  qqbot: 'qq',
  line: 'line',
  generic: 'robot',
};

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  size = 24,
  className = '',
}) => {
  const iconName = ICON_MAPPING[platform];
  const iconData = PLATFORM_ICONS[iconName] || PLATFORM_ICONS['robot'];

  // 给SVG添加fill样式
  const svgWithColor = iconData.svg.replace('<svg', `<svg fill="${iconData.color}"`);

  // 使用DOMPurify清理SVG内容，防止XSS攻击
  const sanitizedSvg = DOMPurify.sanitize(svgWithColor, {
    USE_PROFILES: { svg: true, svgFilters: true },
  });

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, color: iconData.color }}
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    />
  );
};
