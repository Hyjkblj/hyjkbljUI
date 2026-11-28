# AppleProDisplayXDR Pro Display XDR

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：Cult UI · 依赖：`motion`、`@tabler/icons-react`

纯 CSS/SVG 复刻的 Apple Pro Display XDR：铝框、倒角高光、摄像头、绿色录制灯、背部支架，屏幕里还有四种内置演示内容（渐变壁纸、调色界面、修图界面、静态壁纸）。

## 效果

![Pro Display XDR：铝框 + 渐变壁纸 + macOS Dock](docs/images/apple-pro-display-xdr.png)

可交互 demo：`pnpm dev` 后打开 `#/apple-pro-display-xdr`；截图模式 `?only=apple-pro-display-xdr`。

## 安装

```bash
pnpm add @hyjkblj/apple-pro-display-xdr motion @tabler/icons-react
```

**3 个文件**（主文件 1129 行 + 两个替身）：

```text
registry/apple-pro-display-xdr/
├── apple-pro-display-xdr.tsx   1129L
└── lib/
    ├── next-image.tsx            40L   next/image 替身
    └── base-tooltip.tsx          80L   base-ui Tooltip 替身
```

## 基础用法

```tsx
import { AppleProDisplayXDR } from "@hyjkblj/apple-pro-display-xdr";

// 用内置屏幕内容
<AppleProDisplayXDR initialMode="gradient" />

// 换成自己的截图
<AppleProDisplayXDR
  screenContent={
    <img src="/my-shot.png" alt="" className="size-full object-cover" />
  }
/>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `initialMode` | `"wallpaper" \| "photo" \| "gradient" \| "grading"` | `"wallpaper"` | 初始屏幕内容 |
| `screenContent` | `ReactNode` | — | 传了就完全替换内置屏幕 |
| `className` | `string` | — | 外层类名 |

内部还导出了 `AppleStudioDisplayProps` 类型和若干子组件（支架、摄像头、Dock 等），正常使用不需要碰。

## 样式与主题

没有 CSS 变量，颜色全部写死在源码顶部的 tokens 里：

| token | 用途 |
| --- | --- |
| `brushLo` / `brushHi` | 铝框拉丝的两端色 |
| `chamfer` | 倒角高光 |
| `bezel` | 屏幕黑边 |
| `cameraDot` | 摄像头 |
| `led` | 录制指示灯（`#30d158`） |

改配色直接改这几个常量。

## 注意事项

- **两个依赖被替换成了本地替身**（HY-MODIFIED）：
  - `next/image` → `lib/next-image.tsx`（本仓库不用 Next，替身复刻了 `fill` 行为）
  - `@base-ui/react` + `@radix-ui/react-slot` → `lib/base-tooltip.tsx`（为了两个悬停提示引入两个运行时依赖不值，用 80 行无依赖实现替代）
  - 需要完整无障碍/碰撞检测的 tooltip，把导入换回原版即可。
- **`initialMode="wallpaper"`（默认）需要 `/public/product-images/apple-wallpaper.jpg`**。没有这张图就是空屏——demo 用的是 `gradient` 模式，不依赖任何图片资源。
- **体积大**：单文件 1129 行，包含四种屏幕 UI 的完整标记。只想要显示器外壳的话，可以删掉 `DefaultScreen` 和四个 screen 组件。
- **绿色录制灯靠 hover 触发**：鼠标移到摄像头区域会亮一下，这是装饰性的交互，没有实际录制功能。
- 组件是纯展示，没有 `role`/`aria` 语义；当作插图用建议外层补 `aria-hidden` 或替代文本。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 Cult UI 收录；`next/image` 与 base-ui Tooltip 换成本地替身；补 demo 与文档 |

## 出处

- 原组件：Cult UI · [apple-pro-display-xdr](https://www.cult-ui.com/docs/components/apple-pro-display-xdr)
- 收录方式：registry JSON（`https://www.cult-ui.com/r/apple-pro-display-xdr.json`）落地，剔除 preview
- 改动：**HY-MODIFIED** —— 两处导入改为本地替身（见上）
