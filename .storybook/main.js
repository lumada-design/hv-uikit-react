const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: [
    "../docs/**/*.stories.@(tsx|mdx)",
    "../templates/**/*.stories.@(tsx|mdx)",
    "../packages/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "../tools/addon-theme-switcher/preset.js",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    config.plugins.push(tsconfigPaths.default({ loose: true }));
    config.optimizeDeps = {
      ...config.optimizeDeps,
      // Use this option to force linked packages to be pre-bundled.
      include: [
        "@storybook/theming",
        "@storybook/addon-docs",
        "@mdx-js/react",
        "lodash/capitalize",
        "lodash/startCase",
      ],
    };

    if (configType === "PRODUCTION") {
      config.base = "./";
    }

    return config;
  },
};
