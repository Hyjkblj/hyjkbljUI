import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  type ButtonState,
  StatefulButton,
} from "@registry/button-stateful/button/stateful";

export function ButtonStatefulDemo() {
  const [okState, setOkState] = useState<ButtonState>("idle");
  const [errState, setErrState] = useState<ButtonState>("idle");

  const run = (target: "ok" | "err") => {
    const setter = target === "ok" ? setOkState : setErrState;
    setter("loading");
    setTimeout(() => {
      setter(target === "ok" ? "success" : "error");
      setTimeout(() => setter("idle"), 1800);
    }, 1400);
  };

  return (
    <div className="flex min-h-72 w-full flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StatefulButton
          state={okState}
          variant="primary"
          size="md"
          onClick={() => run("ok")}
          loadingText="保存中"
          successText="已保存"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          保存更改
        </StatefulButton>
        <StatefulButton
          state={errState}
          variant="secondary"
          size="md"
          onClick={() => run("err")}
          loadingText="提交中"
          errorText="提交失败"
        >
          提交
        </StatefulButton>
      </div>
      <p className="max-w-md text-center text-xs text-neutral-500">
        点一下：文字模糊淡出换成「保存中」，1.4 秒后变成「已保存」，再过 1.8 秒回到初始状态。
        宽度会随文字自动变化。
      </p>
    </div>
  );
}
