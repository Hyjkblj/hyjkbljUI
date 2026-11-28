/**
 * 来源：beUI — button-base
 * https://beui.dev/components/motion/button/base
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径；只保留 base 链路所需的文件。
 */
import { defineSound } from "./engine";

/** A physical button: a switch click that settles twice over a soft thump and a little casing ring. */
export const pressSound = defineSound({
  name: "Press",
  duration: 0.1,
  vary: 0.03,
  room: 0.1,
  build: (v) => {
    v.click({ freq: 2800, q: 1.8, decay: 0.005, gain: 0.5 });
    v.click({ freq: 4200, q: 2.5, at: 0.011, decay: 0.003, gain: 0.16 });
    v.strike({ freq: 150, material: "wood", bend: 1.5, decay: 0.07, gain: 0.75 });
    v.strike({ freq: 1250, material: "plastic", decay: 0.022, gain: 0.14 });
  },
});
