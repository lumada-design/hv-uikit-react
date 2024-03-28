import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [unoCSS(), react(), tsconfigPaths()],
});
