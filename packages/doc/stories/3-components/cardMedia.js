import React from "react";
import { storiesOf } from "@storybook/react";
import HvCardMedia from "@hv/uikit-react-core/dist/Card/Media";

storiesOf("Components/Card", module).add("Media", () => <HvCardMedia />, {
  title: "Media",
  description:
    "Component of the card, responsible for presenting media content.",
  usage: "import {HvCardMedia} from '@hv/uikit-react-core/dist/Card'"
});
