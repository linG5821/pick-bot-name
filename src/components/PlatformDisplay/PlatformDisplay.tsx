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
    <div className="space-y-4 w-full overflow-x-hidden">
      {/* 平台选择Tabs - 移动端可横向滚动 */}
      <div className="overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0">
        <Tabs
          tabs={tabs}
          activeTab={activePlatform}
          onChange={(tabId) => setActivePlatform(tabId as PlatformId)}
        />
      </div>

      {/* 平台信息卡片 */}
      <Card glow>
        <div className="space-y-4 md:space-y-6 w-full overflow-x-hidden">
          {/* 平台头部 */}
          <div className="flex items-center gap-2 md:gap-3 border-b border-gray-200 dark:border-gray-700 pb-3 md:pb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <PlatformIcon platform={activePlatform} size={24} className="text-gray-700 dark:text-gray-300 md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">
                {t(`platform.${activePlatform}`)}
              </h3>
            </div>
          </div>

          {/* 机器人名称 */}
          <div className="space-y-2">
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('platformGuide.displayName')}
            </label>
            <div className="flex items-stretch gap-2">
              <div className="flex-1 px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-base md:text-xl font-bold text-gray-900 dark:text-white break-words flex items-center">
                {currentPlatform.displayName}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyName}
                icon="📋"
                className="px-3 md:px-4"
              >
                <span className="hidden sm:inline">{t('common.copy')}</span>
              </Button>
            </div>
          </div>

          {/* 机器人ID（如果平台需要） */}
          {currentPlatform.needsUsername && (
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('platformGuide.botId')}
              </label>
              {currentPlatform.username ? (
                <div className="flex items-stretch gap-2">
                  <div className="flex-1 px-3 py-2.5 md:px-4 md:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm md:text-lg font-mono text-gray-900 dark:text-white break-all flex items-center">
                    {currentPlatform.username}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyUsername}
                    icon="📋"
                    className="px-3 md:px-4"
                  >
                    <span className="hidden sm:inline">{t('common.copy')}</span>
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 md:px-4 md:py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg text-xs md:text-sm text-yellow-800 dark:text-yellow-200">
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
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(currentConfig.officialUrl, '_blank')}
                icon="🔗"
                className="flex-1 sm:flex-initial"
              >
                {t('platformGuide.officialDocs')}
              </Button>
              {currentConfig.docsUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(currentConfig.docsUrl, '_blank')}
                  icon="📚"
                  className="flex-1 sm:flex-initial"
                >
                  API Docs
                </Button>
              )}
            </div>
          )}

          {/* 创建步骤 */}
          {currentConfig.creationSteps && currentConfig.creationSteps.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xl">📝</span>
                <span>{t('platformGuide.creationSteps') || '创建步骤'}</span>
              </h4>
              <div className="space-y-4">
                {currentConfig.creationSteps.map((step) => {
                  const title = typeof step.title === 'string' ? step.title : step.title[t('language') as 'zh' | 'en'] || step.title.zh;
                  const description = typeof step.description === 'string' ? step.description : step.description[t('language') as 'zh' | 'en'] || step.description.zh;

                  return (
                    <div
                      key={step.order}
                      className="relative pl-10 md:pl-12 pb-4 last:pb-0"
                    >
                      {/* 步骤连接线 */}
                      {step.order < currentConfig.creationSteps.length && (
                        <div className="absolute left-4 md:left-5 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                      )}

                      {/* 步骤序号 */}
                      <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-sm md:text-base shadow-sm z-10">
                        {step.order}
                      </div>

                      {/* 步骤内容 */}
                      <div className="space-y-2">
                        {/* 标题和类型标签 */}
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <h5 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white flex-1">
                            {title}
                          </h5>
                          {step.type && (
                            <span className={`
                              inline-flex items-center px-2 py-0.5 text-xs font-medium rounded flex-shrink-0
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
                          )}
                        </div>

                        {/* 描述 */}
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {description}
                        </p>

                        {/* 命令 */}
                        {step.command && (
                          <div className="mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 rounded border border-gray-700 font-mono text-xs text-green-400 overflow-x-auto">
                            <code className="block whitespace-pre-wrap break-all">{step.command}</code>
                          </div>
                        )}

                        {/* URL链接 */}
                        {step.url && (
                          <a
                            href={step.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-start gap-1.5 text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline group"
                          >
                            <span className="flex-shrink-0 mt-0.5">🔗</span>
                            <span className="break-all group-hover:text-blue-700 dark:group-hover:text-blue-300">{step.url}</span>
                          </a>
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
              <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🔐</span>
                <span>{t('platformGuide.requiredCredentials') || '所需凭证'}</span>
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
                      className="p-3 md:p-4 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700/30 rounded-r-lg"
                    >
                      <div className="space-y-2">
                        {/* 凭证名称和标签 */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
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

                        {/* 描述 */}
                        {description && (
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {description}
                          </p>
                        )}

                        {/* 示例 */}
                        {cred.example && (
                          <div className="mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 rounded border border-gray-700 font-mono text-xs text-gray-300 dark:text-gray-400">
                            <div className="text-gray-500 dark:text-gray-500 mb-1">{t('common.example') || '示例'}:</div>
                            <code className="text-green-400 dark:text-green-400 break-all">{cred.example}</code>
                          </div>
                        )}
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
