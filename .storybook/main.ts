import { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.stories.@(tsx|mdx)",
    "../packages/**/src/**/*.stories.@(ts|tsx|mdx)",
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
    "@storybook/addon-mdx-gfm",
    __dirname + "/addons/version-selector/register",
    __dirname + "/addons/theme-selector/register",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
    // buildStoriesJson: true,
  },

  staticDirs: [
    "./assets",
    {
      from: "../packages/viz/src/components/LineChart/steelwheels.arrow",
      to: "assets/steelwheels.arrow",
    },
  ],
  // is auto
  async viteFinal(config, { configType }) {
    config.plugins?.push(
      tsconfigPaths({
        loose: true,
      })
    );
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
  docs: {
    autodocs: true, // TODO: review
  },
};

export default config;
