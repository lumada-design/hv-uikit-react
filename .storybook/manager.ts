import { addons } from "@storybook/addons";

import "./theme/fonts/font-faces.css";
import { themes } from "./theme";
import { getInitialMode } from "./addons/mode-selector/utils";

addons.setConfig({
  theme: themes[getInitialMode()],
  panelPosition: "bottom",
  enableShortcuts: true,
  showNav: true,
  showPanel: true,
});
