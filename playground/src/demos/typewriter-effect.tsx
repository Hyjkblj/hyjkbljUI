import { TypewriterEffectSmooth } from "@registry/typewriter-effect/typewriter-effect";

export function TypewriterEffectDemo() {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center gap-6 px-6 py-16">
      <p className="text-xs text-neutral-500 sm:text-base dark:text-neutral-400">
        今天就把这套规矩定下来
      </p>
      <TypewriterEffectSmooth
        words={[
          { text: "收进来" },
          { text: "就" },
          { text: "写清楚" },
          { text: "别" },
          { text: "欠账。", className: "text-blue-500" },
        ]}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <button className="h-10 w-40 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
          开始收组件
        </button>
        <button className="h-10 w-40 rounded-xl border border-neutral-700 bg-white text-sm text-black">
          先看看清单
        </button>
      </div>
    </div>
  );
}
