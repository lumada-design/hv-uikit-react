/// <reference types="vite/client" />
import glob from "glob";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";
const root = resolve(__dirname, "../..");

export default defineConfig({
  plugins: [
    react({ jsxRuntime: "classic" }),
    tsconfigPaths({ root }),
    dts({
      skipDiagnostics: true,
      outputDir: "dist/types",
      entryRoot: "src",
    }),
  ],
  build: {
    outDir: resolve(process.cwd(), "dist/es"),
    lib: {
      entry: resolve(process.cwd(), "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      input: glob.sync(resolve(process.cwd(), "src/**/*.{ts,tsx}")),
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => `${fileName}.js`,
      },
      external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
        /node_modules/,
      ],
    },
  },
  resolve: {
    alias: {
      "@hitachivantara/uikit-core": resolve(root, "packages/core/src"),
      "@hitachivantara/uikit-icons": resolve(root, "packages/icons/bin"),
      "@hitachivantara/uikit-styles": resolve(root, "packages/styles/src"),
    },
  },
});
