const tsconfigPaths = require("vite-tsconfig-paths");
const path = require("path");

module.exports = {
  stories: [
    "../docs/**/*.stories.@(tsx|mdx)",
    "../packages/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
        viewport: false,
        measure: false,
        outline: false,
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    __dirname + "/addons/version-selector/register",
    __dirname + "/addons/theme-selector/register",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
    uildStoriesJson: true,
  },
  staticDirs: ["./assets"],
  async viteFinal(config, { configType }) {
    config.plugins.push(tsconfigPaths.default({ loose: true }));

    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        "@mdx-js/react",
        "@storybook/api",
        "@storybook/theming",
        "@storybook/addon-docs",
        "@storybook/addon-links/react",
        "@storybook/addon-links",
      ],
    };

    if (configType === "PRODUCTION") {
      config.base = "./";
    }

    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "../tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
};
