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
import Linechart from "@hv/uikit-react-core/dist/Linechart";

storiesOf("Components/Visualization", module).add(
  "Linechart",
  () => <Linechart />,
  {
    title: "Linechart",
    description:
      "A line chart or line plot or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments." +
      "It is a basic type of chart common in many fields. It is similar to a scatter plot except that the measurement points are ordered (typically by their x-axis value) " +
      "and joined with straight line segments.<br><br>" +
      "This component is built using Plotly (https://github.com/plotly/react-plotly.js/#basic-props). <br>" +
      "Certain properties of the layout and data are overwritten so the component can follow the Design System guidelines.",
    usage: "import Linechart from '@hv/uikit-react-core/dist/Linechart'",
    examples: [
      {
        title: "1. Simple",
        src: "components/linechart/simple.js"
      },
      {
        title: "2. Simple with area",
        src: "components/linechart/simpleArea.js"
      },
      {
        title: "3. Multiple lines",
        src: "components/linechart/group.js"
      },
      {
        title: "4. Multiple lines with area",
        src: "components/linechart/groupArea.js"
      },
      {
        title: "5. Multiple lines with area stacked",
        src: "components/linechart/groupStacked.js"
      },
      {
        title: "6. Time Series with range slider",
        description:
          "To represent the date, the axis date should be passed as YYYY-MM-DD",
        src: "components/linechart/timeSerie.js"
      }
    ]
  }
);
