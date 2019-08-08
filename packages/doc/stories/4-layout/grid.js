/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import HvGrid from "@hv/uikit-react-core/dist/Grid";

storiesOf("Layout", module).add("Grid", () => <HvGrid />, {
  title: "Grid",
  description:
    "The implemented Grid is based in the <a href=\"https://v3.material-ui.com/layout/grid/#grid\">Material UI</a> implementation.<br/><br/> The definitions where set following the design system directives:<br><br>" +
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
