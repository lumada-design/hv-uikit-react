import path from "path";
import { mergeConfig } from "vite";

import viteConfig from "../../.config/vite.config";

export default mergeConfig(viteConfig, {
  build: {
    lib: {
      entry: path.resolve(process.cwd(), "bin/index.ts"),
    },
  },
});
