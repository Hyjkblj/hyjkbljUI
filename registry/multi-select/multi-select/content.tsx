/**
 * 来源：beUI — multi-select
 * https://beui.dev/components/motion/multi-select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
"use client";
// beui.dev/components/motion/multi-select

import type { ReactNode } from "react";
import { ListboxPanel, type ListboxPanelPlacement } from "../combobox/listbox-panel";
import { useMultiSelectContext } from "./context";

export interface MultiSelectContentProps extends ListboxPanelPlacement {
  children: ReactNode;
}

export function MultiSelectContent({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  avoidCollisions = true,
  className,
}: MultiSelectContentProps) {
  const context = useMultiSelectContext("MultiSelectContent");
  return (
    <ListboxPanel
      name="multi-select"
      open={context.open}
      reduce={context.reduce}
      triggerRef={context.triggerRef}
      contentRef={context.contentRef}
      side={side}
      align={align}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      className={className}
    >
      {children}
    </ListboxPanel>
  );
}
