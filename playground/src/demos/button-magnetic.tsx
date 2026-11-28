import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@registry/button-magnetic/button/magnetic";

export function ButtonMagneticDemo() {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MagneticButton variant="primary" size="md" strength={0.35}>
          主按钮
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        <MagneticButton variant="secondary" size="md" strength={0.25}>
          轻微吸附
        </MagneticButton>
        <MagneticButton variant="outline" size="md" strength={0.5}>
          强吸附
        </MagneticButton>
      </div>
      <p className="max-w-md text-center text-xs text-neutral-500">
        光标靠近时按钮朝光标方向偏移，离开用弹簧回弹。触屏设备与「减少动态效果」下自动关闭磁吸。
      </p>
    </div>
  );
}
