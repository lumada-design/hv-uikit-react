import { Preview } from "@storybook/react";
import DocsContainer from "./blocks/DocsContainer";
import { DocsPage } from "./blocks/DocsPage";
import withThemeProvider from "./decorators/withThemeProvider";

import "uno.css";

export const parameters: Preview["parameters"] = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    source: { type: "dynamic" },
    container: DocsContainer,
    page: DocsPage,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
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
          "Community",
          ["Releases", "Contributing", "Component Guidelines"],
          "Migration",
          "Project Status",
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
  a11y: {
    config: {
      rules: [
        {
          // Disable color contrast rule
          id: "color-contrast",
          enabled: false,
        },
      ],
    },
  },
};

export default {
  parameters,
  decorators: [withThemeProvider],
} satisfies Preview;
