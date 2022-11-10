/// <reference types="vite/client" />
import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";

import viteConfig from "../../config/vite.config";
import pkg from "./package.json";

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies),
          ...Object.keys(pkg.peerDependencies),
        ],
      },
      lib: {
        entry: resolve(process.cwd(), "bin", "index.ts"),
        formats: ["es", "cjs"],
        fileName: (ext) => `index.${ext}.js`,
      },
    },
  })
);
