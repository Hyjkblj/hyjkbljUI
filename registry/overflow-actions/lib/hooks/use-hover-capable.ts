/**
 * 来源：beUI — overflow-actions
 * https://beui.dev/components/blocks/overflow-actions
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only on devices that have a true hover (mouse / trackpad).
 * Touch devices fire phantom `:hover` on tap that sticks until tap-elsewhere
 * — gate hover-only effects (scale lifts, magnetic pulls) behind this.
 */
export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return canHover;
}
