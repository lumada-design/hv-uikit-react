import unoCSS from "unocss/vite";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react";

// @ts-ignore
import viteConfig from "../.config/vite.config.app";

export default mergeConfig(viteConfig, {
  plugins: [unoCSS(), react()],
});
