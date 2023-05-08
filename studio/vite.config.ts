import { defineConfig } from "vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

const clientPath = resolve(__dirname, "./src/client");

export default defineConfig({
  resolve: {
    alias: {
      assets: `${clientPath}/assets`,
      components: `${clientPath}/components`,
      lib: `${clientPath}/lib`,
      pages: `${clientPath}/pages`,
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsconfigPaths({ root: ".." }),
  ],
});
