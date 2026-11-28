/**
 * 来源：beUI — tabs
 * https://beui.dev/components/motion/tabs
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
import { defineSound } from "./engine";

/** A crisp detent, like a dial clicking into a notch, for tabs, segmented controls and menu choices. */
export const selectSound = defineSound({
  name: "Select",
  duration: 0.05,
  room: 0.08,
  build: (v) => {
    v.click({ freq: 4500, q: 2.5, decay: 0.003, gain: 0.45 });
    v.strike({ freq: 1700, material: "metal", decay: 0.028, gain: 0.3 });
    v.strike({ freq: 520, material: "wood", bend: 1.15, decay: 0.012, gain: 0.25 });
  },
});
