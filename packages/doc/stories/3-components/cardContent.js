import React from "react";
import { storiesOf } from "@storybook/react";
import HvCardContent from "@hv/uikit-react-core/dist/Card/Content";

storiesOf("Components/Card", module).add("Content", () => <HvCardContent />, {
  title: "Content",
  description: "Component of the card, responsible for presenting the content.",
  usage: "import {HvCardContent} from '@hv/uikit-react-core/dist/Card'"
});
