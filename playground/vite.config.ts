import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const here = import.meta.dirname;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // shadcn 组件的惯例：@/lib/utils
      "@": path.resolve(here, "src"),
      // 收录型组件源码
      "@registry": path.resolve(here, "../registry"),
    },
  },
});
