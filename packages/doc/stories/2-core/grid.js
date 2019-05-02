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

storiesOf("Core", module).add("Grid", () => <HvGrid />, {
  title: "Grid",
  description:
    "The implemented Grid follow the design system directives.<br> Breakpoints: " +
    "<ul>" +
    "  <li><b>xs</b>: " +
    "    <ul>" +
    "      <li>width: [0-600[ px </li>" +
    "      <li>gutters: 15 px </li>" +
    "      <li>number of columns: 4 </li>" +
    "    </ul>" +
    "  </li>" +
    "  <li><b>sm</b>: " +
    "    <ul>" +
    "      <li>width: [600-720[ px </li>" +
    "      <li>gutters: 15 px </li>" +
    "      <li>number of columns: 8 </li>" +
    "    </ul>" +
    "  </li>" +
    "  <li><b> md </b>" +
    "    <ul>" +
    "      <li>width: [720-840[ px </li>" +
    "      <li>gutters: 30 px </li>" +
    "      <li>number of columns: 8 </li>" +
    "    </ul>" +
    "  </li>" +
    "  <li><b>lg</b>: " +
    "    <ul>" +
    "      <li>width: [840-1990[ px </li>" +
    "      <li>gutters: 30 px </li>" +
    "      <li>number of columns: 12 </li>" +
    "    </ul>" +
    "  </li>" +
    "  <li><b>xl</b>: " +
    "    <ul>" +
    "      <li>width: [1990-...[ px </li>" +
    "      <li>gutters: 30 px </li>" +
    "      <li>number of columns: 12 </li>" +
    "    </ul>" +
    "  </li>" +
    "</ul>",
  usage: "import HvGrid from '@hv/uikit-react-core/dist/Grid'",
  examples: [
    {
      title: "1. Default behaviour",
      description: "Change the size of the window to see the grid behaviour.",
      src: "core/grid/grid1"
    },
    {
      title: "2. Different breakpoints behaviour",
      description: "Change the size of the window to see the grid behaviour. The box will adjust following the define breakpoints.",
      src: "core/grid/grid2"
    }
  ]
});
