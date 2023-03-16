import DocsContainer from "./blocks/DocsContainer";
import withThemeProvider from "./decorators/withThemeProvider";

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
  options: {
    storySort: {
      order: [
        "Overview",
        [
          "Welcome",
          "Introduction",
          "Get Started",
          "Changelogs",
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
          ["White labeling"],
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
