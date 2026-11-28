import { ArrowUpRight } from "lucide-react";
import { SharedLayoutBg } from "@registry/shared-layout-bg/shared-layout-bg";

const ITEMS = [
  { title: "收件箱", body: "12 条未读，今天有 3 处提到你。" },
  { title: "草稿", body: "4 篇待最后一轮过稿。" },
  { title: "发布记录", body: "最近一次在 2 天前，v0.4.1。" },
  { title: "账单", body: "下月 1 号续订。" },
];

export function SharedLayoutBgDemo() {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="w-full max-w-lg px-2">
        <SharedLayoutBg>
          {ITEMS.map((it) => (
            <button
              type="button"
              key={it.title}
              className="group flex flex-col gap-1 px-2 py-3 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {it.title}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-sm text-neutral-500">{it.body}</p>
            </button>
          ))}
        </SharedLayoutBg>
      </div>
      <p className="max-w-md text-center text-xs text-neutral-500">
        鼠标在行间移动：高亮胶囊会滑过去而不是各自闪一下；进入列表时模糊淡入，离开淡出。
      </p>
    </div>
  );
}
