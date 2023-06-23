import { colors } from "@hitachivantara/uikit-styles";

import { themes } from "@storybook/theming";

import DocsContainer from "./blocks/DocsContainer";
import withThemeProvider from "./decorators/withThemeProvider";

const common = {
  appBorderRadius: 0,
  fontBase: "'Open Sans',sans-serif",
  brandTitle: "NEXT UI Kit",
};

export const parameters = {
  viewMode: process.env.STORYBOOK_VIEW_MODE,
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { container: DocsContainer, source: { type: "dynamic" } },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: {
      ...themes.dark,
      ...common,
      appBg: colors.dark.atmo1,
      appContentBg: colors.dark.atmo1,
      textColor: colors.dark.secondary,
      textInverseColor: colors.light.secondary,
      colorSecondary: colors.dark.primary,
      barTextColor: colors.dark.secondary,
      barSelectedColor: colors.dark.primary,
      barBg: colors.dark.atmo1,
      brandImage: "ui-kit-logo-dark.png",
    },
    light: {
      ...themes.normal,
      ...common,
      appBg: colors.light.atmo1,
      appContentBg: colors.light.atmo1,
      textColor: colors.light.secondary,
      textInverseColor: colors.dark.secondary,
      colorSecondary: colors.light.primary,
      barTextColor: colors.light.secondary,
      barSelectedColor: colors.light.primary,
      barBg: colors.light.atmo1,
      brandImage: "ui-kit-logo-light.png",
    },
  },
  options: {
    storySort: {
      order: [
        "Overview",
        [
          "Welcome",
          "Introduction",
          "Get Started",
          "Change Logs",
          "Community",
          "Migration",
          "Roadmap",
        ],
        "Foundation",
        ["Typography", "Colors", "Icons"],
        "Guides",
        [
          "Provider",
          "Theming",
          ["Theming", "White Labeling"],
          "Styling",
          ["Customization"],
          "Forms",
        ],
        "Components",
        "Widgets",
        "Templates",
        ["Overview"],
        "Visualizations",
      ],
    },
  },
};

export const decorators = [withThemeProvider];
