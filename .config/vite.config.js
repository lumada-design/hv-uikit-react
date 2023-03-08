import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const pkg = require(path.resolve(process.cwd(), "package.json"));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((ext) => new RegExp(`^${ext.split("/")[0]}`));

export default defineConfig({
  plugins: [
    dts({
      outputDir: "dist/types",
      rollupTypes: true,
    }),
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths({ loose: true }),
  ],
  build: {
    minify: false,
    lib: {
      name: pkg.name,
      entry: path.resolve(process.cwd(), "src/index.ts"),
    },
    rollupOptions: {
      output: [
        {
          format: "esm",
          preserveModules: true,
          dir: "dist/esm",
          entryFileNames: "[name].js",
          sourcemap: true,
          exports: "named",
          interop: "auto",
        },
        {
          format: "cjs",
          preserveModules: true,
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          sourcemap: true,
          exports: "named",
          interop: "auto",
        },
      ],
      external,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "test.setup.ts"),
    include: ["**/*.test.{ts,tsx}"],
    silent: true,
  },
});
