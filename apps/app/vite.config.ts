// @ts-ignore fix tsconfig
import { reactRouter } from "@react-router/dev/vite";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    unoCSS(),
    reactRouter({
      ssr: false,
      prerender: true,
      appDirectory: "src",
      buildDirectory: "dist",
    }),
    tsconfigPaths(),
  ],
});
