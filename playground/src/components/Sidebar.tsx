import { cn } from "@/lib/utils";
import { DEMOS, PLANNED, REPO_URL } from "@/demos";

type Props = {
  active: string;
  onSelect: (id: string) => void;
  className?: string;
};

export function Sidebar({ active, onSelect, className }: Props) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-neutral-800 bg-[#0B0B0F]",
        className,
      )}
    >
      {/* 品牌 */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white">
          H
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-neutral-100">Hyjkblj UI</div>
          <div className="text-[11px] text-neutral-500">组件演示 · v0.1.0</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <p className="px-2 pt-2 pb-1.5 text-[11px] font-medium tracking-wider text-neutral-600 uppercase">
          组件 · {DEMOS.length}
        </p>

        <ul className="space-y-0.5">
          {DEMOS.map((d) => {
            const isActive = d.id === active;
            return (
              <li key={d.id}>
                <button
                  onClick={() => onSelect(d.id)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-md py-2 pr-2 pl-2.5 text-left transition-colors",
                    isActive
                      ? "bg-white/[0.07] text-neutral-50"
                      : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200",
                  )}
                >
                  <span
                    className={cn(
                      "w-5 shrink-0 font-mono text-[11px]",
                      isActive ? "text-sky-400" : "text-neutral-600 group-hover:text-neutral-500",
                    )}
                  >
                    {d.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{d.title}</span>
                    <span className="block truncate font-mono text-[10.5px] text-neutral-600">
                      {d.name}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="px-2 pt-6 pb-1.5 text-[11px] font-medium tracking-wider text-neutral-600 uppercase">
          自研层 · 规划中
        </p>
        <ul className="space-y-0.5">
          {PLANNED.map((name) => (
            <li
              key={name}
              className="flex cursor-not-allowed items-center gap-2.5 rounded-md py-1.5 pr-2 pl-2.5 text-neutral-700"
              title="还没开始"
            >
              <span className="w-5 shrink-0 font-mono text-[11px]">··</span>
              <span className="truncate font-mono text-[11.5px]">{name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* 底部链接 */}
      <div className="border-t border-neutral-800 px-3 py-3 text-[11.5px]">
        <a
          href={`${REPO_URL}#readme`}
          target="_blank"
          rel="noreferrer"
          className="block rounded px-2 py-1.5 text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-200"
        >
          仓库 README
        </a>
        <a
          href={`${REPO_URL}/blob/main/docs/COMPONENTS.md`}
          target="_blank"
          rel="noreferrer"
          className="block rounded px-2 py-1.5 text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-200"
        >
          组件索引
        </a>
      </div>
    </aside>
  );
}
