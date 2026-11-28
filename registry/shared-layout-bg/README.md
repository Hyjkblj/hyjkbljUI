# SharedLayoutBg 共享布局高亮

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`

给列表加一层会「滑动」的 hover 高亮：整块列表里只有**一个**胶囊，指针移到哪一行它就用共享 layout 滑过去，而不是每行各自闪一下。进入列表时模糊淡入，离开淡出。

## 效果

![SharedLayoutBg：四行列表](docs/images/shared-layout-bg.png)

可交互 demo：`pnpm dev` 后打开 `#/shared-layout-bg`；截图模式 `?only=shared-layout-bg`。

> 静图没有胶囊——高亮只在 hover / 聚焦时出现。

## 安装

```bash
pnpm add @hyjkblj/shared-layout-bg motion
```

3 个文件：`shared-layout-bg.tsx`（182L）+ `lib/{ease,utils}`。

## 基础用法

```tsx
import { SharedLayoutBg } from "@hyjkblj/shared-layout-bg";

<SharedLayoutBg>
  {items.map((it) => (
    <button key={it.title} className="flex flex-col px-2 py-3 text-left">
      <span>{it.title}</span>
      <span>{it.body}</span>
    </button>
  ))}
</SharedLayoutBg>
```

用 `ul` 语义：

```tsx
<SharedLayoutBg as="ul">
  {items.map((it) => (
    <li key={it.title}>...</li>
  ))}
</SharedLayoutBg>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `as` | `"div" \| "ul"` | `"div"` | 容器标签；传 `ul` 时子元素应是 `li` |
| `pillClassName` | `string` | 内置前景淡色 | 胶囊的样式，改颜色/圆角都从这里 |
| `inset` | `number` | `20` | 胶囊相对每行的左右内缩（px） |
| `pillContainerClassName` | `string` | — | 胶囊定位层的额外类名 |
| `className` | `string` | — | 根元素类名 |

其余 HTML 属性与 `ref` 透传给容器。

## 样式与主题

默认胶囊是一层**前景色淡染**，依赖 `--color-foreground`（playground 已补）。想换颜色直接传 `pillClassName`：

```tsx
<SharedLayoutBg pillClassName="bg-sky-500/15 dark:bg-sky-400/15" />
```

滑动曲线在 `lib/ease.ts`。

## 注意事项

- **每个直接子元素 = 一个 hover 目标**。包一层 `<div>` 包住多个子项，它们会共用一个高亮位置。
- **胶囊不吃指针事件**，所以子元素自己的 `onClick`、`role`、可访问名称都不受影响。
- **键盘聚焦也会点亮胶囊**，不只是鼠标。
- **子元素必须有足够的高度和间距**，胶囊按行高算尺寸；紧贴的行会让它看起来黏在一起。
- **`reduced-motion` 下**胶囊直接跳位并只做淡入淡出，没有滑动。
- 单行列表没意义——它解决的是「多个平级项之间来回移动」的视觉连续性。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Shared Layout Background](https://beui.dev/components/motion/shared-layout-bg)
- 收录方式：registry JSON（`https://beui.dev/r/shared-layout-bg`）原样落地，剔除 preview
- 改动：**HY-MODIFIED** —— import 改相对路径
