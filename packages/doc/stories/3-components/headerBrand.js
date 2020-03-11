import React from "react";
import { storiesOf } from "@storybook/react";
import HvHeaderBrand from "@hv/uikit-react-core/dist/Header/Brand";

storiesOf("Components/Navigation System/Horizontal Navigation", module).add(
  "Brand",
  () => <HvHeaderBrand />,
  {
    title: "Brand",
    description: "Component of the header, responsible for presenting brand content.",
    usage: "import HvHeaderBrand from '@hv/uikit-react-core/dist/Header/Brand'"
  }
);
