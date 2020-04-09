import React from "react";
import { storiesOf } from "@storybook/react";
import HvFooter from "@hv/uikit-react-core/dist/Card/Footer/Footer";

storiesOf("Components/Card", module).add("Footer", () => <HvFooter />, {
  title: "Footer",
  description: "Component of the card, responsible for presenting the footer content.",
  usage: "import {HvCardFooter} from '@hv/uikit-react-core/dist/Card'"
});
