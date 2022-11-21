const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: ["../packages/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    // "../tools/addon-theme-switcher/preset.js",
  ],
  docs: {
    docsPage: "automatic",
    defaultName: "Docs",
  },
  framework: {
    name: "@storybook/react-vite",
  },
  async viteFinal(config) {
    config.plugins.push(tsconfigPaths.default());

    return config;
  },
};
