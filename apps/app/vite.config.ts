import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [unoCSS(), react()],
});
