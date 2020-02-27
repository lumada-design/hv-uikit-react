import React from "react";
import { storiesOf } from "@storybook/react";
import HvGrid from "@hv/uikit-react-core/dist/Grid";

storiesOf("Layout", module).add("Grid", () => <HvGrid />, {
  title: "Grid",
  description:
    'The implemented Grid is based in the <a href="https://v3.material-ui.com/layout/grid/#grid">Material UI</a> implementation.<br/><br/> The definitions where set following the design system directives:<br><br>' +
    "<table border='2'" +
    "  <tr>" +
    "   <th>Breakpoint</th>" +
    "   <th>Width (in px)</th>" +
    "   <th>Gutters (in px)</th>" +
    "   <th>Number of columns</th>" +
    "  </tr>" +
    "  <tr>" +
    "   <td>xs</td>" +
    "   <td>[0-600[</td>" +
    "    <td>15 </td>" +
    "    <td>4 </td>" +
    "  </tr>" +
    "  <tr>" +
    "   <td>sm</td>" +
    "   <td>[600-960[ </td>" +
    "    <td> 15  </td>" +
    "    <td> 8 </td>" +
    "  </tr>" +
    "  <tr>" +
    "   <td>md</td>" +
    "   <td>[960-1270[  </td>" +
    "    <td> 30  </td>" +
    "    <td> 12 </td>" +
    "  </tr>" +
    "  <tr>" +
    "   <td>lg</td>" +
    "   <td>[1270-1920[  </td>" +
    "    <td>30  </td>" +
    "    <td>12</td>" +
    "  </tr>" +
    "  <tr>" +
    "   <td>xl</td>" +
    "   <td>[1920-...[  </td>" +
    "    <td>30  </td>" +
    "    <td>12</td>" +
    "  </tr>" +
    "</table>",
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
