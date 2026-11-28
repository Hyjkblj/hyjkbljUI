import path from "node:path";
import { defineConfig } from "tsup";

/** 收录层源码统一 `import { cn } from "@/lib/utils"`，打包时把它指向仓库里的 shim */
const ALIAS = {
  "@/lib/utils": path.resolve(process.cwd(), "shims/cn.ts"),
};

const BASE_EXTERNAL = ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"];

function pkg(name: string, extraExternal: string[], extraEntries: Record<string, string> = {}) {
  return {
    entry: { [name]: `registry/${name}/${name}.tsx`, ...extraEntries },
    outDir: `registry/${name}/dist`,
    format: ["esm"] as const,
    dts: true,
    tsconfig: "tsconfig.json",
    clean: true,
    sourcemap: true,
    target: "es2020",
    external: [...BASE_EXTERNAL, ...extraExternal],
    // 收录的源码自身就带 "use client"，esbuild 会保留，不再额外加 banner（否则会出现两条）
    esbuildOptions(options: Record<string, unknown>) {
      (options as { alias?: Record<string, string> }).alias = {
        ...((options as { alias?: Record<string, string> }).alias ?? {}),
        ...ALIAS,
      };
    },
  };
}

export default defineConfig([
  pkg("macbook-scroll", ["motion", "motion/react", "@tabler/icons-react"]),
  pkg("canvas-text", []),
  pkg("wobble-card", ["motion", "motion/react"]),
  pkg("typewriter-effect", ["motion", "motion/react"]),
  pkg("floating-dock", ["motion", "motion/react", "@tabler/icons-react"]),
  pkg("animated-theme-toggler", ["lucide-react", "react-dom"]),
  pkg("text-animate", ["motion", "motion/react"]),
  pkg("skeleton", []),
  pkg("floating-panel", ["motion", "motion/react", "lucide-react"]),
  pkg("expandable-action-bar", ["motion", "motion/react", "lucide-react"]),
  pkg("morphing-search", ["motion", "motion/react", "lucide-react"]),
  pkg("overflow-actions", ["motion", "motion/react", "lucide-react"]),
  pkg("hero-video-dialog", ["motion", "motion/react", "lucide-react"]),
  pkg("liquid-glass", []),
  pkg("merging-bubbles", []),
  pkg("apple-pro-display-xdr", []),
  pkg("images-badge", ["motion", "motion/react"]),
  pkg("loader", ["motion", "motion/react"]),
  pkg("shared-layout-bg", ["motion", "motion/react"]),
  pkg("sortable-stack", ["motion", "motion/react", "lucide-react"]),
  pkg("tabs", ["motion", "motion/react", "lucide-react"]),
  pkg("wave-reveal", ["motion", "motion/react"]),
  pkg("background-cubes-grid", ["three", "three/*", "motion", "motion/react"]),
  pkg("multi-select", ["motion", "motion/react", "lucide-react"], {
    "multi-select": "registry/multi-select/multi-select/index.tsx",
  }),
  pkg("button-base", ["motion", "motion/react", "lucide-react"], {
    "button-base": "registry/button-base/button/base.tsx",
  }),
  pkg("button-stateful", ["motion", "motion/react", "lucide-react"], {
    "button-stateful": "registry/button-stateful/button/stateful.tsx",
  }),
  pkg("button-magnetic", ["motion", "motion/react", "lucide-react"], {
    "button-magnetic": "registry/button-magnetic/button/magnetic.tsx",
  }),
  pkg("select", ["motion", "motion/react", "lucide-react"], {
    "select-morph": "registry/select/select-morph.tsx",
  }),
]);
