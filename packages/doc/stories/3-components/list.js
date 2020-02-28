import React from "react";
import { storiesOf } from "@storybook/react";
import List from "@hv/uikit-react-core/dist/List";

storiesOf("Components", module).add("List", () => <List />, {
  title: "List",
  description: "",
  usage: "import List from '@hv/uikit-react-core/dist/List'",
  examples: [
    {
      title: "1. Simple list not selectable",
      src: "components/list/simpleListNotSelectable.js"
    },
    {
      title: "2. Simple list condensed",
      src: "components/list/simpleListCondensed.js"
    },
    {
      title: "3. Simple list with nav icons",
      src: "components/list/simpleListWithNavIcons.js"
    },
    {
      title: "4. Single selection",
      src: "components/list/singleSelection.js"
    },
    {
      title: "5. Single selection with left icons and disabled item",
      src: "components/list/singleSelectionWithLeftIcons.js"
    },
    {
      title: "6. Single selection with selectors",
      src: "components/list/singleSelectionWithSelectors.js"
    },
    {
      title: "7. Multi selection with selectors",
      src: "components/list/multiSelectionWithSelectors.js"
    },
    {
      title: "8. Multi selection with selectors and select all",
      src: "components/list/multiSelectionWithSelectorsAndSelectAll.js"
    }
  ]
});
