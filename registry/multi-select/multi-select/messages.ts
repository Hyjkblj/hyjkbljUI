/**
 * 来源：beUI — multi-select
 * https://beui.dev/components/motion/multi-select
 * 收录方式：registry 导入（改动处用 HY-MODIFIED 标注）
 * 依赖：motion、lucide-react（clsx / tailwind-merge 见 package.json）
 *
 * HY-MODIFIED：内部 import 由 @/lib/* 改为相对路径，源码不依赖任何路径别名。
 */
import type { useMessages } from "../lib/i18n";

/** English defaults. Override per instance with `labels`, or app-wide with `LocaleProvider`. */
export const multiSelectMessages = {
  valuePlaceholder: "Select options",
  removeValue: "Remove {label}",
  inputLabel: "Search options",
  inputPlaceholder: "Search…",
  listLabel: "Options",
  empty: "No options found.",
};

export type MultiSelectMessages = typeof multiSelectMessages;

/** The resolved translator the root hands to its parts. */
export type MultiSelectTranslate = ReturnType<
  typeof useMessages<MultiSelectMessages>
>;
