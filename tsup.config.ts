import path from "node:path";
import { defineConfig } from "tsup";

/** 收录层源码统一 `import { cn } from "@/lib/utils"`，打包时把它指向仓库里的 shim */
const ALIAS = {
  "@/lib/utils": path.resolve(process.cwd(), "shims/cn.ts"),
};

const BASE_EXTERNAL = ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"];

function pkg(name: string, extraExternal: string[]) {
  return {
    entry: { [name]: `registry/${name}/${name}.tsx` },
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
]);
