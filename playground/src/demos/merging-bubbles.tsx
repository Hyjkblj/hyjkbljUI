import {
  MergingBubbles,
  NextLogo,
  VercelLogo,
} from "@registry/merging-bubbles/merging-bubbles";

const SIZES = ["sm", "md", "lg"] as const;

export function MergingBubblesDemo() {
  return (
    <div className="flex flex-col items-center gap-10 px-6 py-16">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <p className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">{size}</p>
          <MergingBubbles size={size} startIcon={<NextLogo />} endIcon={<VercelLogo />} />
        </div>
      ))}

      <p className="max-w-md text-center text-xs text-neutral-500">
        静态图形：两个泡融合成一体的 SVG 轮廓 + 两个图标。源码里没有动画，"merging" 指的是形状本身。
      </p>
    </div>
  );
}
