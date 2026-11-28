import { HeroVideoDialog } from "@registry/hero-video-dialog/hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-16">
      <div className="relative w-full max-w-2xl">
        <HeroVideoDialog
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="/video-thumb.svg"
          thumbnailAlt="Hero Video"
        />
      </div>

      <p className="max-w-md text-center text-xs text-neutral-500">
        点缩略图：视频从中心放大铺开，背后压一层模糊遮罩。
        支持 7 种动画：from-center / from-top / from-bottom / from-left / from-right / fade / top-in-bottom-out / left-in-right-out。
      </p>
    </div>
  );
}
