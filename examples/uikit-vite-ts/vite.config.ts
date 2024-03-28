import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unoCSS({
      presets: [presetHv()],
    }),
  ],
});
