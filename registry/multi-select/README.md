# MultiSelect 多选下拉

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

可搜索的多选：选中项在输入框里变成带 × 的 token，选项列表在 portal 里弹簧展开、自动避让碰撞，支持分组、模糊搜索、键盘全流程操作。

## 效果

![MultiSelect：两个已选 token](docs/images/multi-select.png)

可交互 demo：`pnpm dev` 后打开 `#/multi-select`；截图模式 `?only=multi-select`。

## 安装

```bash
pnpm add @hyjkblj/multi-select motion lucide-react
```

**16 个文件、约 1850 行**：

```text
registry/multi-select/
├── multi-select/
│   ├── index.tsx          39L   出口
│   ├── context.tsx       303L   选中值 / 搜索 / 开合状态
│   ├── trigger.tsx       276L   触发器 + token
│   ├── list.tsx          253L   选项列表
│   ├── content.tsx        38L   portal 面板
│   └── messages.ts        19L   文案
├── combobox/
│   ├── use-filtered-options.ts  140L  子序列匹配
│   ├── use-active-option.ts     131L  键盘游标
│   └── listbox-panel.tsx        160L
├── popover-position.ts    87L   碰撞避让
└── lib/{ease,i18n,layers,merge-refs,utils} + hooks/use-dismiss
```

## 基础用法

```tsx
import {
  MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectInput,
  MultiSelectContent, MultiSelectList, MultiSelectGroup, MultiSelectLabel,
  MultiSelectItem, MultiSelectEmpty,
} from "@hyjkblj/multi-select";

<MultiSelect defaultValue={["design"]} onValueChange={setValues}>
  <MultiSelectTrigger>
    <MultiSelectValue placeholder="选择团队" />
    <MultiSelectInput aria-label="搜索团队" />
  </MultiSelectTrigger>
  <MultiSelectContent>
    <MultiSelectList ariaLabel="团队">
      <MultiSelectGroup>
        <MultiSelectLabel>产品团队</MultiSelectLabel>
        <MultiSelectItem value="design" textValue="Design">Design</MultiSelectItem>
      </MultiSelectGroup>
      <MultiSelectEmpty>没有匹配项。</MultiSelectEmpty>
    </MultiSelectList>
  </MultiSelectContent>
</MultiSelect>
```

## API

### MultiSelect（根）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` / `defaultValue` / `onValueChange` | `string[]` | `[]` | 受控 / 非受控选中值 |
| `open` / `defaultOpen` / `onOpenChange` | — | `false` | 受控 / 非受控开合 |
| `query` / `defaultQuery` / `onQueryChange` | `string` | `""` | 受控 / 非受控搜索词 |
| `filter` | `(value, query, keywords) => boolean` | 子序列匹配 | 自定义匹配规则 |
| `disabled` | `boolean` | `false` | 禁用 |
| `labels` | `Partial<{ valuePlaceholder, removeValue, inputLabel, inputPlaceholder, listLabel, empty }>` | — | 覆盖内置文案 |

### 子组件

| 组件 | 关键 props |
| --- | --- |
| `MultiSelectTrigger` | `className` |
| `MultiSelectValue` | `placeholder`、`className`、`chipClassName`；children 可传函数自定义每个 token |
| `MultiSelectInput` | `showIcon`（搜索图标）、`ref`、`aria-label` |
| `MultiSelectContent` | `side`（top/bottom）、`align`、`sideOffset`、`avoidCollisions` |
| `MultiSelectList` | `ariaLabel`（默认 "Options"） |
| `MultiSelectItem` | `value`（必填）、`textValue`、`keywords`、`disabled`、`onSelect` |
| `MultiSelectGroup` / `MultiSelectLabel` / `MultiSelectSeparator` / `MultiSelectEmpty` | `className` |

## 样式与主题

**依赖 shadcn 语义色**（`--color-border`、`--color-muted`、`--color-foreground` 等），playground 已补齐。

token 外观用 `chipClassName`，面板宽度用 `MultiSelectContent` 的 `className`。

## 注意事项

- **默认匹配是「子序列」而不是「包含」**：输入 `dsgn` 能匹配 `Design`（字符按顺序出现即可）。想改成包含匹配，传自定义 `filter`。
- **`MultiSelectItem` 的 label 不是纯文本时必须传 `textValue`**，否则搜索和 token 文字都拿不到内容。
- **面板走 portal + 碰撞避让**，所以不受父级 `overflow: hidden` 影响——这点比多数自绘下拉强。
- **选完不关闭**，可以连续多选；要关得按 Esc 或点外部。
- **空输入框按退格删最后一个 token**，这是内置行为，不需要自己实现。
- 16 个文件互相引用，**只拷主文件跑不起来**。
- 无障碍做得完整：`role="combobox"` + `aria-activedescendant`、`listbox` + `aria-multiselectable`、token 的删除按钮带选项名；`prefers-reduced-motion` 下取消位移。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Multi Select](https://beui.dev/components/motion/multi-select)
- 收录方式：registry JSON（`https://beui.dev/r/multi-select`）原样落地，剔除 preview
- 改动：**HY-MODIFIED** —— import 改相对路径
