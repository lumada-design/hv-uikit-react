const tsconfigPaths = require("vite-tsconfig-paths");

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
    config.plugins.push(tsconfigPaths.default({ loose: true }));

    return config;
  },
};
