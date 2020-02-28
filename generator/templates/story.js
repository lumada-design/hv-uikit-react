import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "@hv/uikit-react-lab/dist/Component";

storiesOf("Lab", module).add("Component", () => <Component />, {
  title: "Component",
  description: "",
  usage: "import Component from '@hv/uikit-react-core/dist/Component'",
  examples: [
    {
      title: "Basic",
      description: "Sample usage of Component",
      src: "lab/component/sample.js"
    }
  ]
});
