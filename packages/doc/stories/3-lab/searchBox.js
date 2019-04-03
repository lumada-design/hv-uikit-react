import React from "react";
import { storiesOf } from "@storybook/react";
import HvSearchBox from "@hv/uikit-react-lab/dist/SearchBox"

storiesOf("Lab", module).add("Search box", () => <HvSearchBox />, {
  title: "Search box",
  description:
    "A search box component, still in development",
  usage: "import HvSearchBox from '@hv/uikit-react-core/dist/SearchBox'",
  examples: [
    {
      title: "Simple search box",
      description: "Ignores case sensitive",
      src: "lab/searchBox/searchBoxSimple.js"
    }
  ]
});
