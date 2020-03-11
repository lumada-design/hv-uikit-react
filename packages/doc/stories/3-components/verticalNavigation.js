import React from "react";
import { storiesOf } from "@storybook/react";
import VerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";

storiesOf("Components/Navigation System/Vertical Navigation", module).add(
  "VerticalNavigation",
  () => <VerticalNavigation />,
  {
    title: "VerticalNavigation",
    description:
      "It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left. While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.<br>" +
      "<br>Our implementation of the vertical navigation is divided in:" +
      "<ul>" +
      "<li>Navigation</li>" +
      "<li>Actions</li>" +
      "<li>Action</li>" +
      "</ul>" +
      "<br>To build the vertical navigation a composition of these elements should be used.",
    usage: "import HvVerticalNavigation from '@hv/uikit-react-core/dist/VerticalNavigation'",
    examples: [
      {
        title: "1. Vertical navigation system",
        src: "components/verticalNavigation/verticalNavigation1.js"
      },
      {
        title: "2. Vertical navigation system without actions",
        src: "components/verticalNavigation/verticalNavigation2.js"
      },
      {
        title: "3. Collapsable vertical navigation system",
        src: "components/verticalNavigation/verticalNavigation3.js"
      }
    ]
  }
);
