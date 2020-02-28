import React from "react";
import { storiesOf } from "@storybook/react";
import HvHeaderActions from "@hv/uikit-react-core/dist/Header/Actions";

storiesOf("Components/Navigation System/Horizontal Navigation", module).add(
  "Actions",
  () => <HvHeaderActions />,
  {
    title: "Actions",
    description:
      "Component of the header, responsible for presenting actions content.",
    usage:
      "import HvHeaderActions from '@hv/uikit-react-core/dist/Header/Actions'"
  }
);
