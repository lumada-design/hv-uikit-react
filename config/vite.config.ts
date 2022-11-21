/// <reference types="vite/client" />
import glob from "glob";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const definePkgConfig = (entryDir, externals) => {
  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      dts({
        skipDiagnostics: true,
        outputDir: "dist/types",
        entryRoot: `${entryDir}`,
      }),
    ],
    build: {
      outDir: resolve(process.cwd(), "dist/es"),
      lib: {
        entry: resolve(process.cwd(), `${entryDir}/index.ts`),
        formats: ["es"],
      },
      rollupOptions: {
        input: glob.sync(resolve(process.cwd(), `${entryDir}/**/*.{ts,tsx}`)),
        output: {
          preserveModules: true,
          entryFileNames: ({ name: fileName }) => `${fileName}.js`,
        },
        external: [...externals, /node_modules/],
      },
    },
  });
};

export default definePkgConfig;
