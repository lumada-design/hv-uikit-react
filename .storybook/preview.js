import React, { useState, useEffect } from "react";
import addons from "@storybook/addons";
import { HvProvider } from "@hv/uikit-react-core";
import DocsPage from "./blocks/DocsPage";
import DocsContainer from "./blocks/DocsContainer";
import { getTheme, UIKIT_THEME } from "./theme";
import { extractArgTypes } from "./props/extractArgTypes";
import storySort from "./story_store/storySort";
import "./theme/fonts/font-faces.css";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { page: DocsPage, container: DocsContainer, extractArgTypes },
  options: {
    isToolshown: true,
    storySort: storySort({
      method: "alphabetical",
      order: [
        "Get Started",
        ["Introduction", "Installation", "Component List"],
        "Foundation",
        ["Grid", "Container", "Provider", "Theming", "Typography", "Colors", "Icons"],
        "Components",
        "Forms",
        ["Main", "Form Element", "Form Element Blocks"],
        "Visualizations",
        "Widgets",
        "Lab",
        ["Table", "Table Hooks"],
        "Community",
        ["Overview", "Release Schedule", "Contributing"],
      ],
    }),
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

  return (
    <HvProvider
      uiKitTheme={themeName}
      // prevent the seed prefix for the first instance
      // allows to keep the classnames clean and stable for E2E tests
      // that access via /iframe.html?id=
      generateClassNameOptions={
        isIsolatedSample ? undefined : { seed: `sb-preview-${instanceNumber}` }
      }
    >
      <Story />
    </HvProvider>
  );
};

export const decorators = [(story) => <App story={story} />];
