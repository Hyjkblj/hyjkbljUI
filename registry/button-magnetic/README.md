# MagneticButton 磁吸按钮

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

光标靠近时，按钮朝光标方向轻微位移；鼠标离开，用弹簧回弹归位。触屏设备和「减少动态效果」下自动关闭磁吸，退化成普通按钮。

## 效果

![MagneticButton 三种强度](docs/images/button-magnetic.png)

可交互 demo：`pnpm dev` 后打开 `#/button-magnetic`；截图模式 `?only=button-magnetic`。

> 静图看不出磁吸——位移只在 hover 时发生。

## 安装

```bash
pnpm add @hyjkblj/button-magnetic motion lucide-react
```

**11 个文件**（只保留磁吸变体所需的）：

```text
registry/button-magnetic/
├── button/magnetic.tsx    27L   MagneticButton（薄壳）
├── button/base.tsx       212L   Button 基座（variant / size / ripple / sound）
├── magnetic.tsx           51L   磁吸包装器
└── lib/
    ├── ease.ts / utils.ts / sound.tsx / audio-context.ts
    ├── sounds/{press,engine}.ts
    └── hooks/use-hover-capable.ts
```

> 原始 registry item 还带了 `metallic`、`stateful` 和统一出口 `index.tsx`，本仓库收录时**剔除了**——这次要的是磁吸按钮，另外两个变体是独立组件，需要时再单独收。

## 基础用法

```tsx
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@hyjkblj/button-magnetic";

<MagneticButton variant="primary" size="md" strength={0.35}>
  主按钮
  <ArrowRight className="h-4 w-4" />
</MagneticButton>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `strength` | `number` | `0.25` | 磁吸强度，0 = 关闭，0.5 已经很夸张 |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost"` | `"primary"` | 视觉样式 |
| `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | 尺寸；`icon` 是方形图标按钮 |
| `pressScale` | `number` | `0.97` | 按下缩放，故意很轻 |
| `ripple` | `boolean` | `false` | 按下点出现 Material 风格水波 |
| `sound` | `boolean` | `false` | 按下播放音效（可被 `SoundProvider` 全局静音） |
| `magneticClassName` | `string` | — | 磁吸包装层类名 |
| `className` | `string` | — | 按钮本体类名 |

其余属性透传给内部 `<button>`（`onClick`、`disabled`、`type` 等）。

## 样式与主题

**依赖 shadcn 语义色**：`--color-primary` / `--color-primary-foreground` / `--color-secondary` / `--color-secondary-foreground` / `--color-border`。

没有这些变量时：`primary` 变体**背景透明、只剩文字**，看起来像坏了。本仓库的 playground 已补上这套变量（`styles.css` 的 `@theme` 块）。

磁吸曲线在 `lib/ease.ts` 的 `SPRING_MOUSE`。

## 注意事项

- **需要语义色变量**，纯 Tailwind 项目要自己定义（见上）。这是它 registry 声明里没写、但实际必需的依赖。
- **触屏与 reduced-motion 下磁吸自动关闭**：靠 `useHoverCapable` + `useReducedMotion`，不是配置项，是写死的行为。
- **位移量 = 光标相对中心的偏移 × strength**，所以按钮越大同样位置偏移越大；一排放多个按钮时建议统一 strength，否则位移不一致。
- **`strength` 别超过 0.5**：再大会让按钮跑到光标外面，点击时会有"追不上"的感觉。
- 音效引擎（`sound.tsx` + `engine.ts` 318 行 + `audio-context.ts` 132 行）只为 `sound` 一个 prop 服务，不用音效可整组删掉。
- 无障碍：是真正的 `<button>`，键盘可聚焦；但磁吸效果只跟鼠标，键盘用户看不到任何位移反馈。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；剔除 metallic / stateful / index；import 改相对路径；playground 补语义色变量 |

## 出处

- 原组件：beUI · [Magnetic Button](https://beui.dev/components/motion/button/magnetic)
- 收录方式：registry JSON（`https://beui.dev/r/button-magnetic`）落地，只保留磁吸链路
- 改动：**HY-MODIFIED** —— import 改相对路径；删除同族其它变体
