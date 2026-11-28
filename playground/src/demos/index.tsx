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
import { SelectDemo } from "./select";
import { ExpandableActionBarDemo } from "./expandable-action-bar";
import { MorphingSearchDemo } from "./morphing-search";
import { OverflowActionsDemo } from "./overflow-actions";
import { HeroVideoDialogDemo } from "./hero-video-dialog";
import { LiquidGlassDemo } from "./liquid-glass";
import { MergingBubblesDemo } from "./merging-bubbles";
import { AppleProDisplayXDRDemo } from "./apple-pro-display-xdr";
import { ImagesBadgeDemo } from "./images-badge";
import { ButtonMagneticDemo } from "./button-magnetic";
import { ButtonStatefulDemo } from "./button-stateful";
import { ButtonBaseDemo } from "./button-base";
import { LoaderDemo } from "./loader";
import { MultiSelectDemo } from "./multi-select";
import { SharedLayoutBgDemo } from "./shared-layout-bg";
import { SortableStackDemo } from "./sortable-stack";

import macbookScrollSource from "@registry/macbook-scroll/macbook-scroll.tsx?raw";
import canvasTextSource from "@registry/canvas-text/canvas-text.tsx?raw";
import wobbleCardSource from "@registry/wobble-card/wobble-card.tsx?raw";
import typewriterEffectSource from "@registry/typewriter-effect/typewriter-effect.tsx?raw";
import floatingDockSource from "@registry/floating-dock/floating-dock.tsx?raw";
import animatedThemeTogglerSource from "@registry/animated-theme-toggler/animated-theme-toggler.tsx?raw";
import textAnimateSource from "@registry/text-animate/text-animate.tsx?raw";
import skeletonSource from "@registry/skeleton/skeleton.tsx?raw";
import floatingPanelSource from "@registry/floating-panel/floating-panel.tsx?raw";
import selectSource from "@registry/select/select.tsx?raw";
import expandableActionBarSource from "@registry/expandable-action-bar/expandable-action-bar.tsx?raw";
import morphingSearchSource from "@registry/morphing-search/morphing-search.tsx?raw";
import overflowActionsSource from "@registry/overflow-actions/overflow-actions.tsx?raw";
import heroVideoDialogSource from "@registry/hero-video-dialog/hero-video-dialog.tsx?raw";
import liquidGlassSource from "@registry/liquid-glass/liquid-glass.tsx?raw";
import mergingBubblesSource from "@registry/merging-bubbles/merging-bubbles.tsx?raw";
import appleProDisplaySource from "@registry/apple-pro-display-xdr/apple-pro-display-xdr.tsx?raw";
import imagesBadgeSource from "@registry/images-badge/images-badge.tsx?raw";
import buttonMagneticSource from "@registry/button-magnetic/button/magnetic.tsx?raw";
import buttonStatefulSource from "@registry/button-stateful/button/stateful.tsx?raw";
import buttonBaseSource from "@registry/button-base/button/base.tsx?raw";
import loaderSource from "@registry/loader/loader.tsx?raw";
import multiSelectSource from "@registry/multi-select/multi-select/index.tsx?raw";
import sharedLayoutBgSource from "@registry/shared-layout-bg/shared-layout-bg.tsx?raw";
import sortableListSource from "@registry/sortable-stack/sortable-list.tsx?raw";

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
  {
    id: "select",
    index: "10",
    name: "select",
    title: "动画下拉选择",
    summary: "可组合的 select：面板从触发器弹出再分离；morph 变体则让触发器直接长成面板。含可关闭的音效。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/select motion lucide-react`,
    usage: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@hyjkblj/select";

const [value, setValue] = useState("next");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="选一个框架" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="vite">Vite</SelectItem>
  </SelectContent>
</Select>

// morph 变体
import { MorphSelect, MorphSelectTrigger, MorphSelectValue, MorphSelectContent, MorphSelectItem } from "@hyjkblj/select/morph";`,
    source: selectSource,
    Render: SelectDemo,
  },
  {
    id: "expandable-action-bar",
    index: "11",
    name: "expandable-action-bar",
    title: "可展开工具条",
    summary: "一排图标按钮，hover 或聚焦时展开成带文字与快捷键提示的控件，高亮块共享 layout 滑动。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/expandable-action-bar motion lucide-react`,
    usage: `import {
  ExpandableActionBar,
  type ExpandableActionBarItem,
} from "@hyjkblj/expandable-action-bar";

const items: ExpandableActionBarItem[] = [
  { id: "send", label: "发送", icon: <Send className="h-4 w-4" />, shortcut: "S" },
  { id: "copy", label: "复制", icon: <Copy className="h-4 w-4" /> },
];

<ExpandableActionBar
  items={items}
  activeId={activeId}
  onAction={(item) => setActiveId(item.id)}
/>;`,
    source: expandableActionBarSource,
    Render: ExpandableActionBarDemo,
  },
  {
    id: "morphing-search",
    index: "12",
    name: "morphing-search",
    title: "形变搜索",
    summary: "输入框或图标点开就形变成玻璃质感结果面板，支持快捷键唤起、键盘导航与关键词匹配。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/morphing-search motion lucide-react`,
    usage: `import { MorphingSearch, type MorphingSearchItem } from "@hyjkblj/morphing-search";

const items: MorphingSearchItem[] = [
  { id: "a", title: "Project Folder", description: "Block · Files", keywords: ["files"], icon: FolderOpen },
];

<MorphingSearch items={items} placeholder="搜索" shortcut="f" />;

// 只显示图标
<MorphingSearch items={items} iconOnly shortcut="" />;`,
    source: morphingSearchSource,
    Render: MorphingSearchDemo,
  },
  {
    id: "overflow-actions",
    index: "13",
    name: "overflow-actions",
    title: "溢出操作条",
    summary: "主操作常驻的胶囊工具条，点「更多」用弹簧把次级操作展开出来，可选执行后自动收起。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/overflow-actions motion lucide-react`,
    usage: `import { OverflowActions, type OverflowActionItem } from "@hyjkblj/overflow-actions";

<OverflowActions
  primaryActions={[{ id: "preview", label: "预览", icon: <Eye /> }]}
  overflowActions={[{ id: "branch", label: "分支", icon: <GitBranch /> }]}
  collapseOnAction
  onAction={(item) => console.log(item.id)}
/>;`,
    source: overflowActionsSource,
    Render: OverflowActionsDemo,
  },
  {
    id: "hero-video-dialog",
    index: "14",
    name: "hero-video-dialog",
    title: "视频弹窗",
    summary: "缩略图点开成视频弹窗，7 种展开动画，背后压模糊遮罩。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/hero-video-dialog motion lucide-react`,
    usage: `import { HeroVideoDialog } from "@hyjkblj/hero-video-dialog";

<HeroVideoDialog
  animationStyle="from-center"
  videoSrc="https://www.youtube.com/embed/xxx"
  thumbnailSrc="/thumb.png"
  thumbnailAlt="产品演示"
/>;`,
    source: heroVideoDialogSource,
    Render: HeroVideoDialogDemo,
  },
  {
    id: "liquid-glass",
    index: "15",
    name: "liquid-glass",
    title: "液态玻璃",
    summary: "SVG 位移滤镜 + 背景模糊做出来的玻璃材质，可拖动，能折射背后的内容。零依赖。",
    stack: "React · SVG filter",
    deps: [],
    install: `pnpm add @hyjkblj/liquid-glass`,
    usage: `import { LiquidGlass } from "@hyjkblj/liquid-glass";

<LiquidGlass
  radius={100}
  scale={48}
  aberration={14}
  bevelDepth={37}
  frost={0.4}
  tint={0.12}
  className="size-50 rounded-full"
/>;`,
    source: liquidGlassSource,
    Render: LiquidGlassDemo,
  },
  {
    id: "merging-bubbles",
    index: "16",
    name: "merging-bubbles",
    title: "融合气泡",
    summary: "两个图标泡靠近、融合成一个、再分开的循环动画。纯 SVG 路径，零依赖。",
    stack: "React · SVG",
    deps: [],
    install: `pnpm add @hyjkblj/merging-bubbles`,
    usage: `import { MergingBubbles, NextLogo, VercelLogo } from "@hyjkblj/merging-bubbles";

<MergingBubbles size="md" startIcon={<NextLogo />} endIcon={<VercelLogo />} />;`,
    source: mergingBubblesSource,
    Render: MergingBubblesDemo,
  },
  {
    id: "apple-pro-display-xdr",
    index: "17",
    name: "apple-pro-display-xdr",
    title: "Pro Display XDR",
    summary: "纯 CSS/SVG 复刻的 Apple 显示器：铝框、倒角、摄像头、录制灯，屏幕内容可换。",
    stack: "React · motion",
    deps: ["motion", "@tabler/icons-react"],
    install: `pnpm add @hyjkblj/apple-pro-display-xdr motion @tabler/icons-react`,
    usage: `import { AppleProDisplayXDR } from "@hyjkblj/apple-pro-display-xdr";

// 用内置屏幕内容
<AppleProDisplayXDR initialMode="gradient" />;

// 或完全自定义屏幕
<AppleProDisplayXDR screenContent={<img src="/my-shot.png" alt="" className="size-full object-cover" />} />;`,
    source: appleProDisplaySource,
    Render: AppleProDisplayXDRDemo,
  },
  {
    id: "images-badge",
    index: "18",
    name: "images-badge",
    title: "图片堆徽章",
    summary: "胶囊徽章里塞一叠缩略图，hover 展开成扇形。可配 href 变成链接。",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/images-badge motion`,
    usage: `import { ImagesBadge } from "@hyjkblj/images-badge";

<ImagesBadge
  text="Introducing Agenforce Marketing Template"
  images={["/a.webp", "/b.webp", "/c.webp"]}
  href="/templates"
/>;`,
    source: imagesBadgeSource,
    Render: ImagesBadgeDemo,
  },
  {
    id: "button-magnetic",
    index: "19",
    name: "button-magnetic",
    title: "磁吸按钮",
    summary: "光标靠近时按钮朝光标方向位移，离开弹簧回弹。触屏与减少动态下自动关闭。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/button-magnetic motion lucide-react`,
    usage: `import { MagneticButton } from "@hyjkblj/button-magnetic";

<MagneticButton variant="primary" size="md" strength={0.35}>
  主按钮 <ArrowRight className="h-4 w-4" />
</MagneticButton>;`,
    source: buttonMagneticSource,
    Render: ButtonMagneticDemo,
  },
  {
    id: "button-stateful",
    index: "20",
    name: "button-stateful",
    title: "状态按钮",
    summary: "idle / loading / success / error 四态切换，文字模糊淡入、宽度自适应。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/button-stateful motion lucide-react`,
    usage: `import { StatefulButton, type ButtonState } from "@hyjkblj/button-stateful";

const [state, setState] = useState<ButtonState>("idle");

<StatefulButton
  state={state}
  onClick={() => setState("loading")}
  loadingText="保存中"
  successText="已保存"
  errorText="失败"
>
  保存更改
</StatefulButton>;`,
    source: buttonStatefulSource,
    Render: ButtonStatefulDemo,
  },
  {
    id: "button-base",
    index: "21",
    name: "button-base",
    title: "基础按钮",
    summary: "弹簧按压、可选水波与音效、四种变体与尺寸，另附 ButtonLink。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/button-base motion lucide-react`,
    usage: `import { Button, ButtonLink } from "@hyjkblj/button-base";

<Button variant="primary" size="md" ripple>
  继续 <ArrowRight className="h-4 w-4" />
</Button>

<ButtonLink href="/docs" variant="outline">链接按钮</ButtonLink>;`,
    source: buttonBaseSource,
    Render: ButtonBaseDemo,
  },
  {
    id: "loader",
    index: "22",
    name: "loader",
    title: "加载指示器",
    summary: "17 种变体：spinner / dots / bars / 点阵 / dither / metaballs / comet / helix / percent / 5 种 ASCII。",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/loader motion`,
    usage: `import { Loader } from "@hyjkblj/loader";

<Loader variant="spinner" size={32} label="正在加载" />;
<Loader variant="metaballs" size={48} speed={1.2} />;`,
    source: loaderSource,
    Render: LoaderDemo,
  },
  {
    id: "multi-select",
    index: "23",
    name: "multi-select",
    title: "多选下拉",
    summary: "可搜索多选：选中项变 token，面板弹簧展开并避让碰撞，支持分组与子序列匹配。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/multi-select motion lucide-react`,
    usage: `import {
  MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectInput,
  MultiSelectContent, MultiSelectList, MultiSelectItem,
} from "@hyjkblj/multi-select";

<MultiSelect defaultValue={["design"]} onValueChange={setValues}>
  <MultiSelectTrigger>
    <MultiSelectValue placeholder="选择团队" />
    <MultiSelectInput aria-label="搜索" />
  </MultiSelectTrigger>
  <MultiSelectContent>
    <MultiSelectList ariaLabel="团队">
      <MultiSelectItem value="design" textValue="Design">Design</MultiSelectItem>
    </MultiSelectList>
  </MultiSelectContent>
</MultiSelect>;`,
    source: multiSelectSource,
    Render: MultiSelectDemo,
  },
  {
    id: "shared-layout-bg",
    index: "24",
    name: "shared-layout-bg",
    summary: "列表 hover 高亮：胶囊在行间共享 layout 滑动，进出带模糊。",
    title: "共享布局高亮",
    stack: "React · motion",
    deps: ["motion"],
    install: `pnpm add @hyjkblj/shared-layout-bg motion`,
    usage: `import { SharedLayoutBg } from "@hyjkblj/shared-layout-bg";

<SharedLayoutBg>
  {items.map((it) => (
    <button key={it.title} className="flex flex-col px-2 py-3 text-left">
      {it.title}
    </button>
  ))}
</SharedLayoutBg>;`,
    source: sharedLayoutBgSource,
    Render: SharedLayoutBgDemo,
  },
  {
    id: "sortable-stack",
    index: "25",
    name: "sortable-stack",
    title: "拖拽排序列表",
    summary: "拖动手柄换顺序，弹簧归位；键盘可移动、位置有播报、支持撤销。",
    stack: "React · motion",
    deps: ["motion", "lucide-react"],
    install: `pnpm add @hyjkblj/sortable-stack motion lucide-react`,
    usage: `import {
  SortableList, SortableListGroup, SortableListItem,
  SortableListHandle, SortableListItemContent, SortableListUndo,
} from "@hyjkblj/sortable-stack";

<SortableList defaultItems={tasks} getItemLabel={(t) => t.title}>
  {(items) => (
    <SortableListGroup>
      {items.map((item) => (
        <SortableListItem key={item.id} id={item.id}>
          <SortableListHandle />
          <SortableListItemContent>{item.title}</SortableListItemContent>
        </SortableListItem>
      ))}
    </SortableListGroup>
  )}
</SortableList>;`,
    source: sortableListSource,
    Render: SortableStackDemo,
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
