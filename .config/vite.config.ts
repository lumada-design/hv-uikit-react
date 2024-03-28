import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const pkg = require(resolve(process.cwd(), "package.json"));

// dependencies that should not be bundled.
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
].map((ext) => new RegExp(`^${ext.split("/")[0]}`));

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist/types",
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "../tsconfig.build.json"),
    }),
    react(),
    tsconfigPaths(),
  ],
  build: {
    target: "ES2022",
    minify: false,
    emptyOutDir: true,
    lib: {
      name: pkg.name,
      entry: resolve(process.cwd(), "src/index.ts"),
    },
    sourcemap: "hidden",
    rollupOptions: {
      output: [
        {
          format: "esm",
          preserveModules: true,
          dir: "dist/esm",
          // keep react-based packages as `.js` for backwards compatibility
          entryFileNames: pkg.name.includes("react")
            ? "[name].js"
            : "[name].mjs",
          exports: "named",
          interop: "auto",
        },
        {
          format: "cjs",
          preserveModules: true,
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
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
    setupFiles: resolve(__dirname, "test.setup.tsx"),
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
    silent: true,
    testTimeout: 10000,
    reporters: "default",
    coverage: {
      enabled: false,
      provider: "v8",
      reporter: "lcov",
      include: ["src/**/*.ts?(x)"],
      exclude: ["src/**/stories/*", "src/**/*{test,stories,spec}.ts?(x)"],
    },
  },
});
