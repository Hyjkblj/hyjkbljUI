/**
 * 来源：beUI — select / select-morph
 * https://beui.dev/components/motion/select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 与 @/components/motion/* 改为相对路径，
 * 源码不依赖任何路径别名，复制到任意项目都能直接用。
 */
import { defineSound } from "./engine";

/** A soft rising whoosh that lands with a light glass touch, for menus, popovers and dialogs opening. */
export const openSound = defineSound({
  name: "Open",
  duration: 0.2,
  room: 0.2,
  build: (v) => {
    v.noise({ freq: 600, to: 2600, q: 1.2, attack: 0.035, decay: 0.11, gain: 0.75 });
    v.noise({ freq: 4500, to: 6000, q: 1, attack: 0.03, decay: 0.07, gain: 0.05 });
    v.strike({ freq: 1320, material: "glass", at: 0.05, decay: 0.07, gain: 0.12 });
  },
});
