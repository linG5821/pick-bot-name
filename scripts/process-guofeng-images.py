#!/usr/bin/env python3
"""
处理国风图片：
1. 压缩图片（目标 <500KB）
2. 移除右下角水印
3. 调整大小为 256x256
"""

import os
import sys
from PIL import Image, ImageDraw
import glob

def remove_watermark(image, watermark_region_ratio=0.15):
    """
    移除右下角水印区域（通过裁剪或填充）
    watermark_region_ratio: 右下角水印区域占比
    """
    width, height = image.size

    # 计算水印区域（右下角）
    watermark_width = int(width * watermark_region_ratio)
    watermark_height = int(height * watermark_region_ratio)

    # 裁剪掉右下角水印区域
    cropped = image.crop((0, 0, width - watermark_width, height - watermark_height))

    return cropped

def process_image(input_path, output_path, target_size=256, quality=85):
    """
    处理单张图片
    """
    try:
        # 打开图片
        img = Image.open(input_path)

        # 转换为 RGB（如果是 RGBA）
        if img.mode == 'RGBA':
            # 创建白色背景
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])  # 使用 alpha 通道作为 mask
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # 移除右下角水印
        img = remove_watermark(img, watermark_region_ratio=0.12)

        # 调整大小为正方形 (保持长宽比，然后居中裁剪)
        width, height = img.size
        size = min(width, height)

        # 居中裁剪为正方形
        left = (width - size) // 2
        top = (height - size) // 2
        right = left + size
        bottom = top + size
        img = img.crop((left, top, right, bottom))

        # 缩放到目标大小
        img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)

        # 保存（优化压缩）
        img.save(output_path, 'PNG', optimize=True, quality=quality)

        # 检查文件大小
        file_size = os.path.getsize(output_path) / 1024  # KB
        print(f"✓ {os.path.basename(input_path)} -> {os.path.basename(output_path)} ({file_size:.1f}KB)")

        return True

    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

def main():
    # 源目录和目标目录
    source_dir = "/home/ling5821/workspace/projects/pick-bot-name/guofeng"
    target_dir = "/home/ling5821/workspace/projects/pick-bot-name/public/avatars/guofeng"

    # 创建目标目录
    os.makedirs(target_dir, exist_ok=True)

    # 获取所有 PNG 图片
    image_files = glob.glob(os.path.join(source_dir, "*.png"))

    if not image_files:
        print(f"No PNG files found in {source_dir}")
        return

    print(f"Found {len(image_files)} images to process...\n")

    success_count = 0
    for i, input_path in enumerate(image_files, 1):
        # 使用序号命名输出文件
        output_filename = f"guofeng-{i:02d}.png"
        output_path = os.path.join(target_dir, output_filename)

        if process_image(input_path, output_path):
            success_count += 1

    print(f"\n{'='*60}")
    print(f"Processed {success_count}/{len(image_files)} images successfully")
    print(f"Output directory: {target_dir}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
