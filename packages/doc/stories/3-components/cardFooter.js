import React from "react";
import { storiesOf } from "@storybook/react";
import HvCardFooter from "@hv/uikit-react-core/dist/Card/Footer/Footer";

storiesOf("Components/Card", module).add("Footer", () => <HvCardFooter />, {
  title: "Footer",
  description:
    "Component of the card, responsible for presenting the footer content.",
  usage: "import {HvCardFooter} from '@hv/uikit-react-core/dist/Card'"
});
