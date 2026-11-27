/**
 * 来源：beUI — select / select-morph
 * https://beui.dev/components/motion/select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 与 @/components/motion/* 改为相对路径，
 * 源码不依赖任何路径别名，复制到任意项目都能直接用。
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
