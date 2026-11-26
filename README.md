# Hycomponents

> 自用前端组件集 · **React & Vue** · 一个组件一个子包
> 每个组件一份说明文档：**有效果，有用法**。

---

## 这是什么

Hycomponents 不是要对标任何开源 UI 库。它只解决一个具体问题：

好用的组件散落在各个项目里，每开一个新项目就要重新找一遍、改一遍、踩一遍同样的坑。

所以这里的规矩很简单——**碰到真正好用的组件就收进来，收进来就写清楚**。一个组件能不能进这个库，不看它多酷，看三件事：

1. 自己在真实项目里用过，并且下次还想用；
2. 文档能让半年后的自己（或者别人）不用问人就能用起来；
3. 效果看得见——有图、有能跑的 demo。

> **当前状态**：骨架已搭（pnpm workspace + playground + Tailwind v4），已收录 5 个组件：
> [macbook-scroll](registry/macbook-scroll/README.md)（滚动驱动的笔记本开盖动效）、
> [canvas-text](registry/canvas-text/README.md)（画布扫线文字）、
> [wobble-card](registry/wobble-card/README.md)（跟随鼠标的摇摆卡片）、
> [typewriter-effect](registry/typewriter-effect/README.md)（打字机文字）、
> [floating-dock](registry/floating-dock/README.md)（macOS 风格 Dock）。都是仅 React。
> 自研双框架组件从 `packages/button` 开始。

---

## 两种组件

这个库分两层，**因为两类组件的本质不一样**：

| | 自研层 | 收录层 |
| --- | --- | --- |
| 目录 | `packages/<name>/` | `registry/<name>/` |
| 来源 | 自己写 | 外部成品（Aceternity、shadcn 生态等），原样收进来 |
| 框架 | **React + Vue 双份** | 通常单框架，按实际标注 |
| 依赖 | 除 React / Vue 外零运行时依赖 | 允许（`motion`、`@tabler/icons-react` 等），但必须列全 |
| 样式 | 原生 CSS + CSS 变量 | 沿用 Tailwind |
| 适用 | 通用交互件：按钮、弹窗、表单、虚拟列表 | 视觉型组件：动效、滚动叙事、装饰性布局 |

**为什么要这么分**：市面上那些"哇"一声的动效组件，基本都长在 Tailwind + motion 生态里，强行要求 React/Vue 双份等于把这个库做死。反过来，天天要用的按钮弹窗要是带了三个依赖和一堆 Tailwind 类，那也不叫组件包，叫复制粘贴。

所以：**自研层保干净，收录层保好用。** 两层都遵守同一份文档规范。

---

## 设计原则

| # | 原则 | 含义 |
| --- | --- | --- |
| 1 | **一包一组件** | 一个目录只放一个组件。不做"大而全"的集合包，用哪个装哪个，不用的代码不进产物。 |
| 2 | **框架显式声明** | 每个组件必须写明支持哪些框架（React / Vue）。自研层要求双份，收录层可以只有一份，但不许含糊——清单和文档里都得标出来。 |
| 3 | **效果先行** | 文档里先给能看的东西（截图 / 可交互 demo），再给用法。看不到效果，就说明这个组件没做完。 |
| 4 | **依赖透明** | 引入了什么，为什么值这个体积，必须在文档里写清楚。做不到就别收。 |
| 5 | **样式可控** | 自研层走 CSS 变量；收录层沿用 Tailwind 类。两层都必须写清楚"想改成我的样子要动哪里"。 |

---

## 目录结构

```text
Hycomponents/
├── packages/                       # 自研层：一包一组件，React + Vue 双入口
│   └── button/
│       ├── package.json            # exports "./react" 与 "./vue"
│       ├── README.md               # 组件说明（八节）
│       ├── src/react/index.tsx
│       ├── src/vue/index.vue
│       └── style.css
├── registry/                       # 收录层：外部组件原样收进来，同时是 npm 包
│   └── macbook-scroll/
│       ├── macbook-scroll.tsx      # 源码（保留出处头注释，仍写 @/lib/utils）
│       ├── package.json            # @hyjkblj/macbook-scroll，exports 指向 dist
│       ├── dist/                   # 构建产物：js + d.ts + map
│       └── README.md               # 组件说明（八节）
├── shims/cn.ts                     # 构建期把 @/lib/utils 指到这里
├── tsup.config.ts                  # 一条命令构建五个包
├── tsconfig.json                   # d.ts 用：jsx + @/lib/utils 路径映射
├── playground/                     # 演示站：Vite + React 19 + Tailwind v4
│   ├── public/screen.svg
│   └── src/App.tsx                 # 每个组件挂一个 demo，?only=<name> 单独看
├── docs/images/                    # 组件效果图
├── registry.json                   # shadcn registry 索引（复制式分发）
├── pnpm-workspace.yaml
└── README.md                       # ← 本文件
```

---

## 组件文档索引

每个组件一份独立文档，固定八节：**效果 → 安装 → 用法 → API → 样式 → 注意事项 → 变更记录 → 出处**。
点组件名或效果图直接进文档。

### 速查表

| # | 组件 | 包名 | 框架 | 依赖 | 状态 | 文档 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | MacbookScroll 笔记本滚动 | `@hyjkblj/macbook-scroll` | React | motion, @tabler/icons-react | experimental | [文档](registry/macbook-scroll/README.md) |
| 02 | CanvasText 画布扫线文字 | `@hyjkblj/canvas-text` | React | 无 | experimental | [文档](registry/canvas-text/README.md) |
| 03 | WobbleCard 摇摆卡片 | `@hyjkblj/wobble-card` | React | motion（可拆） | experimental | [文档](registry/wobble-card/README.md) |
| 04 | TypewriterEffect 打字机 | `@hyjkblj/typewriter-effect` | React | motion | experimental | [文档](registry/typewriter-effect/README.md) |
| 05 | FloatingDock 浮动 Dock | `@hyjkblj/floating-dock` | React | motion, @tabler/icons-react | experimental | [文档](registry/floating-dock/README.md) |

**状态**：`规划中` → 想做；`experimental` → 能用，API 可能变；`stable` → 推荐用；`deprecated` → 准备删。

---

### 01 · MacbookScroll 笔记本滚动

[![MacbookScroll 效果图](docs/images/macbook-scroll.png)](registry/macbook-scroll/README.md)

页面往下滚，一台 MacBook 从合盖倾斜的状态慢慢「开盖」转正，屏幕里的内容随之展开。适合首屏到正文的过渡。

| 项 | 值 |
| --- | --- |
| 包名 | `@hyjkblj/macbook-scroll` |
| 框架 / 状态 | React · experimental |
| 依赖 | `motion`、`@tabler/icons-react` |
| 安装 | `pnpm add @hyjkblj/macbook-scroll` |
| 文档 | [registry/macbook-scroll/README.md](registry/macbook-scroll/README.md) |
| 源码 | [macbook-scroll.tsx](registry/macbook-scroll/macbook-scroll.tsx) |
| 效果图 | [docs/images/macbook-scroll.png](docs/images/macbook-scroll.png) |
| 本地演示 | `pnpm dev` 后访问 `?only=macbook-scroll` |

---

### 02 · CanvasText 画布扫线文字

[![CanvasText 效果图](docs/images/canvas-text.png)](registry/canvas-text/README.md)

把文字变成「从彩色扫描线里挖出来的洞」：canvas 用背景色填出字形，再在字形范围内画一层正弦偏移的横向曲线。**零外部依赖**。

| 项 | 值 |
| --- | --- |
| 包名 | `@hyjkblj/canvas-text` |
| 框架 / 状态 | React · experimental |
| 依赖 | 无（只需 `react` 与包内自带的 `cn`） |
| 安装 | `pnpm add @hyjkblj/canvas-text` |
| 文档 | [registry/canvas-text/README.md](registry/canvas-text/README.md) |
| 源码 | [canvas-text.tsx](registry/canvas-text/canvas-text.tsx) |
| 效果图 | [docs/images/canvas-text.png](docs/images/canvas-text.png) |
| 本地演示 | `pnpm dev` 后访问 `?only=canvas-text` |

---

### 03 · WobbleCard 摇摆卡片

[![WobbleCard 效果图](docs/images/wobble-card.png)](registry/wobble-card/README.md)

鼠标在卡片里移动时，卡片朝光标方向轻微位移，离开即弹回。位移只有几十像素，用来做 Bento 网格那种「活的」感觉。

| 项 | 值 |
| --- | --- |
| 包名 | `@hyjkblj/wobble-card` |
| 框架 / 状态 | React · experimental |
| 依赖 | `motion`（实际可拆掉，见文档注意事项） |
| 安装 | `pnpm add @hyjkblj/wobble-card` |
| 文档 | [registry/wobble-card/README.md](registry/wobble-card/README.md) |
| 源码 | [wobble-card.tsx](registry/wobble-card/wobble-card.tsx) |
| 效果图 | [docs/images/wobble-card.png](docs/images/wobble-card.png) |
| 本地演示 | `pnpm dev` 后访问 `?only=wobble-card` |

---

### 04 · TypewriterEffect 打字机

[![TypewriterEffect 效果图](docs/images/typewriter-effect.png)](registry/typewriter-effect/README.md)

文字像被「打」出来一样出场，末尾跟一个闪烁光标。导出两个版本：`TypewriterEffect` 逐字符真打字，`TypewriterEffectSmooth` 容器宽度一次性擦除。

| 项 | 值 |
| --- | --- |
| 包名 | `@hyjkblj/typewriter-effect` |
| 框架 / 状态 | React · experimental |
| 依赖 | `motion` |
| 安装 | `pnpm add @hyjkblj/typewriter-effect` |
| 文档 | [registry/typewriter-effect/README.md](registry/typewriter-effect/README.md) |
| 源码 | [typewriter-effect.tsx](registry/typewriter-effect/typewriter-effect.tsx) |
| 效果图 | [docs/images/typewriter-effect.png](docs/images/typewriter-effect.png) |
| 本地演示 | `pnpm dev` 后访问 `?only=typewriter-effect` |

---

### 05 · FloatingDock 浮动 Dock

[![FloatingDock 效果图](docs/images/floating-dock.png)](registry/floating-dock/README.md)

macOS 那种 Dock：鼠标横向扫过时，离光标最近的图标被弹簧放大；窄屏自动换成右下角圆按钮 + 向上弹出。

| 项 | 值 |
| --- | --- |
| 包名 | `@hyjkblj/floating-dock` |
| 框架 / 状态 | React · experimental |
| 依赖 | `motion`、`@tabler/icons-react` |
| 安装 | `pnpm add @hyjkblj/floating-dock` |
| 文档 | [registry/floating-dock/README.md](registry/floating-dock/README.md) |
| 源码 | [floating-dock.tsx](registry/floating-dock/floating-dock.tsx) |
| 效果图 | [docs/images/floating-dock.png](docs/images/floating-dock.png) |
| 本地演示 | `pnpm dev` 后访问 `?only=floating-dock` |

---

### 自研层（规划中）

还没开始，包名预留 `@hyjkblj/<name>`。做完一个就挪到上面的索引里。

| 组件 | 目标包名 | 框架 | 一句话说明 |
| --- | --- | --- | --- |
| Button 按钮 | `@hyjkblj/button` | React + Vue | 基础按钮，多形态与加载态 |
| Modal 弹窗 | `@hyjkblj/modal` | React + Vue | 命令式 + 声明式两种调用 |
| Toast 轻提示 | `@hyjkblj/toast` | React + Vue | 全局提示，队列与去重 |
| VirtualList 虚拟列表 | `@hyjkblj/virtual-list` | React + Vue | 大数据量，固定/动态行高 |
| DragSort 拖拽排序 | `@hyjkblj/drag-sort` | React + Vue | 原生拖拽，横纵向 |
| ImagePreview 图片预览 | `@hyjkblj/image-preview` | React + Vue | 缩放、旋转、多图 |
| Upload 上传 | `@hyjkblj/upload` | React + Vue | 拖拽上传、进度、重试 |
| Countdown 倒计时 | `@hyjkblj/countdown` | React + Vue | 秒级精度，防后台节流 |

> 这份索引是活的。做完一个就改状态；新想法先进「候选池」，别直接进表。
> **候选池**：暂无。

---

## 快速开始

### 跑演示站

```bash
pnpm install
pnpm dev          # → http://localhost:5173
```

打开就能看到所有已收录组件的实际效果。

### 在一个项目里用

**收录层 · 装包（推荐）**：

```bash
pnpm add @hyjkblj/canvas-text
```

```tsx
import { CanvasText } from "@hyjkblj/canvas-text";
```

Tailwind v4 必须在入口 CSS 里显式声明包的扫描范围，否则类名一个都不会生成（表现为「完全没样式」）：

```css
@import "tailwindcss";
@source "../node_modules/@hyjkblj";
```

peer 依赖（`motion`、`@tabler/icons-react`）由组件自己声明，按安装时的提示补上即可。

**收录层 · 复制源码**：要直接改组件本身时用这个。

```bash
cp registry/macbook-scroll/macbook-scroll.tsx src/components/ui/
```

复制过去之后要自己保证 `cn()`（`@/lib/utils`）存在。

**自研层**：还没开始，规划中的包名是 `@hyjkblj/button` 这类。

---

## 文档规范

**每个组件的 `README.md` 固定八节，顺序不能乱，缺一节就算这个组件没收进来。**

1. **标题 + meta** — 组件名，一行写清：状态 · 框架 · 来源 · 依赖
2. **效果** — 效果图（`docs/images/<name>.png`）+ demo 位置。**必须有图，不许只有文字描述**
3. **安装** — 命令，或"复制哪几个文件"
4. **基础用法** — 能直接粘贴运行的代码；自研层给 React + Vue 两份
5. **API** — Props / Events(Emits) / Slots / 实例方法，全部列表化
6. **样式与主题** — 想改外观要动哪里（CSS 变量表，或 Tailwind 类说明）
7. **注意事项** — 什么时候**不该**用它、已知限制、和其他实现的差异
8. **变更记录** — 版本 + 改了什么

范例：[registry/macbook-scroll/README.md](registry/macbook-scroll/README.md)

### 文档模板

````markdown
# Button 按钮

> 状态：stable · 框架：React + Vue · 来源：自研 · 依赖：无

一句话说清它是什么、解决什么问题。

## 效果

![按钮效果](../../docs/images/button.png)

可交互 demo：`playground/src/App.tsx`

## 安装

```bash
pnpm add @hy/button
```

## 基础用法

### React

```tsx
import { Button } from "@hy/button/react";
import "@hy/button/style.css";

<Button variant="primary" onClick={() => console.log("hi")}>
  确定
</Button>
```

### Vue

```vue
<script setup lang="ts">
import { Button } from "@hy/button/vue";
import "@hy/button/style.css";
</script>

<template>
  <Button variant="primary" @click="console.log('hi')">确定</Button>
</template>
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | 'default' \| 'primary' \| 'danger' | 'default' | 按钮形态 |
| loading | boolean | false | 加载态，自动禁用点击 |

### Events / Emits

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | MouseEvent | 点击 |

### Slots（Vue）/ Children（React）

| 名称 | 说明 |
| --- | --- |
| default | 按钮内容 |

## 样式与主题

| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| --hy-button-height | 32px | 按钮高度 |
| --hy-button-radius | 6px | 圆角 |

```css
.my-btn {
  --hy-button-radius: 999px;
}
```

## 注意事项

- 表单内使用请显式传 `type="button"`，否则会触发提交。
- 不要在 Button 里塞复杂布局。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 首版 |
````

---

## 新增一个组件

### 收录外部组件（registry 层）

```bash
# 1. 抓 registry 条目（Aceternity 的格式是 /registry/<name>.json）
curl -s https://ui.aceternity.com/registry/<name>.json -o /tmp/<name>.json

# 2. 解开，把 files[].content 落到 registry/<name>/
#    文件头加注释：来源 URL、收录日期、依赖
```

然后：

1. 在 `playground/src/App.tsx` 挂一个 demo，**先把它跑起来**
2. 截图存到 `docs/images/<name>.png`
3. 按八节写 `registry/<name>/README.md`（重点写第 7 节：什么情况下别用它）
4. 把条目注册进 `registry.json`
5. 根 README「组件文档索引」加一节：速查表一行 + 效果图卡片，状态 `experimental`

### 自研组件（packages 层）

1. 建 `packages/<name>/`：`src/react`、`src/vue`、`style.css`、`package.json`、`README.md`
2. 先写 React 版，跑通 demo
3. 写 Vue 版，**对照 React 版逐项对齐**：默认值、事件名、DOM 结构、CSS 类名
4. 补边界 demo（长文本 / 空数据 / 极端尺寸）
5. 截图 → `docs/images/`
6. 按八节写 `README.md`
7. 进「组件文档索引」，状态 `experimental`

> 顺序有意义：**文档和 demo 不是收尾工作**。写不出 demo 的组件，说明它还没被封成组件。

---

## 收录标准

**收：**

- 自己在项目里真的用过，并且下次还想用
- 效果好到值得为它引入依赖（收录层），或者好用到天天要用（自研层）
- 框架支持、依赖、改样式的方法，都能一句话说清
- 能说清楚"什么时候**不该**用它"

**不收：**

- 某个业务项目的专属组件——哪怕好用，先抽到通用层再说
- 只有视觉效果、但换个内容就崩的
- 依赖多到没法解释，或者换个主题就得改源码、连改哪里都说不清的
- 只是为了炫技，自己半年内不会再用第二次的

---

## 技术栈

| 项 | 选择 | 备注 |
| --- | --- | --- |
| 包管理 | pnpm workspace | `packages/*`、`registry/*`、`playground` |
| 语言 | TypeScript | props 类型即文档 |
| playground | Vite + React 18 + Tailwind v4 | `@` → `playground/src`，`@registry` → `registry/` |
| 样式 | 自研：原生 CSS + 变量；收录：Tailwind | |
| 构建 | tsup（`pnpm build:pkgs`） | 收录层也打包：ESM + d.ts |
| 分发 | npm scope `@hyjkblj` | 一个组件一个包，各自独立版本 |
| 测试 | Vitest + Testing Library | 规划中 |

> 这张表改了要同步改这里，否则新组件会照着旧约定写。

---

## 版本与发布

- 每个包独立版本，不做统一大版本；`experimental` 阶段允许 breaking change，但必须写进组件文档第 8 节
- 发布：

```bash
pnpm build:pkgs                                # 先构建（prepublishOnly 也会自动跑）
pnpm --filter @hyjkblj/canvas-text publish     # 发单个包
```

- 两条分发路径并存：npm 包装得快、能升级；源码复制 / `registry.json` 能直接改
- 新增组件后必须同步根 README 的「组件文档索引」，否则没人知道它发了

---

## 待办

- [x] 搭 pnpm workspace 骨架
- [x] 搭 playground（Vite + React + Tailwind v4），跑通第一个组件
- [x] 收录第一个组件 macbook-scroll
- [x] 截图流程（headless Chrome，见下方「效果图怎么出」）
- [x] `registry.json` 索引（本地 add 已可用，公网分发还没配）
- [ ] 第一个自研双框架组件：Button（作为全库范本）
- [x] demo 页支持 `?only=<name>` 单组件隔离，截图不再受其他区块影响
- [x] 确定包作用域：`@hyjkblj`
- [x] 收录层打包成 npm 包（tsup + `@/lib/utils` shim + peerDependencies）
- [x] 用打包出的 tgz 在独立项目里验证：装得上、构建得过、渲染得出（见 `docs/images/npm-consumer-smoke.png`）
- [ ] 真正 `npm publish`（需先拥有 `@hyjkblj` 这个 scope）

---

## 效果图怎么出

```bash
pnpm build
pnpm preview --port 4173 &          # 或 pnpm dev
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,1100 \
  --virtual-time-budget=6000 --screenshot=docs/images/<name>.png http://localhost:4173/
```

要抓中间状态，用 demo 页自带的 `?scroll=<px>` 参数：`http://localhost:4173/?scroll=520`。

## License

MIT（收录层组件的版权归原作者，详见各组件文档的 meta 行）
