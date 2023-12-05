import { mergeConfig } from "vite";

import viteConfig from "../../.config/vite.config.lib";

export default mergeConfig(viteConfig, {
  build: {
    rollupOptions: {
      output: [
        {
          format: "esm",
          dir: "dist/bundles",
          sourcemap: true,
        },
      ],
    },
  },
});
