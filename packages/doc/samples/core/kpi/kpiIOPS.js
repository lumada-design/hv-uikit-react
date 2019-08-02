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
import Chart from "react-google-charts";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import IconInvalid from "@hv/uikit-react-icons/dist/Level5.S";
import IconArrowDown from "./assets/arrow-red-down.svg";
import { relative } from "path";

const labels = {
  title: "Total IOPS",
  indicator: "113 277",
  unit: "",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "0,15%"
};

const IopsComparisonVisualAverage = () => (
  <div
    style={{
      position: "relative"
    }}
  >
    <div
      style={{
        color: "#008000",
        position: "absolute",
        width: "32px",
        height: "32px",
        top: "4px",
        left: "-3px",
        background: `url(${IconArrowDown}) no-repeat`
      }}
      color="#008000"
    />
    <HvTypography
      style={{
        position: "relative",
        paddingLeft: "16px"
      }}
      variant="highlightText"
    >
      {labels.comparisonIndicator}
    </HvTypography>
  </div>
);

const invalidIcon = () => 
<div 
  style={{
    width: "32px",
    height: "32px",
    position: "relative",
    left: "-8px",
    pointerEvents:"none"
}}>
  <Chart
    width={'50px'}
    height={'32px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Year', 'Sales'],
      ['2013', 3000],
      ['2014', 2170],
      ['2015', 760],
      ['2016', 630],
    ]}
    options={{
      legend: "none",
      colors: ['red'],
      tooltip: {
        trigger: 'none'
      },
      hAxis: {
        minValue: 0,
        maxValue: 10,
        gridlines: {
          color: 'transparent'
        },
        baselineColor: 'transparent'
      },
      backgroundColor: "transparent",
      vAxis: {
        gridlines: {
            color: 'transparent'
        },
        baselineColor: 'transparent'
      }
    }}
  />
</div>;

export default (
  <HvKpi
    labels={labels}
    visualIndicator={invalidIcon()}
    visualComparison={IopsComparisonVisualAverage()}
  />
);
