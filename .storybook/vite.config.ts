import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

export default defineConfig({
  optimizeDeps: {
    exclude: ["xmllint-wasm"],
  },
  plugins: [react(),  unoCSS({ presets: [presetHv()] })],
});
