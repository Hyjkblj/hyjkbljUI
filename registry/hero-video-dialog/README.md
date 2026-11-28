# HeroVideoDialog 视频弹窗

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Magic UI · 依赖：`motion`、`lucide-react`

一张缩略图上盖个播放按钮，点开视频从指定方向放大铺满视口，背后压一层模糊遮罩。适合产品页首屏的演示视频。

## 效果

![HeroVideoDialog 缩略图 + 播放按钮](docs/images/hero-video-dialog.png)

可交互 demo：`pnpm dev` 后打开 `#/hero-video-dialog`；截图模式 `?only=hero-video-dialog`。

> 静图是闭合态。点开后的弹窗要实际操作。

## 安装

```bash
pnpm add @hyjkblj/hero-video-dialog motion lucide-react
```

单文件，151 行。

## 基础用法

```tsx
import { HeroVideoDialog } from "@hyjkblj/hero-video-dialog";

<HeroVideoDialog
  animationStyle="from-center"
  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
  thumbnailSrc="/hero-light.png"
  thumbnailAlt="产品演示"
/>
```

亮暗两套缩略图（官方 demo 的做法）：

```tsx
<div className="relative">
  <HeroVideoDialog className="block dark:hidden" thumbnailSrc="/hero-light.png" {...rest} />
  <HeroVideoDialog className="hidden dark:block" thumbnailSrc="/hero-dark.png" {...rest} />
</div>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `videoSrc` | `string` | — | **必填**，iframe 的 src（YouTube 用 `/embed/xxx`） |
| `thumbnailSrc` | `string` | — | **必填**，缩略图地址 |
| `thumbnailAlt` | `string` | `"Video thumbnail"` | 缩略图 alt |
| `animationStyle` | `AnimationStyle` | `"from-center"` | 展开方向，见下表 |
| `className` | `string` | — | 加在触发缩略图外层 |

### 8 种动画

| 值 | 效果 |
| --- | --- |
| `from-center` | 从中心放大 |
| `from-top` / `from-bottom` | 从上 / 下展开 |
| `from-left` / `from-right` | 从左 / 右展开 |
| `fade` | 纯淡入 |
| `top-in-bottom-out` | 从上进、向下出 |
| `left-in-right-out` | 从左进、向右出 |

## 样式与主题

没有 CSS 变量。缩略图圆角、播放按钮、遮罩都在源码里写死：

| 想改的 | 改哪里 |
| --- | --- |
| 缩略图圆角 | `rounded-2xl`（触发区） |
| 播放按钮大小 | 中间那个 `<Play>` 的容器尺寸 |
| 遮罩模糊度 | `backdrop-blur-*` |
| 弹窗最大宽度 | 视频容器上的 `max-w-*` |

## 注意事项

- **iframe 用 `videoSrc` 直接塞**，所以 YouTube 要写 `https://www.youtube.com/embed/<id>`，不能贴普通观看链接。
- **没有自动播放**：点开只是显示 iframe，要不要 `?autoplay=1` 自己加到 URL 上。
- **没有焦点陷阱**：弹窗打开后 Tab 仍能走到背后的页面元素；Esc 关闭可用，但完整的 dialog 语义要自己补。
- **点遮罩关闭**：遮罩是独立的一层 `onClick`，点视频本身不会关。
- **亮暗两套缩略图要渲染两个实例**，官方 demo 就是这么做的（`block dark:hidden` + `hidden dark:block`）。这意味着**两个 iframe 都在 DOM 里**，只是被 CSS 隐藏——页面会有两个视频节点。
- 依赖 YouTube（或其它平台）的可嵌入权限，被限制嵌入的视频会显示错误页。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Magic UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Magic UI · [hero-video-dialog](https://magicui.design/docs/components/hero-video-dialog)
- 收录方式：源码原样落地（`apps/www/registry/magicui/hero-video-dialog.tsx`）
- 改动：无（仅在文件头加出处注释）
