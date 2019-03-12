import React from "react";
import { storiesOf } from "@storybook/react";
import Content from "@hv-ui/react/core/Popper/Content"

storiesOf("Lab", module).add("textArea", () => <Content />, {
  title: "Text area",
  description:
    "A text area component to receive large inputs, still in development",
  usage: "import withPopper from '@hv-ui/react/core/Popper/withPopper'",
  examples: [
    {
      title: "Simple text area",
      description: "basic text area usage",
      src: "lab/textArea/textAreaSimple.js"
    }
  ]
});
