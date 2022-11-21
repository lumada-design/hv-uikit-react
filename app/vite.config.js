import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const root = resolve(__dirname, "..");

export default defineConfig({
  plugins: [react(), tsconfigPaths({ root })],
  resolve: {
    alias: {
      "@hitachivantara/uikit-core": resolve(root, "packages/core/src"),
      "@hitachivantara/uikit-icons": resolve(root, "packages/icons/bin"),
      "@hitachivantara/uikit-styles": resolve(root, "packages/styles/src"),
    },
  },
});
