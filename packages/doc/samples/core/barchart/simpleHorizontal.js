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
import Barchart from "@hv/uikit-react-core/dist/Barchart";

const trace1 = {
  x: [2300, 1000, 8500],
  y: ["January", "February", "March"],
  name: "Sales Target",
  orientation: "h"
};

const data = [trace1];

const layout = {
  yaxis: {
    title: {
      text: "2018"
    }
  },
  xaxis: {
    title: {
      text: "Thousands of Dollars ($)"
    }
  }
};

export default (
  <Barchart
    title="Simple Horizontal Bar Chart"
    subtitle="Sales performance (YTD)"
    data={data}
    layout={layout}
  />
);
