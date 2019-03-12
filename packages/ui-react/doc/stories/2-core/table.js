import React from "react";
import { storiesOf } from "@storybook/react";
import HvTable from "@hv-ui/react/core/Table/Main/Main";
// We are importating the raw table because the table is wrapped inside 2 HOC
// The Plugin generating the docs can't reach the documentation because the HOC are hiding it

storiesOf("Core", module).add(
  "Table",
  () => (
    <HvTable />
  ),
  {
    title: "Table",
    description: "A Table visualization used to show data",
    designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
    usage: "import HvTable from '@hv-ui/react/core/Table'",
    examples: [
      {
        title: "Simple Table",
        description: "Simple Table with in it's most basic presentation",
        src: "core/table/tableSimple"
      },
      {
        title: "Empty Table",
        description: "Table with no data showing the default no rows message",
        src: "core/table/tableEmpty"
      },
      {
        title: "Table with expander",
        description: "each row can be clicked to expand its content",
        src: "core/table/tableExpander"
      },
      {
        title: "Table with checkbox",
        description: "each row can be checked to be selected",
        src: "core/table/tableCheckbox"
      },
      {
        title: "Typical Table ",
        description: "each row can be checked to be selected and some cells contain custom content",
        src: "core/table/tableTypical"
      },
      {
        title: "Typical Table ",
        description: "each row can be clicked to expand its content and some cells contain custom content",
        src: "core/table/tableScrollingExpander"
      }
    ]
  }
);
