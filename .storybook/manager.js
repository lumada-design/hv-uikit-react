import "./theme/fonts/font-faces.css";

import { addons } from "@storybook/addons";

addons.setConfig({
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
  sidebar: {
    showRoots: true,
  },
});
