# Tabs 标签页

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

带弹簧指示器的标签页：指示器用 `layoutId` 在标签之间滑动，而不是每块各自淡入。三种样式（pill / segment / underline），支持图标，长列表横向滚动并带边缘渐隐和翻页箭头。API 组合方式与 shadcn tabs 一致。

## 效果

![Tabs：pill / segment / underline / 图标 / 溢出滚动](docs/images/tabs.png)

可交互 demo：`pnpm dev` 后打开 `#/tabs`；截图模式 `?only=tabs`。

## 安装

```bash
pnpm add @hyjkblj/tabs motion lucide-react
```

8 个文件：`tabs.tsx`（707L）+ `lib/{ease,i18n,utils}` + 音效链路 `lib/{sound,audio-context}.tsx` 与 `lib/sounds/{select,engine}.ts`。

## 基础用法

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hyjkblj/tabs";

<Tabs defaultValue="overview" variant="pill">
  <TabsList>
    <TabsTrigger value="overview">概览</TabsTrigger>
    <TabsTrigger value="activity">动态</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">高层汇总。</TabsContent>
  <TabsContent value="activity">最近发生的事。</TabsContent>
</Tabs>
```

带图标（只在选中时展开）：

```tsx
<Tabs defaultValue="home" icons="selected">
  <TabsList>
    <TabsTrigger value="home" icon={<Home className="size-3.5" />}>首页</TabsTrigger>
    <TabsTrigger value="stats" icon={<BarChart3 className="size-3.5" />}>统计</TabsTrigger>
  </TabsList>
</Tabs>
```

## API

### Tabs

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `"pill" \| "segment" \| "underline"` | `"pill"` | 选中样式 |
| `icons` | `"always" \| "selected"` | `"always"` | `selected` 时图标只在选中项展开 |
| `value` / `defaultValue` / `onValueChange` | `string` | — | 受控 / 非受控 |
| `sound` | `boolean` | `false` | 切换时播放轻响 |
| `labels` | `Partial<{ scrollLeft, scrollRight }>` | — | 滚动箭头的可访问名称 |
| `className` | `string` | — | 根类名 |

### 子组件

| 组件 | 关键 props |
| --- | --- |
| `TabsList` | `className` |
| `TabsTrigger` | `value`、`icon`、`className` |
| `TabsContent` | `value`（**必填**，对应触发器的 value）、`className` |

## 样式与主题

**依赖 shadcn 语义色**（`--color-foreground`、`--color-muted`、`--color-border`），playground 已补齐。

指示器曲线在 `lib/ease.ts`。

## 注意事项

- **`TabsContent` 的 `value` 必须和 `TabsTrigger` 对上**，写错就是空白面板，没有报错。
- **`icons="selected"` 会让选中项宽度变化**，一排标签会互相挤动；标签数量多时建议保持 `always`。
- **溢出滚动是内置的**：`TabsList` 超出容器宽会自动出现边缘渐隐和左右箭头，不需要自己包滚动容器。
- **音效链路占 450 行**（`engine.ts` 318 + `audio-context.ts` 132），只为 `sound` 一个 prop 服务，不用可整组删掉。
- 无障碍完整：`tablist` / `tab` / `tabpanel` 角色齐备，方向键移动（RTL 镜像）、Home/End 跳首尾；`prefers-reduced-motion` 下取消面板滑动。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Tabs](https://beui.dev/components/motion/tabs)
- 收录方式：registry JSON（`https://beui.dev/r/tabs`）原样落地，剔除 preview
- 改动：**HY-MODIFIED** —— import 改相对路径
