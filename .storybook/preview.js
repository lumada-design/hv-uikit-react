import DocsContainer from "./blocks/DocsContainer";
import DocsPage from "./blocks/DocsPage";
import { withThemeSwitcher } from "./decorators";

export const decorators = [withThemeSwitcher];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    page: DocsPage,
    container: DocsContainer,
    source: { type: "dynamic" },
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
          "Introduction",
          "Installation",
          "Changelogs",
          "Community",
          "Migration",
          "Roadmap",
        ],
        "Foundation",
        ["Typography", "Colors", "Icons"],
        "Guides",
        ["Provider", "Theming", "Styling", "Forms"],
        "Layout",
        "Structure",
        "Display",
        "Feedback",
        "Inputs",
        "Navigation",
        "Overlay",
        "Widgets",
        "Templates",
        ["Overview"],
        "Lab",
        "Visualizations",
        "Compat",
      ],
    },
  },
};
