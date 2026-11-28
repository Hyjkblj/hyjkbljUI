/**
 * 来源：beUI — shared-layout-bg
 * https://beui.dev/components/motion/shared-layout-bg
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
