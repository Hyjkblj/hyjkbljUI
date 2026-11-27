import type { ComponentType } from "react";
import { MacbookScrollDemo } from "./macbook-scroll";
import { CanvasTextDemo } from "./canvas-text";
import { WobbleCardDemo } from "./wobble-card";
import { TypewriterEffectDemo } from "./typewriter-effect";
import { FloatingDockDemo } from "./floating-dock";
import { AnimatedThemeTogglerDemo } from "./animated-theme-toggler";
import { TextAnimateDemo } from "./text-animate";
import { SkeletonDemo } from "./skeleton";
import { FloatingPanelDemo } from "./floating-panel";

import macbookScrollSource from "@registry/macbook-scroll/macbook-scroll.tsx?raw";
import canvasTextSource from "@registry/canvas-text/canvas-text.tsx?raw";
import wobbleCardSource from "@registry/wobble-card/wobble-card.tsx?raw";
import typewriterEffectSource from "@registry/typewriter-effect/typewriter-effect.tsx?raw";
import floatingDockSource from "@registry/floating-dock/floating-dock.tsx?raw";
import animatedThemeTogglerSource from "@registry/animated-theme-toggler/animated-theme-toggler.tsx?raw";
import textAnimateSource from "@registry/text-animate/text-animate.tsx?raw";
import skeletonSource from "@registry/skeleton/skeleton.tsx?raw";
import floatingPanelSource from "@registry/floating-panel/floating-panel.tsx?raw";

export type DemoMeta = {
  /** 路由 key，同时也是 registry 目录名 */
  id: string;
  index: string;
  name: string;
  title: string;
  summary: string;
  stack: string;
  deps: string[];
  /** 安装命令 */
  install: string;
  /** 最小可用示例 */
  usage: string;
  /** 组件源码（构建期以 ?raw 读入，直接内联到页面） */
  source: string;
  Render: ComponentType;
};

export const REPO_URL = "https://github.com/Hyjkblj/hyjkbljUI";

export const DEMOS: DemoMeta[] = [
  {
    id: "macbook-scroll",
    index: "01",
    name: "macbook-scroll",
    title: "笔记本滚动展开",
    summary: "页面往下滚，一台 MacBook 从合盖倾斜的状态慢慢「开盖」转正，屏幕里的内容随之展开。",
    stack: "React · motion",
    deps: ["motion", "@tabler/icons-react"],
    install: `pnpm add @hyjkblj/macbook-scroll motion @tabler/icons-react`,
    usage: `import { MacbookScroll } from "@hyjkblj/macbook-scroll";

export function Hero() {
  return (
    <div className="w-full overflow-hidden">
      <MacbookScroll
        title={<span>这台笔记本是滚出来的。</span>}
        src="/screen.png"
        showGradient={false}
      />
    </div>
  );
}`,
    source: macbookScrollSource,
    Render: MacbookScrollDemo,
  },
  {
    id: "canvas-text",
    index: "02",
    name: "canvas-text",
    title: "画布扫线文字",
    summary: "用 canvas 合成模式把文字抠成洞，再往洞里画彩色正弦曲线。零外部依赖。",
    stack: "React · canvas",
    deps: [],
    install: `pnpm add @hyjkblj/canvas-text`,
    usage: `import { CanvasText } from "@hyjkblj/canvas-text";

export function Hero() {
  return (
    <h1 className="text-6xl font-bold">
      Ship landing pages at{" "}
      <CanvasText
        text="Lightning Speed"
        backgroundClassName="bg-white dark:bg-neutral-950"
        colors={["#38bdf8", "#0ea5e9", "#0284c7"]}
        lineGap={4}
        animationDuration={20}
      />
    </h1>
  );
}`,
    source: canvasTextSource,
    Render: CanvasTextDemo,
  },
  {
    id: "wobble-card",
    index: "03",
    name: "wobble-card",
    title: "摇摆卡片",
    summary: "鼠标在卡片里移动时朝光标方向轻微位移，离开即弹回。适合 Bento 网格。",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/wobble-card motion`,
    usage: `import { WobbleCard } from "@hyjkblj/wobble-card";

export function Cards() {
  return (
    <WobbleCard containerClassName="min-h-[320px] bg-pink-800">
      <h3 className="text-3xl font-semibold text-white">跟着鼠标走</h3>
      <p className="mt-4 text-neutral-200">位移只有几十像素，够轻。</p>
    </WobbleCard>
  );
}`,
    source: wobbleCardSource,
    Render: WobbleCardDemo,
  },
  {
    id: "typewriter-effect",
    index: "04",
    name: "typewriter-effect",
    title: "打字机文字",
    summary: "文字像被「打」出来一样出场，末尾跟一个闪烁光标。导出逐字与平滑两个版本。",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/typewriter-effect motion`,
    usage: `import { TypewriterEffectSmooth } from "@hyjkblj/typewriter-effect";

export function Hero() {
  return (
    <TypewriterEffectSmooth
      words={[
        { text: "收进来" },
        { text: "就" },
        { text: "写清楚", className: "text-blue-500" },
      ]}
    />
  );
}`,
    source: typewriterEffectSource,
    Render: TypewriterEffectDemo,
  },
  {
    id: "floating-dock",
    index: "05",
    name: "floating-dock",
    title: "浮动 Dock",
    summary: "macOS 那种 Dock：鼠标横向扫过时，离光标最近的图标被弹簧放大；窄屏切成弹出菜单。",
    stack: "React · motion",
    deps: ["motion", "@tabler/icons-react"],
    install: `pnpm add @hyjkblj/floating-dock motion @tabler/icons-react`,
    usage: `import { FloatingDock } from "@hyjkblj/floating-dock";
import { IconHome, IconTerminal2 } from "@tabler/icons-react";

const items = [
  { title: "首页", href: "/", icon: <IconHome className="h-full w-full" /> },
  { title: "组件", href: "/components", icon: <IconTerminal2 className="h-full w-full" /> },
];

export function Nav() {
  return <FloatingDock items={items} />;
}`,
    source: floatingDockSource,
    Render: FloatingDockDemo,
  },
  {
    id: "animated-theme-toggler",
    index: "06",
    name: "animated-theme-toggler",
    title: "动画主题切换",
    summary: "点一下，配色从按钮中心以 clip-path 形变铺满整页。七种形状，走 View Transitions API。",
    stack: "React · View Transitions",
    deps: ["lucide-react"],
    install: `pnpm add @hyjkblj/animated-theme-toggler lucide-react`,
    usage: `import { AnimatedThemeToggler } from "@hyjkblj/animated-theme-toggler";

export function Header() {
  return (
    <AnimatedThemeToggler
      variant="star"        // circle | square | triangle | diamond | hexagon | rectangle | star
      duration={400}
      className="rounded-full border p-3"
    />
  );
}`,
    source: animatedThemeTogglerSource,
    Render: AnimatedThemeTogglerDemo,
  },
  {
    id: "text-animate",
    index: "07",
    name: "text-animate",
    title: "文字出场动画",
    summary: "按字 / 词 / 行切分，10 种出场预设，滚进视口才播，可选只播一次。",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/text-animate motion`,
    usage: `import { TextAnimate } from "@hyjkblj/text-animate";

export function Hero() {
  return (
    <TextAnimate animation="blurInUp" by="character" once>
      逐字模糊浮现
    </TextAnimate>
  );
}`,
    source: textAnimateSource,
    Render: TextAnimateDemo,
  },
  {
    id: "skeleton",
    index: "08",
    name: "skeleton",
    title: "骨架屏",
    summary: "扫光式占位块，用渐变 + 位移动画模拟加载中。零运行时依赖。",
    stack: "React · Tailwind",
    deps: [],
    install: `pnpm add @hyjkblj/skeleton`,
    usage: `import { Skeleton } from "@hyjkblj/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}`,
    source: skeletonSource,
    Render: SkeletonDemo,
  },
  {
    id: "floating-panel",
    index: "09",
    name: "floating-panel",
    title: "浮动面板",
    summary: "从触发按钮位置展开的面板，layoutId 形变 + 模糊遮罩，可组合成表单 / 取色器 / 快捷菜单。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/floating-panel motion lucide-react`,
    usage: `import {
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
        <FloatingPanelBody>...</FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}`,
    source: floatingPanelSource,
    Render: FloatingPanelDemo,
  },
];

/** 自研层（还没开始），侧栏里以禁用态展示 */
export const PLANNED = [
  "button",
  "modal",
  "toast",
  "virtual-list",
  "drag-sort",
  "image-preview",
  "upload",
  "countdown",
];
