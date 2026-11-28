import { useEffect, useRef, useState } from "react";
import { WaveReveal } from "@registry/wave-reveal/wave-reveal";

export function WaveRevealDemo() {
  const [sent, setSent] = useState(false);
  const sendRef = useRef<HTMLButtonElement>(null);

  // 截图用：?wave=1 时自动播放一次波纹，方便在无交互环境下抓中间帧
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("wave") !== "1") return;
    const t = setTimeout(() => setSent(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-80 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <WaveReveal
        revealed={sent}
        sourceRef={sendRef}
        className="w-72 rounded-2xl border border-neutral-800 bg-neutral-950"
        revealedContent={
          <div className="flex flex-col gap-3 p-5">
            <p className="text-sm font-medium text-neutral-100">邀请已发送</p>
            <p className="text-xs text-neutral-500">对方会在收件箱里看到你的邀请。</p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="h-10 rounded-full border border-neutral-700 text-sm text-neutral-200"
            >
              好
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 p-5">
          <p className="text-sm font-medium text-neutral-100">邀请团队成员</p>
          <p className="text-xs text-neutral-500">输入邮箱后会收到一封加入链接。</p>
          <button
            ref={sendRef}
            type="button"
            onClick={() => setSent(true)}
            className="h-10 rounded-full bg-neutral-100 text-sm font-medium text-neutral-900"
          >
            发送邀请
          </button>
        </div>
      </WaveReveal>

      <p className="max-w-md text-center text-xs text-neutral-500">
        点「发送邀请」：卡片先朝按钮收拢、按钮处聚光，然后一道彩色波纹从按点扩散、沿途把画面像透镜一样弯曲，
        边缘留下一圈彩色余晖。点「好」会反向再走一遍。
      </p>
    </div>
  );
}
