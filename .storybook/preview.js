import React, { useState, useEffect } from "react";

import { addDecorator, addParameters } from "@storybook/react";
import addons from "@storybook/addons";

import HvProvider from "@hv/uikit-react-core/dist/Provider";

import storySort from "./story_store/storySort";

import DocsPage from "./blocks/DocsPage";
import DocsContainer from "./blocks/DocsContainer";

import { UIKIT_THEME, getStoredTheme } from "./themes";
import "./themes/fonts/font-faces.css";

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
        "Getting Started",
        ["Introduction", "Installation"],
        "Foundation",
        "Components",
        "Visualizations",
        "Lab",
        "Templates",
        ["About", "Login Page", "Home Page", "Details Page"],
        "Community",
        "Design System"
      ]
    })
  }
});

addParameters({
  docs: {
    page: DocsPage,
    container: DocsContainer
  }
});

const channel = addons.getChannel();

const App = ({ story }) => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    channel.on(UIKIT_THEME, setTheme);
    return () => channel.off(UIKIT_THEME, setTheme);
  }, [channel, setTheme]);

  return <HvProvider uiKitTheme={theme}>{story()}</HvProvider>;
};

addDecorator(story => <App story={story} />);
