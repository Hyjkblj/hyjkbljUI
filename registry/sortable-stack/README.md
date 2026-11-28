# SortableList 拖拽排序列表

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

拖手柄换顺序，行之间弹簧归位；拖起来的那行会轻微抬起。键盘也能排（↑↓ / Home / End），每次移动都有 live region 播报「第 2 项，共 5 项」，改完一键撤销。

## 效果

![SortableList：四项任务 + 撤销按钮](docs/images/sortable-stack.png)

可交互 demo：`pnpm dev` 后打开 `#/sortable-stack`；截图模式 `?only=sortable-stack`。

## 安装

```bash
pnpm add @hyjkblj/sortable-stack motion lucide-react
```

5 个文件：`sortable-list.tsx`（473L，真正实现）、`sortable-stack.tsx`（25L，含 `SortableStack` 别名再导出）、`lib/{ease,i18n,utils}`。

## 基础用法

```tsx
import {
  SortableList, SortableListGroup, SortableListItem,
  SortableListHandle, SortableListItemContent, SortableListUndo,
} from "@hyjkblj/sortable-stack";

<SortableList defaultItems={tasks} getItemLabel={(t) => t.title}>
  {(items) => (
    <>
      <SortableListGroup>
        {items.map((item) => (
          <SortableListItem key={item.id} id={item.id}>
            <SortableListHandle />
            <SortableListItemContent>{item.title}</SortableListItemContent>
          </SortableListItem>
        ))}
      </SortableListGroup>
      <SortableListUndo />
    </>
  )}
</SortableList>
```

偷懒版（不写 parts）：

```tsx
<SortableList items={tasks} renderItem={(t) => t.title} getItemLabel={(t) => t.title} />
```

## API

### SortableList（根）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `getItemLabel` | `(item) => string` | — | **必填**，手柄标签与移动播报都用它 |
| `items` / `defaultItems` / `onItemsChange` | `T[]` | `[]` | 受控 / 非受控 |
| `children` | `ReactNode \| ((items: T[]) => ReactNode)` | — | 传函数拿到当前顺序 |
| `renderItem` | `(item, index) => ReactNode` | — | 便捷行内容，配合默认布局 |
| `label` | `string` | `"Sortable items"` | 列表的可访问名称 |
| `disabled` | `boolean` | `false` | 关掉拖拽、键盘移动与撤销 |
| `showUndo` | `boolean` | `true` | 便捷布局里是否带撤销按钮 |
| `itemClassName` / `className` | `string` | — | 行 / 根类名 |
| `labels` | `Partial<{ label, instructions, moved, restored, reorder, undo }>` | — | 覆盖内置文案 |

### 子组件

| 组件 | 关键 props |
| --- | --- |
| `SortableListItem` | `id`（必填，同时用作 key） |
| `SortableListHandle` | `className`（真实 `<button>`，标签是 "Reorder + 项名"） |
| `SortableListItemContent` | `className` |
| `SortableListGroup` / `SortableListUndo` | `className` |

另有 `useSortableList` hook，暴露 `canUndo` / `undo` / `moveItem` 供自定义控件。

## 样式与主题

**依赖 shadcn 语义色**（`--color-border`、`--color-muted-foreground`），playground 已补齐。行样式用 `itemClassName` 统一改。

## 注意事项

- **`getItemLabel` 是必填的**，缺了手柄标签和播报都为空，读屏用户完全不知道在拖什么。
- **`id` 必须同时用作 React `key`**，否则拖动后 React 复用错节点，动画会错乱。
- **默认文案是英文**（`Undo reorder`、`Reorder` 等）。中文界面要传 `labels` 覆盖，否则截图里那个 "Undo reorder" 就是原样。
- **拖拽靠 motion 的 `Reorder` 组件**，只能纵向排；横向排序要自己改。
- **`disabled` 会同时关掉拖拽、键盘移动和撤销**，没有单独开关。
- `prefers-reduced-motion` 下取消弹簧和抬起效果，但排序功能照常。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Sortable List](https://beui.dev/components/motion/sortable-stack)
- 收录方式：registry JSON（`https://beui.dev/r/sortable-stack`）原样落地，剔除 preview
- 改动：**HY-MODIFIED** —— import 改相对路径
