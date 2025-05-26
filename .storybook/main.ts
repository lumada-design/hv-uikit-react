import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

import viteConfig from "./vite.config";

export default {
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  stories: [
    "../packages/*/src/**/*.mdx",
    "../packages/*/src/**/*.stories.@(ts|tsx)",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {},
  addons: [
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-toolbars"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-themes"),
    `${__dirname}/addons/version-selector`,
    `${__dirname}/addons/mode-selector`,
  ],
  features: {},
  staticDirs: [
    "./assets",
    {
      from: "../packages/icons/sprites/icons.svg",
      to: "assets/icons.svg",
    },
    {
      from: "../packages/icons/sprites/pictograms.svg",
      to: "assets/pictograms.svg",
    },
  ],
  async viteFinal(config) {
    return mergeConfig(config, viteConfig);
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  build: {
    test: {
      // https://storybook.js.org/docs/api/main-config-build#testdisableblocks
      disableBlocks: false,
    },
  },
} as StorybookConfig;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
