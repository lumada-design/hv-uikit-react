import React from "react";
import { storiesOf } from "@storybook/react";

import Switch from "@hv/uikit-react-core/dist/Switch";

storiesOf("Components/Selection mechanisms", module).add(
  "Toggle Switch",
  () => <Switch />,
  {
    title: "Toggle Switch",
    description:
      "A toggle Switch allows the user to change a setting between two states. ",
    usage: "import Switch from '@hv/uikit-react-core/dist/Switch'",
    examples: [
      {
        title: "1. with Labels and onChange",
        src: "components/switch/sample1.js"
      },
      {
        title: "2. without Labels",
        src: "components/switch/sample2.js"
      },
      {
        title: "3. with Custom Labels",
        src: "components/switch/sample3.js"
      },
      {
        title: "4. Disabled in Left Position",
        src: "components/switch/sample4.js"
      }
    ]
  }
);
