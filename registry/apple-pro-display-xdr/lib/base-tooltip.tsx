/**
 * HY-MODIFIED：base-ui Tooltip 的轻量替身。
 * 原组件（Cult UI）依赖 @base-ui/react + @radix-ui/react-slot，仅为一个悬停提示引入两个
 * 运行时依赖。本仓库用 60 行无依赖实现替代：支持 Tooltip / TooltipTrigger（render 注入）/
 * TooltipContent（side 定位），足够这个显示器组件用。
 * 需要完整无障碍（焦点管理、延迟、碰撞检测）时，把导入换回 @base-ui/react 版本。
 */
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

const Ctx = createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);

export function Tooltip({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open, setOpen }}>
      <span className="relative inline-flex">{children}</span>
    </Ctx.Provider>
  );
}

export function TooltipTrigger({
  render,
  children,
}: {
  render?: ReactElement<Record<string, unknown>>;
  children?: ReactNode;
}) {
  const ctx = useContext(Ctx);
  const handlers = {
    onMouseEnter: () => ctx?.setOpen(true),
    onMouseLeave: () => ctx?.setOpen(false),
    onFocus: () => ctx?.setOpen(true),
    onBlur: () => ctx?.setOpen(false),
  };

  if (isValidElement(render)) {
    const existing = (render.props ?? {}) as Record<string, unknown>;
    return cloneElement(render, {
      ...handlers,
      onMouseEnter: (e: unknown) => {
        (existing.onMouseEnter as ((ev: unknown) => void) | undefined)?.(e);
        handlers.onMouseEnter();
      },
      onMouseLeave: (e: unknown) => {
        (existing.onMouseLeave as ((ev: unknown) => void) | undefined)?.(e);
        handlers.onMouseLeave();
      },
    });
  }
  return <span {...handlers}>{children}</span>;
}

const SIDE_CLASS: Record<Side, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
  left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
  right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
};

export function TooltipContent({
  className,
  side = "top",
  children,
}: {
  className?: string;
  side?: Side;
  children: ReactNode;
}) {
  const ctx = useContext(Ctx);
  if (!ctx?.open) return null;
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute z-50 rounded-md px-2 py-1 whitespace-nowrap",
        SIDE_CLASS[side],
        className,
      )}
    >
      {children}
    </span>
  );
}
