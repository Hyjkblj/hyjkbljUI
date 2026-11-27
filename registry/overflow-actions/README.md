# OverflowActions 溢出操作条

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

一条连体的胶囊工具条：主操作（预览、置顶）常驻，右侧「⋯」点开后整条轨道用弹簧变宽，次级操作淡入滑出。比下拉菜单轻，比塞满图标更省空间。

## 效果

![OverflowActions 收起态：两个主操作 + 更多按钮](docs/images/overflow-actions.png)

可交互 demo：`pnpm dev` 后打开 `#/overflow-actions`；截图模式 `?only=overflow-actions`。

> 静图是收起态。展开要点击「⋯」，截图抓不到。

## 安装

```bash
pnpm add @hyjkblj/overflow-actions motion lucide-react
```

**5 个文件**：

```text
registry/overflow-actions/
├── overflow-actions.tsx          419L
└── lib/
    ├── ease.ts                    68L
    ├── i18n.tsx                   90L  LocaleProvider / useMessages
    ├── utils.ts                    7L
    └── hooks/use-hover-capable.ts 24L  判定设备是否支持 hover
```

## 基础用法

```tsx
import { CalendarClock, Eye, GitBranch, Pin } from "lucide-react";
import { OverflowActions, type OverflowActionItem } from "@hyjkblj/overflow-actions";

const primary: OverflowActionItem[] = [
  { id: "preview", label: "预览", icon: <Eye className="h-4 w-4" /> },
  { id: "pin", label: "置顶", icon: <Pin className="h-4 w-4" /> },
];

const overflow: OverflowActionItem[] = [
  { id: "branch", label: "分支", icon: <GitBranch className="h-4 w-4" /> },
  { id: "schedule", label: "定时", icon: <CalendarClock className="h-4 w-4" /> },
];

<OverflowActions
  primaryActions={primary}
  overflowActions={overflow}
  collapseOnAction
  onAction={(item) => console.log(item.id)}
/>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `primaryActions` | `OverflowActionItem[]` | — | **必填**，常驻显示 |
| `overflowActions` | `OverflowActionItem[]` | — | **必填**，展开后显示 |
| `expanded` / `defaultExpanded` / `onExpandedChange` | — | `false` | 受控 / 非受控展开 |
| `onAction` | `(item) => void` | — | 任意按钮按下后回调（在 item 自己的 `onClick` 之后） |
| `collapseOnAction` | `boolean` | `false` | 执行任意操作后自动收起 |
| `size` | `"sm" \| "md"` | `"md"` | 按钮与间距尺寸 |
| `openLabel` / `closeLabel` | `string` | 内置英文 | 切换按钮的可访问名称（收起 / 展开两态） |
| `labels` | `Partial<{ open, close }>` | — | 覆盖内置文案 |
| `className` | `string` | — | 根元素类名 |
| `classNames` | `{ root, track, action, primaryAction, overflowAction, toggle, icon, label }` | — | 按槽位覆盖 |

### OverflowActionItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | ✅ | 唯一 key |
| `label` | `ReactNode` | ✅ | 按钮文字；**字符串会自动成为 tooltip** |
| `icon` | `ReactNode` | — | 文字前的图标 |
| `onClick` | `() => void` | — | 点击回调，早于 `onAction` |
| `disabled` | `boolean` | — | 变灰且不可点 |
| `ariaLabel` | `string` | — | label 不是纯文本时，用它给按钮可访问名称 |

## 样式与主题

没有 CSS 变量，用 `classNames` 按槽位覆盖：

```tsx
<OverflowActions
  primaryActions={primary}
  overflowActions={overflow}
  classNames={{
    track: "bg-white dark:bg-neutral-900",
    overflowAction: "text-sky-600",
  }}
/>
```

弹簧参数在 `lib/ease.ts`（`SPRING_LAYOUT` 用于轨道变宽）。

## 注意事项

- **`primaryActions` 和 `overflowActions` 都是必填**，哪怕只想要主操作，也要传空数组 `[]`。
- **`label` 是 ReactNode 但字符串才会生成 tooltip**。传图标或组件时按钮就没有可访问名称，要补 `ariaLabel`。
- **`collapseOnAction` 默认 `false`**：连点多个次级操作时保持展开，适合批量操作；只做单次操作建议设 `true`。
- **展开态靠弹簧改宽度**，父容器需要给够水平空间；在窄屏（如移动端列表行）里展开可能溢出，建议配合 `overflow-x` 或改用下拉菜单。
- 无障碍：切换按钮有 `aria-expanded` + `aria-controls`，展开/收起两套 `label` 会切换；`prefers-reduced-motion` 下只淡入不改尺寸。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改为相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Overflow Actions](https://beui.dev/components/blocks/overflow-actions)
- 收录方式：registry JSON（`https://beui.dev/r/overflow-actions`）原样落地，剔除 preview 文件
- 改动：**HY-MODIFIED** —— import 路径改为相对路径
