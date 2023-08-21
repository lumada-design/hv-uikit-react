import { mergeConfig } from "vite";
import path from "path";

// eslint-disable-next-line import/no-relative-packages
import viteConfig from "../../.config/vite.config";

export default mergeConfig(viteConfig, {
  resolve: {
    alias: {
      "@flow": path.resolve(__dirname, "src"),
    },
  },
});
