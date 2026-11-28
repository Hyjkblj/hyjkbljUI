# ImagesBadge 图片堆徽章

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Aceternity UI · 依赖：`motion`

一个胶囊徽章，左边叠着一小摞缩略图。鼠标移上去，图片堆展开成扇形、胶囊变宽；移开自动收回。适合「新模板上线」「图集入口」这类带预览的链接。

## 效果

![ImagesBadge 收起态](docs/images/images-badge.png)

可交互 demo：`pnpm dev` 后打开 `#/images-badge`；截图模式 `?only=images-badge`。

> 静图是收起态。扇形展开要 hover 才触发。

## 安装

```bash
pnpm add @hyjkblj/images-badge motion
```

单文件 178 行。

## 基础用法

```tsx
import { ImagesBadge } from "@hyjkblj/images-badge";

<ImagesBadge
  text="Introducing Agenforce Marketing Template"
  images={["/a.webp", "/b.webp", "/c.webp"]}
/>
```

带链接：

```tsx
<ImagesBadge text="模板库" images={imgs} href="/templates" target="_blank" />
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | — | **必填**，徽章文字 |
| `images` | `string[]` | — | **必填**，缩略图地址数组 |
| `className` | `string` | — | 外层类名 |
| `href` | `string` | — | 传了就渲染成 `<a>`，否则是 `<div>` |
| `target` | `string` | — | 链接的 target |
| `folderSize` | `{ width, height }` | 内置 | 收起时图片堆区域尺寸 |
| `teaserImageSize` | `{ width, height }` | 内置 | 收起时单张缩略图尺寸 |
| `hoverImageSize` | `{ width, height }` | 内置 | 展开时单张缩略图尺寸 |
| `hoverTranslateY` | `number` | 内置 | 展开时图片上移量 |
| `hoverSpread` | `number` | 内置 | 展开时图片横向散开量 |
| `hoverRotation` | `number` | 内置 | 展开时每张图的旋转角度 |

后五个参数是**手感调节**，默认值在源码顶部，想改幅度就传这几个。

## 样式与主题

没有 CSS 变量。徽章底色、圆角、阴影、文字颜色都在源码的 className 里写死；改外观用 `className` 覆盖外层，或用上表的尺寸参数调内部。

## 注意事项

- **必须给图片数组**，且数量 2–4 张最好看；1 张没有堆叠感，5 张以上会挤。
- **图片地址是外部资源时注意跨域与体积**：缩略图按原图加载，不会自动压缩，建议先压到 100KB 以内。
- **hover 才能展开**，触屏设备上没有等价交互——移动端只能看到收起态，所以 `text` 要能独立表达含义。
- **传 `href` 后整块变成链接**，内部图片的 hover 与链接的 focus 是两套状态，键盘 Tab 聚焦时不会自动展开扇形。
- 纯装饰 + 文本，没有额外的 `aria` 处理；图片建议配好 `alt`（组件内部对 `<img>` 没有传 alt，屏幕阅读器会跳过它们）。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Aceternity UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Aceternity UI · [images-badge](https://ui.aceternity.com/components/images-badge)
- 收录方式：registry JSON（`https://ui.aceternity.com/registry/images-badge.json`）原样落地
- 改动：无（仅在文件头加出处注释）
