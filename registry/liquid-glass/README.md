# LiquidGlass 液态玻璃

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Aceternity UI · 依赖：无

一块会折射背后内容的玻璃：内部用 SVG 位移滤镜（`feDisplacementMap`）做成 `backdrop-filter`，把背景按斯涅尔定律扭曲，边缘还带色散（红蓝分离）。零运行时依赖。

## 效果

![LiquidGlass：圆形玻璃片折射背后的文字](docs/images/liquid-glass.png)

可交互 demo：`pnpm dev` 后打开 `#/liquid-glass`；截图模式 `?only=liquid-glass`。demo 里玻璃片可以拖动。

## 安装

```bash
pnpm add @hyjkblj/liquid-glass
```

单文件 400 行，只依赖 `react` 与 `cn`。

## 基础用法

```tsx
import { LiquidGlass } from "@hyjkblj/liquid-glass";

<div className="relative h-96 w-full bg-[radial-gradient(...)]">
  <LiquidGlass
    radius={100}
    scale={48}
    aberration={14}
    bevelDepth={37}
    frost={0.4}
    tint={0.12}
    className="size-50"
  />
</div>
```

玻璃里放内容：

```tsx
<LiquidGlass radius={24} className="h-16 w-64" contentClassName="grid place-items-center">
  <span className="text-sm text-white">拖我</span>
</LiquidGlass>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `radius` | `number` | `999` | 圆角（px）。999 = 胶囊；传 `h/2` 得圆形 |
| `scale` | `number` | `48` | 折射位移强度（px），越大扭曲越夸张 |
| `bevelDepth` | `number` | `14` | 边缘「斜边」宽度（px），光在这一圈被弯折 |
| `aberration` | `number` | `4` | 色散宽度（px），红/蓝通道的分离量 |
| `frost` | `number` | `0.4` | 折射后额外的模糊量 |
| `tint` | `number` | `0.12` | 玻璃本体的白色占比 0–1 |
| `contentClassName` | `string` | — | 内容层类名 |
| `className` | `string` | — | 玻璃本体类名（**尺寸从这里给**） |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | 透传到根元素 |

## 样式与主题

没有 CSS 变量，全部走 props：

| 想改的 | 怎么改 |
| --- | --- |
| 形状 | `radius` + `className` 的宽高 |
| 折射强度 | `scale` |
| 边缘厚度 | `bevelDepth` |
| 彩虹边 | `aberration` |
| 朦胧感 | `frost` |
| 玻璃白度 | `tint` |
| 投影/高光 | `className` 里加 `shadow-*` / `inset` 阴影 |

## 注意事项

- **只有 Chromium 真的折射**。Safari / Firefox / 开启「减少透明度」时，组件自动降级成普通磨砂玻璃（只有模糊，没有位移和色散）。**这是能力检测后的降级，不是 bug**，但意味着跨浏览器视觉不一致。
- **必须有东西在背后**。玻璃靠 `backdrop-filter` 采样背后像素，放在纯色背景上几乎看不出效果——demo 特意加了条纹纹理和渐变。
- **尺寸必须由 `className` 给**。组件没有默认宽高，不传就是 0×0；`radius` 要跟着高度走（圆形传 `h/2`）。
- **`backdrop-filter` 会创建新的包含块**：玻璃内部的 `position: fixed` 子元素会失效；叠放顺序也要注意，玻璃放在被折射内容之上。
- **每个实例注入一个独立 SVG filter**（用 `useId` 生成 id），所以同页多个玻璃片互不干扰，但也意味着 DOM 里会多出若干 `<svg>` 节点。
- **性能**：`backdrop-filter` + 位移滤镜是 GPU 重活，大尺寸或同时多个会掉帧；拖动时尤其明显。
- 组件是纯装饰，没有语义角色。作为按钮用要自己包 `<button>` 或补 `role`。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Aceternity UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Aceternity UI · [liquid-glass](https://ui.aceternity.com/components/liquid-glass)
- 收录方式：registry JSON（`https://ui.aceternity.com/registry/liquid-glass.json`）原样落地
- 改动：无（仅在文件头加出处注释）
