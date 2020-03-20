import React from "react";
import { storiesOf } from "@storybook/react";
import HvContainer from "@hv/uikit-react-core/dist/Container";

storiesOf("Layout", module).add("Container", () => <HvContainer />, {
  title: "Container",
  description:
    "The Container is the element responsible to create and add the margins to the page, and make them react to the current screen size.",
  usage: "import HvContainer from '@hv/uikit-react-core/dist/Container'",
  examples: [
    {
      title: "1. Default behaviour",
      description: "The container with its default maximum size, which is xl (1920).",
      src: "layout/container/container1"
    },
    {
      title: "2. Container with sm as maximum width",
      description: "The Container with its size set to (640).",
      src: "layout/container/container2"
    },
    {
      title: "3. Container occupying the full width of the page",
      description: "The Container with no max size.",
      src: "layout/container/container3"
    }
  ]
});
