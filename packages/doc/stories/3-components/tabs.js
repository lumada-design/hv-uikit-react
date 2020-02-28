import React from "react";
import { storiesOf } from "@storybook/react";

import Tabs from "@hv/uikit-react-core/dist/Tabs";

storiesOf("Components/Tabs", module).add("Tabs", () => <Tabs />, {
  title: "Tabs",
  description:
    "Tab is a graphical control element that allows multiple documents or panels to be contained within a single window, using tabs as a navigational widget for switching between sets of documents. Highly based in the Material UI Tabs component, " +
    "so please check https://v3.material-ui.com/demos/tabs/ in case you want more complex use cases.",
  usage: "import HvTabs from '@hv/uikit-react-core/dist/Tabs'",
  examples: [
    {
      title: "1. Simple Tabs aligned to the left",
      src: "components/tabs/sample1.js"
    },
    {
      title: "2. Tabs occupying the full width of the available space",
      src: "components/tabs/sample2.js"
    },
    {
      title: "3. Tabs with different Text size",
      src: "components/tabs/sample3.js"
    },
    {
      title: "4. Tabs changing the content to display",
      src: "components/tabs/sample4.js"
    },
    {
      title: "5. Tabs aligned in the center of the available space",
      src: "components/tabs/sample5.js"
    }
  ]
});
