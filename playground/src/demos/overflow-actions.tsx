import { useState } from "react";
import { CalendarClock, Eye, GitBranch, Pin, Share2 } from "lucide-react";
import {
  type OverflowActionItem,
  OverflowActions,
} from "@registry/overflow-actions/overflow-actions";

const PRIMARY: OverflowActionItem[] = [
  { id: "preview", label: "预览", icon: <Eye className="h-4 w-4" /> },
  { id: "pin", label: "置顶", icon: <Pin className="h-4 w-4" /> },
];

const OVERFLOW: OverflowActionItem[] = [
  { id: "branch", label: "分支", icon: <GitBranch className="h-4 w-4" /> },
  { id: "schedule", label: "定时", icon: <CalendarClock className="h-4 w-4" /> },
  { id: "share", label: "分享", icon: <Share2 className="h-4 w-4" /> },
];

export function OverflowActionsDemo() {
  const [expanded, setExpanded] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <OverflowActions
        primaryActions={PRIMARY}
        overflowActions={OVERFLOW}
        expanded={expanded}
        onExpandedChange={setExpanded}
        onAction={(item) => setLast(String(item.id))}
        collapseOnAction
        openLabel="展开更多操作"
        closeLabel="收起更多操作"
      />

      <p className="max-w-md text-center text-xs text-neutral-500">
        点右侧「更多」展开次级操作，整条轨道用弹簧变宽。
        {last ? <> 最近执行：<span className="text-neutral-700 dark:text-neutral-300">{last}</span></> : null}
      </p>
    </div>
  );
}
