# Loader 加载指示器

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`

一个组件、**17 种加载动画**：从最普通的圆环 spinner，到点阵、抖动、变形、彗星、金属球、牛顿摆、螺旋，再到 5 种终端风格的 ASCII 加载。全部按 `size` 缩放、用 `currentColor` 上色，跟随文字颜色。

## 效果

![Loader：17 种变体](docs/images/loader.png)

可交互 demo：`pnpm dev` 后打开 `#/loader`；截图模式 `?only=loader`。

## 安装

```bash
pnpm add @hyjkblj/loader motion
```

4 个文件：`loader.tsx`（645L）+ `lib/{ease,i18n,utils}`。

## 基础用法

```tsx
import { Loader } from "@hyjkblj/loader";

<Loader variant="spinner" size={32} label="正在加载" />
```

跟随文字颜色：

```tsx
<div className="text-sky-500">
  <Loader variant="metaballs" size={48} />
</div>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `LoaderVariant` | `"spinner"` | 17 种之一，见下表 |
| `size` | `number` | `32` | 基准边长（px），一切尺寸从它缩放 |
| `speed` | `number` | `1` | 一个动画周期的秒数，**越小越快** |
| `label` | `string` | — | 给屏幕阅读器的可访问名称 |
| `labels` | `Partial<{ label, scramble }>` | — | 覆盖内置文案 |
| `className` | `string` | — | 根元素类名（颜色从这里给） |

### 17 种变体

| 分类 | 变体 |
| --- | --- |
| 经典 | `spinner`、`dots`、`bars` |
| 图形 | `dot-matrix`、`dither`、`morph`、`comet` |
| 物理 | `metaballs`、`newton`、`helix` |
| 文本 | `scramble`、`percent` |
| 终端（ASCII） | `ascii`、`ascii-line`、`ascii-braille`、`ascii-blocks`、`ascii-bounce` |

## 样式与主题

**没有 CSS 变量，也不用语义色**——所有变体都画在 `currentColor` 上，颜色由外层文字色决定：

```tsx
<span className="text-neutral-400 dark:text-neutral-500">
  <Loader variant="helix" />
</span>
```

尺寸只受 `size` 控制；曲线在 `lib/ease.ts`。

## 注意事项

- **颜色靠 `currentColor`**，没给文字色时继承父级；放在 `<button>` 里要确认按钮的文字色合适。
- **`speed` 是周期秒数，不是"速度倍率"**：传 `2` 是慢一倍，传 `0.5` 是快一倍。和直觉相反，容易设反。
- **5 种 ASCII 变体是纯文本帧**，建议父级用等宽字体（`font-mono`），否则不同字符宽度不一致会抖动。
- **`reduced-motion` 下所有变体退化为不透明度脉冲**——不再旋转/跳动，但仍然表达"在忙"。这是写死的行为。
- **`label` 建议必传**：组件带 `role="status"`，但没有默认文案时读屏只播报"status"。demo 里每个都传了。
- 单文件 645 行包含 17 套实现，只用一个变体时 tree-shaking 依赖打包器（本项目按包整体构建，不做单变体拆分）。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Loader](https://beui.dev/components/motion/loader)
- 收录方式：registry JSON（`https://beui.dev/r/loader`）原样落地，剔除 preview
- 改动：**HY-MODIFIED** —— import 改相对路径
