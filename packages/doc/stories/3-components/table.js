import React from "react";
import { storiesOf } from "@storybook/react";
import HvTable from "@hv/uikit-react-core/dist/Table/Table";

// We are importing the raw table because the table is wrapped inside 2 HOC
// The Plugin generating the docs can't reach the documentation because the HOC are hiding it

storiesOf("Components/Visualization", module).add("Table", () => <HvTable />, {
  title: "Table",
  description:
    "A Table visualization used to show data, based in the react-table. Please check https://react-table.js.org/#/story/readme for more info",
  usage: "import HvTable from '@hv/uikit-react-core/dist/Table'",
  examples: [
    {
      title: "1. Simple",
      description: "Simple Table with in it's most basic presentation",
      src: "components/table/tableSimple"
    },
    {
      title: "2. Empty",
      description: "Table with no data showing the default no rows message",
      src: "components/table/tableEmpty"
    },
    {
      title: "3. With expander",
      description: "each row can be clicked to expand its content",
      src: "components/table/tableExpander"
    },
    {
      title: "4. With expander and custom content",
      description:
        "each row can be clicked to expand its content and some cells contain custom content",
      src: "components/table/tableScrollingExpander"
    },
    {
      title: "5. With checkbox",
      description: "each row can be checked to be selected",
      src: "components/table/tableCheckbox"
    },
    {
      title: "6. With checkbox and custom content",
      description: "each row can be checked to be selected and some cells contain custom content",
      src: "components/table/tableTypical"
    },
    {
      title: "7. With both checkbox and secondary actions",
      description:
        "each row has a checkbox column and a dropdown menu with clickable actions. The secondary actions can be conditional.",
      src: "components/table/tableSecondary"
    },
    {
      title: "8. With null data values",
      description: "some rows have null data values which should be replaced by emdashes",
      src: "components/table/tableNulls"
    }
  ]
});
