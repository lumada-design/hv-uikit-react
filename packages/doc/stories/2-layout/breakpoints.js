import { storiesOf } from "@storybook/react";
import React from "react";

storiesOf("Layout", module).add("Breakpoints", () => <div />, {
  title: "Breakpoints Example",
  description:
    "Examples of the Grid System proposed by Design System using our Container and Grid components. " +
    "The implemented Grid is based in the <a href='https://v3.material-ui.com/layout/grid/#grid'>Material UI</a> implementation.<br/><br/> The definitions where set following the design system directives:<br><br>" +
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
  usage: "",
  examples: [
    {
      title: "",
      description: "",
      src: "layout/breakpoints"
    }
  ]
});
