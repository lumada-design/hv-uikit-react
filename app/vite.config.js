import { defineConfig } from "vite";
import unoCSS from "unocss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [unoCSS(), react(), tsconfigPaths()],
});
