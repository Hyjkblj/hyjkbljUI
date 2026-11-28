# WaveReveal 波纹转场

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`

把两张界面用一道彩色波纹连起来：卡片先朝你按下的按钮收拢、按钮处聚光，然后波纹从按点扩散，沿途把画面像透镜一样弯曲（带轻微色散和模糊），新界面在波纹后面显出来，边缘留下一圈彩色余晖。

**不用 WebGL**：遮罩换界面，SVG 滤镜做弯曲，`backdrop-filter` 柔化波前。

## 效果

![WaveReveal：波纹正扫过卡片的中途帧](docs/images/wave-reveal.png)

可交互 demo：`pnpm dev` 后打开 `#/wave-reveal`；截图模式 `?only=wave-reveal`。加 `&wave=1` 会自动播放一次波纹（无交互环境下抓中间帧用）。

## 安装

```bash
pnpm add @hyjkblj/wave-reveal motion
```

4 个文件：`wave-reveal.tsx`（734L）+ `lib/{ease,focusable,utils}`。

> 原始 registry item 还捆了 `tabs.tsx` 和整套音效引擎（约 600 行），那是它 demo 页用的；本仓库收录时**已剔除**。

## 基础用法

```tsx
import { useRef, useState } from "react";
import { WaveReveal } from "@hyjkblj/wave-reveal";

const [sent, setSent] = useState(false);
const sendRef = useRef<HTMLButtonElement>(null);

<WaveReveal
  revealed={sent}
  sourceRef={sendRef}
  className="w-72 rounded-2xl border"
  revealedContent={
    <div className="p-5">
      <p className="text-sm font-medium">邀请已发送</p>
      <button onClick={() => setSent(false)}>好</button>
    </div>
  }
>
  <div className="p-5">
    <button ref={sendRef} onClick={() => setSent(true)}>发送邀请</button>
  </div>
</WaveReveal>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `revealed` | `boolean` | — | **必填**，切换即播放；切回会反向再走一遍 |
| `children` | `ReactNode` | — | **必填**，第一屏 |
| `revealedContent` | `ReactNode` | — | **必填**，波纹带进来的第二屏 |
| `type` | `"vertical" \| "horizontal" \| "center"` | `"vertical"` | 波前形状：横弧上下走 / 竖弧左右走 / 中心圆环 |
| `sourceRef` | `RefObject<HTMLElement>` | — | 波纹起点元素（通常是按钮）；不传就用卡内最后一次按点 |
| `duration` | `number` | `1.6` | 波纹穿过整屏的秒数；加上前后聚光与余晖约多 1.3s |
| `colors` | `string[]` | 琥珀/天蓝/粉/蜜桃/青 | 波前与边缘余晖的颜色 |
| `distortion` | `number` | `26` | 弯曲幅度（px），0 = 不弯 |
| `onRevealComplete` | `(revealed: boolean) => void` | — | 一次波纹结束时回调 |
| `className` | `string` | — | 根类名 |

## 样式与主题

没有 CSS 变量；颜色全走 `colors` 数组，弯曲走 `distortion`。

**内边距要放在两屏内部，不要放 WaveReveal 上**——波纹和边缘余晖铺满卡片的 padding box，外层加 padding 会把余晖挡在里面。

## 注意事项

- **必须传 `sourceRef` 才能覆盖键盘操作**：不传时波纹从「最后一次鼠标按点」出发，键盘回车触发就没有按点，会退回按 `type` 的默认起点（下边缘 / 左边缘 / 中心）。
- **两张界面会切换 `inert`**：只有当前显示的那屏可被读屏和聚焦；焦点会从旧屏移到新屏第一个控件。这点做得比多数转场组件扎实。
- **`duration` 不含前后两段**：实际总时长约 `duration + 1.3` 秒。连续触发要按总时长算节流。
- **`distortion` 依赖 SVG 滤镜**，某些低端设备上会掉帧；`0` 是安全的降级。
- `prefers-reduced-motion` 下退化为纯交叉淡入，没有收拢、波纹和弯曲。
- 组件不改尺寸，卡片高度由两屏内容撑开——**两屏高度差很大时卡片会跳**，建议给外层固定高度或让两屏内容量级接近。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；剔除捆绑的 tabs 与音效引擎；import 改相对路径；补 demo 与文档 |

## 出处

- 原组件：beUI · [Wave Reveal](https://beui.dev/components/motion/wave-reveal)
- 收录方式：registry JSON（`https://beui.dev/r/wave-reveal`）落地，只保留转场链路
- 改动：**HY-MODIFIED** —— import 改相对路径；删除无关文件
