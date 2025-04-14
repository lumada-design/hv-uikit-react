import { mergeConfig } from "vite";

import viteConfig from "../../.config/vite.config";

export default mergeConfig(viteConfig, {
  build: {
    rollupOptions: {
      output: [
        {
          format: "esm",
          dir: "dist/bundles",
        },
      ],
    },
  },
});
