import { AnimatePresence, motion } from "motion/react";
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "@registry/floating-panel/floating-panel";

const TRIGGER =
  "border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

function NotePanel() {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="写一条笔记" className={TRIGGER}>
        <span>写一条笔记</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={(note: string) => console.log("note:", note)}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="note-input">内容</FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33F1", "#33FFF1", "#F1FF33"];

function ColorPanel() {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="选个颜色" className={TRIGGER}>
        <span>选个颜色</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-64">
        <FloatingPanelBody>
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {COLORS.map((color) => (
                <motion.button
                  key={color}
                  className="h-12 w-12 rounded-full focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none"
                  style={{ backgroundColor: color }}
                  onClick={() => console.log("color:", color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

function QuickActionsPanel() {
  const actions = [
    { label: "新建文件", action: () => console.log("new file") },
    { label: "上传图片", action: () => console.log("upload") },
    { label: "编辑颜色", action: () => console.log("edit colors") },
  ];

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="快捷操作" className={TRIGGER}>
        <span>快捷操作</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-56">
        <FloatingPanelBody>
          <AnimatePresence>
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 }}
              >
                <FloatingPanelButton
                  onClick={action.action}
                  className="flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  {action.label}
                </FloatingPanelButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

export function FloatingPanelDemo() {
  return (
    <div className="flex flex-col gap-8 px-6 py-16">
      <div className="flex flex-wrap items-start gap-4">
        <NotePanel />
        <ColorPanel />
        <QuickActionsPanel />
      </div>
      <p className="max-w-md text-xs text-neutral-500">
        点任意按钮：面板从按钮位置「长」出来，背后压一层模糊遮罩。三个面板互不干扰（各自独立 context）。
      </p>
    </div>
  );
}
