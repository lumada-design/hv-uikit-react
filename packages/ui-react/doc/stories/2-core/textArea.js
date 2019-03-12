import React from "react";
import { storiesOf } from "@storybook/react";
import HvTextArea from "@hv-ui/react/core/TextArea";

storiesOf("Core", module).add("textArea", () => <HvTextArea />, {
  title: "Text area",
  description:
    "A text area component to receive large inputs, still in development",
  usage: "import HvTextArea from '@hv-ui/react/core/TextArea'",
  examples: [
    {
      title: "Simple text area",
      description: "basic text area usage",
      src: "core/textArea/textAreaSimple.js"
    },
    {
      title: "Text area with limits",
      description: "text area that limits the quantity of character that can be introduced in the text area",
      src: "core/textArea/textAreaLimit.js"
    },
    {
      title: "Disabled text area",
      description: "This text area is disabled and do not allow any interaction",
      src: "core/textArea/textAreaDisabled.js"
    }
  ]
});
