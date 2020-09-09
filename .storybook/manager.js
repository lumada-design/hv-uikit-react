import addons from "@storybook/addons";

import "./themes/fonts/font-faces.css";

addons.setConfig({
  sidebarAnimations: true,

  // enable keyboard shortcuts
  // (even thou we're hidding the button)
  enableShortcuts: true,

  // display the top-level grouping as a "root" in the sidebar
  showRoots: true
});
