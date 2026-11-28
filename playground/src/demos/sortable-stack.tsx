import { Circle, FileText, Layers, Palette, Rocket } from "lucide-react";
import {
  SortableList,
  SortableListGroup,
  SortableListItem,
  SortableListHandle,
  SortableListItemContent,
  SortableListUndo,
} from "@registry/sortable-stack/sortable-list";

const TASKS = [
  { id: "research", title: "收集参考", detail: "先定方向", icon: FileText, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { id: "design", title: "探索视觉系统", detail: "字体、颜色、构图", icon: Palette, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { id: "build", title: "做第一版原型", detail: "把交互变得可摸", icon: Layers, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { id: "ship", title: "交付有用的东西", detail: "打磨细节并发布", icon: Rocket, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
];

export function SortableStackDemo() {
  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-5 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="mb-1 text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
              工作台
            </p>
            <h3 className="text-lg font-medium tracking-tight">给重要的事腾出位置。</h3>
          </div>
          <span className="shrink-0 text-xs text-neutral-500 tabular-nums">04 项</span>
        </div>

        <SortableList
          defaultItems={TASKS}
          label="工作台优先级"
          getItemLabel={(item) => item.title}
        >
          {(items) => (
            <>
              <SortableListGroup>
                {items.map((item, index) => (
                  <SortableListItem key={item.id} id={item.id}>
                    <SortableListHandle />
                    <SortableListItemContent>
                      <div className="flex items-center gap-3">
                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.color}`}>
                          <item.icon size={18} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-0.5 text-xs text-neutral-500">{item.detail}</p>
                        </div>
                        <span className="text-[11px] text-neutral-500 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Circle size={14} className="text-neutral-700" aria-hidden="true" />
                      </div>
                    </SortableListItemContent>
                  </SortableListItem>
                ))}
              </SortableListGroup>
              <SortableListUndo />
            </>
          )}
        </SortableList>

        <p className="mt-6 text-center text-xs text-neutral-500">
          拖动左侧手柄换顺序；手柄聚焦后可用 ↑↓ / Home / End 移动，位置变化会播报。改完能一键撤销。
        </p>
      </div>
    </div>
  );
}
