# StatefulButton 状态按钮

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：experimental · 框架：仅 React · 来源：beUI · 依赖：`motion`、`lucide-react`

一个按钮走完 `idle → loading → success / error → idle`：文字带模糊淡出淡入，按钮宽度随文字自动变。适合保存、提交、支付这类有异步结果的动作。

## 效果

![StatefulButton：idle 态的两个按钮](docs/images/button-stateful.png)

可交互 demo：`pnpm dev` 后打开 `#/button-stateful`；截图模式 `?only=button-stateful`。点一下按钮能看到完整的状态流转。

## 安装

```bash
pnpm add @hyjkblj/button-stateful motion lucide-react
```

**9 个文件**（只保留 stateful 链路）：

```text
registry/button-stateful/
├── button/stateful.tsx   262L
├── button/base.tsx       212L
└── lib/{ease,i18n,sound,utils,audio-context}.ts(x) + lib/sounds/{press,engine}.ts
```

## 基础用法

```tsx
import { useState } from "react";
import { StatefulButton, type ButtonState } from "@hyjkblj/button-stateful";

const [state, setState] = useState<ButtonState>("idle");

<StatefulButton
  state={state}
  onClick={async () => {
    setState("loading");
    try {
      await save();
      setState("success");
    } catch {
      setState("error");
    }
  }}
  loadingText="保存中"
  successText="已保存"
  errorText="失败，重试"
>
  保存更改
</StatefulButton>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `state` | `"idle" \| "loading" \| "success" \| "error"` | `"idle"` | 当前状态；**loading 时自动禁用** |
| `loadingText` | `ReactNode` | `"Loading"` | loading 态文案 |
| `successText` | `ReactNode` | `"Done"` | success 态文案 |
| `errorText` | `ReactNode` | `"Try again"` | error 态文案 |
| `labels` | `Partial<{ loading, success, error }>` | — | 批量覆盖文案（i18n 用） |
| `icon` | `ReactNode` | — | 尾部图标，**只在 idle 态显示** |
| `variant` / `size` / `pressScale` / `ripple` / `sound` / `className` | 同 Base Button | — | 外观与交互参数 |

## 样式与主题

**依赖 shadcn 语义色**（`--color-primary`、`--color-secondary`、`--color-border` 等），playground 已补齐。

状态切换的动画在源码里：文字用 `AnimatePresence` + 模糊淡出，容器宽度用 `SPRING_SWAP` 弹簧过渡。

## 注意事项

- **`state` 完全受控**，组件不自己推进状态机。什么时候从 loading 变 success、多久回到 idle，都是调用方的事（demo 里用 `setTimeout` 演示）。
- **loading 时自动 `disabled`**，避免重复点击；success / error 态**不会**自动禁用，需要的话自己传 `disabled`。
- **宽度会随文案变化**，一排放多个按钮时，状态切换会让邻居位置跳动。介意的话给按钮固定 `className="w-40"`。
- **音效引擎占 450 行**（`engine.ts` + `audio-context.ts`），只为 `sound` 一个 prop 服务，不用可整组删掉。
- **和 `@hyjkblj/button-magnetic` 共用同一份 `base.tsx`**，但两个包各自带一份副本——registry 是"装哪个用哪个"的模型，重复是刻意的。
- 无障碍：loading 时按钮被禁用但**没有 `aria-busy`**，屏幕阅读器不会播报"正在加载"。需要的话在外层补 `aria-live`。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 从 beUI 收录；剔除 metallic / magnetic / index；import 改相对路径 |

## 出处

- 原组件：beUI · [Stateful Button](https://beui.dev/components/motion/button/stateful)
- 收录方式：registry JSON（`https://beui.dev/r/button-stateful`）落地，只保留 stateful 链路
- 改动：**HY-MODIFIED** —— import 改相对路径；删除同族其它变体
