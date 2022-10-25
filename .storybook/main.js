import tsconfigPaths from "vite-tsconfig-paths";
const { mergeConfig } = require("vite");

module.exports = {
  stories: ["../packages/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    // "../tools/theme-switcher/preset.js",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths({ loose: true })],
      esbuild: {
        jsx: "automatic",
      },
    });
  },
};
