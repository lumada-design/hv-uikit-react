/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths({ root: ".." }),
    unoCSS(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/tests/setupTests.ts"],
    reporters: "default",
    coverage: {
      enabled: false, // disabled by default. run vitest with --coverage
      provider: "c8",
      reporter: "lcov",
      include: ["src/**/*.ts?(x)"],
      exclude: [
        "src/**/mocks/*",
        "src/**/tests/*",
        "src/**/*.test.ts?(x)",
        "src/**/styles.[jt]s?(x)",
        "src/**/*.d.ts",
        "src/*.tsx",
      ],
    },
  },
  build: {
    rollupOptions: {
      // hides warnings about module level directive use client
      // that many third party libraries added because of React Server Components
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
