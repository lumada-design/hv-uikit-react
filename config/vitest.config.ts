import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(process.cwd(), "src", "index.ts"),
      formats: ["es", "cjs"],
      fileName: (ext) => `index.${ext}.js`,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: resolve(__dirname, "test.setup.ts"),
    include: ["**/*.test.{ts,tsx}"],
  },
});
