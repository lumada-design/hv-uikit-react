import DocsContainer from "./blocks/DocsContainer";
import withThemeProvider from "./decorators/withThemeProvider";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { container: DocsContainer, source: { type: "dynamic" } },
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
};

export const argTypes = {
  classes: { control: { disable: true } },
};

export const decorators = [withThemeProvider];
