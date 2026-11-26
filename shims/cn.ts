import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 构建期 shim：把收录层源码里的 `@/lib/utils` 指向这里。
 * 源码保持原样（仍写 @/lib/utils），打包时被内联成这个 cn。
 * clsx 与 tailwind-merge 作为包的 dependencies，不打进产物。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
