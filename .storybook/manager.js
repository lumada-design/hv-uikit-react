import "./theme/fonts/font-faces.css";

import { ActiveTabs } from "@storybook/api";
import { addons } from "@storybook/addons";

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  sidebarAnimations: true,
  previewTabs: {
    "storybook/docs/panel": "Documentation",
    canvas: { hidden: process.env.NODE_ENV === "production" },
  },
  initialActive: ActiveTabs.CANVAS,
  // enable keyboard shortcuts
  // (even thou we're hidding the button)
  enableShortcuts: true,
  // show tool bar
  isToolshown: true,
  // display the top-level grouping as a "root" in the sidebar
  sidebar: {
    showRoots: true,
    collapsedRoots: ["tests"],
  },
});
