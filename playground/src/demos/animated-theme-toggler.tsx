import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AnimatedThemeToggler,
  type TransitionVariant,
} from "@registry/animated-theme-toggler/animated-theme-toggler";

const VARIANTS: TransitionVariant[] = [
  "circle",
  "square",
  "triangle",
  "diamond",
  "hexagon",
  "rectangle",
  "star",
];

export function AnimatedThemeTogglerDemo() {
  const [variant, setVariant] = useState<TransitionVariant>("circle");

  return (
    <div className="flex flex-col items-center gap-8 px-6 py-16">
      {/* 主题面板：切一次就能看到 View Transition 的形变 */}
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs tracking-[0.18em] text-neutral-500 uppercase">当前主题</p>
        <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
          点亮这个按钮
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          形变从按钮中心展开，把整页刷成另一种配色。
        </p>
      </div>

      <AnimatedThemeToggler
        variant={variant}
        className="rounded-full border border-neutral-200 bg-white p-3 text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
      />

      {/* 形状切换 */}
      <div className="flex flex-wrap justify-center gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11.5px] transition-colors",
              v === variant
                ? "border-sky-500/60 bg-sky-500/10 text-sky-600 dark:text-sky-400"
                : "border-neutral-200 text-neutral-500 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-500 dark:hover:border-neutral-600",
            )}
          >
            {v}
          </button>
        ))}
      </div>
      <p className="max-w-md text-center text-xs text-neutral-500">
        先选形状，再点上面的按钮——切换过程用的是 View Transitions API 的 clip-path 动画。
      </p>
    </div>
  );
}
