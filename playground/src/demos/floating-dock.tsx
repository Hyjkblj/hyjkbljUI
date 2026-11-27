import {
  IconBrandGithub,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "@registry/floating-dock/floating-dock";

const ITEMS = [
  { title: "首页", href: "#", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { title: "组件", href: "#", icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { title: "文档", href: "#", icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { title: "变更", href: "#", icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { title: "GitHub", href: "#", icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
];

export function FloatingDockDemo() {
  return (
    <div className="flex h-[20rem] w-full items-center justify-center">
      <FloatingDock items={ITEMS} />
    </div>
  );
}
