import React from "react";
import { storiesOf } from "@storybook/react";
import Navigation from "@hv/uikit-react-core/dist/VerticalNavigation/Navigation";

storiesOf("Components/Navigation System/Vertical Navigation", module).add(
  "Navigation",
  () => <Navigation />,
  {
    title: "2. Navigation",
    description:
      "Component of the vertical navigation, responsible for presenting navigation content.",
    usage:
      "import Navigation from '@hv/uikit-react-core/dist/VerticalNavigation/Navigation'"
  }
);
