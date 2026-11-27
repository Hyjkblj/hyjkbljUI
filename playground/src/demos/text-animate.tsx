import { useState } from "react";
import { TextAnimate } from "@registry/text-animate/text-animate";

export function TextAnimateDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8 px-6 py-16">
      <div key={round} className="flex flex-col items-center gap-7 text-center">
        <TextAnimate
          animation="blurInUp"
          by="character"
          once
          className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50"
        >
          逐字模糊浮现
        </TextAnimate>

        <TextAnimate
          animation="slideUp"
          by="character"
          once
          delay={0.2}
          className="text-xl font-medium text-neutral-700 md:text-2xl dark:text-neutral-300"
        >
          按字上滑，中文照样切
        </TextAnimate>

        <TextAnimate
          animation="scaleUp"
          by="line"
          once
          delay={0.4}
          className="text-sm text-neutral-500 md:text-base dark:text-neutral-500"
        >
          {"按行缩放\n适合长段落的第一句"}
        </TextAnimate>
      </div>

      <button
        onClick={() => setRound((r) => r + 1)}
        className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
      >
        重播 ↻
      </button>

      <p className="max-w-md text-center text-xs text-neutral-500">
        三个段落分别用了 blurInUp / slideUp / scaleUp，切分单位是 character、character、line。
      </p>
    </div>
  );
}
