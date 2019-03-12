import React from "react";
import { storiesOf } from "@storybook/react";
import HvNavigationAnchors from "@hv-ui/react/core/NavigationAnchors";

storiesOf("Lab", module).add("Navigation Anchors", () => <HvNavigationAnchors />, {
  title: "Navigation anchors",
  description:
    "A navigation component to help in changing views, still in development",
  usage: "import HvNavigationAnchors from '@hv-ui/react/core/NavigationAnchors'",
  examples: [
    {
      title: "Simple navigation anchors",
      description: "basic navigation anchors to provide a clickable area to change views",
      src: "lab/navigationAnchors/navigationAnchorsSimple.js"
    }
  ]
});
