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
import Barchart from "@hv/uikit-react-core/dist/Barchart";

storiesOf("Components/Visualization", module).add("Barchart", () => <Barchart />, {
  title: "Barchart",
  description:
    "A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights " +
    "or lengths proportional to the values that they represent. The bars can be plotted vertically or horizontally.<br><br>" +
    "This component is built using Plotly (https://github.com/plotly/react-plotly.js/#basic-props). <br>" +
    "Certain properties of the layout and data are overwritten so the component can follow the Design System guidelines.",
  usage: "import Barchart from '@hv/uikit-react-core/dist/Barchart'",
  examples: [
    {
      title: "1. Simple Vertical Bar with use single",
      description: "Tooltip with single line",
      src: "components/barchart/simpleVerticalWithUseSingle.js"
    },
    {
      title: "2. Simple Vertical Bar",
      description: "Tooltip with multiple line",
      src: "components/barchart/simpleVertical.js"
    },
    {
      title: "3. Grouped Vertical Bar",
      src: "components/barchart/groupVertical.js"
    },
    {
      title: "4. Stacked Vertical Bar",
      src: "components/barchart/stackVertical.js"
    },
    {
      title: "5. Simple Horizontal Bar with use single",
      src: "components/barchart/simpleHorizontalWithUseSingle.js"
    },
    {
      title: "6. Simple Horizontal Bar",
      src: "components/barchart/simpleHorizontal.js"
    },
    {
      title: "7. Grouped Horizontal Bar",
      src: "components/barchart/groupHorizontal.js"
    },
    {
      title: "8. Stacked Horizontal Bar",
      src: "components/barchart/stackHorizontal.js"
    }
  ]
});
