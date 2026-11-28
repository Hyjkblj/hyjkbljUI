import { Circle } from "lucide-react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectGroup,
  MultiSelectInput,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@registry/multi-select/multi-select";

const COLORS: Record<string, string> = {
  design: "fill-rose-500 text-rose-500",
  engineering: "fill-sky-500 text-sky-500",
  product: "fill-amber-500 text-amber-500",
  research: "fill-cyan-500 text-cyan-500",
  marketing: "fill-emerald-500 text-emerald-500",
  operations: "fill-slate-500 text-slate-500",
};

function Option({ value, children }: { value: string; children: string }) {
  return (
    <MultiSelectItem value={value} textValue={children}>
      <span className="flex items-center gap-2.5">
        <Circle aria-hidden="true" className={`size-2.5 ${COLORS[value]}`} />
        {children}
      </span>
    </MultiSelectItem>
  );
}

export function MultiSelectDemo() {
  return (
    <div className="flex min-h-[26rem] w-full items-start justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <MultiSelect defaultValue={["design", "engineering"]}>
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="选择团队" />
            <MultiSelectInput aria-label="搜索团队" />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectList ariaLabel="团队">
              <MultiSelectGroup>
                <MultiSelectLabel>产品团队</MultiSelectLabel>
                <Option value="design">Design</Option>
                <Option value="engineering">Engineering</Option>
                <Option value="product">Product</Option>
                <Option value="research">Research</Option>
              </MultiSelectGroup>
              <MultiSelectGroup>
                <MultiSelectLabel>业务团队</MultiSelectLabel>
                <Option value="marketing">Marketing</Option>
                <Option value="operations">Operations</Option>
              </MultiSelectGroup>
              <MultiSelectEmpty>没有匹配的团队。</MultiSelectEmpty>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>

        <p className="mt-6 text-center text-xs text-neutral-500">
          点开输入框：已选项是带 × 的 token，输入可模糊搜索（子序列匹配），↑↓ 移动、回车切换、退格删最后一个 token。
        </p>
      </div>
    </div>
  );
}
