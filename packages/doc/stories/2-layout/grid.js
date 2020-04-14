import React from "react";
import { storiesOf } from "@storybook/react";
import HvGrid from "@hv/uikit-react-core/dist/Grid";

storiesOf("Layout", module).add("Grid", () => <HvGrid />, {
  title: "Grid",
  description: "The implemented Grid Component.",
  usage: "import HvGrid from '@hv/uikit-react-core/dist/Grid'",
  examples: [
    {
      title: "1. Default behaviour",
      description: "Change the size of the window to see the grid behaviour.",
      src: "layout/grid/grid1"
    },
    {
      title: "2. Different breakpoints behaviour",
      description:
        "Change the size of the window to see the grid behaviour. The box will adjust following the define breakpoints.",
      src: "layout/grid/grid2"
    }
  ]
});
