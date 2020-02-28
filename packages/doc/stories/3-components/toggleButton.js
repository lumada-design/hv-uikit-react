import React from "react";
import { storiesOf } from "@storybook/react";

import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";

storiesOf("Components/Selection mechanisms", module).add(
  "Toggle Button",
  () => <ToggleButton />,
  {
    title: "Toggle Button",
    description:
      "A toggle button allows the user to change a setting between two states. <br>It is possible to pass two icons to toggle or use a single animated SVG. " +
      "<br>For this case the SVG must have 3 classes declared:" +
      "<ul>" +
      "<li>default</li>" +
      "<li>selected</li>" +
      "<li>notSelected</li>" +
      "</ul>" +
      " The component toggles between each classe.",
    usage: "import Button from '@hv/uikit-react-core/dist/ToggleButton'",
    examples: [
      {
        title: "1. Normal case",
        src: "components/toggleButton/sample1.js"
      },
      {
        title: "2. Controlled case",
        src: "components/toggleButton/sample2.js"
      },
      {
        title: "3. Animated SVG",
        src: "components/toggleButton/sample3.js"
      }
    ]
  }
);
