import React from "react";
import { storiesOf } from "@storybook/react";
import HvNavigationAnchors from "@hv/uikit-react-lab/dist/NavigationAnchors";

storiesOf("Lab", module).add("Navigation Anchors", () => <HvNavigationAnchors />, {
  title: "Navigation anchors",
  description: "A navigation component to help in changing views, still in development",
  usage: "import HvNavigationAnchors from '@hv/uikit-react-lab/dist/NavigationAnchors'",
  examples: [
    {
      title: "1. Simple",
      description: "Basic navigation anchors to provide a clickable area to change views",
      src: "lab/navigationAnchors/navigationAnchorsSimple.js"
    },
    {
      title: "2. Scroll",
      description:
        "Basic navigation anchors to provide a clickable area to show scrolling capabilities",
      src: "lab/navigationAnchors/navigationAnchorsScroll.js"
    }
  ]
});
