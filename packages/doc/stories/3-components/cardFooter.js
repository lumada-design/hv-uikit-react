import React from "react";
import { storiesOf } from "@storybook/react";
import { RawFooter } from "@hv/uikit-react-core/dist/Card/Footer/Footer";

// We are importing the raw table because the cardfooter is wrapped inside 2 HOC
// The Plugin generating the docs can't reach the documentation because the HOC are hiding it

storiesOf("Components/Card", module).add("Footer", () => <RawFooter />, {
  title: "Footer",
  description: "Component of the card, responsible for presenting the footer content.",
  usage: "import {HvCardFooter} from '@hv/uikit-react-core/dist/Card'"
});
