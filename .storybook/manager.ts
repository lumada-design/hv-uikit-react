import { addons } from "@storybook/addons";

import { getInitialMode } from "./addons/mode-selector/utils";
import { themes } from "./theme";

const initialMode = getInitialMode();

addons.setConfig({
  theme: themes[initialMode],
  panelPosition: "bottom",
  enableShortcuts: true,
  showNav: true,
  showPanel: true,
  sidebar: {
    filters: {
      patterns: (item) => {
        if (
          window.location.href.includes(
            "https://lumada-design.github.io/uikit/master"
          )
        ) {
          // Only hide "Tests" stories in the production build
          // We need them in other cases for Chromatic and development
          return !item.title?.includes("Tests/");
        }
        return true;
      },
    },
  },
});
