import { addons } from "@storybook/manager-api";

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
            "https://lumada-design.github.io/uikit/master",
          )
        ) {
          // Hide "Test" and "AutomationTest" stories in the production build
          // We need them in other cases for Chromatic and development
          return (
            !item.name.startsWith("Test") &&
            !item.name.startsWith("Automation") &&
            !item.title.includes("Test")
          );
        }
        return true;
      },
    },
  },
});
