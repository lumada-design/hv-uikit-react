import { Preview } from "@storybook/react";

import DocsContainer from "./blocks/DocsContainer";
import { DocsPage } from "./blocks/DocsPage";
import { withThemeDecorator } from "./decorators/withThemeDecorator.decorator";

import "uno.css";

export const parameters: Preview["parameters"] = {
  layout: "fullscreen",
  docs: {
    source: { type: "dynamic" },
    container: DocsContainer,
    page: DocsPage,
  },
  controls: {},
  options: {
    storySort: {
      order: ["Components", "Visualizations"],
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
  decorators: [withThemeDecorator()],
  tags: ["autodocs"],
} satisfies Preview;
