import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@registry/select/select";
import {
  MorphSelect,
  MorphSelectContent,
  MorphSelectItem,
  MorphSelectTrigger,
  MorphSelectValue,
} from "@registry/select/select-morph";

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "vite", label: "Vite" },
];

export function SelectDemo() {
  const [value, setValue] = useState("next");
  const [morphValue, setMorphValue] = useState("next");

  return (
    <div className="flex flex-col items-start gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
          默认 · 面板弹出后分离
        </p>
        <div className="w-56">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue placeholder="选一个框架" />
            </SelectTrigger>
            <SelectContent>
              {FRAMEWORKS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
          Morph · 触发器长成面板
        </p>
        <div className="w-56">
          <MorphSelect value={morphValue} onValueChange={setMorphValue}>
            <MorphSelectTrigger>
              <MorphSelectValue placeholder="选一个框架" />
            </MorphSelectTrigger>
            <MorphSelectContent>
              {FRAMEWORKS.map((f) => (
                <MorphSelectItem key={f.value} value={f.value}>
                  {f.label}
                </MorphSelectItem>
              ))}
            </MorphSelectContent>
          </MorphSelect>
        </div>
      </div>

      <p className="max-w-md text-xs text-neutral-500">
        点开对比两者：默认版面板「捏」出来再分离，morph 版触发器本身长成面板、关闭时缩回去，始终是一块。
        两个都支持键盘操作（↑↓ / Home / End / 首字母 / Esc）。
      </p>
    </div>
  );
}
