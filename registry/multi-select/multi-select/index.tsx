/**
 * 来源：beUI — multi-select
 * https://beui.dev/components/motion/multi-select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
"use client";
// beui.dev/components/motion/multi-select

export {
  MultiSelectContent,
  type MultiSelectContentProps,
} from "./content";
export {
  MultiSelect,
  type MultiSelectFilter,
  type MultiSelectProps,
} from "./context";
export {
  MultiSelectEmpty,
  type MultiSelectEmptyProps,
  MultiSelectGroup,
  type MultiSelectGroupProps,
  MultiSelectItem,
  type MultiSelectItemProps,
  MultiSelectLabel,
  type MultiSelectLabelProps,
  MultiSelectList,
  type MultiSelectListProps,
  MultiSelectSeparator,
  type MultiSelectSeparatorProps,
} from "./list";
export {
  type MultiSelectMessages,
  multiSelectMessages,
} from "./messages";
export {
  MultiSelectInput,
  type MultiSelectInputProps,
  MultiSelectTrigger,
  type MultiSelectTriggerProps,
  MultiSelectValue,
  type MultiSelectValueProps,
} from "./trigger";
