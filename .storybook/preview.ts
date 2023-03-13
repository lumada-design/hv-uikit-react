import DocsContainer from "./blocks/DocsContainer";
import withThemeProvider from "./decorators/withThemeProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { container: DocsContainer },
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
          ["Default themes", "Customization", "White labeling"],
          "Styling",
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
