/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

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
    HvAppShellVitePlugin({ mode }),
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
}));
