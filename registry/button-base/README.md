# Button 基础按钮

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

最基础的一颗按钮：按下有轻微弹簧缩放，可选水波与音效，四种变体、四种尺寸。另带一个 `ButtonLink`——外观一样但渲染成 `<a>`。磁吸按钮和状态按钮都建在它上面。

## 效果

![Button：四种变体 / 四种尺寸 / 水波 / 链接](docs/images/button-base.png)

可交互 demo：`pnpm dev` 后打开 `#/button-base`；截图模式 `?only=button-base`。

## 安装

```bash
pnpm add @hyjkblj/button-base motion lucide-react
```

**7 个文件**（只保留 base 链路）：

```text
registry/button-base/
├── button/base.tsx    212L   Button + ButtonLink
└── lib/{ease,sound,utils,audio-context}.ts(x) + lib/sounds/{press,engine}.ts
```

## 基础用法

```tsx
import { ArrowRight } from "lucide-react";
import { Button, ButtonLink } from "@hyjkblj/button-base";

<Button variant="primary" size="md" onClick={save}>
  继续 <ArrowRight className="h-4 w-4" />
</Button>

<Button variant="outline" size="md" ripple>
  点我出水波
</Button>

<ButtonLink href="/docs" variant="secondary">
  链接按钮
</ButtonLink>
```

## API

### Button

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost"` | `"primary"` | 视觉样式 |
| `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | 尺寸；`icon` 为方形图标按钮 |
| `pressScale` | `number` | `0.97` | 按下缩放，故意很轻 |
| `ripple` | `boolean` | `false` | 从点击点生成 Material 水波 |
| `sound` | `boolean` | `false` | 按下音效（可被 `SoundProvider` 全局静音） |
| `className` | `string` | — | 类名 |

其余属性透传给内部 `<button>`。

### ButtonLink

同样的 `variant` / `size` / `pressScale` / `className`，外加 `href` 等链接属性；**没有** `ripple` 与 `sound`。

## 样式与主题

**依赖 shadcn 语义色**：`--color-primary` / `--color-primary-foreground` / `--color-secondary` / `--color-secondary-foreground` / `--color-border`。playground 已补齐。

按压曲线在 `lib/ease.ts` 的 `SPRING_PRESS`。

## 注意事项

- **需要语义色变量**，纯 Tailwind 项目要自己定义，否则 `primary` 变体背景透明。
- **`ripple` 与 `sound` 都是 opt-in**，默认关。水波在按钮内部生成绝对定位的圆，按钮需要 `position: relative`（组件自带）。
- **`size="icon"` 必须配 `aria-label`**，否则屏幕阅读器只读到一个空按钮。
- **音效引擎占 450 行**（`engine.ts` + `audio-context.ts`），不用 `sound` 可整组删掉。
- 和 `button-magnetic` / `button-stateful` **共用同一份 `base.tsx`**，但三个包各带一份副本——registry 模型下这是刻意的重复。
- 无障碍：真 `<button>`，键盘可聚焦；`disabled` 时原生禁用，但没有额外的 `aria-disabled` 说明原因。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；剔除 metallic / magnetic / stateful / index；import 改相对路径 |

## 出处

- 原组件：beUI · [Base Button](https://beui.dev/components/motion/button/base)
- 收录方式：registry JSON（`https://beui.dev/r/button-base`）落地，只保留 base 链路
- 改动：**HY-MODIFIED** —— import 改相对路径；删除同族其它变体
