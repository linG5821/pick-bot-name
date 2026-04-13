# Anime头像素材说明

## 📁 当前方案

目前二次元风格使用 **混合方案**：

### 方案A：在线API（主要方案）✅
- 使用 `waifu.pics` API获取真实的anime插画
- 自动缓存，减少重复请求
- 应用启动时预加载5张头像
- **优点**：真正的高质量anime风格
- **缺点**：需要网络连接，首次加载较慢

### 方案B：本地素材（备用方案）⚠️
- 当API失败时使用fallback.svg作为占位符
- 你可以在此目录添加高质量的anime头像图片

## 🎨 如何添加本地高质量素材

如果你有高质量的anime头像PNG/SVG文件，可以这样做：

### 1. 准备素材
- 格式：PNG或SVG
- 尺寸：建议256x256或以上
- 风格：日本anime/manga风格
- 数量：建议至少10-20张

### 2. 放置文件
将图片文件放到这个目录：
```
public/avatars/anime/
├── anime-01.png
├── anime-02.png
├── anime-03.png
└── ...
```

### 3. 更新配置
修改 `src/core/avatar/static-anime-loader.ts`：

```typescript
const ANIME_AVATARS = [
  'anime-01.png',
  'anime-02.png',
  'anime-03.png',
  // ... 添加更多
];
```

### 4. 切换到本地素材模式
如果你想完全使用本地素材（不依赖API），修改 `src/components/Avatar/AvatarDisplay.tsx`：

将：
```typescript
import { getAnimeAvatarUrl } from '@/core/avatar/anime-api-loader';
```

改为：
```typescript
import { loadStaticAnimeSvg } from '@/core/avatar/static-anime-loader';
```

## 🌐 开源素材资源推荐

### GitHub资源
- 搜索关键词：`anime avatar`, `waifu`, `anime profile picture`
- 注意检查许可证（License），确保可以商用

### 免费素材站
- [Pixabay](https://pixabay.com/) - 搜索"anime"
- [Unsplash](https://unsplash.com/) - 部分anime风格插画
- [イラストAC](https://www.ac-illust.com/) - 日本免费插画网站

### AI生成工具
- [waifu.im](https://waifu.im/) - 免费API
- [thiswaifudoesnotexist.net](https://www.thiswaifudoesnotexist.net/) - AI生成
- Stable Diffusion + Anime模型

## ⚖️ 版权注意事项

使用任何素材前请确认：
1. ✅ 是否允许商业使用
2. ✅ 是否需要署名
3. ✅ 是否可以修改
4. ✅ 许可证类型（CC0, MIT, Apache等）

**不要使用**：
- ❌ 未经授权的动漫角色（如初音未来、SAO角色等）
- ❌ 版权作品的截图
- ❌ 他人作品未经许可

## 📊 当前状态

- ✅ API方案已实现（waifu.pics）
- ✅ 自动缓存机制
- ✅ Fallback占位符
- ⚠️ 本地高质量素材待添加

---

最后更新：2026-04-12
