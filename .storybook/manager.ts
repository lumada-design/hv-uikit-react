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
      patters: (item) => {
        return !item.tags?.includes("test");
      },
    },
  },
});
