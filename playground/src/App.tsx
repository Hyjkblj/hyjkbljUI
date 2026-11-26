import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "@registry/macbook-scroll/macbook-scroll";
import { CanvasText } from "@registry/canvas-text/canvas-text";
import { WobbleCard } from "@registry/wobble-card/wobble-card";
import { TypewriterEffectSmooth } from "@registry/typewriter-effect/typewriter-effect";
import { FloatingDock } from "@registry/floating-dock/floating-dock";
import {
  IconBrandGithub,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

const BLUE_RAMP = [
  "rgba(0, 153, 255, 1)",
  "rgba(0, 153, 255, 0.9)",
  "rgba(0, 153, 255, 0.8)",
  "rgba(0, 153, 255, 0.7)",
  "rgba(0, 153, 255, 0.6)",
  "rgba(0, 153, 255, 0.5)",
  "rgba(0, 153, 255, 0.4)",
  "rgba(0, 153, 255, 0.3)",
  "rgba(0, 153, 255, 0.2)",
  "rgba(0, 153, 255, 0.1)",
];

/** 组件效果演示页：每个收录的组件挂一个 demo，地址栏可直达 #<组件名> 或 ?only=<组件名> */
export default function App() {
  // ?only=<name> 只渲染单个 demo，截图用
  const only = new URLSearchParams(window.location.search).get("only");
  // 截图 / 分享用：?scroll=900 跳到指定滚动位置；#canvas-text 直达某个 demo
  useEffect(() => {
    const y = Number(new URLSearchParams(window.location.search).get("scroll") ?? 0);
    if (y > 0) {
      window.scrollTo(0, y);
      return;
    }
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#0B0B0F]">
      <header className="mx-auto flex max-w-3xl flex-col gap-3 px-6 pt-24 pb-4">
        <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">
          Hycomponents · Playground
        </p>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          组件效果演示
        </h1>
        <nav className="flex flex-wrap gap-2 text-xs">
          {[
            ["macbook-scroll", "01 · 笔记本滚动"],
            ["canvas-text", "02 · 画布文字"],
            ["wobble-card", "03 · 摇摆卡片"],
            ["typewriter-effect", "04 · 打字机"],
            ["floating-dock", "05 · 浮动 Dock"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* 01 */}
      {(!only || only === "macbook-scroll") && (
      <section id="macbook-scroll" className="scroll-mt-8">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">01 · React / motion</p>
          <h2 className="mt-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            macbook-scroll
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            向下滚动，笔记本屏幕会随着滚动进度展开。
          </p>
        </div>

        <MacbookScroll
          title={
            <span>
              滚动让我打开。 <br /> 就这么简单。
            </span>
          }
          src="/screen.svg"
          showGradient={false}
        />
      </section>
      )}

      {/* 02 */}
      {(!only || only === "canvas-text") && (
      <section
        id="canvas-text"
        className="scroll-mt-8 border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-3xl px-6 pt-24">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">02 · React / canvas</p>
          <h2 className="mt-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            canvas-text
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            用 canvas 逐帧绘制彩色线条，文字作为遮罩把线条"挖"出来。零依赖。
          </p>
        </div>

        <div className="flex min-h-80 items-center justify-center p-8 pb-32">
          <h3
            className={cn(
              "group relative mx-auto max-w-2xl text-left text-4xl leading-tight font-bold tracking-tight text-balance text-neutral-800 md:text-6xl dark:text-neutral-300",
            )}
          >
            Ship landing pages at{" "}
            <CanvasText
              text="Lightning Speed"
              backgroundClassName="bg-white dark:bg-[#0B0B0F]"
              colors={BLUE_RAMP}
              lineGap={4}
              animationDuration={20}
            />
          </h3>
        </div>
      </section>
      )}

      {/* 03 */}
      {(!only || only === "wobble-card") && (
      <section
        id="wobble-card"
        className="scroll-mt-8 border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-3xl px-6 pt-24">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">03 · React / motion</p>
          <h2 className="mt-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            wobble-card
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            鼠标在卡片里移动，卡片按光标偏移做小幅位移；离开即归位。截图看不出来，用鼠标试。
          </p>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 px-8 pb-32 lg:grid-cols-3">
          <WobbleCard containerClassName="col-span-1 h-full min-h-[320px] bg-pink-800 lg:col-span-2">
            <div className="max-w-xs">
              <h3 className="text-left text-balance text-xl font-semibold tracking-[-0.015em] text-white lg:text-3xl">
                组件包不是仓库，是习惯
              </h3>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                收进来的每一个都得有图、有用法、有"什么时候别用它"。不然半年后就是一堆看不懂的代码。
              </p>
            </div>
            <img
              src="/screen.svg"
              width={500}
              height={500}
              alt=""
              className="absolute -right-4 -bottom-10 rounded-2xl object-contain grayscale filter lg:-right-[40%]"
            />
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[320px] bg-blue-900">
            <h3 className="max-w-80 text-left text-balance text-xl font-semibold tracking-[-0.015em] text-white lg:text-3xl">
              鼠标进来，卡片就跟着走。
            </h3>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              位移量是光标相对卡片中心的偏移除以 20，最多几十像素。够轻，不会晃得头晕。
            </p>
          </WobbleCard>
        </div>
      </section>
      )}

      {/* 04 */}
      {(!only || only === "typewriter-effect") && (
      <section
        id="typewriter-effect"
        className="scroll-mt-8 border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-3xl px-6 pt-24">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">04 · React / motion</p>
          <h2 className="mt-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            typewriter-effect
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            逐词打字出场，末尾跟一个闪烁光标。滚进视口才开始，不重复播放。
          </p>
        </div>

        <div className="flex min-h-[22rem] flex-col items-center justify-center gap-6 px-6 pb-24">
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
      </section>
      )}

      {/* 05 */}
      {(!only || only === "floating-dock") && (
      <section
        id="floating-dock"
        className="scroll-mt-8 border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-3xl px-6 pt-24">
          <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">05 · React / motion</p>
          <h2 className="mt-1 text-lg font-medium text-neutral-900 dark:text-neutral-100">
            floating-dock
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            类似 macOS 的 Dock：鼠标横向扫过时，靠近光标的图标被放大，远了复原。窄屏自动换成另一种形态。
          </p>
        </div>

        <div className="flex h-[20rem] w-full items-center justify-center">
          <FloatingDock
            items={[
              { title: "首页", href: "#", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
              { title: "组件", href: "#", icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
              { title: "文档", href: "#", icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
              { title: "变更", href: "#", icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
              { title: "GitHub", href: "#", icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
            ]}
          />
        </div>
      </section>
      )}

      {!only && (
      <footer className="mx-auto max-w-3xl px-6 pb-32">
        <div className="rounded-xl border border-neutral-200 p-6 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          <p className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">来源</p>
          <p>
            均为 Aceternity UI 组件，registry 原样导入。macbook-scroll 依赖 motion 与
            @tabler/icons-react；canvas-text 零依赖。
          </p>
        </div>
      </footer>
      )}
    </main>
  );
}
