import React from "react";
import { storiesOf } from "@storybook/react";
import Actions from "@hv/uikit-react-core/dist/VerticalNavigation/Actions";

storiesOf("Components/Navigation System/Vertical Navigation", module).add(
  "Actions",
  () => <Actions />,
  {
    title: "Actions",
    description:
      "Component of the vertical navigation, acting as a container for action content.",
    usage:
      "import Actions from '@hv/uikit-react-core/dist/VerticalNavigation/Actions'"
  }
);
