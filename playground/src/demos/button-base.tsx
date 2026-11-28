import { ArrowRight, Download, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@registry/button-base/button/base";

export function ButtonBaseDemo() {
  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="md">
          继续
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="md">
          <Download className="h-4 w-4" />
          下载
        </Button>
        <Button variant="outline" size="md">
          描边
        </Button>
        <Button variant="ghost" size="md">
          幽灵
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="sm">
          小
        </Button>
        <Button variant="primary" size="md">
          中
        </Button>
        <Button variant="primary" size="lg">
          大
        </Button>
        <Button variant="secondary" size="icon" aria-label="删除">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" size="md" ripple>
          水波
        </Button>
        <ButtonLink href="#/button-base" variant="outline" size="md">
          链接按钮
        </ButtonLink>
      </div>

      <p className="max-w-md text-center text-xs text-neutral-500">
        四种变体、四种尺寸；按下去有轻微弹簧缩放，ripple 会在点击处生成水波。ButtonLink 是同样的外观但渲染成 &lt;a&gt;。
      </p>
    </div>
  );
}
