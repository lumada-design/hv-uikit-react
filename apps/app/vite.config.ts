import { copyFileSync } from "node:fs";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite/Rollup plugin that copies the generated `index.html` to `404.html`,
 * so that GitHub Pages routing is hits our App instead of the generic 404 page
 * @see https://github.com/brookslybrand/remix-gh-pages/blob/main/vite.config.ts
 */
function buildCopy({ src = "index.html", dest = "404.html" } = {}) {
  return {
    name: "rollup-plugin-build-copy",
    writeBundle({ dir }) {
      copyFileSync(join(dir, src), join(dir, dest));
    },
  };
}

export default defineConfig({
  plugins: [unoCSS(), react(), tsconfigPaths(), buildCopy()],
});
