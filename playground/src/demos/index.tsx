import type { ComponentType } from "react";
import { MacbookScrollDemo } from "./macbook-scroll";
import { CanvasTextDemo } from "./canvas-text";
import { WobbleCardDemo } from "./wobble-card";
import { TypewriterEffectDemo } from "./typewriter-effect";
import { FloatingDockDemo } from "./floating-dock";

export type DemoMeta = {
  /** 路由 key，同时也是 registry 目录名 */
  id: string;
  index: string;
  name: string;
  title: string;
  summary: string;
  stack: string;
  deps: string[];
  Render: ComponentType;
};

const REPO = "https://github.com/Hyjkblj/hyjkbljUI";

export const docUrl = (id: string) => `${REPO}/blob/main/registry/${id}/README.md`;
export const sourceUrl = (id: string) => `${REPO}/blob/main/registry/${id}/${id}.tsx`;
export const REPO_URL = REPO;

export const DEMOS: DemoMeta[] = [
  {
    id: "macbook-scroll",
    index: "01",
    name: "macbook-scroll",
    title: "笔记本滚动展开",
    summary: "页面往下滚，一台 MacBook 从合盖倾斜的状态慢慢「开盖」转正，屏幕里的内容随之展开。",
    stack: "React · motion",
    deps: ["motion", "@tabler/icons-react"],
    Render: MacbookScrollDemo,
  },
  {
    id: "canvas-text",
    index: "02",
    name: "canvas-text",
    title: "画布扫线文字",
    summary: "用 canvas 合成模式把文字抠成洞，再往洞里画彩色正弦曲线。零外部依赖。",
    stack: "React · canvas",
    deps: [],
    Render: CanvasTextDemo,
  },
  {
    id: "wobble-card",
    index: "03",
    name: "wobble-card",
    title: "摇摆卡片",
    summary: "鼠标在卡片里移动时朝光标方向轻微位移，离开即弹回。适合 Bento 网格。",
    stack: "React · motion",
    deps: ["motion"],
    Render: WobbleCardDemo,
  },
  {
    id: "typewriter-effect",
    index: "04",
    name: "typewriter-effect",
    title: "打字机文字",
    summary: "文字像被「打」出来一样出场，末尾跟一个闪烁光标。导出逐字与平滑两个版本。",
    stack: "React · motion",
    deps: ["motion"],
    Render: TypewriterEffectDemo,
  },
  {
    id: "floating-dock",
    index: "05",
    name: "floating-dock",
    title: "浮动 Dock",
    summary: "macOS 那种 Dock：鼠标横向扫过时，离光标最近的图标被弹簧放大；窄屏切成弹出菜单。",
    stack: "React · motion",
    deps: ["motion", "@tabler/icons-react"],
    Render: FloatingDockDemo,
  },
];

/** 自研层（还没开始），侧栏里以禁用态展示 */
export const PLANNED = [
  "button",
  "modal",
  "toast",
  "virtual-list",
  "drag-sort",
  "image-preview",
  "upload",
  "countdown",
];
