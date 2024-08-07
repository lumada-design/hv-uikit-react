import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

export default defineConfig({
  optimizeDeps: {
    exclude: ["xmllint-wasm"],
  },
  plugins: [react(), tsconfigPaths(), unoCSS({ presets: [presetHv()] })],
});
