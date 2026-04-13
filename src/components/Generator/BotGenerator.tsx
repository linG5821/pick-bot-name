/**
 * 机器人名称生成器主组件
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneratedBotInfo, PlatformId, PlatformBotInfo } from '@/types';
import { useGeneratorStore, useStatsStore } from '@/store';
import { NameGenerator, ruleLoader } from '@/core/generator';
import { BotIdGenerator } from '@/core/generator';
import { AvatarGenerator } from '@/core/avatar';
import { platformConfigs } from '@/data/platforms';
import { PlatformValidator } from '@/core/platform';
import { Button, Card, Toast } from '@/components/common';
import { StyleSelector } from '@/components/StyleSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { PlatformDisplay } from '@/components/PlatformDisplay';
import { AvatarDisplay } from '@/components/Avatar';
import { RankingList } from '@/components/Ranking';
import { generateUniqueId } from '@/utils/uuid';

type TabType = 'generator' | 'ranking';

export const BotGenerator: React.FC = () => {
  const { t } = useTranslation();
  const {
    selectedStyle,
    selectedLanguage,
    generatedInfo,
    isGenerating,
    setStyle,
    setLanguage,
    setGeneratedInfo,
    setGenerating,
  } = useGeneratorStore();
  const { recordCopy } = useStatsStore();

  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  /**
   * 生成所有平台的Bot信息
   */
  const generateAllPlatforms = (displayName: string): Record<string, PlatformBotInfo> => {
    const platforms: Record<string, PlatformBotInfo> = {};
    const platformIds = Object.keys(platformConfigs) as PlatformId[];

    for (const platformId of platformIds) {
      const config = platformConfigs[platformId];
      const needsUsername = !!config.namingRules.username && !config.usernameGeneratedBySystem;

      let username: string | null = null;
      const validationErrors: string[] = [];

      // 验证显示名称
      const displayNameValidation = PlatformValidator.validateDisplayName(
        displayName,
        platformId,
        config.namingRules.displayName
      );

      if (!displayNameValidation.valid) {
        validationErrors.push(...displayNameValidation.errors);
      }

      // 生成并验证用户名
      if (needsUsername) {
        username = BotIdGenerator.generate({
          displayName,
          platform: platformId,
          addRandomSuffix: false,
        });

        if (config.namingRules.username) {
          const usernameValidation = PlatformValidator.validateUsername(
            username,
            platformId,
            config.namingRules.username
          );

          if (!usernameValidation.valid) {
            validationErrors.push(...usernameValidation.errors);
          }
        }
      }

      platforms[platformId] = {
        platform: platformId,
        displayName,
        username,
        needsUsername,
        isValid: validationErrors.length === 0,
        validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
        metadata: {
          difficulty: config.difficulty,
          estimatedTime: config.difficulty === 'easy' ? '5-10 min' : config.difficulty === 'medium' ? '15-30 min' : '30-60 min',
          isGeneric: config.isGeneric,
          usernameGeneratedBySystem: config.usernameGeneratedBySystem,
        },
      };
    }

    return platforms;
  };

  /**
   * 生成Bot名称
   */
  const handleGenerate = async () => {
    try {
      setGenerating(true);

      // 获取使用的规则
      const rule = ruleLoader.getRandomRule(selectedStyle, selectedLanguage);
      if (!rule) {
        throw new Error(`No rule found for style: ${selectedStyle}, language: ${selectedLanguage}`);
      }

      // 生成主显示名称
      const primaryName = NameGenerator.generate(selectedStyle, selectedLanguage);

      // 根据选择的风格生成对应风格的头像
      const avatarStyle = AvatarGenerator.getAvatarStyleForBotStyle(selectedStyle);
      const avatar = AvatarGenerator.generate(undefined, avatarStyle, selectedStyle);

      // 生成所有平台的信息
      const platforms = generateAllPlatforms(primaryName);

      // 生成翻译（TODO: 实际项目中可以接入翻译API）
      const translations: Record<string, string> = {
        en: primaryName,
        zh: primaryName,
        ja: primaryName,
      };

      const botInfo: GeneratedBotInfo = {
        id: generateUniqueId(),
        timestamp: Date.now(),
        style: selectedStyle,
        ruleId: rule.id,
        algorithm: rule.algorithm,
        displayNames: {
          primary: primaryName,
          translations,
        },
        platforms,
        avatar,
      };

      setGeneratedInfo(botInfo);
      setToast({ message: t('generator.generatedSuccess'), type: 'success' });
    } catch (error) {
      console.error('Failed to generate bot name:', error);
      setToast({ message: t('generator.generatedError'), type: 'error' });
    } finally {
      setGenerating(false);
    }
  };

  /**
   * 重新生成头像
   */
  const handleRegenerateAvatar = () => {
    if (!generatedInfo) return;

    const newAvatar = AvatarGenerator.generate(undefined, generatedInfo.avatar.style, generatedInfo.style);
    setGeneratedInfo({
      ...generatedInfo,
      avatar: newAvatar,
    });
  };

  /**
   * 处理复制名称
   */
  const handleCopyName = (name: string) => {
    if (!generatedInfo) return;

    navigator.clipboard.writeText(name);
    recordCopy(name, generatedInfo.style);
    setToast({ message: t('common.copied'), type: 'success' });
  };

  /**
   * 处理复制用户名
   */
  const handleCopyUsername = (username: string) => {
    if (!generatedInfo) return;

    navigator.clipboard.writeText(username);
    setToast({ message: t('common.copied'), type: 'success' });
  };

  return (
    <>
      {/* 全屏背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 -z-10" />

      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
        {/* 主内容区域 - 居中 */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 标题 */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {t('app.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('app.subtitle')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('app.description')}
            </p>
          </div>

          {/* Tab切换 */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'generator'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('tabs.generator')}
              </button>
              <button
                onClick={() => setActiveTab('ranking')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'ranking'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('tabs.ranking')}
              </button>
            </div>
          </div>

          {/* 条件渲染：生成器 或 排行榜 */}
          {activeTab === 'generator' ? (
            <>
              {/* 控制面板 */}
              <Card>
                <div className="space-y-6">
                  {/* 风格选择器 - 上方 */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {t('generator.selectStyle')}
                    </h3>
                    <StyleSelector
                      selectedStyle={selectedStyle}
                      onStyleChange={setStyle}
                    />
                  </div>

                  {/* 语言选择和生成按钮 - 中间并排 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 左边：语言选择 */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {t('generator.selectLanguage')}
                      </h3>
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={setLanguage}
                      />
                    </div>

                    {/* 右边：生成按钮 */}
                    <div className="flex items-end">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={handleGenerate}
                        loading={isGenerating}
                        icon="✨"
                      >
                        {isGenerating ? t('generator.generating') : t('generator.generate')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 生成结果 */}
              {generatedInfo ? (
                <div className="space-y-6">
                  {/* 头像 */}
                  <AvatarDisplay
                    avatar={generatedInfo.avatar}
                    onRegenerate={handleRegenerateAvatar}
                  />

                  {/* 平台信息 */}
                  <PlatformDisplay
                    botInfo={generatedInfo}
                    onCopyName={handleCopyName}
                    onCopyUsername={handleCopyUsername}
                  />
                </div>
              ) : (
                <Card>
                  <div className="text-center py-20 space-y-4">
                    <div className="text-6xl">🎲</div>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                      {t('generator.noResult')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {t('generator.selectStyle')} → {t('generator.generate')}
                    </p>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <RankingList />
          )}
        </div>
        </div>
      </div>
    </>
  );
};
