const tsconfigPaths = require("vite-tsconfig-paths");

module.exports = {
  stories: [
    "./docs/**/*.stories.@(tsx|mdx)",
    "../packages/**/*.stories.@(ts|tsx|mdx)",
    // "../packages/core/src/components/Header/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "../tools/addon-theme-switcher/preset.js",
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

    return config;
  },
};
