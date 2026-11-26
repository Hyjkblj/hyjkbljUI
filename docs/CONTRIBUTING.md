# 贡献指南

> [← 返回 README](../README.md) · [组件索引](COMPONENTS.md)

这个仓库的规矩只有一条：**收进来就写清楚**。下面是把"写清楚"具体化的内容。

## 文档规范

**每个组件的 `README.md` 固定八节，顺序不能乱，缺一节就算这个组件没收进来。**

1. **标题 + meta** — 组件名，一行写清：状态 · 框架 · 来源 · 依赖
2. **效果** — 效果图（`docs/images/<name>.png`）+ demo 位置。**必须有图，不许只有文字描述**
3. **安装** — 装包命令，或"复制哪几个文件"
4. **基础用法** — 能直接粘贴运行的代码；自研层给 React + Vue 两份
5. **API** — Props / Events(Emits) / Slots / 实例方法，全部列表化
6. **样式与主题** — 想改外观要动哪里（CSS 变量表，或 Tailwind 类说明）
7. **注意事项** — 什么时候**不该**用它、已知限制、和其他实现的差异
8. **变更记录** — 版本 + 改了什么

范例：[registry/macbook-scroll/README.md](../registry/macbook-scroll/README.md)

### 文档模板

````markdown
# Button 按钮

> [← 返回组件索引](../../docs/COMPONENTS.md)
> 状态：stable · 框架：React + Vue · 来源：自研 · 依赖：无

一句话说清它是什么、解决什么问题。

## 效果

![按钮效果](../../docs/images/button.png)

可交互 demo：`playground/src/App.tsx`，或 `?only=button`

## 安装

```bash
pnpm add @hyjkblj/button
```

## 基础用法

### React

```tsx
import { Button } from "@hyjkblj/button/react";

<Button variant="primary" onClick={() => console.log("hi")}>
  确定
</Button>
```

### Vue

```vue
<script setup lang="ts">
import { Button } from "@hyjkblj/button/vue";
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

## 注意事项

- 表单内使用请显式传 `type="button"`，否则会触发提交。

## 变更记录

| 版本 | 变更 |
| --- | --- |
| 0.1.0 | 首版 |

## 出处

自研。
````

---

## 新增一个组件

### 收录外部组件（registry 层）

```bash
# 1. 抓 registry 条目（Aceternity 的格式是 /registry/<name>.json）
curl -s https://ui.aceternity.com/registry/<name>.json -o /tmp/<name>.json

# 2. 解开，把 files[].content 落到 registry/<name>/
#    文件头加注释：来源 URL、收录方式、依赖
```

然后：

1. 建 `registry/<name>/package.json`（照抄现有组件的，改 name / description / peerDependencies）
2. 在根 `tsup.config.ts` 的数组里加一条 `pkg("<name>", [...external])`
3. 在 `playground/src/App.tsx` 挂一个 demo，**先把它跑起来**
4. 截图存到 `docs/images/<name>.png`
5. 按八节写 `registry/<name>/README.md`（重点写第 7 节：什么情况下别用它）
6. 把条目注册进 `registry.json`
7. 在 [组件索引](COMPONENTS.md) 加一行速查表 + 一节效果图卡片

### 自研组件（packages 层）

1. 建 `packages/<name>/`：`src/react`、`src/vue`、`style.css`、`package.json`、`README.md`
2. 先写 React 版，跑通 demo
3. 写 Vue 版，**对照 React 版逐项对齐**：默认值、事件名、DOM 结构、CSS 类名
4. 补边界 demo（长文本 / 空数据 / 极端尺寸）
5. 截图 → `docs/images/`
6. 按八节写 `README.md`
7. 进[组件索引](COMPONENTS.md)，状态 `experimental`

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
- 只是为了炫技，自己半年内不会再用的第二次的

---

## 效果图怎么出

演示站支持 `?only=<name>` 只渲染单个 demo，截图不受其他区块影响。

```bash
pnpm build
pnpm preview --port 4173 &          # 或 pnpm dev

# 单组件效果图
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,900 \
  --virtual-time-budget=8000 \
  --screenshot=docs/images/<name>.png "http://localhost:4173/?only=<name>"
```

需要中间状态时用 demo 页自带的 `?scroll=<px>`：`http://localhost:4173/?scroll=520`。

> Windows 路径换成你本机 Chrome / Edge 的实际位置；macOS 用 `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`。

---

## 提交前检查

```bash
pnpm build          # 包 + 演示站都要能过
```

- [ ] 组件文档八节齐全，效果图已就位
- [ ] [组件索引](COMPONENTS.md) 已更新
- [ ] `pnpm build` 通过
