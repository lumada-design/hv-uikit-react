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
        "Theme",
        ["Typography", "Colors", "Icons"],
        "Layout",
        "Display",
        "Feedback",
        "Inputs",
        "Navigation",
        "Overlay",
        "Structure",
        "Visualizations",
        "Widgets",
        "Templates",
        "Lab",
        "Compat",
      ],
    },
  },
};
