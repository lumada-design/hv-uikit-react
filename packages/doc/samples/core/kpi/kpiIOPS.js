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
import IconInvalid from "@hv-ui/icons/core/icons/Level5.S";
import IconArrowDown from "./assets/arrow-red-down.svg";

const IOPSKpiTextConfiguration = {
  title: "Total IOPS",
  indicator: "113,277",
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
        top: "1px",
        left: "-3px",
        background: `url(${IconArrowDown}) no-repeat`
      }}
      color="#008000"
    />
    <Typography
      style={{
        color: "#D13F3F",
        position: "relative",
        paddingLeft: "16px",
        fontSize: "14px",
        fontWeight: "600",
        paddingBottom: "2px"
      }}
    >
      {IOPSKpiTextConfiguration.comparisonIndicator}
    </Typography>
  </div>
);

const invalidIcon = () => <IconInvalid color={["none", "#D13F3F"]} />;

export default (
  <HvKpi
    kpiTextConfiguration={IOPSKpiTextConfiguration}
    visualIndicator={invalidIcon()}
    visualComparison={IopsComparisonVisualAverage()}
  />
);
