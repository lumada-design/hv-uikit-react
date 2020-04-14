import React from "react";
import { storiesOf } from "@storybook/react";

import Tab from "@hv/uikit-react-core/dist/Tab";

storiesOf("Components/Tabs", module).add("Tab", () => <Tab />, {
  title: "Tab",
  description: "Tab is the button element of the Tabs component",
  usage: "import HvTab from '@hv/uikit-react-core/dist/Tab'"
});
