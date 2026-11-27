import { Blocks, BookOpen, Bot, FolderOpen, Palette } from "lucide-react";
import {
  MorphingSearch,
  type MorphingSearchItem,
} from "@registry/morphing-search/morphing-search";

const ITEMS: MorphingSearchItem[] = [
  { id: "macbook-scroll", title: "MacbookScroll", description: "组件 · 滚动驱动的开盖动效", keywords: ["scroll", "motion"], icon: Blocks },
  { id: "canvas-text", title: "CanvasText", description: "组件 · 画布扫线文字", keywords: ["canvas", "text"], icon: Palette },
  { id: "floating-dock", title: "FloatingDock", description: "组件 · macOS 风格 Dock", keywords: ["dock", "icons"], icon: FolderOpen },
  { id: "text-animate", title: "TextAnimate", description: "组件 · 逐字出场动画", keywords: ["typewriter", "blur"], icon: BookOpen },
  { id: "select", title: "Select", description: "组件 · 动画下拉选择", keywords: ["dropdown", "morph"], icon: Bot },
];

export function MorphingSearchDemo() {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="flex w-full max-w-[26rem] items-center gap-3">
        <MorphingSearch items={ITEMS} placeholder="搜索组件" />
        <MorphingSearch items={ITEMS} placeholder="搜索组件" shortcut="" iconOnly />
      </div>

      <p className="max-w-md text-center text-xs text-neutral-500">
        点输入框或那个图标都能展开；在页面上按 <kbd className="rounded border border-neutral-700 px-1 font-mono">f</kbd> 也能唤起。
        输入「canvas」「morph」之类关键词试试——搜索同时匹配标题、描述和 keywords。
      </p>
    </div>
  );
}
