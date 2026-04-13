/**
 * 头像生成器 - 使用 DiceBear v9 + React Kawaii
 */

import { createAvatar } from '@dicebear/core';
import * as bottts from '@dicebear/bottts';
import * as botttsNeutral from '@dicebear/bottts-neutral';
import * as funEmoji from '@dicebear/fun-emoji';
import * as avataaars from '@dicebear/avataaars';
import * as identicon from '@dicebear/identicon';
import * as toonHead from '@dicebear/toon-head';
import * as lorelei from '@dicebear/lorelei';
import * as notionists from '@dicebear/notionists';
import { AvatarStyle, AvatarInfo, BotStyle } from '@/types';

// DiceBear风格（不包括kawaii，因为kawaii使用react-kawaii）
type DiceBearStyle = Exclude<AvatarStyle, 'kawaii'>;

const AVATAR_STYLES: Record<DiceBearStyle, any> = {
  bottts: bottts,
  botttsNeutral: botttsNeutral,
  funEmoji: funEmoji,
  avataaars: avataaars,
  identicon: identicon,
  toonHead: toonHead,
  lorelei: lorelei,
  notionists: notionists,
};

// Bot风格到头像风格的映射 - 根据用户最新要求优化
const BOT_STYLE_TO_AVATAR: Record<BotStyle, AvatarStyle> = {
  [BotStyle.PUNK]: 'bottts',           // 朋克 → 机器人（合并赛博+蒸汽，您说好看）
  [BotStyle.CUTE]: 'funEmoji',         // 可爱 → Fun Emoji（用户指定）
  [BotStyle.PROFESSIONAL]: 'avataaars', // 专业 → Avataaars（用户指定）
  [BotStyle.GEEK]: 'botttsNeutral',    // 极客 → 机器人中性色（用户指定）
  [BotStyle.MINIMAL]: 'identicon',     // 极简 → Identicon（用户指定）
  [BotStyle.ANIME]: 'toonHead',        // 卡通 → Toon Head（卡通风格）
  [BotStyle.ACGN]: 'notionists',       // 二次元 → 静态动漫头像（占位符，实际在组件中加载）
};

export class AvatarGenerator {
  /**
   * 根据Bot风格获取对应的头像风格
   */
  static getAvatarStyleForBotStyle(botStyle: BotStyle): AvatarStyle {
    return BOT_STYLE_TO_AVATAR[botStyle] || 'bottts';
  }
  /**
   * 生成随机种子
   */
  private static generateSeed(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * 生成头像
   */
  static generate(
    seed?: string,
    style: AvatarStyle = 'bottts',
    botStyle?: BotStyle
  ): AvatarInfo {
    const avatarSeed = seed || this.generateSeed();

    // 如果是ACGN风格，返回占位符（实际在组件中加载静态头像）
    if (botStyle === BotStyle.ACGN) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" data-static-anime="true" data-seed="${avatarSeed}">
        <rect width="256" height="256" fill="#FFE5F0"/>
        <text x="128" y="128" text-anchor="middle" font-size="24" fill="#FF69B4">Loading...</text>
      </svg>`;
      return {
        svg,
        style,
        seed: avatarSeed,
      };
    }

    // 其他风格使用DiceBear
    const avatarStyle = AVATAR_STYLES[style as DiceBearStyle];

    if (!avatarStyle) {
      throw new Error(`Unknown avatar style: ${style}`);
    }

    const avatar = createAvatar(avatarStyle, {
      seed: avatarSeed,
      size: 256,
    });

    const svg = avatar.toString();

    return {
      svg,
      style,
      seed: avatarSeed,
    };
  }

  /**
   * 生成多个候选头像
   */
  static generateCandidates(
    count: number = 5,
    style: AvatarStyle = 'bottts'
  ): AvatarInfo[] {
    const avatars: AvatarInfo[] = [];

    for (let i = 0; i < count; i++) {
      avatars.push(this.generate(undefined, style));
    }

    return avatars;
  }

  /**
   * 将SVG转换为Data URI
   */
  static svgToDataUri(svg: string): string {
    const encoded = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
  }

  /**
   * 下载头像为PNG
   */
  static async downloadAsPng(
    svg: string,
    filename: string = 'avatar.png'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Cannot get canvas context'));
          return;
        }

        const img = new Image();
        const dataUri = this.svgToDataUri(svg);

        img.onload = () => {
          try {
            canvas.width = img.width || 256;
            canvas.height = img.height || 256;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Failed to create blob from canvas'));
                  return;
                }

                try {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = filename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                  resolve();
                } catch (downloadError) {
                  reject(
                    new Error(
                      `Failed to download image: ${downloadError instanceof Error ? downloadError.message : 'Unknown error'}`
                    )
                  );
                }
              },
              'image/png',
              1.0
            );
          } catch (drawError) {
            reject(
              new Error(
                `Failed to draw image on canvas: ${drawError instanceof Error ? drawError.message : 'Unknown error'}`
              )
            );
          }
        };

        img.onerror = (event) => {
          reject(
            new Error(
              `Failed to load image: ${event instanceof ErrorEvent ? event.message : 'Image load error'}`
            )
          );
        };

        img.src = dataUri;
      } catch (error) {
        reject(
          new Error(
            `Failed to initialize PNG download: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        );
      }
    });
  }

  /**
   * 下载头像为SVG
   */
  static downloadAsSvg(
    svg: string,
    filename: string = 'avatar.svg'
  ): void {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * 获取所有可用的头像风格
   */
  static getAvailableStyles(): AvatarStyle[] {
    return Object.keys(AVATAR_STYLES) as AvatarStyle[];
  }
}
