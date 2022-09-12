const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: ["../packages/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
    },
    "../tools/theme-switcher/preset.js",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    config.plugins.push(tsconfigPaths.default({ loose: true }));

    return config;
  },
};
