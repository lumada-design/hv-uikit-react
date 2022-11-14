import { withThemeSwitcher } from "./decorators";

export const decorators = [withThemeSwitcher];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
