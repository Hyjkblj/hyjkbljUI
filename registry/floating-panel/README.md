# FloatingPanel 浮动面板

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Cult UI · 依赖：`motion`、`lucide-react`

点按钮，面板从**按钮所在位置**展开：按钮本身通过 `layoutId` 形变成面板标题栏，背景压一层模糊遮罩。一套 12 个组合件，能拼出表单、取色器、快捷菜单、图片预览。

## 效果

![FloatingPanel 三个触发按钮](docs/images/floating-panel.png)

可交互 demo：`pnpm dev` 后打开 `#/floating-panel`；截图模式 `?only=floating-panel`。

> 静图只有三个触发按钮——面板是点击后才出现的，得打开页面点一下。

## 安装

```bash
pnpm add @hyjkblj/floating-panel motion lucide-react
```

样式只用 Tailwind 的 zinc 色板 + `dark:` 变体，**不需要 shadcn 的语义色变量**（`--primary` 之类）。

## 基础用法

```tsx
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelBody,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
} from "@hyjkblj/floating-panel";

export function Actions() {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="快捷操作" className="rounded-md border px-4 py-2">
        <span>快捷操作</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-56">
        <FloatingPanelBody>
          <FloatingPanelButton onClick={doSomething}>新建文件</FloatingPanelButton>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}
```

带表单（回车提交、Esc 关闭）：

```tsx
<FloatingPanelForm onSubmit={(note) => save(note)}>
  <FloatingPanelBody>
    <FloatingPanelLabel htmlFor="note">内容</FloatingPanelLabel>
    <FloatingPanelTextarea id="note" className="min-h-[100px]" />
  </FloatingPanelBody>
  <FloatingPanelFooter>
    <FloatingPanelCloseButton />
    <FloatingPanelSubmitButton />
  </FloatingPanelFooter>
</FloatingPanelForm>
```

## API

12 个导出，必须按下面的嵌套关系组合：

| 组件 | 作用 | 关键 props |
| --- | --- | --- |
| `FloatingPanelRoot` | 提供 context（开合状态、note、标题、触发按钮 rect） | `children`、`className` |
| `FloatingPanelTrigger` | 触发按钮，`layoutId` 形变源 | `title`（必填，成为面板标题）、`className` |
| `FloatingPanelContent` | 面板本体，`fixed` 定位 + 遮罩 | `className`（宽度从这里给） |
| `FloatingPanelForm` | 包一层 `<form>`，接管提交 | `onSubmit(note: string)` |
| `FloatingPanelHeader` | 标题行（含返回按钮） | `className` |
| `FloatingPanelBody` | 内容区 | `className` |
| `FloatingPanelFooter` | 底部操作区 | `className` |
| `FloatingPanelLabel` | 表单标签 | `htmlFor` |
| `FloatingPanelTextarea` | 受控文本框，值存进 context 的 `note` | 原生 textarea 属性 |
| `FloatingPanelButton` | 面板内的普通按钮 | `onClick` |
| `FloatingPanelCloseButton` | 关闭按钮 | — |
| `FloatingPanelSubmitButton` | 提交按钮，触发 `FloatingPanelForm.onSubmit` | — |

嵌套关系：

```text
FloatingPanelRoot
├── FloatingPanelTrigger
└── FloatingPanelContent
    ├── FloatingPanelForm        (可选)
    │   ├── FloatingPanelBody
    │   │   ├── FloatingPanelLabel
    │   │   └── FloatingPanelTextarea
    │   └── FloatingPanelFooter
    │       ├── FloatingPanelCloseButton
    │       └── FloatingPanelSubmitButton
    └── FloatingPanelBody        (无表单时直接用)
```

## 样式与主题

没有 CSS 变量，全部是 Tailwind 类，而且**写死了 zinc 色板**：

| 想改的 | 怎么改 |
| --- | --- |
| 触发按钮外观 | `FloatingPanelTrigger` 的 `className`（会覆盖内置类） |
| 面板宽度 | `FloatingPanelContent` 的 `className="w-80"` |
| 面板底色 | 内置 `bg-white dark:bg-zinc-800`，覆盖要同时给亮/暗两套 |
| 动画手感 | 源码顶部 `TRANSITION = { type: "spring", bounce: 0.1, duration: 0.4 }` |
| 遮罩模糊强度 | `FloatingPanelContent` 里的 `backdrop-blur-*` |

## 注意事项

- **必须包在 `FloatingPanelRoot` 里**。脱离 context 会直接抛错：`useFloatingPanel must be used within a FloatingPanelProvider`。
- **`title` 是必填的**，它会成为面板标题，也是 `layoutId` 形变的锚点。
- **面板是 `position: fixed`**，位置由点击时记录的 `getBoundingClientRect()` 算出。所以：页面滚动后再打开，位置是按打开那一刻算的，滚动时不会跟随——需要跟随就得自己在滚动时重开。
- **打开状态下不能再点其他面板**：遮罩会挡住，这是有意为之；同一页面放多个 `Root` 互不干扰（各自独立 context 和 `useId`）。
- **`note` 存在 context 里**，关闭时会清空（`closeFloatingPanel` 里 `setNote("")`）。想保留草稿要自己提到外部 state。
- **无障碍只做了皮毛**：触发器有 `aria-haspopup="dialog"`，但 `aria-expanded` 写死 `false`；面板没有 `role="dialog"`、没有焦点陷阱、没有 `aria-modal`。正式项目要么补，要么换成 Radix Popover。
- 组件文件 949 行，后半段有大段注释掉的旧实现（`// ...`），不影响运行但会进产物。介意的话可以删掉再用。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Cult UI 收录，源码原样保留；补 demo 与文档 |

## 出处

- 原组件：Cult UI · [floating-panel](https://www.cult-ui.com/docs/components/floating-panel)
- 收录方式：registry JSON（`https://www.cult-ui.com/r/floating-panel.json`）原样落地
- 改动：无（仅在文件头加出处注释）
