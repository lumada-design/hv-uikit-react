import React from "react";
import { storiesOf } from "@storybook/react";
import HvPagination from "@hv/uikit-react-core/dist/Pagination";

storiesOf("Components", module).add("Pagination", () => <HvPagination />, {
  title: "Pagination",
  description:
    "A pagination component is used to help navigate large datasets, dividing them into groups of variable size.",
  usage: "import HvPagination from '@hv/uikit-react-core/dist/Pagination'",
  examples: [
    {
      title: "Example 1",
      description: "Default empty Pagination",
      src: "components/pagination/pagination1"
    },
    {
      title: "Example 2",
      description: "Controlled pagination with list of elements",
      src: "components/pagination/pagination2"
    },
    {
      title: "Example 3",
      description: "CardView controlled by Pagination",
      src: "components/pagination/pagination3"
    }
  ]
});
