/**
 * 头像展示组件
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarInfo } from '@/types';
import { AvatarGenerator } from '@/core/avatar';
import { getAnimeAvatarUrl } from '@/core/avatar/anime-api-loader';
import { Button, Card } from '@/components/common';

export interface AvatarDisplayProps {
  avatar: AvatarInfo;
  displayName?: string;
  onRegenerate?: () => void;
  showControls?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatar,
  displayName,
  onRegenerate,
  showControls = true,
}) => {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [animeImageUrl, setAnimeImageUrl] = useState<string | null>(null);
  const [isLoadingAnime, setIsLoadingAnime] = useState(false);

  // 检测并加载anime头像（来自API）
  useEffect(() => {
    const isAnimeAvatar = avatar.svg.includes('data-static-anime="true"');

    if (isAnimeAvatar) {
      setIsLoadingAnime(true);
      getAnimeAvatarUrl(avatar.seed)
        .then(url => {
          setAnimeImageUrl(url);
          setIsLoadingAnime(false);
        })
        .catch(error => {
          console.error('Failed to load anime avatar:', error);
          setAnimeImageUrl(null);
          setIsLoadingAnime(false);
        });
    } else {
      setAnimeImageUrl(null);
    }
  }, [avatar.svg, avatar.seed]);

  const handleDownloadPng = async () => {
    try {
      setIsDownloading(true);

      // 如果是anime头像（由于CORS限制，使用直接下载链接）
      if (animeImageUrl) {
        const link = document.createElement('a');
        link.href = animeImageUrl;
        link.download = 'anime-avatar.jpg';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // SVG头像正常下载
        await AvatarGenerator.downloadAsPng(avatar.svg, 'bot-avatar.png');
      }
    } catch (error) {
      console.error('Failed to download PNG:', error);
      alert('下载失败，请右键图片选择"图片另存为"');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSvg = () => {
    // anime头像是PNG，不支持SVG下载
    if (animeImageUrl) {
      alert('Anime头像不支持SVG格式下载，请使用PNG下载');
      return;
    }
    AvatarGenerator.downloadAsSvg(avatar.svg, 'bot-avatar.svg');
  };

  const dataUri = AvatarGenerator.svgToDataUri(avatar.svg);

  // 渲染头像
  const renderAvatar = () => {
    // 加载中状态
    if (isLoadingAnime) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-pink-50 to-blue-50 dark:from-pink-900/20 dark:to-blue-900/20">
          <div className="text-center">
            <div className="text-5xl mb-3 animate-bounce">🌸</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              加载真正的二次元头像...
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              来自 waifu.pics API
            </div>
          </div>
        </div>
      );
    }

    // 如果是anime头像，显示真实的anime图片
    if (animeImageUrl) {
      return (
        <img
          src={animeImageUrl}
          alt="Anime Avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load anime image');
            // 加载失败时显示fallback
            (e.target as HTMLImageElement).src = '/pick-bot-name/avatars/anime/fallback.svg';
          }}
        />
      );
    }

    // 其他风格显示SVG
    return (
      <img
        src={dataUri}
        alt="Bot Avatar"
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <Card className="space-y-4 overflow-hidden">
      {/* 名字显示 - 最醒目位置 */}
      {displayName && (
        <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white break-words px-2 overflow-wrap-anywhere">
            {displayName}
          </h2>
        </div>
      )}

      {/* 头像预览 */}
      <div className="flex justify-center overflow-hidden">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 shadow-lg max-w-full">
          {renderAvatar()}
        </div>
      </div>

      {/* 控制按钮 */}
      {showControls && (
        <div className="flex flex-wrap gap-2 justify-center">
          {onRegenerate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onRegenerate}
              icon="🔄"
            >
              {t('avatar.regenerate')}
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadPng}
            loading={isDownloading}
            icon="📥"
          >
            PNG
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadSvg}
            icon="📥"
          >
            SVG
          </Button>
        </div>
      )}
    </Card>
  );
};
