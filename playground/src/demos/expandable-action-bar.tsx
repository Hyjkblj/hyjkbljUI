import { useMemo, useState } from "react";
import { Archive, Bell, Copy, Download, Send, Settings } from "lucide-react";
import {
  ExpandableActionBar,
  type ExpandableActionBarItem,
} from "@registry/expandable-action-bar/expandable-action-bar";

const ACTIONS: ExpandableActionBarItem[] = [
  { id: "send", label: "发送", icon: <Send className="h-4 w-4" />, shortcut: "S" },
  { id: "copy", label: "复制", icon: <Copy className="h-4 w-4" />, shortcut: "C" },
  { id: "download", label: "导出", icon: <Download className="h-4 w-4" />, shortcut: "E" },
  { id: "archive", label: "归档", icon: <Archive className="h-4 w-4" /> },
  { id: "alerts", label: "通知", icon: <Bell className="h-4 w-4" />, badge: "3" },
  { id: "settings", label: "设置", icon: <Settings className="h-4 w-4" /> },
];

export function ExpandableActionBarDemo() {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState("send");

  const items = useMemo(
    () => ACTIONS.map((item) => ({ ...item, active: item.id === activeId })),
    [activeId],
  );

  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="flex min-h-24 w-full items-center justify-center">
        <ExpandableActionBar
          items={items}
          expanded={expanded}
          onExpandedChange={setExpanded}
          activeId={activeId}
          onAction={(item) => setActiveId(item.id)}
          classNames={{ item: "group" }}
        />
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
      >
        {expanded ? "收起" : "展开"}
      </button>

      <p className="max-w-md text-center text-xs text-neutral-500">
        鼠标移上去或 Tab 聚焦会自动展开；触屏上第一次点只展开、不触发动作，第二次才执行。
        当前选中：<span className="text-neutral-700 dark:text-neutral-300">{activeId}</span>
      </p>
    </div>
  );
}
