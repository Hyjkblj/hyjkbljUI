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

/** The open whoosh falling and a little quicker, settling with a soft low tap, for things closing. */
export const closeSound = defineSound({
  name: "Close",
  duration: 0.16,
  room: 0.18,
  build: (v) => {
    v.noise({ freq: 2600, to: 700, q: 1.2, attack: 0.012, decay: 0.09, gain: 0.7 });
    v.click({ freq: 1400, q: 1.2, at: 0.05, decay: 0.006, gain: 0.2 });
    v.strike({ freq: 260, material: "wood", bend: 1.2, at: 0.05, decay: 0.045, gain: 0.3 });
  },
});
