/**
 * 来源：beUI — select / select-morph
 * https://beui.dev/components/motion/select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 与 @/components/motion/* 改为相对路径，
 * 源码不依赖任何路径别名，复制到任意项目都能直接用。
 */
"use client";

import { useIsPresent } from "motion/react";
import type { ReactNode } from "react";

export interface PresenceGateRenderProps {
  /**
   * False from the render that starts the exit animation onward. An overlay
   * kept in the tree by `AnimatePresence` is still the topmost thing on the
   * page, so anything it decides from `open` alone stays true for the whole
   * exit — this is the boolean that already knows the overlay is leaving.
   */
  isPresent: boolean;
  /**
   * Spread onto every layer that takes pointer events while the overlay is
   * open. Interaction releases in the same commit that starts the exit while
   * the visual exit keeps playing: pointer events stop landing, and `inert`
   * drops the subtree from focus order, from tab order and from the
   * accessibility tree — an exiting dialog is not a dialog you can still type
   * into. A layer that never takes pointer events (a wrapper that only centres
   * the panel) takes `inert={!isPresent}` alone, so its own
   * `pointer-events-none` is not overwritten.
   */
  gate: {
    inert: boolean;
    style: { pointerEvents: "auto" | "none" };
  };
}

export interface PresenceGateProps {
  children: (props: PresenceGateRenderProps) => ReactNode;
}

/**
 * Reads the presence of the subtree it renders and hands it down.
 *
 * `useIsPresent` only answers inside the `AnimatePresence` subtree, and the
 * components that own an overlay render the `AnimatePresence` themselves, so
 * the boolean has to be read one component further down: this is that
 * component, and the render prop is how it reaches the layers.
 */
export function PresenceGate({ children }: PresenceGateProps) {
  const isPresent = useIsPresent();

  return children({
    isPresent,
    gate: {
      inert: !isPresent,
      style: { pointerEvents: isPresent ? "auto" : "none" },
    },
  });
}
