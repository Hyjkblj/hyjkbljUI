# BackgroundCubesGrid 立方体网格背景

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Aceternity UI · 依赖：`three`、`motion`

Three.js 画的立方体阵列背景，两个变体：**等距**（斜 45° 的菱形地砖，白色小方块）和**透视**（俯视方块海）。鼠标划过会激起波纹，指针停住一段时间后自动滴落随机涟漪。

## 效果

![BackgroundCubesGrid：等距网格 + 品牌胶囊标题](docs/images/background-cubes-grid.png)

可交互 demo：`pnpm dev` 后打开 `#/background-cubes-grid`；截图模式 `?only=background-cubes-grid`。

> 这个组件**必须有 WebGL**。headless 截图要加 `--enable-unsafe-swiftshader`，否则画布是空的。

## 安装

```bash
pnpm add @hyjkblj/background-cubes-grid three motion
```

单文件 938 行，含两个变体各自的着色器与场景搭建。

## 基础用法

```tsx
import { BackgroundCubesGrid } from "@hyjkblj/background-cubes-grid";

<div className="relative isolate min-h-[40rem]">
  <BackgroundCubesGrid className="-z-10" />
  <div className="relative z-0">你的内容</div>
</div>
```

透视版：

```tsx
<BackgroundCubesGrid variant="perspective" gridSize={22} tilt={0.7} />
```

## API

两个变体是**联合类型**，`variant` 决定用哪一组 props（默认走 `isometric`）。

### 等距（`variant="isometric"`，默认）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `cellSize` | `number` | 单块地砖的屏幕宽度（px） |
| `gap` | `number` | 方块之间的缝隙，占单块的比例 |
| `topColor` / `leftColor` / `rightColor` | `string` | 顶面 / 左侧 / 右侧的颜色 |
| `amplitude` | `number` | 波高（单位：格） |
| `speed` | `number` | 波速（格/秒） |
| `damping` | `number` | 每秒保留的能量比，越小越快平复 |
| `idleRipples` | `boolean` | 指针静止时自动滴落涟漪 |
| `idleDelay` | `number` | 静置多少秒后开始自动涟漪 |
| `glowColor` / `glow` | `string` / `number` | 跟随波纹的光色与强度（0 关闭） |

### 透视（`variant="perspective"`）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `gridSize` | `number` | 每边方块数 |
| `gap` | `number` | 方块间距（世界单位） |
| `baseColor` / `waveColor` / `backgroundColor` | `string` | 静止色 / 波峰色 / 背景与雾色 |
| `glow` | `number` | 波峰自发光强度 |
| `amplitude` | `number` | 波高 |
| `tilt` | `number` | 相机俯角（弧度） |
| `idleRipples` | `boolean` | 指针静止时自动起浪 |

两个变体都有 `className`。

## 样式与主题

没有 CSS 变量，颜色全是 props。**背景色要自己在外层给**——组件只画方块，不画底色（等距版的"白"来自方块本身，透视版的底色走 `backgroundColor`）。

## 注意事项

- **引入 three 的代价**：`three` 约 600KB（gzip 后 ~150KB），是这个仓库里唯一带重型图形依赖的组件。不需要 3D 的场合别用。
- **必须有 WebGL**。禁用硬件加速、老设备、部分远程桌面下画布会是空白；组件没有降级占位。
- **父级要 `isolate` + 负 z-index**：`className="-z-10"` 配合父级 `relative isolate`，否则画布可能盖住内容。
- **会自动跑动画帧**（motion 的 `useAnimationFrame`），页面不可见时 Three 仍在渲染。长页面里放多个实例会明显吃 GPU。
- **`prefers-reduced-motion` 下动画停但画布仍在**——组件没有卸载场景，静态图仍消耗 WebGL 上下文。
- 无无障碍语义（纯装饰），建议外层 `aria-hidden` 或确保它不抢焦点。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Aceternity UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Aceternity UI · [background-cubes-grid](https://ui.aceternity.com/components/background-cubes-grid)
- 收录方式：registry JSON（`https://ui.aceternity.com/registry/background-cubes-grid.json`）原样落地
- 改动：无（仅在文件头加出处注释）
