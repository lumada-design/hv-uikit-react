import React, { useState, useEffect } from "react";

import { addDecorator, addParameters } from "@storybook/react";
import addons from "@storybook/addons";

import HvProvider from "@hv/uikit-react-core/dist/Provider";

import storySort from "./story_store/storySort";

import DocsPage from "./blocks/DocsPage";
import DocsContainer from "./blocks/DocsContainer";

import { UIKIT_THEME, getStoredTheme } from "./themes";
import "./themes/fonts/font-faces.css";

import { extractArgTypes } from "./props/extractArgTypes";

addParameters({
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
});

addParameters({
  docs: {
    page: DocsPage,
    container: DocsContainer,
    extractArgTypes,
  },
});

const channel = addons.getChannel();

const getInitialTheme = () => {
  const isEyesStorybook = new URL(window.location).searchParams.get("eyes-storybook");
  if (isEyesStorybook) {
    // if being tested, don't rely on the stored theme but instead on the variation url parameter
    const isWickedVariation =
      new URL(window.location).searchParams.get("eyes-variation") === "theme:wicked";

    return isWickedVariation ? "wicked" : "dawn";
  }

  return getStoredTheme();
};

const App = ({ story: Story }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    channel.on(UIKIT_THEME, setTheme);
    return () => channel.off(UIKIT_THEME, setTheme);
  }, [channel, setTheme]);

  return (
    <HvProvider uiKitTheme={theme}>
      <Story />
    </HvProvider>
  );
};

addDecorator((story) => <App story={story} />);
