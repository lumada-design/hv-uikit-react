import React, { useState, useEffect, useMemo } from "react";
import addons from "@storybook/addons";
import { Global } from "@storybook/theming";
import { HvProvider, HvCssBaseline } from "@hitachivantara/uikit-react-core";
import DocsPage from "./blocks/DocsPage";
import DocsContainer from "./blocks/DocsContainer";
import { getTheme, UIKIT_THEME } from "./theme";
import { extractArgTypes } from "./props/extractArgTypes";
import "./theme/fonts/font-faces.css";
import { getStoryStyles } from "./theme/styles/story";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { page: DocsPage, container: DocsContainer, extractArgTypes },
  options: {
    showToolbar: true,
    storySort: {
      method: "alphabetical",
      order: [
        "Introduction",
        ["Overview", "Installation", "Component List"],
        "Concepts",
        ["Provider", "Theming", "Typography", "Colors", "Icons"],
        "How To Guides",
        "Layout",
        "Display",
        "Feedback",
        "Inputs",
        "Navigation",
        "Overlay",
        "Structure",
        "Visualizations",
        "Components",
        "Widgets",
        "Templates",
        "Lab",
      ],
    },
  },
};

let appCounter = 0;

const App = ({ story: Story }) => {
  const channel = addons.getChannel();
  const theme = getTheme();
  const [themeName, setThemeName] = useState(theme.hv.name);

  useEffect(() => {
    channel.on(UIKIT_THEME, setThemeName);
    return () => channel.off(UIKIT_THEME, setThemeName);
  }, [channel, setThemeName]);

  const instanceNumber = appCounter++;
  const isIsolatedSample = window.location === window.parent.location;

  const storyStyles = useMemo(() => getStoryStyles(theme), [theme]);

  return (
    <>
      <Global styles={storyStyles} />

      <HvProvider
        uiKitTheme={themeName}
        // prevent the seed prefix for the first instance
        // allows to keep the classnames clean and stable for E2E tests
        // that access via /iframe.html?id=
        generateClassNameOptions={
          isIsolatedSample ? undefined : { seed: `sb-preview-${instanceNumber}` }
        }
        disableCssBaseline
      >
        <HvCssBaseline />
        <Story />
      </HvProvider>
    </>
  );
};

export const decorators = [(story) => <App story={story} />];
