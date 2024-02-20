/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import unoCSS from "unocss/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { presetHv } from "@hitachivantara/uikit-uno-preset";
import { HvAppShellVitePlugin } from "@hitachivantara/app-shell-vite-plugin";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths(),
    unoCSS({
      mode: "per-module",
      presets: [presetHv()],
    }),
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    HvAppShellVitePlugin({
      mode,
      autoMenu: true,
      autoViewsAndRoutes: true,
    }),
  ],
}));
