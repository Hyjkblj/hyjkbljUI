# ExpandableActionBar 可展开工具条

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

一排图标按钮，hover 或键盘聚焦时展开成「图标 + 文字 + 快捷键提示」的控件，收起时只剩图标。高亮块用共享 layout 在按钮间滑动，标签带轻微模糊滑入。

## 效果

![ExpandableActionBar 收起状态](docs/images/expandable-action-bar.png)

可交互 demo：`pnpm dev` 后打开 `#/expandable-action-bar`；截图模式 `?only=expandable-action-bar`。

> 静图是收起态（只有图标 + 高亮块）。展开要 hover 或 Tab 聚焦，截图抓不到。

## 安装

```bash
pnpm add @hyjkblj/expandable-action-bar motion lucide-react
```

**8 个文件，不是单文件组件**：

```text
registry/expandable-action-bar/
├── expandable-action-bar.tsx   433L
└── lib/
    ├── ease.ts                  68L  弹簧常量
    ├── layers.ts                77L  层级栈
    ├── touch.ts                118L  指针类型判定（hover / touch）
    ├── utils.ts                  7L  cn
    └── hooks/
        ├── use-dismiss.ts      138L
        ├── use-hover-gesture.ts 62L
        └── use-tap-gesture.ts   67L
```

## 基础用法

```tsx
import {
  ExpandableActionBar,
  type ExpandableActionBarItem,
} from "@hyjkblj/expandable-action-bar";

const items: ExpandableActionBarItem[] = [
  { id: "send", label: "发送", icon: <Send className="h-4 w-4" />, shortcut: "S" },
  { id: "copy", label: "复制", icon: <Copy className="h-4 w-4" /> },
  { id: "alerts", label: "通知", icon: <Bell className="h-4 w-4" />, badge: "3" },
];

<ExpandableActionBar
  items={items}
  activeId={activeId}
  onAction={(item) => setActiveId(item.id)}
/>
```

受控展开：

```tsx
<ExpandableActionBar
  items={items}
  expanded={expanded}
  onExpandedChange={setExpanded}
  collapseDelay={200}
/>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `ExpandableActionBarItem[]` | — | **必填**，按顺序渲染 |
| `expanded` | `boolean` | — | 受控展开状态 |
| `defaultExpanded` | `boolean` | `false` | 非受控初始状态 |
| `onExpandedChange` | `(expanded: boolean) => void` | — | 展开状态变化 |
| `activeId` | `string` | — | 高亮项 id；不传则用 item 自己的 `active` |
| `onAction` | `(item) => void` | — | 动作执行后回调（在 item 自己的 `onClick` 之后） |
| `size` | `"sm" \| "md"` | `"md"` | 高度与间距 |
| `expandOnHover` | `boolean` | `true` | hover 展开。**同时控制触屏行为**：为 true 时第一次点只展开不触发动作，为 false 时每次点击立即执行 |
| `expandOnFocus` | `boolean` | `true` | 键盘聚焦进入时展开 |
| `collapseDelay` | `number` | `90` | 指针/焦点离开后延迟收起（ms） |
| `className` | `string` | — | 根元素类名 |
| `classNames` | `{ root, track, item, activeItem, icon, label, badge, shortcut }` | — | 按槽位覆盖内部样式 |
| `renderItem` | `(item, { expanded, active }) => ReactNode` | — | 完全自定义每一项的内容 |

### ExpandableActionBarItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | ✅ | 唯一 key，与 `activeId` 匹配 |
| `label` | `ReactNode` | ✅ | 展开时显示；**字符串会自动成为 title（tooltip）** |
| `icon` | `ReactNode` | ✅ | 始终显示的图标 |
| `onClick` | `() => void` | — | 点击回调，早于 `onAction` |
| `disabled` | `boolean` | — | 变灰且不可点 |
| `active` | `boolean` | — | 标记选中，应用 `classNames.activeItem` |
| `badge` | `ReactNode` | — | 角标，收起时贴在图标角上 |
| `shortcut` | `ReactNode` | — | 快捷键提示，展开后在宽屏显示 |

## 样式与主题

没有 CSS 变量，用 `classNames` 按槽位覆盖：

```tsx
<ExpandableActionBar
  items={items}
  classNames={{
    track: "bg-white dark:bg-neutral-900",
    activeItem: "text-sky-600",
    item: "group",
  }}
/>
```

动画曲线在 `lib/ease.ts`：`SPRING_LAYOUT`（高亮块滑动）、`SPRING_SWAP`（标签替换）。

## 注意事项

- **不是单文件组件**，8 个文件互相引用，只拷主文件会报错。
- **beUI 官方 demo 里的 `animate-action-send` / `animate-action-bell` 等类不在这个 registry item 里**。它的 `cssVars` 和 `css` 字段都是空的——那些微动效来自 beUI 站点自己的全局 CSS。装到别处就是**无效类名**（不报错，只是没效果）。本仓库的 demo 去掉了这些类，避免误以为能用。
- **`expandOnHover` 同时管触屏**：为 `true`（默认）时，手机上第一次点只展开、不执行动作——这是防误触的设计，但也意味着**触屏要两次点击**。希望一次点击就生效就传 `false`。
- **字符串 label 才自动生成 tooltip**。传 `<span>发送</span>` 这类 ReactNode 时，收起状态下按钮就没有可访问名称了，要自己补 `aria-label`。
- **高亮块依赖 `LayoutGroup`**，同一容器里放多个工具条时高亮会串，各用各的父级。
- 无障碍：每个动作都是真 `<button>`，聚焦任一项会展开整条，移出后收起；`prefers-reduced-motion` 下标签不滑动不模糊、按下缩放取消。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改为相对路径；demo 去掉未随包分发的 `animate-action-*` 类 |

## 出处

- 原组件：beUI · [Expandable Action Bar](https://beui.dev/components/blocks/expandable-action-bar)
- 收录方式：registry JSON（`https://beui.dev/r/expandable-action-bar`）原样落地，剔除 preview 文件
- 改动：**HY-MODIFIED** —— import 路径改为相对路径
