import React, { useState, useEffect } from "react";
import addons from "@storybook/addons";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import DocsPage from "./blocks/DocsPage";
import DocsContainer from "./blocks/DocsContainer";
import { getTheme, UIKIT_THEME } from "./theme";
import { extractArgTypes } from "./props/extractArgTypes";
import storySort from "./story_store/storySort";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { page: DocsPage, container: DocsContainer, extractArgTypes },
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "bottom",
    sidebarAnimations: true,
    // enable keyboard shortcuts
    // (even thou we're hidding the button)
    enableShortcuts: true,
    // show tool bar
    isToolshown: true,
    // display the top-level grouping as a "root" in the sidebar
    showRoots: true,
    storySort: storySort({
      method: "alphabetical",
      order: [
        "Get Started",
        ["Introduction", "Installation"],
        "Foundation",
        ["Grid", "Container", "Typography", "Colors", "Icons", "Theming"],
        "Components",
        "Forms",
        ["Main", "Form Element", "Form Element Blocks"],
        "Visualizations",
        "Lab",
        "Community",
        ["Overview", "Release Schedule", "Contributing"],
      ],
    }),
  },
};

const App = ({ story: Story }) => {
  const channel = addons.getChannel();
  const theme = getTheme();
  const [themeName, setThemeName] = useState(theme.hv.name);

  useEffect(() => {
    channel.on(UIKIT_THEME, setThemeName);
    return () => channel.off(UIKIT_THEME, setThemeName);
  }, [channel, setThemeName]);

  return (
    <HvProvider uiKitTheme={themeName}>
      <Story />
    </HvProvider>
  );
};

export const decorators = [(story) => <App story={story} />];
