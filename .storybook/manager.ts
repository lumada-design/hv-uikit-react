import { addons } from "@storybook/addons";

import { themes } from "./theme";
import { getInitialMode } from "./addons/mode-selector/utils";

const initialMode = getInitialMode();

addons.setConfig({
  theme: themes[initialMode],
  panelPosition: "bottom",
  enableShortcuts: true,
  showNav: true,
  showPanel: true,
});
