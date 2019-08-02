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
import List from "@hv/uikit-react-core/dist/List";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";

const data = [
  {
    label: "Advanced server DS120",
    selected: false,
    leftIcon: UserIcon
  },
  {
    label: "Advanced server DS122",
    selected: false,
    leftIcon: CalendarIcon
  },
  {
    label: "Advanced server DS250",
    selected: true
  },
  {
    label: "Advanced server DS530",
    selected: false,
    leftIcon: PlaneIcon
  },
  {
    label: "Advanced server DS555",
    selected: false,
    leftIcon: LineChartIcon
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectDefault />
  </div>
);
