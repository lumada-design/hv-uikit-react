import React from "react";
import { storiesOf } from "@storybook/react";
import HvCardHeader from "@hv/uikit-react-core/dist/Card/Header";

storiesOf("Components/Card", module).add("Header", () => <HvCardHeader />, {
  title: "Header",
  description:
    "Component of the card, responsible for presenting header content.",
  usage: "import {HvCardHeader} from '@hv/uikit-react-core/dist/Card'"
});
