import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

import tsconfig from "../tsconfig.json";

const aliases = Object.entries(tsconfig.compilerOptions.paths)
  .filter(([key]) => key.startsWith("@hitachivantara"))
  .reduce((acc, [key, value]) => {
    acc[key] = resolve(__dirname, "..", value[0]);
    return acc;
  }, {});

export default defineConfig({
  plugins: [react(), tsconfigPaths(), unoCSS({ presets: [presetHv()] })],
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
