# MergingBubbles 融合气泡

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Cult UI · 依赖：无

两个圆泡用「融合」轮廓连成一体（metaball 形状），左右各放一个图标，中间可选一个加号。常用来表达「A + B 合在一起」——集成、配对、合并。

## 效果

![MergingBubbles 三种尺寸](docs/images/merging-bubbles.png)

可交互 demo：`pnpm dev` 后打开 `#/merging-bubbles`；截图模式 `?only=merging-bubbles`。

## 安装

```bash
pnpm add @hyjkblj/merging-bubbles
```

单文件 208 行，零运行时依赖。

## 基础用法

```tsx
import { MergingBubbles, NextLogo, VercelLogo } from "@hyjkblj/merging-bubbles";

<MergingBubbles size="md" startIcon={<NextLogo />} endIcon={<VercelLogo />} />
```

换成自己的图标：

```tsx
<MergingBubbles
  size="lg"
  startIcon={<img src="/a.svg" alt="" className="size-full" />}
  endIcon={<img src="/b.svg" alt="" className="size-full" />}
  showPlus={false}
/>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | 整体尺寸，见下表 |
| `startIcon` | `ReactNode` | — | 左泡里的图标 |
| `endIcon` | `ReactNode` | — | 右泡里的图标 |
| `showPlus` | `boolean` | `true` | 中间是否显示 `+` |
| `className` | `string` | — | 外层类名 |

### 尺寸

| size | 宽 × 高 | 图标 | 加号 |
| --- | --- | --- | --- |
| `xs` | 160 × 72 | 24px | 12px |
| `sm` | 200 × 88 | 32px | 16px |
| `md` | 280 × 124 | 48px | 22px |
| `lg` | 400 × 176 | 64px | 32px |

### 附带导出

`NextLogo` 和 `VercelLogo` 也从这个文件导出，方便 demo 直接用。

## 样式与主题

没有 CSS 变量，配色走 Tailwind 语义色：

| 元素 | 类名 |
| --- | --- |
| 外发光 | `stroke-foreground/10`，10px |
| 填充 | `fill-muted/60` |
| 描边 | `stroke-foreground/20`，1px |
| 加号 | `text-foreground/40` |

**需要 shadcn 的语义色**（`--color-foreground` / `--color-muted`）。没有这两个变量的项目里，填充和描边会不显示——这是本组件唯一的外部依赖。

## 注意事项

- **它其实没有动画**。名字叫 "merging"，但源码里没有 keyframes、没有 `<animate>`、没有 motion——就是三条固定 SVG 路径（发光 / 填充 / 描边）加两个绝对定位的图标。想要「靠近→融合→分开」的过程动画得自己加。
- **依赖 `foreground` / `muted` 两个语义色**。纯 Tailwind 项目（没有 shadcn 主题）里图形会是透明的，只剩图标。
- **图标由 `[&>svg]:w-full [&>svg]:h-full` 撑满**，所以传入的 SVG 不需要自己写尺寸；传 `<img>` 要自己加 `size-full`。
- **尺寸是固定像素**，不会随容器缩放；需要响应式就按断点换 `size`。
- 纯装饰图形，没有无障碍语义。表达「A 与 B 合并」这种含义时，建议外面补一句 `sr-only` 文本。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Cult UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Cult UI · [merging-bubbles](https://www.cult-ui.com/docs/components/merging-bubbles)
- 收录方式：registry JSON（`https://www.cult-ui.com/r/merging-bubbles.json`）原样落地
- 改动：无（仅在文件头加出处注释）
