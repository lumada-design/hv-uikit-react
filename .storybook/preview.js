import React, { useState, useEffect } from "react";

import { addDecorator, addParameters } from "@storybook/react";
import addons from "@storybook/addons";

import { HvProvider } from "@hitachivantara/uikit-react-core";

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
        "Get Started",
        ["Introduction", "Installation"],
        "Foundation",
        ["Grid", "Container", "Provider", "Theming", "Typography", "Colors", "Icons"],
        "Components",
        "Visualizations",
        "Lab",
        "Templates",
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

let appCounter = 0;

const App = ({ story: Story }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    channel.on(UIKIT_THEME, setTheme);
    return () => channel.off(UIKIT_THEME, setTheme);
  }, [channel, setTheme]);

  const instanceNumber = appCounter++;

  return (
    <HvProvider
      uiKitTheme={theme}
      // prevent the seed prefix for the first instance
      // allows to keep the classnames clean and stable for E2E tests
      // that access via /iframe.html?id=
      generateClassNameOptions={
        instanceNumber > 0 ? { seed: `sb-preview-${instanceNumber}` } : undefined
      }
    >
      <Story />
    </HvProvider>
  );
};

addDecorator((story) => <App story={story} />);
