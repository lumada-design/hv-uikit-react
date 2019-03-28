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
import { Typography } from "@material-ui/core";
import HvKpi from "@hv-ui/react/core/Kpi";
import IconValid from "@hv-ui/icons/core/icons/Level0.S";
import IconArrowUp from "./assets/arrow-green-up.svg";

const ThroughputKpiTextConfiguration = {
  title: "Total throughput",
  indicator: "16,699.82",
  unit: "MB/S",
  comparisonIndicatorInfo: "vs last 24h.",
  comparisonIndicator: "60%"
};

const throughputComparisonVisual = () => (
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
        top: "1px",
        left: "-3px",
        background: `url(${IconArrowUp}) no-repeat`
      }}
      color="#008000"
    />
    <Typography
      style={{
        color: "#63A621",
        position: "relative",
        paddingLeft: "16px",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {ThroughputKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const icon = () => <IconValid color={["none", "#63A621"]} />;

export default (
  <HvKpi
    kpiTextConfiguration={ThroughputKpiTextConfiguration}
    visualIndicator={icon()}
    visualComparison={throughputComparisonVisual()}
  />
);
