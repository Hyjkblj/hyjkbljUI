import { ImagesBadge } from "@registry/images-badge/images-badge";

export function ImagesBadgeDemo() {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-8 px-6 py-16">
      <ImagesBadge
        text="Introducing Agenforce Marketing Template"
        images={["/badge-1.svg", "/badge-2.svg", "/badge-3.svg"]}
      />
      <p className="max-w-md text-center text-xs text-neutral-500">
        鼠标移上去：左侧的图片堆展开成扇形，胶囊同时变宽。移开自动收回。
      </p>
    </div>
  );
}
