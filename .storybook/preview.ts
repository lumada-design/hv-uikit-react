import { Preview } from "@storybook/react";

import DocsContainer from "./blocks/DocsContainer";
import ThemeDecorator from "./decorators/withThemeProvider";

import "uno.css";

export const parameters: Preview["parameters"] = {
  layout: "fullscreen",
  docs: {
    source: { type: "dynamic" },
    container: DocsContainer,
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
        {
          // disable because all stories have a `aria-hidden="true"` in the root
          id: "aria-hidden-focus",
          enabled: false,
        },
      ],
    },
  },
  // Disables Chromatic's snapshotting on a global level
  // Snapshots are to be enabled individually at the component or story level
  chromatic: {
    disableSnapshot: true,
  },
  eyes: { include: false },
  // Chromatic default viewport
  viewport: {
    viewports: {
      desktop: {
        name: "desktop",
        styles: {
          height: "1080px",
          width: "1920px",
        },
      },
    },
    defaultViewport: "desktop",
  },
};

export default {
  parameters,
  decorators: [ThemeDecorator],
} satisfies Preview;
