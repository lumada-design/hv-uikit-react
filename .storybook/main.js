const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: ["../packages/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    // "../tools/theme-switcher/preset.js",
  ],
  docs: {
    docsPage: "automatic", // see below for alternatives
    defaultName: "Docs", // set to change the name of generated docs entries
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins.push(tsconfigPaths.default({ loose: true }));

    return config;
  },
};
