/**
 * 平台展示组件 - Tab切换显示不同平台的Bot信息
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { GeneratedBotInfo, PlatformId } from '@/types';
import { platformConfigs } from '@/data/platforms';
import { Tabs, Tab, Card, Button, PlatformIcon } from '@/components/common';
import { useUIStore } from '@/store';

export interface PlatformDisplayProps {
  botInfo: GeneratedBotInfo;
  onCopyName?: (name: string) => void;
  onCopyUsername?: (username: string) => void;
}

export const PlatformDisplay: React.FC<PlatformDisplayProps> = ({
  botInfo,
  onCopyName,
  onCopyUsername,
}) => {
  const { t } = useTranslation();
  const { activePlatform, setActivePlatform } = useUIStore();

  // 创建平台tabs
  const tabs: Tab[] = Object.keys(platformConfigs).map((platformId) => {
    return {
      id: platformId,
      label: t(`platform.${platformId}`),
      icon: <PlatformIcon platform={platformId as PlatformId} size={20} />,
    };
  });

  const currentPlatform = botInfo.platforms[activePlatform];
  const currentConfig = platformConfigs[activePlatform];

  if (!currentPlatform) {
    return null;
  }

  const handleCopyName = () => {
    if (onCopyName) {
      onCopyName(currentPlatform.displayName);
    } else {
      navigator.clipboard.writeText(currentPlatform.displayName);
    }
  };

  const handleCopyUsername = () => {
    if (currentPlatform.username) {
      if (onCopyUsername) {
        onCopyUsername(currentPlatform.username);
      } else {
        navigator.clipboard.writeText(currentPlatform.username);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 平台选择Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activePlatform}
        onChange={(tabId) => setActivePlatform(tabId as PlatformId)}
      />

      {/* 平台信息卡片 */}
      <Card glow>
        <div className="space-y-6">
          {/* 平台头部 */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <PlatformIcon platform={activePlatform} size={32} className="text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t(`platform.${activePlatform}`)}
              </h3>
            </div>
          </div>

          {/* 显示名称 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('platformGuide.displayName')}
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-xl font-bold text-gray-900 dark:text-white">
                {currentPlatform.displayName}
              </div>
              <Button
                variant="secondary"
                onClick={handleCopyName}
                icon="📋"
              >
                {t('common.copy')}
              </Button>
            </div>
          </div>

          {/* 机器人ID（如果平台需要） */}
          {currentPlatform.needsUsername && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('platformGuide.botId')}
              </label>
              {currentPlatform.username ? (
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-lg font-mono text-gray-900 dark:text-white">
                    {currentPlatform.username}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={handleCopyUsername}
                    icon="📋"
                  >
                    {t('common.copy')}
                  </Button>
                </div>
              ) : (
                <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg text-yellow-800 dark:text-yellow-200">
                  {currentPlatform.metadata.usernameGeneratedBySystem
                    ? '⚠️ ' + (t('platformGuide.systemGenerated') || '系统生成')
                    : '⚠️ ' + (t('platformGuide.needsUsername') || '需要用户名')}
                </div>
              )}
            </div>
          )}

          {/* 验证状态 */}
          {currentPlatform.validationErrors && currentPlatform.validationErrors.length > 0 && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-red-700 dark:text-red-300 font-medium mb-2">⚠️ {t('platformGuide.validationErrors')}:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400">
                {currentPlatform.validationErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 官方链接 */}
          {currentConfig.officialUrl && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(currentConfig.officialUrl, '_blank')}
                icon="🔗"
              >
                {t('platformGuide.officialDocs')}
              </Button>
              {currentConfig.docsUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(currentConfig.docsUrl, '_blank')}
                  icon="📚"
                >
                  API Docs
                </Button>
              )}
            </div>
          )}

          {/* 创建步骤 */}
          {currentConfig.creationSteps && currentConfig.creationSteps.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                📝 {t('platformGuide.creationSteps') || '创建步骤'}
              </h4>
              <div className="space-y-3">
                {currentConfig.creationSteps.map((step) => {
                  const title = typeof step.title === 'string' ? step.title : step.title[t('language') as 'zh' | 'en'] || step.title.zh;
                  const description = typeof step.description === 'string' ? step.description : step.description[t('language') as 'zh' | 'en'] || step.description.zh;

                  return (
                    <div
                      key={step.order}
                      className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {/* 步骤序号 */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-sm">
                        {step.order}
                      </div>

                      {/* 步骤内容 */}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {description}
                        </p>

                        {/* 命令 */}
                        {step.command && (
                          <div className="mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 rounded border border-gray-700 font-mono text-sm text-green-400">
                            {step.command}
                          </div>
                        )}

                        {/* URL链接 */}
                        {step.url && (
                          <a
                            href={step.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>🔗</span>
                            <span>{step.url}</span>
                          </a>
                        )}

                        {/* 步骤类型标签 */}
                        {step.type && (
                          <div className="mt-2">
                            <span className={`
                              inline-flex items-center px-2 py-1 text-xs font-medium rounded
                              ${step.type === 'credential' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                              ${step.type === 'input' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                              ${step.type === 'action' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                              ${step.type === 'navigation' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                              ${step.type === 'command' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' : ''}
                              ${step.type === 'configuration' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                              ${step.type === 'info' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' : ''}
                              ${!['credential', 'input', 'action', 'navigation', 'command', 'configuration', 'info'].includes(step.type) ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' : ''}
                            `}>
                              {step.type === 'credential' && '🔑 凭证'}
                              {step.type === 'input' && '✏️ 输入'}
                              {step.type === 'action' && '👆 操作'}
                              {step.type === 'navigation' && '🧭 导航'}
                              {step.type === 'command' && '💻 命令'}
                              {step.type === 'configuration' && '⚙️ 配置'}
                              {step.type === 'info' && 'ℹ️ 信息'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 所需凭证 */}
          {currentConfig.credentials && currentConfig.credentials.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                🔐 {t('platformGuide.requiredCredentials') || '所需凭证'}
              </h4>
              <div className="space-y-3">
                {currentConfig.credentials.map((cred) => {
                  const name = cred.name
                    ? (typeof cred.name === 'string' ? cred.name : cred.name[t('language') as 'zh' | 'en'] || cred.name.zh)
                    : cred.key;
                  const description = cred.description
                    ? (typeof cred.description === 'string' ? cred.description : cred.description[t('language') as 'zh' | 'en'] || cred.description.zh)
                    : '';

                  return (
                    <div
                      key={cred.key}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {name}
                            </span>
                            {cred.required && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded">
                                {t('common.required') || '必需'}
                              </span>
                            )}
                            {cred.sensitive && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium rounded">
                                🔒 {t('common.sensitive') || '敏感'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {description}
                          </p>
                          {cred.example && (
                            <div className="mt-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-xs text-gray-700 dark:text-gray-300">
                              {t('common.example') || '示例'}: {cred.example}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
