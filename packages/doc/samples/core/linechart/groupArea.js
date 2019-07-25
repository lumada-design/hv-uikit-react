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
import Linechart from "@hv/uikit-react-core/dist/Linechart";

const trace1 = {
  x: ["Group one", "Group two", "Group three"],
  y: [2300, 1000, 400],
  name: "Sales Target"
};

const trace2 = {
  x: ["Group one", "Group two", "Group three"],
  y: [3000, 3900, 1000],
  name: "Sales Per Rep"
};

const trace3 = {
  x: ["Group one", "Group two", "Group three"],
  y: [3700, 7500, 1100],
  name: "Monthly Sales"
};

const trace4 = {
  x: ["Group one", "Group two", "Group three"],
  y: [5000, 8500, 8700],
  name: "Target"
};

const trace5 = {
  x: ["Group one", "Group two", "Group three"],
  y: [7000, 8000, 6500],
  name: "Cash"
};

const data = [trace1, trace2, trace3, trace4, trace5];

export default (
  <Linechart
    title="Stacked Vertical Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    type="area"
    xAxisTitle="Axis description"
    yAxisTitle="Thousands of Dollars ($)"
  />
);
