# MorphingSearch 形变搜索

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

一个搜索框（或一个图标），点开后形变成玻璃质感的结果面板：输入即时过滤，↑↓ 选择，回车确认。支持全局快捷键唤起，也支持键盘完整操作。

## 效果

![MorphingSearch：输入框形态与图标形态](docs/images/morphing-search.png)

可交互 demo：`pnpm dev` 后打开 `#/morphing-search`；截图模式 `?only=morphing-search`。

> 静图是闭合态（一个输入框 + 一个图标按钮）。点开后的玻璃面板要实际操作才看得到。

## 安装

```bash
pnpm add @hyjkblj/morphing-search motion lucide-react
```

**8 个文件**：

```text
registry/morphing-search/
├── morphing-search.tsx   679L
└── lib/
    ├── ease.ts            68L
    ├── layers.ts          77L
    ├── i18n.tsx           90L  LocaleProvider / useMessages
    ├── utils.ts            7L
    └── hooks/
        ├── use-dismiss.ts     138L
        ├── use-on-open.ts      25L
        └── use-row-cursor.ts   87L
```

## 基础用法

```tsx
import { FolderOpen } from "lucide-react";
import { MorphingSearch, type MorphingSearchItem } from "@hyjkblj/morphing-search";

const items: MorphingSearchItem[] = [
  {
    id: "folder",
    title: "Project Folder",
    description: "Block · Files and previews",
    keywords: ["files", "overlay"],
    icon: FolderOpen,
  },
];

<MorphingSearch items={items} placeholder="搜索" shortcut="f" />
```

紧凑图标形态：

```tsx
<MorphingSearch items={items} iconOnly shortcut="" />
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `MorphingSearchItem[]` | — | **必填**。匹配 title / description / keywords |
| `placeholder` | `string` | `"Search"` | 输入框占位符，同时是**可访问名称** |
| `shortcut` | `string` | `"f"` | 在文本框外按此键唤起；传 `""` 关闭 |
| `iconOnly` | `boolean` | `false` | 闭合态渲染成一个图标按钮 |
| `emptyMessage` | `string` | `"No results found."` | 无匹配时的文案 |
| `open` / `defaultOpen` / `onOpenChange` | — | — | 受控 / 非受控展开 |
| `onQueryChange` | `(query: string) => void` | — | 输入变化 |
| `onSelect` | `(item) => void` | — | 选中回调（在 item 自己的 `onSelect` 之后），随后面板关闭 |
| `labels` | `Partial<{ placeholder, empty, close, dialog, results }>` | — | 覆盖内置文案 |
| `className` | `string` | — | 闭合态外壳类名 |

### MorphingSearchItem

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | ✅ | 结果行唯一 key |
| `title` | `string` | ✅ | 主文本，参与搜索匹配 |
| `description` | `string` | — | 副文本，也参与匹配 |
| `keywords` | `string[]` | — | 不显示但可被搜到的额外词 |
| `icon` | `LucideIcon` | — | 传**组件本身**（`FolderOpen`），不是 JSX |
| `onSelect` | `() => void` | — | 选中回调，早于组件的 `onSelect` |

## 样式与主题

没有 CSS 变量，也没有内置配色 token——面板的「玻璃感」来自组件内部的 `backdrop-blur` 与半透明底色，跟随站点主题。

文案支持三层覆盖：

1. 单个实例：`labels={{ empty: "没找到" }}`
2. 应用级：`<LocaleProvider locale="zh" messages={{ morphingSearch: {...} }}>`
3. 默认英文（组件内置）

## 注意事项

- **`shortcut` 默认是 `"f"`**，在输入框外按 f 就会唤起。页面上有多个搜索时要注意冲突；不需要就传 `""`。
- **`icon` 传组件而非 JSX**：`icon: FolderOpen`（正确）／`icon: <FolderOpen />`（错误）。这是本组件和其它几个组件不一致的地方。
- **`placeholder` 同时是可访问名称**。删掉或留空，屏幕阅读器就没有可读的名字了。
- **面板是 fixed 全屏遮罩 + 居中卡片**，和 `lib/layers.ts` 的层级栈联动，Esc 只关最上层。
- **中文分词不会做**：匹配是子串包含，输入「画布」能匹配到 description 里的「画布扫线文字」，但不会做拼音或分词。
- 无障碍：面板有 dialog 语义与 `aria-activedescendant` 行游标，↑↓ 移动、回车选中、Esc 关闭后焦点回到触发元素。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改为相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Morphing Search](https://beui.dev/components/blocks/morphing-search/overlay)
- 收录方式：registry JSON（`https://beui.dev/r/morphing-search`）原样落地，剔除 preview 文件
- 改动：**HY-MODIFIED** —— import 路径改为相对路径
