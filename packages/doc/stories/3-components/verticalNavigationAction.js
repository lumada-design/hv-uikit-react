import React from "react";
import { storiesOf } from "@storybook/react";
import { Action } from "@hv/uikit-react-core/dist/VerticalNavigation/Actions";

storiesOf("Components/Navigation System/Vertical Navigation", module).add(
  "Action",
  () => <Action />,
  {
    title: "Action",
    description: "Component of the actions, responsible for presenting action content.",
    usage: "import {Action} from '@hv/uikit-react-core/dist/VerticalNavigation/Actions'"
  }
);
