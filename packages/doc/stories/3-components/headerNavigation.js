import React from "react";
import { storiesOf } from "@storybook/react";
import HvHeaderNavigation from "@hv/uikit-react-core/dist/Header/Navigation";

storiesOf("Components/Navigation System/Horizontal Navigation", module).add(
  "Navigation",
  () => <HvHeaderNavigation />,
  {
    title: "Navigation",
    description:
      "Component of the header, responsible for presenting navigation content. Only one sub-level should be used.",
    usage:
      "import HvHeaderNavigation from '@hv/uikit-react-core/dist/Header/Navigation'"
  }
);
