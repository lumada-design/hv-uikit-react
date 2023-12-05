import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import tsconfig from "../tsconfig.json";

const aliases = Object.entries(tsconfig.compilerOptions.paths)
  .filter(([key]) => key.startsWith("@hitachivantara"))
  .reduce((acc, [key, value]) => {
    acc[key] = resolve(__dirname, "..", value[0]);
    return acc;
  }, {});

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      ...aliases,
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" warnings
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes(`"use client"`)
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
