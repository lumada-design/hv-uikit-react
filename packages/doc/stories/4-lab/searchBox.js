import React from "react";
import { storiesOf } from "@storybook/react";
import HvSearchBox from "@hv/uikit-react-lab/dist/SearchBox";

storiesOf("Lab", module).add("Search Box", () => <HvSearchBox />, {
  title: "Search Box",
  description: "A search box component, still in development",
  usage: "import HvSearchBox from '@hv/uikit-react-lab/dist/SearchBox'",
  examples: [
    {
      title: "1. Simple",
      description: "Ignores case sensitive",
      src: "lab/searchBox/searchBoxSimple.js"
    },
    {
      title: "2. Reset button",
      description: "Reset button to clean the content of the search box",
      src: "lab/searchBox/searchBoxWithReset.js"
    }
  ]
});
