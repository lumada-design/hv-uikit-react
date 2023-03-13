import "./theme/fonts/font-faces.css";

import { addons } from "@storybook/addons";

import theme from "./theme";

addons.setConfig({
  theme: theme,
  panelPosition: "bottom",
  enableShortcuts: false,
  showNav: true,
  showPanel: true,
});