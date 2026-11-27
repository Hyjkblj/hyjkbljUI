# Select 动画下拉选择

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

可组合的 select：面板从触发器上「捏」出来、再分离成独立卡片，位置不够时自动向上弹。另有 **Morph 变体**——触发器本身通过共享 layout 长成面板，关闭时缩回去，始终是一块连续的表面。

## 效果

![Select 两种变体：默认版与 morph 版](docs/images/select.png)

可交互 demo：`pnpm dev` 后打开 `#/select`；截图模式 `?only=select`。

## 安装

**一个包，两个入口**：

```bash
pnpm add @hyjkblj/select motion lucide-react
```

```tsx
import { Select } from "@hyjkblj/select";        // 默认版
import { MorphSelect } from "@hyjkblj/select/morph"; // morph 版
```

### 文件结构（17 个文件，不是单文件组件）

```text
registry/select/
├── select.tsx                    643L  默认版
├── select-morph.tsx              571L  morph 版
├── menu/menu-item-highlight.tsx   42L  选项高亮块
└── lib/
    ├── ease.ts                    68L  弹簧曲线常量
    ├── layers.ts                  77L  层级栈（Esc 只关最上层）
    ├── utils.ts                    7L  cn
    ├── sound.tsx                 102L  SoundProvider / useSound
    ├── presence-gate.tsx          53L  morph 版专用
    ├── audio-context.ts          132L  AudioContext 复用
    ├── sounds/{open,close,select}.ts    音效定义
    ├── sounds/engine.ts          318L  Web Audio 合成引擎
    └── hooks/
        ├── use-dismiss.ts        138L  点击外部 / Esc 关闭
        ├── use-listbox.ts        108L  键盘导航 + 首字母跳转
        ├── use-on-open.ts         25L
        └── use-row-cursor.ts      87L  行光标跟随
```

**复制源码时要把整个目录一起带走**，只拷 `select.tsx` 是跑不起来的。

## 基础用法

```tsx
import { useState } from "react";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@hyjkblj/select";

export function FrameworkPicker() {
  const [value, setValue] = useState("next");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="选一个框架" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

Morph 变体只换组件名：

```tsx
import {
  MorphSelect, MorphSelectTrigger, MorphSelectValue,
  MorphSelectContent, MorphSelectItem,
} from "@hyjkblj/select/morph";

<MorphSelect value={value} onValueChange={setValue}>
  <MorphSelectTrigger>
    <MorphSelectValue placeholder="选一个框架" />
  </MorphSelectTrigger>
  <MorphSelectContent>
    <MorphSelectItem value="next">Next.js</MorphSelectItem>
  </MorphSelectContent>
</MorphSelect>
```

## API

### Select（默认版）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `string` | — | 受控选中值 |
| `defaultValue` | `string` | — | 非受控初始值 |
| `onValueChange` | `(value: string) => void` | — | 选中回调 |
| `open` | `boolean` | — | 受控展开状态 |
| `defaultOpen` | `boolean` | `false` | 非受控初始展开 |
| `onOpenChange` | `(open: boolean) => void` | — | 展开状态变化 |
| `disabled` | `boolean` | `false` | 禁用 |
| `sound` | `boolean` | `false` | 开关音效（打开 / 关闭 / 选中三种） |
| `className` | `string` | — | 根元素类名 |

### MorphSelect

比默认版少两个：**没有** `open` / `defaultOpen` / `onOpenChange`（morph 动画依赖自身状态，不支持受控展开），其余一致。

### 子组件

| 组件 | 关键 props |
| --- | --- |
| `SelectTrigger` / `MorphSelectTrigger` | `className` |
| `SelectValue` / `MorphSelectValue` | `placeholder`（默认 `"Select"`）、`className` |
| `SelectContent` / `MorphSelectContent` | `className` |
| `SelectItem` / `MorphSelectItem` | `value`（必填）、`disabled`、`className` |

## 样式与主题

没有 CSS 变量。选项高亮走 `MENU_ITEM_CLASS`（`menu/menu-item-highlight.tsx`），要统一改外观就改那个文件或传 `className`。

动画曲线集中在 `lib/ease.ts`：

| 常量 | 用途 |
| --- | --- |
| `SPRING_LAYOUT` | 面板形变 |
| `SPRING_MORPH` | morph 版触发器→面板 |
| `EASE_OUT` | 行入场 |

## 注意事项

- **它不是单文件组件**。17 个文件互相引用，只拷主文件必然报错。
- **音效引擎是可选负担**：`lib/sounds/engine.ts` 318 行 + `audio-context.ts` 132 行，纯为 `sound` 这一个 prop 服务。不需要音效的话，删掉 `sound.tsx` / `sounds/` / `audio-context.ts` 并去掉调用点，能少 500 行左右——但那是改源码，本仓库收录时保持原样。
- **面板是 `absolute` 定位在字段内部**（不是 portal）。所以**同一屏堆叠多个 select 时，两个同时展开会互相盖住选项**。源码注释明确建议用 `open` + `onOpenChange` 自己维护「同时只开一个」。
- **Esc 只关最上层**：靠 `lib/layers.ts` 的全局层级栈，如果你自己在别处也监听 Esc，注意别抢。
- **morph 版不支持受控展开**（没有 `open`），需要程序化控制开合时只能用默认版。
- **音效需要用户手势**：浏览器要求 AudioContext 在用户交互后才能启动，首次点击前不会响，这是浏览器限制不是 bug。
- 无障碍做得比较完整：触发器有 `aria-haspopup` / `aria-expanded` / `aria-controls`，面板 `role="listbox"`，选项 `role="option"` + `aria-selected`；支持 ↑↓ / Home / End / 首字母 / Esc，关闭后焦点回到触发器；`prefers-reduced-motion` 下退化为淡入。
- 本仓库改动：**内部 import 从 `@/lib/*`、`@/components/motion/*` 改成了相对路径**（HY-MODIFIED），这样源码不依赖任何路径别名。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录 select 与 select-morph，合并为一个包；import 改为相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Select](https://beui.dev/components/motion/select)
- 收录方式：两个 registry item（`@beui/select`、`@beui/select-morph`）合并到同一目录，共用 `lib/`
- 改动：**HY-MODIFIED** —— import 路径改为相对路径
