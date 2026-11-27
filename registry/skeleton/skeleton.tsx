/**
 * 来源：Coss UI — skeleton
 * https://coss.com/ui/r/skeleton.json
 * 收录方式：registry 导入
 * 依赖：无（需要 Tailwind v4 主题变量 --color-muted 与 --animate-skeleton）
 *
 * HY-MODIFIED：导入路径由 @/registry/default/lib/utils 改为 @/lib/utils
 * （Coss 内部 registry 路径在外部项目里不存在，等价于 shadcn 安装时的路径重写）
 */
import type React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-sm [--skeleton-highlight:--alpha(var(--color-white)/64%)] [background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-muted)_0_0/200%_100%_fixed] dark:[--skeleton-highlight:--alpha(var(--color-white)/4%)]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
