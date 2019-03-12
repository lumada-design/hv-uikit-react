import React from "react";
import { storiesOf } from "@storybook/react";
import Content from "@hv-ui/react/core/Popper/Content"

storiesOf("Lab", module).add("Popper", () => <Content />, {
  title: "Popper",
  description:
    "A Popper Higher order component that show itself when hovering, still in development",
  usage: "import withPopper from '@hv-ui/react/core/Popper/withPopper'",
  examples: [
    {
      title: "Simple popper",
      description: "basic popper wrapping a component",
      src: "lab/popper/popperSimple.js"
    }
  ]
});
