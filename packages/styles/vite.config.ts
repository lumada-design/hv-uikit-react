/// <reference types="vite/client" />
import { defineConfig, mergeConfig } from "vite";

import viteConfig from "../../config/vite.config";
import pkg from "./package.json";

export default mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies)],
      },
    },
  })
);
