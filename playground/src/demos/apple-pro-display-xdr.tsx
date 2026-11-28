import { AppleProDisplayXDR } from "@registry/apple-pro-display-xdr/apple-pro-display-xdr";

export function AppleProDisplayXDRDemo() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-16">
      <div className="flex w-full items-center justify-center">
        <AppleProDisplayXDR initialMode="gradient" />
      </div>
      <p className="max-w-md text-center text-xs text-neutral-500">
        纯 CSS/SVG 复刻的 Pro Display XDR：铝框、倒角、摄像头、绿色录制灯。屏幕内容有四种内置
        （gradient / grading / photo / wallpaper），也能用 screenContent 完全替换。
        鼠标移到摄像头附近会亮一下绿灯。
      </p>
    </div>
  );
}
